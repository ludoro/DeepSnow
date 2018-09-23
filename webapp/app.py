import io
import flask
import base64
from flask import Flask, render_template
from flask import request
import numpy as np
from model import unet
from PIL import Image
from flask_cors import CORS

from open_cv_processing import *

# from flask_restful import Resource, Api, reqparse, abort
# from opencv import open_cv_processing

# from neuronal_network.unet.model import unet


app = Flask(__name__)
CORS(app)


def load_model():
    # load the pre-trained Keras model (here we are using a model
    # pre-trained on ImageNet and provided by Keras, but you can
    # substitute in your own networks just as easily)
    global model
    model = unet(input_size=(512, 512, 1))
    model.load_weights("unet_membrane.hdf5")
    model._make_predict_function()



@app.route("/api/prediction", methods=['POST'])
def image_prediction():
    x = int(request.form["x"])
    y = int(request.form["y"])
    print("x,y", x, y)

    print(request)
    if request.form["img"]:
        # read the image in PIL format
        # print(request.form["img"][0:1000])
        # imgdata = decode_base64(request.form["img"])
        # iout = io.BytesIO(imgdata)
        # iout.seek(0)
        # image = Image.open(iout)
        print(request.form["img"][0:100])
        image_data = request.form["img"].replace('data:image/png;base64,', '').replace(' ', '+')
        # #print("image data,",image_data[0:100])
        # datta = base64.b64decode(image_data.split(",")[1])
        # print('datta', datta)
        iout = io.BytesIO(base64.b64decode(image_data))
        # #iout.seek(0)
        # #ImageFile.LOAD_TRUNCATED_IMAGES = True
        image = Image.open(iout)
        image = image.crop((x-256,y-256,x+256,y+256))
        # image = Image.open(io.BytesIO(image))

        if image.mode != "L":
            image = image.convert("L")
        # resize the input image and preprocess it
        image.show()
        #image = image.resize((512, 512))


        img_np = np.array(image)
        #img_np = img_np[x - 256:y - 256, x + 256:y + 256]
        img_np =np.expand_dims(np.expand_dims(img_np, 2), 0)


        image = model.predict(img_np/255.0)
        print(image)
        imageshow = Image.fromarray(np.squeeze(np.squeeze(image, 3), 0) * 255)
        imageshow.show()
        image = np.squeeze(np.squeeze(image, 3), 0)

        #------------------------------------------
        # Till here it runs! Do not change above!
        #------------------------------------------


        # image.show()

        # image = image.crop((x-25, y+25,x+25,y-25))
        #image.save('test.png')


        #image_cv = image > 0.00001
        #image_cv = image_cv.astype(np.uint8)

        #imageshow = Image.fromarray(image_cv)
        #imageshow.show()
        image_cv = image

        #impil = Image.fromarray(image_cv)
        print(image_cv)
        #impil.save('crop.png')


        poly_json, area = open_cv_processing(image_cv)

        # data["predictions"] = []
        print("polyjson", poly_json)

        return poly_json

    return 'No Image given!'


@app.route("/", methods=['GET'])
def home():
    return render_template("index.html")


if __name__ == "__main__":
    load_model()
    app.run(host='172.31.201.157', debug=True)
