#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <U8g2lib.h>
#include <Wire.h>
#include <DHT.h>

// Wi-Fi Credentials
const char* ssid = "Orencia Family";
const char* password = "@Jeanne@";

// DHT Sensor Setup 
#define DHTPIN D4  // Pin where the data line is connected 
#define DHTTYPE DHT11 // Change to DHT11 if using that sensor 
DHT dht(DHTPIN, DHTTYPE);

// HiveMQTT Credentials
const char* mqtt_server = "12c86034fa9b49dcad0c8f78f4bb580a.s1.eu.hivemq.cloud";
const int mqtt_port = 8883;  // SSL
const char* mqtt_user = "NodeMCU";
const char* mqtt_password = "Nodemcu123";

// MQTT Topic for container schedule
const char* sched = "home/esp/sched";
const char* status = "home/esp/status";
const char* sensors = "home/esp/sensors";

//timers
unsigned long medStartTime = 0;
const unsigned long MED_TIMEOUT = 60000UL; // 5 minutes
bool waitingForMed = false;

// MQTT client
WiFiClientSecure espClient;
PubSubClient client(espClient);

// LEDs and buzzer
int cont1LED = D0;
int cont2LED = D2;
int cont3LED = D7;
int cont4LED = 3;
int buttonPin = D3;
int buzzerPin = D8;
int servoPin = D1;

// Array of containers
int toTake[4]; // max 4 containers // changed this sht - gang gang
String lastMessage = "";    
String msgID = "";
int arraySize = 0;
bool lidOpen = false;
bool medTaken = false;

// OLED
U8G2_SSD1306_128X64_NONAME_F_HW_I2C u8g2(U8G2_R0, U8X8_PIN_NONE);

// Non-blocking buzzer
unsigned long previousMillis = 0;
bool buzzerState = false;
const long buzzerInterval = 500;

// --- Wi-Fi ---
void setupWiFi() {
  WiFi.begin(ssid, password);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println(" connected");
}

// --- MQTT reconnect ---
void reconnect() {
  while (!client.connected()) {
    Serial.print("Connecting to MQTT...");
    if (client.connect("ESP8266MedClient", mqtt_user, mqtt_password)) {
      Serial.println("connected");
      client.subscribe(sched); // subscribe to meds topic
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(", retry in 5 seconds");
      delay(5000);
    }
  }
}

// --- MQTT callback ---
void mqttCallback(char* topic, byte* payload, unsigned int length) {
  String message = "";
  for (int i = 0; i < length; i++) {
    message += (char)payload[i];
  }

  // Split the message at the '|' symbol
  int separatorIndex = message.indexOf('|');
  if (separatorIndex == -1) return; // Ignore messages without an ID

  msgID = message.substring(0, separatorIndex);
  String medList = message.substring(separatorIndex + 1);

  // If the ID is the same as the last one, it's a "retained" message, so ignore it.
  // If the ID is DIFFERENT, it's a new dose (even if meds are the same).
  if (msgID == lastMessage) {
    return;
  }

  lastMessage = msgID; // Save the new ID
  Serial.println("New Dose ID: " + msgID);

  // Now parse the medList ("1,3")
  arraySize = 0;
  int index = 0;
  char* token = strtok((char*)medList.c_str(), ",");
  while (token != NULL && index < 4) {
    toTake[index++] = atoi(token);
    token = strtok(NULL, ",");
  }
  arraySize = index;
  lidOpen = (arraySize > 0);
  if (lidOpen) {
    medStartTime = millis();   // start 5-minute timer
    waitingForMed = true;
  }
}

// --- Setup ---
void setup() {
  Serial.begin(115200);

  pinMode(cont1LED, OUTPUT);
  pinMode(cont2LED, OUTPUT);
  pinMode(cont3LED, OUTPUT);
  pinMode(cont4LED, OUTPUT);
  pinMode(buttonPin, INPUT_PULLUP);
  pinMode(buzzerPin, OUTPUT);

  Wire.begin(D5, D6); // SDA, SCL
  u8g2.begin();
  u8g2.setFont(u8g2_font_ncenB08_tr);
  dht.begin();

  setupWiFi();
  espClient.setInsecure(); // SSL without certificate
  client.setServer(mqtt_server, mqtt_port);
  client.setCallback(mqttCallback);
}

// --- Loop ---
void loop() {
  refreshDisplay();
  getRealSensorData();
  if (!client.connected()) reconnect();
  client.loop();
  
  // Only turn on LEDs if med hasn't been taken yet
  if (lidOpen) {
    indicateMeds();
    activateBuzzer();
  } else {
    noTone(buzzerPin); // Force silence when lid is closed
  }

  // Close lid button logic
  if (digitalRead(buttonPin) == LOW && lidOpen && waitingForMed) {
    lidOpen = false;
    waitingForMed = false;
    noTone(buzzerPin);
    arraySize = 0;

    client.publish(sched, "", true); 
    resetLEDs();
    sendMedStatus(true);  // TAKEN
    delay(300); // debounce
  }
  if (lidOpen && waitingForMed) {
    if (millis() - medStartTime >= MED_TIMEOUT) {
      handleMedTimeout();
    }
  }
}

// --- Functions ---
void handleMedTimeout() {
  Serial.println("Medicine NOT taken (timeout)");

  lidOpen = false;
  waitingForMed = false;
  arraySize = 0;

  noTone(buzzerPin);
  resetLEDs();

  // Update OLED
  u8g2.clearBuffer();
  u8g2.drawStr(5, 30, "Failed to take");
  u8g2.drawStr(5, 45, "medication");
  u8g2.sendBuffer();

  sendMedStatus(false); // NOT TAKEN
}

void indicateMeds() {
  digitalWrite(cont1LED, LOW);
  digitalWrite(cont2LED, LOW);
  digitalWrite(cont3LED, LOW);
  digitalWrite(cont4LED, LOW);
  for (int i = 0; i < arraySize; i++) {
    switch(toTake[i]) {
      case 1: digitalWrite(cont1LED, HIGH); break;
      case 2: digitalWrite(cont2LED, HIGH); break;
      case 3: digitalWrite(cont3LED, HIGH); break;
      case 4: digitalWrite(cont4LED, HIGH); break;
    }
    Serial.println(toTake[i]);
  }
}

void resetLEDs() {
  digitalWrite(cont1LED, LOW);
  digitalWrite(cont2LED, LOW);
  digitalWrite(cont3LED, LOW);
  digitalWrite(cont4LED, LOW);
  digitalWrite(buzzerPin, LOW);
}

void refreshDisplay() {
  u8g2.clearBuffer();
  if (lidOpen) {
    u8g2.drawStr(5, 15, "Time to take");
    u8g2.drawStr(5, 30, "your medication");
    u8g2.drawStr(5, 45, "Check LED containers");
  } else {
    u8g2.drawStr(5, 25, "No scheduled");
    u8g2.drawStr(5, 40, "medication yet");
  }
  u8g2.sendBuffer();
}

void activateBuzzer() {
  unsigned long currentMillis = millis();

  // Check if it's time to toggle the buzzer (every 500ms)
  if (currentMillis - previousMillis >= buzzerInterval) {
    previousMillis = currentMillis; // Remember the time
    buzzerState = !buzzerState;     // Toggle state (true/false)

    if (buzzerState) {
      tone(buzzerPin, 3000);        // Sound ON
    } else {
      noTone(buzzerPin);            // Sound OFF
    }
  }
}

void sendMedStatus(bool taken) {
  String payload = taken ? "taken | " + msgID : "not taken | " + msgID;
  if (client.publish(status, payload.c_str())) {
    Serial.println("Status published: " + payload);
  } else {
    Serial.println("Failed to publish status");
  }
}

void getRealSensorData() {
  float temp = dht.readTemperature();
  float humidity = dht.readHumidity();

  String sensorPayload = String(temp) + "|" + String(humidity);
  if (isnan(temp) || isnan(humidity)) {
    Serial.println("Failed to read from DHT sensor!");
    temp = -1; // Indicate error with -1
    humidity = -1;
  }

  Serial.println(sensorPayload);

  client.publish(sensors, sensorPayload.c_str());
}
