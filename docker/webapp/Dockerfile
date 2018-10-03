FROM python:3.6-stretch
MAINTAINER  Niklas Kappler "mail@niklas-kapler.de"

ADD ./webapp/src /application
ADD ./webapp/model /model


WORKDIR /application
RUN pip install -r requirements.txt

#ENTRYPOINT ["tail", "-f", "/dev/null"]

ENTRYPOINT ["python"]
CMD ["app.py"]