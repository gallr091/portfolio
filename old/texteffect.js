// WRAP EACH CHARACTER IN A SPAN

let elements = document.querySelectorAll('.effect:not(#changing-text)');

elements.forEach((element) => {

    // Grab the inner text of each element
    let text = element.innerText;

    let spanWrapper = '';


    for (let i = 0; i < text.length; i++) {
        if (element[i] !== ' ') {
            spanWrapper += `<span class="effect--span">${text.charAt(i)}</span>`;
        } else {
            // If it's a space, then don't wrap it in a span and add a space as-is
            spanWrapper += ' ';
        }
    }

    element.innerHTML = spanWrapper;



})

const spanElements = document.querySelectorAll('.effect--span:not(#changing-text .effect--span)');

// EFFECTS
const colors = ['#FF4500', '#FFA800', '#00E800', '#00D1FF', '#0056FF', '#FF48FF', '#B56CFF'];
const stars = ['✹', '✦', '★', '✫'];
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
    // 'this' refers to spanElement above
    // Convert nodeList to regular array, and grab the index of each
    let index = Array.from(spanElements).indexOf(this);

    currentStarIndex = (currentStarIndex + 1) % stars.length;
    this.innerText = stars[currentStarIndex];

    currentColorIndex = (currentColorIndex + 1) % colors.length;
    this.style.color = colors[currentColorIndex];

    setTimeout(() => {
        this.innerText = originalTexts[index];
        this.style.color = originalTextColor;
    }, 1000);
}