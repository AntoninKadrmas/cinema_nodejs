using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class camera_change : MonoBehaviour
{
    public GameObject camera1;
    public GameObject camera2;
    public GameObject camera3;

    int index = 0;


    void Update()
    {
        if (Input.GetMouseButtonDown(0))
            index++;

        if (Input.GetMouseButtonDown(1))
            index--;
        if (index > 2) index = 0;
        if (index < 0) index = 2;
        if (index == 0)
        {
            camera1.SetActive(true);
            camera2.SetActive(false);
            camera3.SetActive(false);
        }
        if (index == 1)
        {
            camera1.SetActive(false);
            camera2.SetActive(true);
            camera3.SetActive(false);
        }
        if (index == 2)
        {
            camera1.SetActive(false);
            camera2.SetActive(false);
            camera3.SetActive(true);
        }
    }
}
