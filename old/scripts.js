// FIRST: STAR HOVER EFFECT 

let elements = document.querySelectorAll('.effect:not(#changing-text)');

elements.forEach((element) => {
    let text = element.innerText;
    let spanWrapper = '';

    for (let i = 0; i < text.length; i++) {
        if (text[i] !== ' ') {
            spanWrapper += `<span class="effect--span">${text.charAt(i)}</span>`;
        } else {
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
        originalTexts.push(spanElement.innerText);
        spanElement.addEventListener('mouseover', changeEffects);
    });

    colorArray.forEach((color, index) => {
        document.documentElement.style.setProperty(`--star-${index + 1}`, `var(--${color})`);
    });
}

function removeEffects() {
    spanElements.forEach((spanElement) => {
        spanElement.removeEventListener('mouseover', changeEffects);
    });

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

    this.style.fontSize = '45px'; 

    setTimeout(() => {
        this.innerText = originalTexts[index];
        this.style.color = originalTextColor;
        this.style.fontSize = '';  
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
    changingWord.classList.add("fade-out"); 

    setTimeout(() => {
        index = (index + 1) % words.length;
        let newWord = words[index].split(''); 
        let spanElements = changingWord.querySelectorAll(".effect--span");

        let newColor = changingColors[index % changingColors.length];
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
