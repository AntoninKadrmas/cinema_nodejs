class LidarField:
    def __init__(self,x_size,y_size):
        self.x_size = x_size
        self.y_size = y_size

        self.field = [[]] * self.y_size
        for y in range(self.y_size):
            self.field[y] = [" "] * self.x_size

    def drawField(self,points=[(-1, -1)]):

        if points[0] != (-1, -1):
            for point in points:
                x, y = point
                x -= 1
                y -= 1
                if x < self.x_size and y < self.y_size:
                    self.field[y][x] = "*"
        line = " " + "_" * self.x_size*3
        output = line
        output += "\n"
        for y in range(self.x_size):
            output += "|"
            for x in range(self.y_size):
                output += " " + self.field[y][x] + " "
            output += "|\n"
        output += line
        return output