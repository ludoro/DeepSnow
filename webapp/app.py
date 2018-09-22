import flask
from flask import Flask, render_template, request
from model import *
from PIL import Image
import io

#from flask_restful import Resource, Api, reqparse, abort
#from opencv import open_cv_processing

from keras.preprocessing.image import img_to_array
from keras.applications import imagenet_utils
app = Flask(__name__)

#api = Api(app)
# api.add_resource(ProcessImage, '/process_image')
# class ProcessImage(Resource):
#     def get(self):
#         return None
#     def post(self):
#         args = parser.parse_args()
#         image = args["image"]
#         binary_image_output = run_model(image)
#         open_cv_processing(binary_image_output)
#         return image_with_contour.jpg



def load_model():
    # load the pre-trained Keras model (here we are using a model
    # pre-trained on ImageNet and provided by Keras, but you can
    # substitute in your own networks just as easily)
    global model
    model = unet()
    model.load_weights("unet_membrane.hdf5")


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

        preds = model.predict(image)

        img = Image()
        img.getdata(preds)
        img.show()
        #data["predictions"] = []


    return

@app.route("/", methods=['GET'])
def home():
    return render_template("index.html")



if __name__ == "__main__":
    load_model()
    app.run(debug=True)
