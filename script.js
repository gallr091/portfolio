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
const toggleButton = document.querySelector(".toggle-view-button");
const arrowRight = document.getElementById("arrow-right");
const arrowLeft = document.getElementById("arrow-left");
const arrowUp = document.getElementById("arrow-up");
const arrowDown = document.getElementById("arrow-down");

const scrollAmount = 300;
let isGridView = false;

// duplicate for infinite scroll
// scrollGrid.innerHTML += scrollGrid.innerHTML;

toggleButton.addEventListener("click", () => {
  isGridView = !isGridView;

  if (isGridView) {
      toggleButton.textContent = "SIDE SCROLL VIEW";
      
      
     //vertical
      arrowRight.style.display = "none";
      arrowLeft.style.display = "none";
      arrowUp.style.display = "flex";
      arrowDown.style.display = "flex";

      scrollContainer.style.overflowX = "hidden"; 
      scrollContainer.style.overflowY = "auto";   
      scrollContainer.scrollTop = 0; 
  } else {
      toggleButton.textContent = "GRID VIEW";
      
      //horizontal
      arrowRight.style.display = "flex";
      arrowLeft.style.display = "flex";
      arrowUp.style.display = "none";
      arrowDown.style.display = "none";

      scrollContainer.style.overflowX = "auto"; 
      scrollContainer.style.overflowY = "hidden"; 
      scrollContainer.scrollLeft = 0; 
  }
});

// scrolling
document.addEventListener("click", (event) => {
  if (!scrollContainer) return;

  console.log("Clicked:", event.target.id);

  if (event.target.id === "arrow-right") {
      scrollContainer.scrollLeft -= scrollAmount;
    //   if (scrollContainer.scrollLeft >= scrollGrid.scrollWidth - scrollContainer.clientWidth) {
    //     scrollContainer.scrollLeft = 0; 
    // }
}

if (event.target.id === "arrow-left") {
  scrollContainer.scrollLeft += scrollAmount;
  // if (scrollContainer.scrollLeft <= 0) {
  //     scrollContainer.scrollLeft = scrollGrid.scrollWidth - scrollContainer.clientWidth; 
  // }
}

  if (event.target.id === "arrow-up") {
      scrollContainer.scrollTop -= scrollAmount;
      // if (scrollContainer.scrollTop <= 0) {
      //     scrollContainer.scrollTop = scrollGrid.scrollHeight / 2;
      // }
  }

  if (event.target.id === "arrow-down") {
      scrollContainer.scrollTop += scrollAmount;
      // if (scrollContainer.scrollTop >= scrollGrid.scrollHeight / 2) {
      //     scrollContainer.scrollTop = 0;
      // }
  }
});



//FUNCTION: GRID VIEW
document.querySelector('.toggle-view-button').addEventListener('click', function() {
  const scrollContainer = document.querySelector('.scroll-container');
  const button = document.querySelector('.toggle-view-button');
  
  scrollContainer.classList.toggle('grid-view');
  scrollContainer.classList.toggle('side-scroll-view');
  
  if (scrollContainer.classList.contains('grid-view')) {
      button.textContent = 'SIDE SCROLL VIEW';  
  } else {
      button.textContent = 'GRID VIEW'; 
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

//FUNCTION: BACK TO TOP, CASE STUDY MENU
//FUNCTION: BACK TO TOP, CASE STUDY MENU
window.addEventListener("scroll", function () {
  const topButton = document.getElementById("top");
  const casestudyMenu = document.getElementById('casestudy-menu');
  const contactLinks = document.querySelectorAll('.contact a');  // Targeting <a> inside .contact
  
  // Set the scroll position to trigger both elements at the same time
  const triggerScroll = 500;  // Change this value to control when both items appear

  // Back to Top button
  if (window.scrollY > triggerScroll) {
      document.body.classList.add("scrolled");
  } else {
      document.body.classList.remove("scrolled");
  }

  // Case Study Menu
  if (window.scrollY > triggerScroll) {
    casestudyMenu.style.opacity = 1;
  } else {
    casestudyMenu.style.opacity = 0; 
  }

  // Contact Links (targeting <a> inside .contact)
  contactLinks.forEach(function(item) {  // Loop through each <a> element inside .contact
    if (window.scrollY > triggerScroll) {
      item.style.color = 'black';  // Change the text color to black when scrolled
    } else {
      item.style.color = '#F0FFF0';  // Default color before scroll
    }
  });

});


//FUNCTION: DROPDOWN
const dropdownToggle = document.querySelector(".dropdown-toggle");
    const dropdownMenu = document.querySelector(".dropdown-menu");

    dropdownToggle.addEventListener("click", function (event) {
        event.stopPropagation(); // Prevents closing when clicking inside

        // Toggle opacity
        if (dropdownMenu.style.opacity === "1") {
            dropdownMenu.style.opacity = "0";
            dropdownMenu.style.pointerEvents = "none"; // Disable interactions when hidden
        } else {
            dropdownMenu.style.opacity = "1";
            dropdownMenu.style.pointerEvents = "auto"; // Enable interactions
        }
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", function (event) {
        if (!dropdownToggle.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.style.opacity = "0";
            dropdownMenu.style.pointerEvents = "none";
        }
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

