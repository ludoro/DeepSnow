import numpy as np
import cv2
import json

def open_cv_processing(im):

    #im = cv2.imread(im)
    #it may need to be inverted here

    #try:
    #    imgray = cv2.cvtColor(im, cv2.COLOR_BGR2GRAY)
    #except:
    #    print('Image is already in greyscale')
    #_,imgray = cv2.threshold(im, 0.5,1,cv2.THRESH_BINARY)
    #imgray = im / 255
    #imgray = cv2.cvtColor(imgray, cv2.CV_8UC1)
    #print(imgray)
    #image = cv2.fastNlMeansDenoising(imgray,None,10,7,21)
    im = 255-im*255
    im = im.astype(np.uint8)
    print('after')
    print(im)

    kernel = np.ones((20,20),np.uint8)

    ret, thresh = cv2.threshold(im, 205, 1, 0)
    thresh = cv2.morphologyEx(thresh, cv2.MORPH_OPEN, kernel)
    print('thres')
    print(thresh)
    im2, contours, hiearchy = cv2.findContours(thresh, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
    index = 0
    if (len(contours) > 1):
        minimum_distance = 10000000
        index = 0;
        max_area = 0;
        for i in range(0,len(contours)):

            area = cv2.contourArea(contours[i])
            print('Area got ',area, ' pixels')

            if(area>=max_area):
                max_area = area
                index = i
                print("found new max area", i)

    Area = cv2.contourArea(contours[index])
    print(Area, "pixels")


    #If we want the polygon
    magic_value = 0.01
    epsilon = magic_value*cv2.arcLength(contours[index],True)
    approx = cv2.approxPolyDP(contours[index],epsilon,True)
    cv2.drawContours(im, [approx], -1, (255,255,0), 3)
    np_array_to_list = approx.tolist()
    json_string= json.dumps(np_array_to_list)
    # this is important because we are saving the image, so it can be represented
    # in the webapp
    #cv2.imwrite("image_with_contour.jpg",im)

    #If we want the full contour
    #cv2.drawContours(im,contours,-1, (255,255,0), 3)

    #Saves the image on that name, so when we use front end we just use img = ...
    #cv2.imshow("draw contours",im)
    #cv2.waitKey(0)

    #We can change the return values if we need to
    #json string is a list of points in reference to uppermost pixel

    return json_string, Area
