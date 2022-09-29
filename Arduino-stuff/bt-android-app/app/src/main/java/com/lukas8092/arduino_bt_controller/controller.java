package com.lukas8092.arduino_bt_controller;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.bluetooth.BluetoothDevice;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.os.SystemClock;
import android.view.MotionEvent;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import java.util.ArrayList;

public class controller extends AppCompatActivity {
    private BluetoothDevice device = Device.device;
    public static ClientThread thread = null;

    public static ListView consoleView;
    public static ArrayAdapter<String> arrayAdapter2;
    public static ArrayList<String> list22 = new ArrayList<String>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_controller);

        Button btn = (Button) findViewById(R.id.btn2);
        Button btn2 = (Button) findViewById(R.id.button);
        Button btn3 = (Button) findViewById(R.id.button2);
        Button btn4 = (Button) findViewById(R.id.button3);

        consoleView = (ListView)findViewById(R.id.consoleView);
        arrayAdapter2 = new ArrayAdapter<String>(this, android.R.layout.simple_list_item_1,list22);
        consoleView.setAdapter(arrayAdapter2);

        btn.setOnTouchListener(new View.OnTouchListener() {
            @Override
            public boolean onTouch(View v, MotionEvent event) {
                if(event.getAction() == MotionEvent.ACTION_DOWN) {
                    System.out.println("Pressed");
                    thread.keysStates[0] = true;
                        Message msg = Message.obtain();
                        msg.what = 2;
                        handler.sendMessage(msg);

                } else if (event.getAction() == MotionEvent.ACTION_UP) {
                    System.out.println("Released");
                    thread.keysStates[0] = false;
                    /*Message msg = Message.obtain();
                    msg.what = 1;
                    handler.sendMessage(msg);*/
                }
                return true;
            }
        });

        btn2.setOnTouchListener(new View.OnTouchListener() {
            @Override
            public boolean onTouch(View v, MotionEvent event) {
                if(event.getAction() == MotionEvent.ACTION_DOWN) {
                    System.out.println("Pressed b");
                    thread.keysStates[1] = true;
                    Message msg = Message.obtain();
                    msg.what = 3;
                    handler.sendMessage(msg);

                } else if (event.getAction() == MotionEvent.ACTION_UP) {
                    System.out.println("Released b");
                    thread.keysStates[1] = false;
                    /*Message msg = Message.obtain();
                    msg.what = 1;
                    handler.sendMessage(msg);*/
                }
                return true;
            }
        });

        btn3.setOnTouchListener(new View.OnTouchListener() {
            @Override
            public boolean onTouch(View v, MotionEvent event) {
                if(event.getAction() == MotionEvent.ACTION_DOWN) {
                    System.out.println("Pressed");
                    thread.keysStates[2] = true;
                    Message msg = Message.obtain();
                    msg.what = 4;
                    handler.sendMessage(msg);

                } else if (event.getAction() == MotionEvent.ACTION_UP) {
                    System.out.println("Released");
                    thread.keysStates[2] = false;
                    /*Message msg = Message.obtain();
                    msg.what = 1;
                    handler.sendMessage(msg);*/
                }
                return true;
            }
        });

        btn4.setOnTouchListener(new View.OnTouchListener() {
            @Override
            public boolean onTouch(View v, MotionEvent event) {
                if(event.getAction() == MotionEvent.ACTION_DOWN) {
                    System.out.println("Pressed");
                    thread.keysStates[3] = true;
                    Message msg = Message.obtain();
                    msg.what = 5;
                    handler.sendMessage(msg);

                } else if (event.getAction() == MotionEvent.ACTION_UP) {
                    System.out.println("Released");
                    thread.keysStates[3] = false;
                    /*Message msg = Message.obtain();
                    msg.what = 1;
                    handler.sendMessage(msg);*/
                }
                return true;
            }
        });

        thread = new ClientThread(device);
        new Thread(thread).start();
        Toast.makeText(controller.this,"Start",Toast.LENGTH_LONG).show();

    }

    public static Handler handler = new Handler(new Handler.Callback() {
        @Override
        public boolean handleMessage(@NonNull Message msg) {
            switch (msg.what){
                case 1:
                   // callThread("s.",-1);
                    break;
                case 2:
                    callThread("f.",0);
                    break;
                case 3:
                    callThread("b.",1);
                    break;
                case 4:
                    callThread("l.",2);
                    break;
                case 5:
                    callThread("r.",3);
                    break;
                case 10:
                    byte[] readBuffer = (byte[]) msg.obj;
                    String msgText = new String(readBuffer,0,msg.arg1);
                    list22.add(msgText);
                    arrayAdapter2.notifyDataSetChanged();
                    break;
            }

            return false;
        }
    });

    public static void  callThread(String msg, int index){
        Thread t = new Thread(new Runnable() {
            @Override
            public void run() {
                thread.WriteMsg(msg,index);
            }
        });
        t.start();
    }
}