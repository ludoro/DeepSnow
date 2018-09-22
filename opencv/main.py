import numpy as np
import cv2

im = cv2.imread("test.jpg")
#it may need to be inverted here
# im = cv2.bitwise_not(im)
imgray = cv2.cvtColor(im, cv2.COLOR_BGR2GRAY)
image = cv2.fastNlMeansDenoising(imgray,None,10,7,21)
ret, thresh = cv2.threshold(image, 127, 255, 0)
im2, contours, hiearchy = cv2.findContours(thresh, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
Area = cv2.contourArea(contours[0])
print(Area, "pixels")


#If we want the polygon
magic_value = 0.01
epsilon = magic_value*cv2.arcLength(contours[0],True)
approx = cv2.approxPolyDP(contours[0],epsilon,True)
cv2.drawContours(im, [approx], -1, (255,255,0), 3)

#If we want the full contour
#cv2.drawContours(im,contours,-1, (255,255,0), 3)
cv2.imwrite("image_with_contour.jpg",im)
cv2.imshow("draw contours",im)
cv2.waitKey(0)
