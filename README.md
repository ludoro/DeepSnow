![Screenshot](logo.png)

## 1. Intro

DeepSnow is the winning project for the challenge provided by TechnoAlpin for the
Hackaton [Hack the alps](https://www.hackthealps.it). We were asked to detect a
ski slope by analyzing a satellite image.

## 2. Solution
We gathered data from various sources, such as: NASA, OpenStreetMaps, OpenSnowMap,
OpenData. Then, we used a deep learning framework called U-net, using Keras.
After that, we used opencv to create a polygon to calculate the area of the slope.
We created a simple web-page using React as front-end, where the user can click
on what he thinks is a slope: the screenshot of the surrounding area is sent to
the back-end (made with Flask) to be analyzed. The output is visible on the map,
with the polygon being drawn in the area that was screenshotted. Below you can
see an example of the process:
![Data](Data_pipeline.png)

## 3. Technology used
Keras, Opencv, React and Flask.

## 4. Installation
The project consists of a backend (wepapp in Python) and frontend (ReactJS). You can run the application either the 
Docker way or run it directly via a conda and node.
 
### 4.1 Docker installation
You need to have docker installed on your system. Take a look [here](https://docs.docker.com/install/), for the official 
installation instructions for docker CE. 

Docker provides the advantage of encapsulating dependencies and version incopabilities
 between application and local host.   

To start the application run the follwoing command from terminal inside the `docker` folder

```
docker-compose build && docker-compose up
```

Then open your browser on `http://localhost`. 

### 4.2 Directly installation 
These Following steps were tested on a Ubuntu 18.04 installation.

#### Backend

The Python backend has a lot of dependencies. A conda environment can be easily setup by using the provided environment file. Install Anaconda [Anaconda](https://conda.io/docs/user-guide/install/download.html) if not installed yet.

* In a Bash terminal, navigate to the webapp subdirectory
* Create a conda environment using the provided `deepsnow_backend.yml` file

```
conda env create -f deepsnow_backend.yml
```
* Activate the conda environment (in Bash terminal `source activate deepsnow`)
* Run the python backend: `KERAS_BACKEND=tensorflow CUDA_VISIBLE_DEVICES="" python app.py`
* Ignore the warnings about the deprecated merge function. The python backend should run now, as can be verified by looking for `* Running on http://localhost:5000/ `in the logs. The port should be 5000, in case it is not, remember that for later.

#### Frontend
The frontend requires NodeJS and the NPM package manager. 
* Install both ( in Bash: `sudo apt update`,then `sudo apt install nodejs`, then `sudo apt install npm`)
* Navigate to the frontend folder in a bash terminal
* Initialize NPM by executing `npm install`
* Start NPM: `npm start`
* The frontend should now be runnning, probably indicating `Compiled with warnings` in the terminal. 

#### Running the app
TODO


## 6. Credits

[@ludoro](https://github.com/ludoro), [@niklaskappler](https://github.com/niklaskappler), [@thomasverelst](https://github.com/thomasverelst), [@agemcipe](https://github.com/agemcipe),

