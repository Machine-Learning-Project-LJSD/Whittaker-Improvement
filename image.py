from PIL import Image, ImageEnhance
import math

inPng = "edi.png"
outPng = "edi2.png"

im = Image.open(inPng)
px = im.load()
#
# enhancer = ImageEnhance.Sharpness(im)
#
# factor = 5
#
# newImage = enhancer.enhance(factor)
#
# newImage.save("sharpened.png")
a = {}

expectedC = {}
expectedC['(147, 167, 172, 255)'] = 1  # Tundra
expectedC['(146, 126, 47, 255)'] = 2  # Grassland
expectedC['(179, 124, 6, 255)'] = 3  # WoodLand
expectedC['(44, 137, 160, 255)'] = 4  # Seasoal
expectedC['(10, 84, 109, 255)'] = 5  # Temperate Rainforest
expectedC['(7, 83, 48, 255)'] = 6  # Tropical Rainforest
expectedC['(151, 165, 39, 255)'] = 7  # Savannah
expectedC['(200, 113, 55, 255)'] = 8  # Subtropical Desert
expectedC['(91, 143, 82, 255)'] = 9  # Boreal Forest
expectedC['(0, 0, 0, 255)'] = 0  # Undefined


def tupleDistace(source, target):
    x = (source[0] - target[0]) ** 2
    y = (source[1] - target[1]) ** 2
    z = (source[2] - target[2]) ** 2
    w = (source[3] - target[3]) ** 2

    return (x + y + z + w)


def bestDistance(target):
    distance = math.inf
    best_tuple = ''

    for str_tuple in expectedC:
        source = eval(str_tuple)
        temp_distance = tupleDistace(source, target)
        if temp_distance < distance:
            distance = temp_distance
            best_tuple = source

    return best_tuple


def redefine(px, x, y):
    try:
        expectedC[px[x, y]] != 1
    except:
        px[x, y] = bestDistance(px[x, y])
        # print(px[x, y])


for x in range(0, 400):
    for y in range(0, 450):
        try:
            a[str(px[x, y])] != 1
        except KeyError:
            a[str(px[x, y])] = 1
            # print(x, y, px[x, y], "REDEFINING")
            redefine(px, x, y)

im.save(outPng)

for x in range(0, 400):
    for y in range(0, 450):
        tuple = px[x, y]
        try:
            biome = expectedC[str(tuple)]
        except KeyError:
            biome = expectedC[str(bestDistance(tuple))]

    # print("[", x, ", ", y, ", ", biome, "]")
