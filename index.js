//global variable to hold
const timerStart = 1500;
var time= 1500;
var sessions;
var currentSession = 1;
var wasOnBreak = false;
var isWorking = true;
var initialTime;
var started = false;

var timeData = (function(){

  var working = function(){
    isWorking = true;
  }

  return {
    countDown:function(){
      if (time > 0)
        time--;
        console.log(time);
        if (time == 0){
          if (currentSession != sessions && isWorking){
            currentSession ++;
            time=65;
            console.log('Your break has started');
            isWorking=false;
          } else if (currentSession == sessions) {
            time = 1800;
          } else {
            console.log('else')
            time = initialTime;
            setTimeout(working,2000);

          }
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
      sessionDisplay.innerHTML = `Sessions: ${currentSession}/${sessions}`;
    },
    changeSessions:function(){
      sessionDisplay.innerHTML = `Sessions: ${currentSession}/${sessions}`;
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
  var freeze = function(){
    clearInterval(countdown);
  };

  //resets HTML timer
  var backToTimer = function(){
    time = timerStart;
    UICtrl.changeTime();
  }

  //start timer on press start

  //start.addEventListener("click",function(){
  if(!started){
      start.addEventListener('click',countdown);
      started=true;
    }


  //restarts timer on click
  if(started){
    restart.addEventListener('click',backToTimer);
    var d = setInterval(timeCtrl.countDown,1000);
    var c = setInterval(UICtrl.changeTime,1000);
    clearInterval(d);
    clearInterval(c);
    started=false;
  }


  //pauses on click
  if(started){
    pause.addEventListener('click',countdown)
    started=false;
  }
  /*pause.addEventListener('click',function(){
    var d = setInterval(timeCtrl.countDown,1000);
    var c = setInterval(UICtrl.changeTime,1000);
    started=false;

    clearInterval(d);
    clearInterval(c);
  });*/

  //sets custom time
  customTime.addEventListener('click',function(){
    time = parseInt(timeInput.value) * 60;
    initialTime = parseInt(timeInput.value) * 60;
    UICtrl.changeTime();
  })

  //sets custom sessions
  customSessions.addEventListener('click',function(){
    sessions = parseInt(sessionInput.value);
    UICtrl.changeSessions();
  })

})(timeData,UIController);
