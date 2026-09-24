// ========================================
// CASE STUDY — SHARED JAVASCRIPT
// ========================================


// ========================================
// BACK TO TOP
// ========================================

window.addEventListener("scroll", function () {
	const triggerScroll = 450;

	if (window.scrollY > triggerScroll) {
		document.body.classList.add("scrolled");
	} else {
		document.body.classList.remove("scrolled");
	}
});


// ========================================
// DESKTOP DROPDOWN
// ========================================

const dropdownToggle = document.querySelector(".dropdown-toggle");
const dropdownMenu = document.querySelector(".dropdown-menu");

if (dropdownToggle && dropdownMenu) {

	dropdownToggle.addEventListener("click", function (event) {
		event.stopPropagation();

		if (dropdownMenu.style.opacity === "1") {
			dropdownMenu.style.opacity = "0";
			dropdownMenu.style.pointerEvents = "none";
		} else {
			dropdownMenu.style.opacity = "1";
			dropdownMenu.style.pointerEvents = "auto";
		}
	});


	// close dropdown when clicking elsewhere
	document.addEventListener("click", function (event) {

		if (
			!dropdownToggle.contains(event.target) &&
			!dropdownMenu.contains(event.target)
		) {
			dropdownMenu.style.opacity = "0";
			dropdownMenu.style.pointerEvents = "none";
		}

	});
}


// ========================================
// MOBILE MENU
// ========================================

const menuToggle = document.getElementById("menu-toggle");
const overlayNav = document.getElementById("overlay-nav");

if (menuToggle && overlayNav) {

	menuToggle.addEventListener("click", function () {
		overlayNav.classList.toggle("show");
	});

}


// ========================================
// CLOSE MOBILE MENU WHEN LINK IS CLICKED
// ========================================

if (overlayNav) {

	const mobileLinks = overlayNav.querySelectorAll("a");

	mobileLinks.forEach(function (link) {

		link.addEventListener("click", function () {
			overlayNav.classList.remove("show");
		});

	});

}


// ========================================
// ESCAPE KEY
// ========================================

document.addEventListener("keydown", function (event) {

	if (event.key === "Escape") {

		// close mobile menu
		if (overlayNav) {
			overlayNav.classList.remove("show");
		}

		// close desktop dropdown
		if (dropdownMenu) {
			dropdownMenu.style.opacity = "0";
			dropdownMenu.style.pointerEvents = "none";
		}

	}

});


// ========================================
// SVG SHAKE
// ========================================

const letters = document.querySelectorAll(".cls-1, .cls-2");

letters.forEach(function (letter) {

	letter.addEventListener("mouseenter", function () {

		let interval;

		interval = setInterval(function () {

			const randomRotation = (Math.random() - 0.5) * 10;

			letters.forEach(function (item) {
				item.style.transition = "transform 0.1s ease-in-out";
				item.style.transform = `rotate(${randomRotation}deg)`;
				item.style.transformOrigin = "center";
			});

		}, 100);


		setTimeout(function () {

			clearInterval(interval);

			letters.forEach(function (item) {
				item.style.transition = "transform 0.5s ease-out";
				item.style.transform = "rotate(0deg)";
			});

		}, 3000);

	});

});