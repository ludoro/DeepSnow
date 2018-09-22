import io
import numpy as np

import flask
# from model import *
from PIL import Image
from flask import Flask, render_template

# polygon rendering
from open_cv_processing import *

#from flask_restful import Resource, Api, reqparse, abort
#from opencv import open_cv_processing

app = Flask(__name__)


#def load_model():
#    # load the pre-trained Keras model (here we are using a model
#    # pre-trained on ImageNet and provided by Keras, but you can
#    # substitute in your own networks just as easily)
#    global model
#    model = unet()
#    model.load_weights("unet_membrane.hdf5")


@app.route("/api/prediction", methods=['POST'])
def image_prediction():

    if flask.request.files.get("image"):
        # read the image in PIL format
        image = flask.request.files["image"].read()
        image = Image.open(io.BytesIO(image))

        if image.mode != "L":
            image = image.convert("L")
        # resize the input image and preprocess it

        #image = image.resize((512,512))

        # preds = model.predict(image)

        # img = Image()
        # img.getdata(preds)
        #image.show()

        image_cv = np.array(image)
        poly_json, area = open_cv_processing(image_cv)
        #data["predictions"] = []

        return poly_json, str(area)

    return 'No Image given!'

@app.route("/", methods=['GET'])
def home():
    return render_template("index.html")



if __name__ == "__main__":
    # load_model()
    app.run(debug=True)
