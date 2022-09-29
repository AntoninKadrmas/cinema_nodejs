package com.lukas8092.arduino_bt_controller;


import android.bluetooth.BluetoothDevice;
import android.bluetooth.BluetoothManager;
import android.bluetooth.BluetoothSocket;
import android.os.Handler;
import android.os.Message;
import android.os.SystemClock;
import android.widget.ListView;

import androidx.annotation.NonNull;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;
import java.util.UUID;

public class ClientThread implements Runnable {
    private BluetoothSocket mmSocket = null;
    private BluetoothDevice mmDevice = null;
    private OutputStream mmOutStream = null;
    InputStream mmInStream = null;

    public boolean keysStates[] = new boolean[4];

    public ClientThread(BluetoothDevice device) {
            mmDevice = device;
            mmSocket = null;
        try {
            UUID uuid = UUID.fromString("00001101-0000-1000-8000-00805F9B34FB");
            mmSocket = device.createRfcommSocketToServiceRecord(uuid);
        }
        catch (IOException e) {
            System.out.println("Err1");
        }
    }
    public void run() {
        try {
            mmSocket.connect();
            mmOutStream = mmSocket.getOutputStream();
            System.out.println("Client connected "+ mmDevice.getName());
        } catch (IOException connectException) {
            System.out.println("Err2");
            System.out.println(connectException);
            return;
        }
        while (true) {
            try {
                byte[] mmBuffer = new byte[1024];;
                mmInStream = mmSocket.getInputStream();
                int numBytes = mmInStream.read(mmBuffer);
                //System.out.println("EEE1 bytes: "+ numBytes);
                Message readMsg = controller.handler.obtainMessage(10, numBytes, -1, mmBuffer);
                readMsg.sendToTarget();
            } catch (IOException e) {
                System.out.println("Err");
            }
        }
    }

    public void WriteMsg(String msg,int index) {
        while (keysStates[index]) {
            try {
                mmOutStream.write(msg.getBytes());
            } catch (IOException e) {
                e.printStackTrace();
            }
            try {
                Thread.sleep(50);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }

        }
    }


}

