window.addEventListener("load", function() {
    const words = [
	"a UX designer",
	"a graphic designer",
	"a creative coder",
	"an illustrator",
	"a motion designer", 
	"a printmaker",
	"a web designer",
];

const colors = ['#ffbc42', '#d81159', '#8f2d56', '#218380', '#2274a5', '#7209b7', '#B56CFF'];

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


//grid
const scrollContainer = document.querySelector(".scroll-container");
const scrollGrid = document.querySelector(".scroll-grid-ux");
const scrollAmount = 300; // Adjust distance per click

// Clone the content to create an infinite loop
scrollGrid.innerHTML += scrollGrid.innerHTML;

// Left arrow button functionality
document.getElementById("arrow-right").addEventListener("click", () => {
  scrollContainer.scrollLeft -= scrollAmount;

  // Infinite scroll logic: Reset scroll position to prevent jumping
  if (scrollContainer.scrollLeft <= 0) {
    scrollContainer.scrollLeft = scrollGrid.scrollWidth / 2; // Jump to the second batch
  }
});

// Right arrow button functionality
document.getElementById("arrow-left").addEventListener("click", () => {
  scrollContainer.scrollLeft += scrollAmount;

  // Infinite scroll logic: Reset scroll position to prevent jumping
  const maxScroll = scrollGrid.scrollWidth / 2;
  if (scrollContainer.scrollLeft >= maxScroll) {
    scrollContainer.scrollLeft = 0; // Move back to the start
  }
});




// random icons
const totalImages = 8;
let imagesToLoad = Math.floor(Math.random() * 2) + 3; // Randomly choose 3 or 4 images
let selectedImages = [];

// Function to create and position the images
function generateImages() {
  selectedImages.length = 0; // Reset selected images array
  // Select random images
  while (selectedImages.length < imagesToLoad) {
    let randomIndex = Math.floor(Math.random() * totalImages) + 1;
    let imgSrc = `icons/img-${randomIndex}.png`;
    if (!selectedImages.includes(imgSrc)) {
      selectedImages.push(imgSrc);
    }
  }

  const container = document.getElementById("icon-container");
  container.innerHTML = ""; // Clear any existing images

  selectedImages.forEach((src) => {
    let img = document.createElement("img");
    img.src = src;
    img.classList.add("draggable");

    // Set random position
    img.style.position = "absolute";
    img.style.left = Math.random() * (window.innerWidth - 100) + "px";
    img.style.top = Math.random() * (window.innerHeight - 100) + "px";

    // Make draggable
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

// Initial image generation
generateImages();

// Toggle button functionality (Hide/Show Doodles)
document.getElementById("toggleDoodles").addEventListener("click", () => {
  const container = document.getElementById("icon-container");
  const button = document.getElementById("toggleDoodles");

  if (container.style.display === "none") {
    // Show the images
    container.style.display = "block";
    button.textContent = "(hide doodles)"; // Change button text to "Hide Doodles"
  } else {
    // Hide the images
    container.style.display = "none";
    button.textContent = "(show doodles)"; // Change button text to "Show Doodles"
  }
});

// Reset button functionality
document.getElementById("reset").addEventListener("click", () => {
  generateImages(); // Reset images by re-generating them
});


});


// svg
const letters = document.querySelectorAll('.cls-1, .cls-2');

letters.forEach(letter => {
    letter.addEventListener('mouseenter', () => {
        let interval;
        
        const startShaking = () => {
            interval = setInterval(() => {
                const randomRotation = (Math.random() - 0.5) * 10; // Random -5 to 5 degrees
                
                letters.forEach(l => {
                    l.style.transition = 'transform 0.1s ease-in-out';
                    l.style.transform = `rotate(${randomRotation}deg)`;
                    l.style.transformOrigin = 'center';
                });
            }, 100); // Update every 100ms for a smooth shake
        };

        startShaking();

        setTimeout(() => {
            clearInterval(interval); // Stop shaking
            letters.forEach(l => {
                l.style.transition = 'transform 0.5s ease-out';
                l.style.transform = 'rotate(0deg)'; // Reset all letters
            });
        }, 3000); // Shake for 2 seconds
    });
});

