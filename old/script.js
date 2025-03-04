// FIRST: STAR HOVER EFFECT 

// WRAP EACH CHARACTER IN A SPAN

let elements = document.querySelectorAll('.effect:not(#changing-text)');

elements.forEach((element) => {
    // Grab the inner text of each element
    let text = element.innerText;
    let spanWrapper = '';

    for (let i = 0; i < text.length; i++) {
        if (text[i] !== ' ') {
            spanWrapper += `<span class="effect--span">${text.charAt(i)}</span>`;
        } else {
            // If it's a space, then don't wrap it in a span and add a space as-is
            spanWrapper += ' ';
        }
    }

    element.innerHTML = spanWrapper;
});

const spanElements = document.querySelectorAll('.effect--span:not(#changing-text .effect--span)');

// EFFECTS
const effectsColors = ['#FF4500', '#FFA800', '#00E800', '#00D1FF', '#0056FF', '#FF48FF', '#B56CFF'];
const stars = ['✧', '✦', '★', '✫'];
const colorArray = ['red', 'orange', 'green', 'aqua', 'blue', 'magenta', 'purple'];
let currentColorIndex = -1;
let currentStarIndex = -1;
let originalTexts = [];

let originalTextColor = "var(--black)";

addEffects();

function addEffects() {
    spanElements.forEach((spanElement) => {
        // Save the current characters prior to mouseover effects
        originalTexts.push(spanElement.innerText);
        spanElement.addEventListener('mouseover', changeEffects);
    });

    // assign colors to each css variable
    colorArray.forEach((color, index) => {
        document.documentElement.style.setProperty(`--star-${index + 1}`, `var(--${color})`);
    });
}

function removeEffects() {
    spanElements.forEach((spanElement) => {
        spanElement.removeEventListener('mouseover', changeEffects);
    });

    // remove colors to each css variable
    colorArray.forEach((color, index) => {
        document.documentElement.style.setProperty(`--star-${index + 1}`, `var(--link-arrow-color)`);
    });

    // originalTexts = [];
}

function changeEffects() {
    let index = Array.from(spanElements).indexOf(this);
    currentStarIndex = (currentStarIndex + 1) % stars.length;
    this.innerText = stars[currentStarIndex];

    currentColorIndex = (currentColorIndex + 1) % effectsColors.length;
    this.style.color = effectsColors[currentColorIndex];

    // Make the stars smaller by changing the font size
    this.style.fontSize = '45px';  // Adjust this value to make the stars smaller or bigger

    setTimeout(() => {
        this.innerText = originalTexts[index];
        this.style.color = originalTextColor;
        this.style.fontSize = '';  // Reset font size back to normal
    }, 1000);
}


// SECOND: CHANGING TEXT WORDS AND COLORS

const words = [
    "a UX designer",
    "a graphic designer",
    "a creative coder",
    "an illustrator",
    "a motion designer", 
    "a printmaker",
    "a web designer",
    "a multidisciplinary artist"
];

const changingColors = ['#f75c03', '#d81159', '#8f2d56', '#218380', '#2274a5', '#7209b7', '#f15bb5'];

let index = 0;
const changingWord = document.getElementById("changing-text");

function changeWord() {
    changingWord.classList.add("fade-out"); // Start fade-out animation

    setTimeout(() => {
        index = (index + 1) % words.length;
        let newWord = words[index].split(''); // Convert new word to an array of letters
        let spanElements = changingWord.querySelectorAll(".effect--span");

        // Assign a new color from the list based on the current index
        let newColor = changingColors[index % changingColors.length];
        changingWord.style.color = newColor;

        // Ensure we update only the necessary spans
        spanElements.forEach((span, i) => {
            if (newWord[i]) {
                span.textContent = newWord[i]; // Update existing spans
            } else {
                span.textContent = ''; // Clear extra spans if new word is shorter
            }
        });

        // If the new word is longer, add extra spans
        for (let i = spanElements.length; i < newWord.length; i++) {
            let newSpan = document.createElement("span");
            newSpan.className = "effect--span";
            newSpan.textContent = newWord[i];
            changingWord.appendChild(newSpan);
        }

        changingWord.classList.remove("fade-out"); // Start fade-in animation
    }, 500); // Wait for fade-out to complete before changing text
}

setInterval(changeWord, 1500); // Change word every 1.5s
