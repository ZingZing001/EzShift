document.addEventListener("DOMContentLoaded", function () {
  loadProgressBar();
});

let totalHour = 60;
let workedHour = 30;

const timeText = document.querySelectorAll('.time-text');
const timeTextList = document.querySelector('.time-text-list');
let isWeek = true
let isAnimating = false;
let lastTimeOut;

// timeText.forEach((text) => {
  timeTextList.addEventListener('mouseenter', () => {
    if (isAnimating) {
      return;
    }
    isAnimating = true;
    if (isWeek) {
      clearTimeout(lastTimeOut);
      timeTextList.style.animation = 'slide-up 0.2s linear';
      lastTimeOut = setTimeout(() => {
        timeTextList.style.transform = 'translateY(-100%)';
      }, 200);
      // totalHour = 100;
      // workedHour = 60;
      // loadProgressBar();
      // isWeek = false;
    } else {
      clearTimeout(lastTimeOut);
      timeTextList.style.animation = 'slide-down 0.2s linear';
      lastTimeOut = setTimeout(() => {
        timeTextList.style.transform = 'translateY(0%)';
      }, 200);
      // totalHour = 60;
      // workedHour = 30;
      // loadProgressBar();
      // isWeek = true;
    }
  });

  timeTextList.addEventListener('mouseleave', () => {
    // if (isAnimating) {
    //   return;
    // }
    isAnimating = false;

    if (isWeek) {
      clearTimeout(lastTimeOut);
      timeTextList.style.animation = 'slide-down 0.2s linear';
      lastTimeOut = setTimeout(() => {
        timeTextList.style.transform = 'translateY(0%)';
      }, 200);
      // totalHour = 100;
      // workedHour = 60;
      // loadProgressBar();
      // isWeek = false;
    } else {
      clearTimeout(lastTimeOut);
      timeTextList.style.animation = 'slide-up 0.2s linear';
      lastTimeOut = setTimeout(() => {
        timeTextList.style.transform = 'translateY(-100%)';
      }, 200);
      // totalHour = 60;
      // workedHour = 30;
      // loadProgressBar();
      // isWeek = true;
    }
  });

  // timeTextList.addEventListener('animationend', () => {
  //   isAnimating = false;
  // });
// }
// );

function loadProgressBar() {
  let numberEle = document.getElementById('number');
  let counter = 0;
  numberEle.innerText = `${counter}%`;

  const circle1 = document.querySelector(".circle-1");
  const circle2 = document.querySelector(".circle-2");
  

  const percentage = Math.ceil(workedHour / totalHour * 100);
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