import LidarField as Lidar

lidar = Lidar.LidarField(20,20)
points = [(1,6),(9,9),(5,5),(0,10)]
print(lidar.drawField(points))

print(lidar.drawField())