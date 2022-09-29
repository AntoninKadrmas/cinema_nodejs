package com.lukas8092.arduino_bt_controller;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.RecyclerView;

import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ListView;

import java.util.ArrayList;
import java.util.Set;

public class MainActivity extends AppCompatActivity {

    public static BluetoothAdapter btAdapter = BluetoothAdapter.getDefaultAdapter();
    private ListView view;
    ArrayList<BluetoothDevice> list = new ArrayList<>();
    ArrayAdapter<String> arrayAdapter;
    ArrayList<String> list2 = new ArrayList<String>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        view = (ListView)findViewById(R.id.devicesList);

        arrayAdapter = new ArrayAdapter<String>(this, android.R.layout.simple_list_item_1,list2);
        view.setAdapter(arrayAdapter);

        Set<BluetoothDevice> pairedDevices = btAdapter.getBondedDevices();
        for (BluetoothDevice device : pairedDevices) {
            String deviceName = device.getName();
            String deviceHardwareAddress = device.getAddress();
            list2.add(deviceName+ "\n"+ deviceHardwareAddress);
            arrayAdapter.notifyDataSetChanged();
            list.add(device);
        }

        view.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
                Device.device = list.get(i);
                Intent intent = new Intent(getApplicationContext(), controller.class);
                startActivity(intent);
            }
        });
    }
}