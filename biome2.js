
class vec2 {

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    remove(vector){
        return new vec2((this.x - vector.x), (this.y - vector.y) );
    }
}

class Tetragon {
    constructor(a, b, c, d) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
    }
}


class Triangle {
    constructor(a, b, c) {
        this.a = a;
        this.b = b;
        this.c = c;
    }
}


const temperateSeasonalForest = new Tetragon(
    new vec2(6.0, 50.0),
    new vec2(7.0, 180.0),
    new vec2(22.0, 230.0),
    new vec2(21.0, 120.0)
);
const woodland = new Triangle(
    new vec2(-3.0, 0.0),
    new vec2(21.0, 120.0),
    new vec2(20.5, 50.0)
);

const grassland = new Triangle(
    new vec2(-3.0, 0.0),
    new vec2(20.5, 50.0),
    new vec2(22.0, 50.0)
);

const subtropicalDesert = new Tetragon(
    new vec2(20.5, 50.0),
    new vec2(35.0, 100.0),
    new vec2(35.0, 0.0),
    new vec2(22.0, 50.0)

);

const savanna = new Tetragon(
    new vec2(20.5, 50.0),
    new vec2(22.0, 230.0),
    new vec2(33.0, 290.0),
    new vec2(35.0, 100.0)
);


const tropicalRainForest = new Tetragon(
    new vec2(22.0, 230.0),
    new vec2(22.5, 450.0),
    new vec2(33.0, 450.0),
    new vec2(35.0, 290.0)
);

const temperateRainForest = new Tetragon(
    new vec2(7.0, 180.0),
    new vec2(10.0, 300.0),
    new vec2(22.5, 350.0),
    new vec2(22.0, 230.0)

);

const borealForest = new Tetragon(
    new vec2(-.5, 20.0),
    new vec2(1.5, 300.0),
    new vec2(10.0, 300.0),
    new vec2(6.0, 50.0)

);



function d2Cross(a, b){
    return a.x * b.y - b.x * a.y;
}



function sameSide(p1, p2, a, b){
    cp1 = d2Cross(b.remove(a) , p1.remove(a));                 //cp1 = d2Cross(b - a, p1 - a);
    cp2 = d2Cross(b.remove(a) , p2.remove(a));                     //cp2 = d2Cross(b - a, p2 - a);
    return cp1 * cp2 >= 0.0;
}


function pointInsideOfTriangle(point, t){
    return sameSide(point, t.a, t.b, t.c) && sameSide(point, t.b, t.a, t.c) && sameSide(point, t.c, t.a, t.b);
}

function pointInsideOfTetragon(point, r){
    return pointInsideOfTriangle(point, new Triangle(r.a, r.b, r.c)) || pointInsideOfTriangle(point, new Triangle(r.a, r.c, r.d));
}





function getBiome(temperature, precipitation) {
    point = new vec2(temperature, precipitation);
    if (temperature <= -2.0) return 1;
    if (pointInsideOfTriangle(point, grassland)) return 2;
    if (pointInsideOfTriangle(point, woodland)) return 3;
    if (pointInsideOfTetragon(point, temperateSeasonalForest)) return 4;
    if (pointInsideOfTetragon(point, temperateRainForest)) return 5;
    if (pointInsideOfTetragon(point, tropicalRainForest)) return 6;
    if (pointInsideOfTetragon(point, savanna)) return 7;
    if (pointInsideOfTetragon(point, subtropicalDesert)) return 8;
    if (pointInsideOfTetragon(point, borealForest)) return 9;
    return 0;
}





for (p = 0; p < 450; p++) {
    tA = [];
    for (t = -10; t < 45; t++) {
        tA.push(getBiome(t, p));
    }
    process.stdout.write(JSON.stringify(tA));
    process.stdout.write("\n");

}

 //console.log(getBiome(2,100))

// console.log(pointInsideOfTetragon(new vec2(2,10),borealForest))
// console.log(pointInsideOfTetragon(new vec2(15,2.5),new Tetragon(new vec2(0,0), new vec2(5,5) ,new vec2(10,0), new vec2(-5,5)) ))







