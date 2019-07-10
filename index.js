//global variable to hold
const timerStart = 1500;
var time= 1500;
var sessions = -1;

var timeData = (function(){
  return {
    countDown:function(){
      if (time > 0){
        time--;
        console.log(time);
        time;
      }
    }
  }
})();

var UIController = (function(){
  var clock = document.getElementById("clock");
  var sessionDisplay = document.getElementById("sessionDisplay");
  // Insert new time into HTML to show
  return {
    changeTime:function(){
      var timeMinutes = Math.floor(time/60); //
      if (timeMinutes === 0){
        timeMinutes = '00';
      } else if (timeMinutes < 10){
        timeMinutes = '0' + timeMinutes;
      }

      var timeSeconds = time % 60;
      //if divisible by 60
      if (timeSeconds === 0 ){
        timeSeconds = '00';
      } else if (timeSeconds < 10){
        timeSeconds = '0'+ timeSeconds;
      }
      var newTime = `${timeMinutes}:${timeSeconds}`; //displays time as (Minutes:Seconds)
      clock.innerHTML = newTime;
    },
    changeSessions:function(){
      sessionDisplay.innerHTML = `Sessions: ${sessions}`;
    }
  }
})();

var controller = (function(timeCtrl,UICtrl){
  var start = document.getElementById("start");
  var restart = document.getElementById("restart");
  var pause = document.getElementById("pause");
  var customTime= document.getElementById("time");
  var customSessions = document.getElementById("sessions");

  //countdown and update HTML at same pace in seconds;
  var countdown = function(){
    setInterval(timeCtrl.countDown,1000);
    setInterval(UICtrl.changeTime,1000);
  }

  // pauses timer
  var pause = function(){}

  //resets HTML timer
  var backToTimer = function(){
    time = timerStart;
    UICtrl.changeTime();
  }

  //start timer on press start
  start.addEventListener("click",countdown);

  //restarts timer on click
  restart.addEventListener('click', backToTimer);

  //sets custom time
  customTime.addEventListener('click',function(){
    time = parseInt(timeInput.value) * 60;
    UICtrl.changeTime();
  })

  //sets custom sessions
  customSessions.addEventListener('click',function(){
    sessions = parseInt(sessionInput.value);
    UICtrl.changeSessions();
  })
})(timeData,UIController);
