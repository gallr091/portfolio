document.addEventListener("DOMContentLoaded", function () {

	const images = Array.from(
		document.querySelectorAll(".image-stack img, .single-image img")
	);

	const lightbox = document.getElementById("lightbox");
	const lightboxImage = document.getElementById("lightbox-image");
	const closeButton = document.getElementById("lightbox-close");
	const prevButton = document.getElementById("lightbox-prev");
	const nextButton = document.getElementById("lightbox-next");

	let currentIndex = 0;

	// Safety check
	if (
		!lightbox ||
		!lightboxImage ||
		!closeButton ||
		!prevButton ||
		!nextButton
	) {
		console.error("Lightbox HTML is missing.");
		return;
	}


	// OPEN
	images.forEach(function (image, index) {

		image.addEventListener("click", function () {

			currentIndex = index;

			lightboxImage.src = image.src;
			lightboxImage.alt = image.alt || "";

			lightbox.classList.add("active");
			document.body.style.overflow = "hidden";

		});

	});


	// UPDATE IMAGE
	function updateImage() {

		const newImage = images[currentIndex];

		lightboxImage.classList.add("fade-out");

		setTimeout(function () {

			lightboxImage.src = newImage.src;
			lightboxImage.alt = newImage.alt || "";

			lightboxImage.classList.remove("fade-out");

		}, 200);

	}


	// NEXT
	function nextImage() {

		currentIndex++;

		if (currentIndex >= images.length) {
			currentIndex = 0;
		}

		updateImage();

	}


	// PREVIOUS
	function previousImage() {

		currentIndex--;

		if (currentIndex < 0) {
			currentIndex = images.length - 1;
		}

		updateImage();

	}


	nextButton.addEventListener("click", function (event) {

		event.stopPropagation();

		nextImage();

	});


	prevButton.addEventListener("click", function (event) {

		event.stopPropagation();

		previousImage();

	});


	// CLOSE
	function closeLightbox() {

		lightbox.classList.remove("active");

		document.body.style.overflow = "";

	}


	closeButton.addEventListener("click", function (event) {

		event.stopPropagation();

		closeLightbox();

	});


	// CLICK BACKGROUND TO CLOSE
	lightbox.addEventListener("click", function (event) {

		if (event.target === lightbox) {
			closeLightbox();
		}

	});


	// KEYBOARD
	document.addEventListener("keydown", function (event) {

		if (!lightbox.classList.contains("active")) {
			return;
		}

		if (event.key === "ArrowRight") {
			nextImage();
		}

		if (event.key === "ArrowLeft") {
			previousImage();
		}

		if (event.key === "Escape") {
			closeLightbox();
		}

	});

});