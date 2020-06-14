// clock

clock();

function clock () {
    var d = new Date();

    updateDigitalClock(d);

    var delay = 1000 - new Date().getMilliseconds();
    setTimeout(clock, delay);
}

function updateDigitalClock (d) {
    var hh = d.getHours();
    var mm = d.getMinutes();
    var ss = d.getSeconds();

    if(hh < 10) { hh = "0" + hh; }
    if(mm < 10) { mm = "0" + mm; }
    if(ss < 10) { ss = "0" + ss; }

    var text = hh + ':' + mm + ':' + ss
    document.getElementById("clock").innerHTML = text;
}