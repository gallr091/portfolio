window.addEventListener("load", function() {

  // FUNCTION: CHANGING TEXT EFFECT
  const words = [
	"UI/UX",
	"graphic",
	// "a creative coder",
	// "an illustrator",
	"motion", 
	// "a printmaker",
	"web",
];

const colors = ['#d81159', '#8f2d56', '#2274a5', '#7209b7', '#FA6385', '#e74c3c'];
// '#218380',

let index = 0;
const changingWord = document.getElementById("changing-text");

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

setInterval(changeWord, 1500); 


// FUNCTION: PROJECT SCROLL
const scrollContainer = document.querySelector(".scroll-container");
const scrollGrid = document.querySelector(".scroll-grid-ux");
const scrollAmount = 300; 

scrollGrid.innerHTML += scrollGrid.innerHTML;

document.getElementById("arrow-right").addEventListener("click", () => {
  scrollContainer.scrollLeft -= scrollAmount;

  if (scrollContainer.scrollLeft <= 0) {
    scrollContainer.scrollLeft = scrollGrid.scrollWidth / 2; 
  }
});

document.getElementById("arrow-left").addEventListener("click", () => {
  scrollContainer.scrollLeft += scrollAmount;

  const maxScroll = scrollGrid.scrollWidth / 2;
  if (scrollContainer.scrollLeft >= maxScroll) {
    scrollContainer.scrollLeft = 0; 
  }
});


//FUNCTION: GRID VIEW
document.querySelector('.toggle-view-button').addEventListener('click', function() {
  // Get the elements
  const scrollContainer = document.querySelector('.scroll-container');
  const button = document.querySelector('.toggle-view-button');
  
  // Toggle the class for grid view
  scrollContainer.classList.toggle('grid-view');
  scrollContainer.classList.toggle('side-scroll-view');
  
  // Update the button text based on the current view
  if (scrollContainer.classList.contains('grid-view')) {
      button.textContent = 'SIDE SCROLL VIEW';  // When in grid view, change to side scroll view
  } else {
      button.textContent = 'GRID VIEW';  // When in side scroll view, change to grid view
  }
});




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
    button.textContent = "(hide stickers)";
  } else {
    container.style.display = "none";
    button.textContent = "(show stickers)"; 
  }
});

// reset
document.getElementById("reset").addEventListener("click", () => {
  generateImages(); 
});


});


// FUNCTION: SVG SHAKE
const letters = document.querySelectorAll('.cls-1, .cls-2');

letters.forEach(letter => {
    letter.addEventListener('mouseenter', () => {
        let interval;
        
        const startShaking = () => {
            interval = setInterval(() => {
                const randomRotation = (Math.random() - 0.5) * 10; 
                
                letters.forEach(l => {
                    l.style.transition = 'transform 0.1s ease-in-out';
                    l.style.transform = `rotate(${randomRotation}deg)`;
                    l.style.transformOrigin = 'center';
                });
            }, 100);
        };

        startShaking();

        setTimeout(() => {
            clearInterval(interval); 
            letters.forEach(l => {
                l.style.transition = 'transform 0.5s ease-out';
                l.style.transform = 'rotate(0deg)';
            });
        }, 3000); 
    });
});

