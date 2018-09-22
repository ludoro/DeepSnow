import Augmentor

PAHT_TO_IMAGES="./images/src/"
PAHT_TO_GROUND_TRUTH="./images/src_truth/"
PATH_TO_STORE="/images/dst/"

IMG_SIZE = 120
PROBABILITY = 0.5
p = Augmentor.Pipeline(PAHT_TO_IMAGES)
#p.ground_truth(PAHT_TO_GROUND_TRUTH)
p.rotate(probability=1, max_left_rotation=5, max_right_rotation=5)
p.flip_left_right(probability=PROBABILITY)
p.crop_random(probability=1, percentage_area=PROBABILITY)
p.resize(probability=1.0, width=IMG_SIZE, height=IMG_SIZE)
p.flip_top_bottom(probability=PROBABILITY)
p.sample(50)

