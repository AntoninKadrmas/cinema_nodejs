from threading import Thread
# from rplidar import RPLidar
import socket
import math
from statistics import mean
import time
import os

if os.name == "nt":
    com_path = "COM5"
else:
    com_path = "/dev/ttyUSB0"


# lidar = RPLidar(com_path)
# lidar.stop()


points = [0] * 361

def Average(l): 
    return sum(l) / len(l) 

def get_segments(count):
    length = int(360/count)
    avg_points = [None] * count
    for i in range(0,count):
        points_in_segment = []
        something = int(length*i)
        for x in range(something,something+length):
            if x== 0:
                continue
            points_in_segment.append(points[x])
        avg_points[i] = Average(points_in_segment)
    return avg_points


def start_lidar():
    # while True:
    #     for point in lidar.iter_measures():
    #         dist = point[3]
    #         angle = int(point[2])
    #         points[angle] = dist
    client = socket.socket()  # instantiate
    client.connect(("127.0.0.1", 2221))
    while True:
        data = client.recv(1024).decode('ascii')
        datas =  data.split("\n")
        for d in datas:
            if ";" in d:
                d = d.split(";")
                angle = int(d[0])
                dist = float(d[1].replace(",","."))
                points[angle] = dist


if __name__ == "__main__":
    t = Thread(target=start_lidar).start()

    while True:
        # seg_count = input("Segment count:")
        seg_count = 4
        segments = get_segments(int(seg_count))
        for i,x in enumerate(segments):
            print(f"{i}.: {x}")
        print("-----------------------")
        time.sleep(0.5)

      
    #  x = int(dist * math.cos(angle * (math.pi / 180)) + grid.x_size / 2)
    #   y = int(dist * math.sin(angle * (math.pi / 180)) + grid.y_size / 2)

