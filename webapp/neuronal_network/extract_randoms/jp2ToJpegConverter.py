import pgmagick

img = pgmagick.Image('~/Downloads/TPP1601010885/IMG_PHR1A_PMS-N_001/IMG_PHR1A_PMS-N_201507111017491_ORT_3294075101-001_R1C1.JP2') # Input Image
img.resize('100x100')
img.write('./CB_TM432.jpeg')
