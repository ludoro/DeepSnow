from model import *
from data import *
import numpy as np
#os.environ["CUDA_VISIBLE_DEVICES"] = "0"

model = unet()
model_checkpoint = ModelCheckpoint('unet_membrane.hdf5', monitor='loss',verbose=1, save_best_only=True)

def run_model(img):
    #img should  probably be 4d
    img = np.expand_dims(img, axis = 0)
    results = model.predict(img)
    return results
