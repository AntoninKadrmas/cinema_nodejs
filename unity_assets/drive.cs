using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class drive : MonoBehaviour
{
    [Header("Movement")]
    public float moveSpeed;
    public float rotationSpeed;

    float horizontalInput=0;
    float verticalInput=0;

    public Rigidbody rb;

    Dictionary<string, int> movement = new Dictionary<string, int>() {
        {"F",1},
        {"S",0},
        {"B",-1},
    };
    Dictionary<string, int> rotate = new Dictionary<string, int>() {
        {"S",0},
        {"L",-1},
        {"R",1}
    };
    private void Start()
    {
        rb.freezeRotation = true;
    }

    private void Update()
    {
    }

    private void FixedUpdate()
    {
        MovePlayer();
    }
    private void MovePlayer()
    {
        transform.Translate(0, 0, moveSpeed * verticalInput);
        transform.Rotate(0, rotationSpeed * horizontalInput, 0);
    }
    void OnGUI()
    {
        Event e = Event.current;
        if (e.isKey)
        {
            try
            {
                verticalInput = movement[e.keyCode.ToString()];
            }
            catch{}
            try
            {
                horizontalInput = rotate[e.keyCode.ToString()];
            }
            catch { }
        }
    }
}
