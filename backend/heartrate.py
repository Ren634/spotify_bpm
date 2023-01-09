import serial
import numpy as np


def get_heart_rate():
    deviceName = "COM3"
    readSer = serial.Serial(deviceName, 115200, timeout=3)
    heart_rate = []
    while(len(heart_rate) < 3):
        line = readSer.readline().decode("utf-8")
        if(line[0] == "B"):
            heart_rate += [int(line.split("\\")[0][1:])]
    readSer.close()
    return np.array(heart_rate).mean()
