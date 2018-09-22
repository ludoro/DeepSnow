import numpy as np
import cv2
import json

def open_cv_processing(im):
    im = cv2.imread(im)
    #it may need to be inverted here
    # im = cv2.bitwise_not(im)
    imgray = cv2.cvtColor(im, cv2.COLOR_BGR2GRAY)
    _,imgray = cv2.threshold(imgray, 127,1,cv2.THRESH_BINARY)
    #image = cv2.fastNlMeansDenoising(imgray,None,10,7,21)
    kernel = np.ones((15,15),np.uint8)
    image = cv2.morphologyEx(imgray, cv2.MORPH_CLOSE, kernel)
    ret, thresh = cv2.threshold(image, 0.5, 1, 0)
    im2, contours, hiearchy = cv2.findContours(thresh, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
    index = 0
    if (len(contours) > 1):
        minimum_distance = 10000000
        index = 0;
        for i in range(0,len(contours)):
            #calculate centroid
            M = cv2.moments(contours[i])

            if( M['m00'] == 0 ):
                pass
            else:
                x = int(M['m10']/M['m00'])
                y = int(M['m01']/M['m00'])

                #distance from center
                distance = np.sqrt((x-256)^2 + (y-256)^2)
                if (distance < minimum_distance):
                    minimum_distance = distance
                    index = i

    Area = cv2.contourArea(contours[index])
    print(Area, "pixels")


    #If we want the polygon
    magic_value = 0.01
    epsilon = magic_value*cv2.arcLength(contours[index],True)
    approx = cv2.approxPolyDP(contours[index],epsilon,True)
    cv2.drawContours(im, [approx], -1, (255,255,0), 3)
    np_array_to_list = approx.tolist()
    json_string= json.dumps(np_array_to_list)

    #If we want the full contour
    #cv2.drawContours(im,contours,-1, (255,255,0), 3)

    #Saves the image on that name, so when we use front end we just use img = ...

    cv2.imwrite("image_with_contour.jpg",im)
    cv2.imshow("draw contours",im)
    cv2.waitKey(0)

    #We can change the return values if we need to
    return json_string, Area
