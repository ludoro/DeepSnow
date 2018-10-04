import io
import base64
from flask import Flask, render_template, request
import numpy as np
from model import unet
from PIL import Image
from flask_cors import CORS
from open_cv_processing import *


DEBUG=False

app = Flask(__name__)
CORS(app) # allow cross referenced AJAX calls when backend is running on external server


def load_model():
    # load the pre-trained Keras model (here we are using a model
    # pre-trained on ImageNet and provided by Keras, but you can
    # substitute in your own networks just as easily)
    global model
    model = unet(input_size=(512, 512, 1))
    model.load_weights("../model/unet_membrane.hdf5")
    model._make_predict_function()


@app.route("/api/prediction", methods=['POST'])
def image_prediction():
    x = int(float(request.form["x"]))
    y = int(float(request.form["y"]))
    if (DEBUG):
        print("x,y", x, y)

    print(request)
    if request.form["img"]:
        # read the image in PIL format
        # print(request.form["img"][0:1000])
        # imgdata = decode_base64(request.form["img"])
        # iout = io.BytesIO(imgdata)
        # iout.seek(0)
        # image = Image.open(iout)
        if (DEBUG):
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

        if (DEBUG):
            image.show()
        #image = image.resize((512, 512))


        img_np = np.array(image)
        #img_np = img_np[x - 256:y - 256, x + 256:y + 256]
        img_np =np.expand_dims(np.expand_dims(img_np, 2), 0)


        image = model.predict(img_np/255.0)
        imageshow = Image.fromarray(np.squeeze(np.squeeze(image, 3), 0) * 255)
        if (DEBUG):
            print(image)
            imageshow.show()
        image = np.squeeze(np.squeeze(image, 3), 0)

        image_cv = image
        poly_json, area = open_cv_processing(image_cv, DEBUG=DEBUG)
        if (DEBUG):
            print("polyjson", poly_json)

        return poly_json

    return 'No Image given!'


@app.route("/", methods=['GET'])
def home():
    return "Hello Test"


if __name__ == "__main__":
    load_model()
    app.run(host='0.0.0.0', debug=DEBUG)
