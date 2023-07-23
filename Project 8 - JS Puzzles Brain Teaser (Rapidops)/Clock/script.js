// Current Time
function currtime(){
    let today = new Date();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    document.getElementById('currtime').innerHTML = time;
}
setInterval(currtime,1000);

//Current Date
let today = new Date();
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let todayDate = today.getDate() + ' '+ monthNames[today.getMonth()]+ ' ' +today.getFullYear();
document.getElementById('currdate').innerHTML = todayDate;

//Stopwatch Timer
let [milliseconds,seconds,minutes,hours] = [0,0,0,0];
let timerReference = document.querySelector('.stopwatch-timer');
let intervalID;
// Setting a flag, so that we could handle n-clicks of a button
let timeflag = false;

function start(){
    timeflag = true;
    intervalID = setInterval(timer,10);
    document.getElementById("stopTimer").disabled = false;
    document.getElementById("resetTimer").disabled = false;
    document.getElementById("startTimer").disabled = true; 
}

// Stop or Pause
function stop(){
    timeflag = false;
    clearInterval(intervalID);
    document.getElementById("resumeTimer").disabled = false;

}

function resume(){
    timeflag = true;
    intervalID = setInterval(timer,10);
}

function reset(){
    timeflag = false;   
    clearInterval(intervalID);
    [milliseconds,seconds,minutes,hours] = [0,0,0,0];
    timerReference.innerHTML = '00 : 00 : 00 : 000';
    document.getElementById("startTimer").disabled = false;
    document.getElementById("stopTimer").disabled = true;
    document.getElementById("resumeTimer").disabled = true;
    document.getElementById("resetTimer").disabled = true;
}

function timer(){
    if(timeflag == true){
        milliseconds+=10;
        if(milliseconds == 1000){
            milliseconds = 0;
            seconds++;
            if(seconds == 60){
                seconds = 0;
                minutes++;
                if(minutes == 60){
                    minutes = 0;
                    hours++;
                }
            }
        }

        let h = hours < 10 ? "0" + hours : hours;
        let m = minutes < 10 ? "0" + minutes : minutes;
        let s = seconds < 10 ? "0" + seconds : seconds;
        let ms = milliseconds < 10 ? "00" + milliseconds : milliseconds < 100 ? "0" + milliseconds : milliseconds;
        timerReference.innerHTML = `${h} : ${m} : ${s} : ${ms}`;
    }
}