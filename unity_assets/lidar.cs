using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Net.Sockets;
using System.Text;
using System.Threading;
using UnityEngine;

public class lidar : MonoBehaviour
{
    float[] distance = new float[360];
    // Update is called once per frame
    int count = 0;


    TcpListener serer = new TcpListener(System.Net.IPAddress.Any, 2221);
    TcpClient client;
    StreamWriter writer;
    private void Start()
    {
        serer.Start();

         //Thread conn = new Thread(new ThreadStart(Connection));
         //conn.Start();

        client = serer.AcceptTcpClient();

        writer = new StreamWriter(client.GetStream(), Encoding.ASCII);
    }


    
    void Update ()
    {
        transform.Rotate(0,++count,0,Space.Self);
        RaycastHit hit;
        if (Physics.Raycast(transform.position, transform.TransformDirection(Vector3.forward), out hit,20f)) {
            Debug.DrawRay(transform.position, transform.TransformDirection(Vector3.forward)*hit.distance, Color.red);
            ///Debug.Log("Distance" + count + "= "+hit.distance);
            distance[count - 1] = hit.distance;
        }
        else
        {
            Debug.DrawRay(transform.position, transform.TransformDirection(Vector3.forward) * 20f, Color.blue);
            //Debug.Log("Distance"+count + "= no distance");
            distance[count - 1] = 0;
        }

        if (client.Connected)
        {
            writer.WriteLine($"{count};{distance[count - 1]};");
            writer.Flush();
        }

        if (count >= 360)count = 0; 
           
    }
}
