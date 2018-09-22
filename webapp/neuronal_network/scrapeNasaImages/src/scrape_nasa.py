from nasa import earth
from PIL import Image
import os
import math

DIR_PATH = os.path.dirname(os.path.realpath(__file__))

def download_image(lat,lon,i,j,dim):
    image = earth.image(lat=lat, lon=lon,dim=dim ) #date='2018-09-01'
    file_name = 'r{}_c{}.png'.format(i,j,lat, lon)
    image.image.save(os.path.join(DIR_PATH, os.pardir, 'downloadedImages', file_name))

def download_sceduler(x1_lat, x1_lon, x2_lat, x2_lon, dim=0.025):
    columns = math.ceil(math.fabs(x2_lat-x1_lat)/dim)
    rows = math.ceil(math.fabs(x2_lon-x1_lon)/dim)

    print(columns, rows)
    for j in range(columns):
        for i in range(rows):
            new_lat = x1_lat-(i*dim)
            new_lon = x1_lon + (j*dim)
            download_image(new_lat, new_lon,i,j, dim)

def img_to_tuple(img):
    row = int(img[1])
    col = int(img[4])
    img = '../downloadedImages/'+img
    return img, row, col

def stich(images):
        total_rows = int(images[-1][1])
        total_columns = int(images[-1][2])
        img_size_patch = Image.open(images[-1][0]).size[0]

        if total_columns == 0:
            total_columns = 1
        if total_rows == 0:
            total_rows = 1
        new_im = Image.new('RGB', (total_columns * img_size_patch, total_rows * img_size_patch))

        print(total_columns * img_size_patch, total_rows * img_size_patch )

        for image in range(len(images)):
            im = Image.open(images[image][0])
            row = images[image][1]
            col = images[image][2]
            print(col*img_size_patch, row*img_size_patch)
            print(image)
            new_im.paste(im, (col * img_size_patch, row * img_size_patch))

        new_im.show()



download_sceduler(46.772809, 11.935261,46.713663, 12.012333,0.01);
files = sorted(os.listdir(os.path.join(DIR_PATH, os.pardir, 'downloadedImages')))
images = [img_to_tuple(f) for f in files]
stich(images)
