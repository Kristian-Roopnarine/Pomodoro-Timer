//global variable to hold

/*
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
    restart.addEventListener('click',function(){
      var d = setInterval(timeCtrl.countDown,1000);
      var c = setInterval(UICtrl.changeTime,1000);
      clearInterval(d);
      clearInterval(c);
      started=false;
      backToTimer;
    });

  }


  //pauses on click
  if(started){
    pause.addEventListener('click',freeze)
    started=false;
  }
  /*pause.addEventListener('click',function(){
    var d = setInterval(timeCtrl.countDown,1000);
    var c = setInterval(UICtrl.changeTime,1000);
    started=false;

    clearInterval(d);
    clearInterval(c);
  });*/
/*
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
*/

const timerStart = 1500;
var time= 1500;
var sessions = 3;
var sessionInput;
var initialTime;
var currentSession = 0;

var start = document.getElementById("start");
var pause = document.getElementById("pause");
var restart = document.getElementById("restart");
var sessionDisplay = document.getElementById("sessionDisplay");
var sessionBtn = document.getElementById("sessions");
var sessionInput = document.getElementById("sessionInput");
var clock = document.getElementById("clock");
var timer = document.getElementById("timer");
var timeBtn = document.getElementById("time");
var timeInput = document.getElementById("timeInput");
var d;
var c;
var onBreak = false;
var initialTime = 0;
var breakAudio = new Audio('rs-intro.mp3');
var workAudio = new Audio('work-audio.mp3');

//countdown
function countDown(){
  if(time > 0)
    time--;
    console.log(time);
    if (time == 0){
      if (currentSession == sessions){
        time = 1800;
        currentSession = 0;
        onBreak = true;
        breakAudio.play();
        setTimeout(function(){breakAudio.pause()},10000);
      } else if (onBreak){
        currentSession++;
        time = initialTime;
        onBreak = false;
        workAudio.play();
        setTimeout(function(){workAudio.pause()},10000);
      } else if (!onBreak){
        time = 65;
        onBreak = true;
        breakAudio.play();
        setTimeout(function(){breakAudio.pause()},10000);
      }
    }
}

//updates UI display for time and sessions
function changeTimeDisplay(){
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
}

//get input values

timeBtn.addEventListener('click',function(){
    if (parseInt(timeInput.value) > 0){
      time = parseInt(timeInput.value) * 60;
      initialTime = parseInt(timeInput.value) * 60;
      changeTimeDisplay();
    }
});



sessionBtn.addEventListener('click',function(){
    if (parseInt(sessionInput.value) > 0){
      sessions = parseInt(sessionInput.value);
      changeTimeDisplay();
    }
});


//start on click
start.addEventListener('click', function(){
  currentSession++;
  var d = setInterval(countDown,1000);
  var c = setInterval(changeTimeDisplay,1000);
  //pause if clicked
  pause.addEventListener('click', function(){
    clearInterval(d);
    clearInterval(c);
  });
  //restart on click
  restart.addEventListener('click', function(){
    time = timerStart;
    clearInterval(d);
    clearInterval(c);
    changeTimeDisplay();
  });
});
