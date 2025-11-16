let container = document.querySelector(".container");
let box = document.querySelector(".box");
let scoreCount = document.querySelector(".score");
let restartBtn = document.querySelector(".restart");
const musicToggleBtn = document.querySelector(".music-toggle");
let timerElement = document.querySelector(".timer");
let bestTimeElement = document.querySelector(".best-time");


let images = [
  "./images/dambldor.jpg",  
  "./images/dobby.webp",
  "./images/drako.jpg",
  "./images/harry.jpg",
  "./images/hermione.jpg",
  "./images/jinny.jpg",
  "./images/ron.jpg",
  "./images/severus.jpg",
  "./images/dambldor.jpg",
  "./images/dobby.webp",
  "./images/drako.jpg",
  "./images/harry.jpg",
  "./images/hermione.jpg",
  "./images/jinny.jpg",
  "./images/ron.jpg",
  "./images/severus.jpg",
];



let colors = [];
let opened = [];
let score = 0;
let canClick = false;



function playSound(name) {
  const audio = new Audio(`./sound/${name}.mp3`);
  audio.volume = 0.4;
  audio.play();
}


function startTimer() {
  timerElement.textContent = "Time: 0s";
  time = 0;
  timerInterval = setInterval(() => {
    time++;
    timerElement.textContent = `Time: ${time}s`;
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

let bestTime = localStorage.getItem("memoryBestTime") || null;
if (bestTime) {
  bestTimeElement.textContent = `Best Time: ${bestTime}s`;
}

const backgroundMusic = new Audio("./sound/background.mp3");
backgroundMusic.loop = true; 
backgroundMusic.volume = 0.2; 
let musicPlaying = false; 

musicToggleBtn.addEventListener("click", () => {
  if (musicPlaying) {
    backgroundMusic.pause();
    musicPlaying = false;
    musicToggleBtn.textContent = "🎵";
  } else {
    backgroundMusic.play();
    musicPlaying = true;
    musicToggleBtn.textContent = "🔇";
  }
});


let getColor = function () {
  images.sort(() => Math.random() - 0.5);

  images.forEach((el) => {
    let div = document.createElement("div");
    div.className = "div";
    div.style.backgroundImage = "linear-gradient(145deg, #605144ff, #9e846dff)";

    let img = document.createElement("img");
    img.src = el;
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.display = "none";

    div.appendChild(img);
    box.append(div);
    colors.push(div);

    div.addEventListener("click", () => {
      if (!canClick || opened.includes(div) || div.classList.contains("matched")) return;

      img.style.display = "block";
      playSound("flip");

      opened.push(div);

      if (opened.length === 2) {
        canClick = false;

        let [first, second] = opened;
        let firstImg = first.querySelector("img");
        let secondImg = second.querySelector("img");

        if (firstImg.getAttribute("src") === secondImg.getAttribute("src")) {
          score++;
          scoreCount.textContent = "Score: " + score;
          playSound("match");


          first.classList.add("matched");
          second.classList.add("matched");

          opened = [];
          canClick = true;

          if (score === 8) {
            setTimeout(() => {
              playSound("win");
              alert("You won! Now you are officially a wizard...🧙‍♂️");

               if (!bestTime || time < bestTime) {
                bestTime = time; 
                localStorage.setItem("memoryBestTime", bestTime);
                bestTimeElement.textContent = `Best Time: ${bestTime}s`;
            }

              document.querySelector(".restart").style.display = "block";
            }, 300);
          }
        } else {
          setTimeout(() => {
            firstImg.style.display = "none";
            secondImg.style.display = "none";
            opened = [];
            canClick = true;
          }, 1500);
        }
      }
    });
  });

  canClick = false;

  colors.forEach(div => {
    let img = div.querySelector("img");
    img.style.display = "block";
  });

  setTimeout(() => {
    colors.forEach(div => {
      let img = div.querySelector("img");
      img.style.display = "none";
    });
    canClick = true;
    startTimer()
  }, 4000);
};

getColor();

let time = 0;
let timerInterval;


document.querySelector(".restart").addEventListener("click", () => {
  location.reload();
});