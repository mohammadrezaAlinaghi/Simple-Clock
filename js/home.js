const mainElem  = document.getElementsByTagName('main')[0],
      chElem    = document.getElementById('chronometer'),
      clockElem = document.getElementById('clock');

chElem.addEventListener('click',function(){
    let fMargin = mainElem.style.marginLeft.replace('%','');
    mainDragAnimation(fMargin,50);
});
clockElem.addEventListener('click',function(){
    let fMargin = mainElem.style.marginLeft.replace('%','');
    mainDragAnimation(fMargin,0);

});

function mainDragAnimation(fMargin, eMargin){
    if(eMargin == fMargin){
        return false;
    }
    let myInterval = setInterval(callAnimate,1);
    function callAnimate(){
        if(fMargin < eMargin){
            fMargin++;
        } else{
            fMargin--;
        }
        mainElem.style.marginLeft = fMargin +'%';
        if(eMargin == fMargin){
            clearInterval(myInterval);
        }
    }
}
// Clock
( function (){
    // Main containers
    const digitalElem = document.getElementById('digital'),
          walledElem  = document.getElementById('walled');
    // Digital Clock inner elements
    const digHourElem   = digitalElem.querySelector('#hour'),
          digMinElem    = digitalElem.querySelector('#min'),
          digSecondElem = digitalElem.querySelector('#second');
    // Walled Clock inner elements
    const walHourElem   = walledElem.querySelector('#w-hour'),
          walMinElem    = walledElem.querySelector('#w-min'),
          walSecondElem = walledElem.querySelector('#w-second');

    
    // Run Clock
    let Timer = {
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

            let sec_degree  = -90 + seconds * 6;
            let min_degree  = -90 + mins * (360 / 60);
            let hour_degree = -90 + hours * (360 / 12);
                hour_degree = hour_degree + 0.5 * mins;
            walHourElem.style.transform   = "rotate(" + hour_degree + "deg)";
            walMinElem.style.transform    = "rotate(" + min_degree + "deg)";
            walSecondElem.style.transform = "rotate(" + sec_degree + "deg)";
        },
    }
    Timer.init();
})();

// chronometer
( function (){
    // Main containers
    const chElem        = document.getElementById('chronometer'),
          chDigitalElem = document.getElementById('ch-digital'),
          chWalledElem  = document.getElementById('ch-walled');
    // Digital Clock inner elements
    const digMiliElem   = chDigitalElem.querySelector('#ch-milisecond'),
          digMinElem    = chDigitalElem.querySelector('#ch-min'),
          digSecondElem = chDigitalElem.querySelector('#ch-second');
    // Walled Clock inner elements
    const walMiliElem   = chWalledElem.querySelector('#ch-w-milisec'),
          walMinElem    = chWalledElem.querySelector('#ch-w-ms-min'),
          walSecondElem = chWalledElem.querySelector('#ch-w-ms-second');

    // Run DigitalClock
    let ChTimer = {
        init: function(){
            this.refreshSetUp();
            chElem.addEventListener('click', function(e){
                e.preventDefault();
                ChTimer.refreshSetUp(); 
            });
            chElem.addEventListener('contextmenu', function(e){
                e.preventDefault();
            });
            chElem.addEventListener('auxclick',this.timerToggle);
        },
        refreshSetUp: function(){
            this.milisec = 0;
            this.mins    = 0;
            this.seconds = 0;
            this.clocker();
            this.milisec = 0;
            this.mins    = 0;
            this.seconds = 0;
        },
        run: function(){
            this.timeInterval = this.runInterval(); 
        },
        runInterval: function(){
                return setInterval(this.clocker, 10);
        },
        killInterval: function(){
            clearInterval(this.timeInterval);
            this.timeInterval = undefined;
        },
        clocker: function () {
            digMiliElem.innerHTML   = (ChTimer.milisec+'').padStart(2,0);
            digMinElem.innerHTML    = (ChTimer.mins+'').padStart(2,0);
            digSecondElem.innerHTML = (ChTimer.seconds+'').padStart(2,0);

            let sec_degree  = -90 + ChTimer.seconds * 6;
            let min_degree  = -90 + ChTimer.mins * (360 / 60);
            let milisec_degree = -90 + ChTimer.milisec * (360 / 100);
            walMiliElem.style.transform   = "rotate(" + milisec_degree + "deg)";
            walMinElem.style.transform    = "rotate(" + min_degree + "deg)";
            walSecondElem.style.transform = "rotate(" + sec_degree + "deg)";
            ChTimer.milisec++;
            if(ChTimer.milisec >= 99){
                ChTimer.milisec = 0;
                ChTimer.seconds++;
            }
            if(ChTimer.seconds >= 59){
                ChTimer.seconds = 0;
                ChTimer.mins++;
            }
        },
        timerToggle: function(){
            if(ChTimer.timeInterval){
                ChTimer.killInterval();
            } else {
                ChTimer.run();
            }
        }
    }
    ChTimer.init();
})();
