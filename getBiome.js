const { stdout } = require('process');

process = require('process')

const cold_desert_slope = 1.3636;
const woodland_slope = 5.4545;
const seasonal_forest = 10.00;
const temparature_rain_forest = 14.5454;
const subtropical_desert = 4.6153;
const tropical_seasonal_forest = 5.00;
const tropical_rain_forest = 7.69;


function check_secondPhase(temperature, precipitation) {
    let a = precipitation / 22.00;
    if (a <= cold_desert_slope) return 2;
    else if (a > cold_desert_slope && a <= woodland_slope) return 3;
    else if (a > woodland_slope && a <= seasonal_forest) return 4;
    else if (a > seasonal_forest && a <= temparature_rain_forest) return 5;
    return 6;
}
function check_thirdPhase(temperature, precipitation) {
    let a = precipitation - temperature * (60.00 / 13.00);
    if (a < 61.538) return 7;
    else if (a >= 61.538 && a < 118.461) return 8;
    return 6;
}

function getColdLivingCategory(temperature,precipitation){
    return (precipitation<25) return 9;

}


function getBiome(temperature, precipitation) {

    if (temperature <= -2) return 1;
    if (temperature > -2.00 && temperature <= 7.00) return getColdLivingCategory(temperature,precipitation);
    else if (temperature > 7.00 && temperature < 18.00) return check_secondPhase(temperature, precipitation);
    else if (temperature >= 18.00 && temperature < 33.00) return check_thirdPhase(temperature, precipitation);
    return 8;

}


a = []

for (p = 0; p < 450; p++) {
    tA = [];
    for (t = -10; t < 45; t++) {
        tA.push(getBiome(t, p));
    }
    process.stdout.write(JSON.stringify(tA));
    process.stdout.write("\n");

}

//console.dir(a, {'maxArrayLength': null});
//process.stdout.write(JSON.stringify(a))