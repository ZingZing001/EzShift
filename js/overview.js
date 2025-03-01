document.addEventListener("DOMContentLoaded", function () {
  let numberEle = document.getElementById('number');
  let counter = 0;
  numberEle.innerText = `${counter}%`;

  const circle2 = document.querySelector(".circle-2");
  

  const percentage = 50;
  let greenDashOffset = (450 - 450 * (percentage / 100) + 15 * (percentage / 100));
  let greyDashOffset = 450 * percentage / 100 + 15 * (1 - percentage / 100);
  let greyRotate = -90 + 360 * percentage / 100 + (2 - 4 * percentage / 100);

  
  circle2.setAttribute("transform", `rotate(${greyRotate})`);
  document.documentElement.style.setProperty('--greenDashOffset', greenDashOffset);
  document.documentElement.style.setProperty('--greyDashOffset', greyDashOffset);

  setInterval(() => {
    if (counter == percentage) {
      clearInterval;
    }else{
      counter++;
      numberEle.innerText = `${counter}%`;
    }
  }, 1000/percentage);
});