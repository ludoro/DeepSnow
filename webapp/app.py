import io
import numpy as np

import flask
# from model import *
from PIL import Image
from flask import Flask, render_template
from flask_cors import CORS
# polygon rendering
from open_cv_processing import *
from flask import request
#from flask_restful import Resource, Api, reqparse, abort
#from opencv import open_cv_processing

app = Flask(__name__)
CORS(app)

#def load_model():
#    # load the pre-trained Keras model (here we are using a model
#    # pre-trained on ImageNet and provided by Keras, but you can
#    # substitute in your own networks just as easily)
#    global model
#    model = unet()
#    model.load_weights("unet_membrane.hdf5")



import base64
@app.route("/prediction", methods=['POST'])
def image_prediction():
    x = request.form["x"]
    y = request.form["y"]
    print("x,y",x,y)
    
    print(request)
    if request.form["img"]:
        # read the image in PIL format
        # print(request.form["img"][0:1000])
        # imgdata = decode_base64(request.form["img"])
        # iout = io.BytesIO(imgdata)
        # iout.seek(0)
        # image = Image.open(iout)
        print(request.form["img"][0:100])
        image_data = request.form["img"].replace('data:image/png;base64,','').replace(' ','+')
        # #print("image data,",image_data[0:100])
        # datta = base64.b64decode(image_data.split(",")[1])
        # print('datta', datta)
        iout = io.BytesIO(base64.b64decode(image_data))
        # #iout.seek(0)
        # #ImageFile.LOAD_TRUNCATED_IMAGES = True
        image = Image.open(iout)

        image.save('test.png')

        #image = Image.open(io.BytesIO(image))

        if image.mode != "L":
            image = image.convert("L")
        # resize the input image and preprocess it

        #image = image.resize((512,512))

        # preds = model.predict(image)

        # img = Image()
        # img.getdata(preds)
        #image.show()

        print("got image, processing")

        image_cv = np.array(image)
        poly_json, area = open_cv_processing(image_cv)

        #data["predictions"] = []
        print("polyjson", poly_json)

        return poly_json

    return 'No Image given!'

@app.route("/", methods=['GET'])
def home():
    return render_template("index.html")



if __name__ == "__main__":
    # load_model()
    app.run(debug=True)
