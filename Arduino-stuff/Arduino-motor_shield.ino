#include <SoftwareSerial.h>
#include <Wire.h>
#include <AFMotor.h>
#include <LiquidCrystal_I2C.h>

// Bt
SoftwareSerial bt(0, 1);
String message;

//Motor shield
AF_DCMotor motorFL(1);
AF_DCMotor motorFR(2);
AF_DCMotor motorBL(3);
AF_DCMotor motorBR(4);
int speedOfMotors = 150;

//Voltage senzor
int voltagePin = A5; // analog pin

float VoltageValue(){
  float R1 = 30000.0;
  float R2 = 7500.0;
  int value = analogRead(voltagePin);
  int vOUT = (value * 5.0) / 1024.0;
  int vIN = vOUT / (R2/(R1+R2));
  return vIN;
}

//Lcd
LiquidCrystal_I2C lcd = LiquidCrystal_I2C(0x27,16,2);


//Ultrasonic senzors
const int trigPin1 = 1;
const int echoPin1 = 2;

const int trigPin2 = 1;
const int echoPin2 = 2;

const int trigPin3 = 1;
const int echoPin3 = 2;

long duration;
int distance;

int mesureDistance(int trigPin, int echoPin){
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  duration = pulseIn(echoPin, HIGH);
  distance = duration * 0.034 / 2;
  Serial.print("Distance: ");
  Serial.println(distance);
  return distance;
}


int delay1 = 50;

void Foward(){
  motorFL.setSpeed(speedOfMotors);
  motorFR.setSpeed(speedOfMotors);
  motorBL.setSpeed(speedOfMotors);
  motorBR.setSpeed(speedOfMotors);

  motorFL.run(FORWARD);
  motorFR.run(FORWARD);
  motorBL.run(FORWARD);
  motorBR.run(FORWARD);

  bt.println("Foward");
}
void Backward(){
  motorFL.setSpeed(speedOfMotors);
  motorFR.setSpeed(speedOfMotors);
  motorBL.setSpeed(speedOfMotors);
  motorBR.setSpeed(speedOfMotors);

  motorFL.run(BACKWARD);
  motorFR.run(BACKWARD);
  motorBL.run(BACKWARD);
  motorBR.run(BACKWARD);

  bt.println("BackWard");
}

void Stop(){
  motorFL.run(RELEASE);
  motorFR.run(RELEASE);
  motorBL.run(RELEASE);
  motorBR.run(RELEASE);

  bt.println("Stop");
}

void Left(){
  motorFL.setSpeed(speedOfMotors);
  motorFR.setSpeed(speedOfMotors);
  motorBL.setSpeed(speedOfMotors);
  motorBR.setSpeed(speedOfMotors);

  motorFL.run(BACKWARD);
  motorFR.run(FORWARD);
  motorBL.run(BACKWARD);
  motorBR.run(FORWARD);

  bt.println("Left");
}

void Right(){
  motorFL.setSpeed(speedOfMotors);
  motorFR.setSpeed(speedOfMotors);
  motorBL.setSpeed(speedOfMotors);
  motorBR.setSpeed(speedOfMotors);

  motorFL.run(FORWARD);
  motorFR.run(BACKWARD);
  motorBL.run(FORWARD);
  motorBR.run(BACKWARD);

  bt.println("Right");
}

void setup() {
  Serial.begin(9600);
  Serial.println("Start");

  //Bt init
  bt.begin(9600);
  bt.write("AT");

  //Ultrasonic senzor init
  pinMode(trigPin1, OUTPUT);
  pinMode(echoPin1, INPUT);
  pinMode(trigPin2, OUTPUT);
  pinMode(echoPin2, INPUT);
  pinMode(trigPin3, OUTPUT);
  pinMode(echoPin3, INPUT);

  //Lcd init
  lcd.init();
  lcd.backlight();
  
}
String input = "";
char inputChar;

void loop() {

  delay(1000);
  Foward();
  delay(1000);
  Stop();
  delay(1000);
  Backward();
  delay(1000);
  Stop();
  delay(1000);
  Left();
  delay(1000);
  Stop();
  delay(1000);
  Right();
  delay(1000);
  Stop();
  delay(1000);
  
  /*if (bt.available()){
    inputChar = bt.read();
    if(inputChar == '.'){
      Serial.print("I:");
    Serial.println(input);
    bt.println("Recived.");
    if(input.equals("go") == true){
      Foward();
      bt.println("BT:Start");
      Serial.println("S:Start");
      }
     if(input.equals("stop") == true){
      Stop();
      bt.println("BT:Stop");
       Serial.println("S:Stop");
     }
     if(input.equals("turnLeft") == true){
      Left();
      bt.println("BT:turnLeft");
      Serial.println("S:turnLeft"); 
      }
     if(input.equals("turnRight") == true){
      Right();
      bt.println("BT:turnRight");
      Serial.println("S:turnRight"); 
      }
     if(input.equals("turnMiddle") == true){
      turnMiddle();
      bt.println("BT:turnMiddle");
      Serial.println("S:turnMiddle"); 
      }
     
 
    input = "";
    }else {
    input += inputChar;
    }
  }*/
  delay(50);
}
  
 
 
