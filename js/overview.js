let numberEle = document.getElementById('number');
let counter = 0;

setInterval(() => {
  if (counter == 50) {
    clearInterval;
  }else{
    counter++;
    numberEle.innerText = `${counter}%`;
  }
}, 2000/50);