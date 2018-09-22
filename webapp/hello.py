from flask import Flask, render_template
from flask_restful import Resource, Api, reqparse, abort
from opencv import open_cv_processing
from neuronal_network.unet import evaluate
app = Flask(__name__)
api = Api(app)

api.add_resource(ProcessImage, '/process_image')
class ProcessImage(Resource):
    def get(self):
        return None
    def post(self):
        args = parser.parse_args()
        image = args["image"]
        binary_image_output = run_model(image)


@app.route("/")
def home():
    return render_template("welcome.html")

if __name__ == "__main__":
    app.run(debug=True)
