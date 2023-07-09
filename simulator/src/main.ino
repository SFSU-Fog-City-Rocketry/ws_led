#include <Arduino.h>

int pin = 25;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);
  Serial.println("Hello, ESP32!");
  pinMode(pin, OUTPUT);
  
}

void loop() {
  digitalWrite(pin, HIGH);
  // put your main code here, to run repeatedly:
  delay(100);
  digitalWrite(pin, LOW);
  delay(100); // this speeds up the simulation
}