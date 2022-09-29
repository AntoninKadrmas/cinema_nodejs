#include <SoftwareSerial.h>
#include <Wire.h>

String message;


//Motor driver
int enA = 6;
int in1 = 8;
int in2 = 7;
int enB = 3;
int in3 = 5;
int in4 = 4;

int speedOfMotors = 150;
int speedofRotation = 120;

//Ultrasonic senzors
const int trigPinF = 9;
const int echoPinF = 10;

const int trigPinL = 1;
const int echoPinL = 2;

const int trigPinR = 1;
const int echoPinR = 2;

long duration;
int distance;

//Button

int btnPin = 3;

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


void Forward() {
  digitalWrite(in1, HIGH);
  digitalWrite(in2, LOW);
  digitalWrite(in3, LOW);
  digitalWrite(in4, HIGH);  
 
  analogWrite(enA, speedOfMotors);
  analogWrite(enB, speedOfMotors);
  
}

void Backward(){
  digitalWrite(in1, LOW);
  digitalWrite(in2, HIGH);
  digitalWrite(in3, HIGH);
  digitalWrite(in4, LOW); 

  analogWrite(enA, speedOfMotors);
  analogWrite(enB, speedOfMotors);
}

void Stop(){
  analogWrite(enA, 0);
  analogWrite(enB, 0);

  digitalWrite(in1, LOW);
  digitalWrite(in2, LOW);
  digitalWrite(in3, LOW);
  digitalWrite(in4, LOW);
}

void Right(){
  digitalWrite(in1, HIGH);
  digitalWrite(in2, LOW);
  digitalWrite(in3, HIGH);
  digitalWrite(in4, LOW); 

  analogWrite(enA, speedofRotation);
  analogWrite(enB, speedofRotation);
}

void Left(){
  digitalWrite(in1, LOW);
  digitalWrite(in2, HIGH);
  digitalWrite(in3, LOW);
  digitalWrite(in4, HIGH); 

  analogWrite(enA, speedofRotation);
  analogWrite(enB, speedofRotation);
}

void setup() {
  Serial.begin(9600);
  Serial.println("Start");
  bt.begin(9600);
  bt.write("AT");

  //Motors init
  pinMode(enA, OUTPUT);
  pinMode(enB, OUTPUT);
  pinMode(in1, OUTPUT);
  pinMode(in2, OUTPUT);
  pinMode(in3, OUTPUT);
  pinMode(in4, OUTPUT);
 
  digitalWrite(in1, LOW);
  digitalWrite(in2, LOW);
  digitalWrite(in3, LOW);
  digitalWrite(in4, LOW);

  //Ultrasonic senzor init
  pinMode(trigPinF, OUTPUT);
  pinMode(echoPinF, INPUT);
  pinMode(trigPinL, OUTPUT);
  pinMode(echoPinL, INPUT);
  pinMode(trigPinR, OUTPUT);
  pinMode(echoPinR, INPUT);

  //Button init
   pinMode(btnPin, INPUT);

}

void Test(){
  delay(1000);
  Forward();
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
}

String input = "";
char inputChar;
int cycles = 0;

void BtControl(){
  if (Serial.available() > 0){
    cycles = 0;
    inputChar = Serial.read();
    Serial.println(inputChar);
    if(inputChar == '.'){
      Serial.print("I:");
    Serial.println(input);
    bt.println("Recived.");
    if(input.equals("f") == true){
      Forward();
      Serial.println("f");
      }
     if(input.equals("s") == true){
      Stop();
       Serial.println("s");
     }
    if(input.equals("b") == true){
      Backward();
      Serial.println("b"); 
      }
     if(input.equals("l") == true){
      Left();
      Serial.println("l"); 
      }
     if(input.equals("r") == true){
      Right();
      Serial.println("r"); 
      }
    input = "";
    }else {
    input += inputChar;
    }
  }else {
    cycles++;
    if(cycles > 12000){
     Stop();
   // Serial.println("AS");
    cycles = 0;
    } 
    //delay(300);
  }
}
bool obstacle = false;
bool obstacleEnd = false;

void AutoControl(){
  int distanceF = mesureDistance(trigPinF, echoPinF);
  //int distanceR = mesureDistance(trigPinR, echoPinR);
  //int distanceL = mesureDistance(trigPinL, echoPinL);
  
  if(distanceF > 30){
    if(obstacleEnd == true){
      delay(300);
      Stop();
      delay(300);
      obstacleEnd = false;
      obstacle = false;
    } 
    Forward();
  }else{  
    if(obstacle == false){
      Stop();
      delay(300);
      obstacle = true;
      obstacleEnd = true;
    }
    Left();
  }
}

bool mode = true;
void loop() {

  /*int btnState = digitalRead(btnPin);
  if(btnState == LOW){
    mode = !mode;
    delay(2000);
  }

  if(mode == true){
    BtControl();
  }else{
    AutoControl();
  }*/

  //Test();

  BtControl();

  //AutoControl();
   
}
  
 
 
