using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class camera : MonoBehaviour
{
    public float multiplayer = 1;
    private Vector3 first_position;
    private Vector3 actual_position;
    void Start()
    {
        first_position = transform.position; 
    }
    void Update()
    {
        actual_position = transform.position;
        Debug.Log(transform.position);
        transform.Translate(0, 0, Input.mouseScrollDelta.y * multiplayer);
        if (transform.position.y < 2.5) transform.position = new Vector3(first_position.x, 2.5f, actual_position.z);
        if (transform.position.y > 25) transform.position = new Vector3(first_position.x, 25, actual_position.z);
    }
}
