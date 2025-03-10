document.addEventListener("DOMContentLoaded", function () {
  loadProgressBar();
});

let weekHour = 60;
let weekWorkedHour = 30;

let totalHour = 60;
let totalWorkedHour = 30;

const timeText = document.querySelectorAll('.time-text');
const timeTextList = document.querySelectorAll('.time-text-list');
const hourTextList = document.querySelectorAll('.hour-text-list');
let isWeek = true
let isAnimating = false;
let lastTimeOut;

  timeTextList.forEach((list) => {
    list.addEventListener('mouseenter', () => {
      if (isAnimating) {
        return;
      }
      isAnimating = true;
      if (isWeek) {
        clearTimeout(lastTimeOut);
        list.style.animation = 'slide-up 0.2s linear';
        lastTimeOut = setTimeout(() => {
          list.style.transform = 'translateY(-100%)';
        }, 200);
      } else {
        clearTimeout(lastTimeOut);
        list.style.animation = 'slide-down 0.2s linear';
        lastTimeOut = setTimeout(() => {
          list.style.transform = 'translateY(0%)';
        }, 200);
      }
    });

    list.addEventListener('mouseleave', () => {
      isAnimating = false;

      if (isWeek) {
        clearTimeout(lastTimeOut);
        list.style.animation = 'slide-down 0.2s linear';
        lastTimeOut = setTimeout(() => {
          list.style.transform = 'translateY(0%)';
        }, 200);
      } else {
        clearTimeout(lastTimeOut);
        list.style.animation = 'slide-up 0.2s linear';
        lastTimeOut = setTimeout(() => {
          list.style.transform = 'translateY(-100%)';
        }, 200);
      }
    });
  });

  timeText.forEach((text) => {
    text.addEventListener('click', () => {
      if (isWeek) {
        timeTextList.forEach((list) => {
          list.style.transform = 'translateY(-100%)';
        });
        animateHourText();
        loadProgressBar();
        isWeek = false;
      } else {
        timeTextList.forEach((list) => {
          list.style.transform = 'translateY(0%)';
        });
        animateHourText();
        loadProgressBar();
        isWeek = true;
      }
    }
    );
  }
  );

function animateHourText() {
  hourTextList.forEach((list) => {

    if (isWeek) {
      list.style.animation = 'slide-up 0.2s linear';
      setTimeout(() => {
        list.style.transform = 'translateY(-100%)';
      }, 200);
    } else {
      list.style.animation = 'slide-down 0.2s linear';
      setTimeout(() => {
        list.style.transform = 'translateY(0%)';
      }, 200);
    }
  });
}

function loadProgressBar() {
  let numberEle = document.getElementById('number');
  let counter = 0;
  numberEle.innerText = `${counter}%`;

  const circle1 = document.querySelector(".circle-1");
  const circle2 = document.querySelector(".circle-2");
  

  const percentage = Math.ceil(weekWorkedHour/ weekHour * 100);
  let greenDashOffset = (450 - 450 * (percentage / 100) + 15 * (percentage / 100));
  let greyDashOffset = 450 * percentage / 100 + 15 * (1 - percentage / 100);
  let greyRotate = -90 + 360 * percentage / 100 + (2 - 4 * percentage / 100);

  
  circle2.setAttribute("transform", `rotate(${greyRotate})`);
  document.documentElement.style.setProperty('--greenDashOffset', greenDashOffset);
  document.documentElement.style.setProperty('--greyDashOffset', greyDashOffset);

  circle1.style.animation = 'none';
  circle2.style.animation = 'none';

  setTimeout(() => {
    circle1.style.animation = 'anim 1s linear forwards';
    circle2.style.animation = 'anim2 1s linear forwards';
  }, 50);

  let myIntervalId = setInterval(() => {
    if (counter == percentage) {
      clearInterval(myIntervalId);
    }else{
      counter++;
      numberEle.innerText = `${counter}%`;
    }
  }, 1000/percentage);
}