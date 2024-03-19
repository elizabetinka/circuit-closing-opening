let LText = document.getElementById("LID");
let LSlider = document.getElementById("LValue");
let L = 100;
let R = 100;
let e = 50;



let eText = document.getElementById("eID");
let eSlider = document.getElementById("eValue");
let RText = document.getElementById("omID");
let RSlider = document.getElementById("omValue");

const availableScreenWidth = window.screen.availWidth;
const availableScreenHeight = window.innerHeight;
console.log("Ширина", availableScreenWidth );
console.log("Длина", availableScreenHeight );

showMessage(L,e,R);

LSlider.addEventListener("input", function(ee){
    L = Number(LSlider.value);
    LText.innerHTML = "Индуктивность(Гн): " + L;
    showMessage(L,e,R);
});


eSlider.addEventListener("input", function(ee){
    e= Number(eSlider.value);
    eText.innerHTML = "ЭДС источника тока(В): " + e;
    showMessage(L,e,R);
});



RSlider.addEventListener("input", function(ee){
    R = Number(RSlider.value);
    RText.innerHTML = "Сопротивление контура(Ом): " + R;
    showMessage(L,e,R);
});


function showMessage(L,e,R) {
    let massx = [];
    let massy = [];
    let massy2 = [];
    I0 = e/R;
    rr = L/R;
    for (let i =0; i<10; i +=0.1){
        massx.push(i);
        let I_razmuk =  I0*Math.exp(-R/L*i);
        let I_zamuk =  I0*(1 - Math.exp(-i/rr));
        massy.push(I_razmuk);
        massy2.push(I_zamuk);
    }

    var result ={
        x: massx,
        y: massy,
        mode:'lines', line: {color: "#04BBEC"}
    };
    var result2 ={
        x: massx,
        y: massy2,
        mode: 'lines', line: {color: "#FF82F4"}
    };
    var baseLayout = {
        title: 'Зависимость тока от времени при размыкании цепи',
        autosize: true,
        height: 300,
        /*width: 1600,
        height: 300,*/
        xaxis: {
            title: 'сек',
            rangemode: 'tozero',
        },
        yaxis: {
            title: 'А',
        },
        margin: {
            l: 50,
            r: 20,
            b: 30,
            t: 50,
            pad: 0
          },
        font: {
            size: 9,
          }
    };
    var baseLayout2 = {
        title: 'Зависимость тока от времени при замыкании цепи',
        autosize: true,
        height: 300,
        /*width: 1600,
        height: 300,*/
        xaxis: {
            title: 'сек',
            rangemode: 'tozero',
        },
        yaxis: {
            title: 'А',
        },
        margin: {
            l: 50,
            r: 20,
            b: 30,
            t: 50,
            pad: 0
          },
        font: {
            size: 9,
          }
    };
    Plotly.react( 'tester', [result], baseLayout );
    Plotly.react( 'tester2', [result2], baseLayout2 );
}