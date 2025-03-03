document.addEventListener("DOMContentLoaded", function () {
  loadProgressBar();
});

let totalHour = 60;
let workedHour = 30;

const timeText = document.querySelector('.time-text');
let isWeek = true

timeText.addEventListener('click', () => {
  if (isWeek) {
    timeText.style.animation = 'toTotal 1s linear';
    setTimeout(() => {
      timeText.innerText = 'in total';
    }, 500);
    totalHour = 100;
    workedHour = 60;
    loadProgressBar();
    isWeek = false;
  } else {
    timeText.style.animation = 'toWeek 1s linear';
    setTimeout(() => {
      timeText.innerText = 'this week';
    }, 500);
    totalHour = 60;
    workedHour = 30;
    loadProgressBar();
    isWeek = true;
  }
}
);

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