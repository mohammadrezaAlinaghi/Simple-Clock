// Main containers
const clockElem     = document.getElementById('clock'),
      digitalElem   = document.getElementById('digital'),
      walledElem    = document.getElementById('walled');
// Digital Clock inner elements
const digHourElem   = digitalElem.querySelector('#hour'),
      digMinElem    = digitalElem.querySelector('#min'),
      digSecondElem = digitalElem.querySelector('#second');
// Walled Clock inner elements
const walHourElem   = walledElem.querySelector('#w-hour'),
      walMinElem    = walledElem.querySelector('#w-min'),
      walSecondElem = walledElem.querySelector('#w-second');

// Run DigitalClock
( function () {
    let digitalTimer = {
        init: function(){
            this.clocker();
            this.timeInterval = this.runInterval(); 
        },
        runInterval: function(){
             return setInterval(this.clocker, 1000);
        },
        clocker: function () {
            let dateTime = new Date(),
                hours    = dateTime.getHours(),
                mins     = dateTime.getMinutes(),
                seconds  = dateTime.getSeconds();
            digHourElem.innerHTML   = (hours+'').padStart(2,0);
            digMinElem.innerHTML    = (mins+'').padStart(2,0);
            digSecondElem.innerHTML = (seconds+'').padStart(2,0);
        },
    }
    digitalTimer.init();
})();

// Run WalledClock
( function () {
    let walledTimer = {
        init: function(){
            this.clocker();
            this.timeInterval = this.runInterval(); 
        },
        runInterval: function(){
             return setInterval(this.clocker, 1000);
        },
        clocker: function () {
            let dateTime = new Date(),
                hours    = dateTime.getHours(),
                mins     = dateTime.getMinutes(),
                seconds  = dateTime.getSeconds();
            let sec_degree  = -90 + seconds * 6;
            let min_degree  = -90 + mins * (360 / 60);
            let hour_degree = -90 + hours * (360 / 12);
                hour_degree = hour_degree + 0.5 * mins;
            walHourElem.style.transform   = "rotate(" + hour_degree + "deg)";
            walMinElem.style.transform    = "rotate(" + min_degree + "deg)";
            walSecondElem.style.transform = "rotate(" + sec_degree + "deg)";
        },
    }
    walledTimer.init();
})();