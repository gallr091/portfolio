window.addEventListener("load", function() {
	const words = [
	"I like boba",
	"I have 2 cats (Polly + Sprig)",
	"I'm from the Philippines",
	"I love playing video games",
	"I prefer my eggs runny :)", 
	"I'm a D&D fan",
	"My star sign is Pisces ♓︎",
	"I'm obsessed with Cinnamoroll",
];

const colors = ['#d81159', '#8f2d56', '#218380', '#2274a5', '#7209b7', '#FA6385', '#e74c3c'];

let index = 0;
const changingWord = document.getElementById("changingphrase");

function changeWord() {
    changingWord.classList.add("fade-out"); 

    setTimeout(() => {
        index = (index + 1) % words.length;
        let newWord = words[index].split(''); 
        let spanElements = changingWord.querySelectorAll(".effect--span");

        let newColor = colors[index % colors.length];
        changingWord.style.color = newColor;

        spanElements.forEach((span, i) => {
            if (newWord[i]) {
                span.textContent = newWord[i]; 
            } else {
                span.textContent = '';
            }
        });

        for (let i = spanElements.length; i < newWord.length; i++) {
            let newSpan = document.createElement("span");
            newSpan.className = "effect--span";
            newSpan.textContent = newWord[i];
            changingWord.appendChild(newSpan);
        }

        changingWord.classList.remove("fade-out"); 
    }, 500); 
}

setInterval(changeWord, 2000); 



// FUNCTION: RANDOM DOODLES
const totalImages = 9;
let imagesToLoad = Math.floor(Math.random() * 2) + 3; 
let selectedImages = [];

function generateImages() {
  selectedImages.length = 0; 

  while (selectedImages.length < imagesToLoad) {
    let randomIndex = Math.floor(Math.random() * totalImages) + 1;
    let imgSrc = `icons/img-${randomIndex}.png`;
    if (!selectedImages.includes(imgSrc)) {
      selectedImages.push(imgSrc);
    }
  }

  const container = document.getElementById("icon-container");
  container.innerHTML = ""; 

  selectedImages.forEach((src) => {
    let img = document.createElement("img");
    img.src = src;
    img.classList.add("draggable");

    img.style.position = "absolute";
    img.style.left = Math.random() * (window.innerWidth - 100) + "px";
    img.style.top = Math.random() * (window.innerHeight - 100) + "px";

    img.addEventListener("mousedown", (e) => {
      e.preventDefault();
      let shiftX = e.clientX - img.getBoundingClientRect().left;
      let shiftY = e.clientY - img.getBoundingClientRect().top;

      function moveAt(pageX, pageY) {
        img.style.left = pageX - shiftX + "px";
        img.style.top = pageY - shiftY + "px";
      }

      function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
      }

      document.addEventListener("mousemove", onMouseMove);

      document.addEventListener("mouseup", () => {
        document.removeEventListener("mousemove", onMouseMove);
      }, { once: true });
    });

    container.appendChild(img);
  });
}

generateImages();

// toggle 
document.getElementById("toggleDoodles").addEventListener("click", () => {
  const container = document.getElementById("icon-container");
  const button = document.getElementById("toggleDoodles");

  if (container.style.display === "none") {
    container.style.display = "block";
    button.textContent = "(hide doodles)";
  } else {
    container.style.display = "none";
    button.textContent = "(show doodles)"; 
  }
});

// reset
document.getElementById("reset").addEventListener("click", () => {
  generateImages(); 
});

});