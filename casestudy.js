window.addEventListener("load", function() {

  
  //FUNCTION: BACK TO TOP, CASE STUDY MENU, CONTACT NAV
  window.addEventListener("scroll", function () {
	const topButton = document.getElementById("top");
	const casestudyMenu = document.getElementById('casestudy-menu');
	const contactLinks = document.querySelectorAll('.contact a');  // Targeting <a> inside .contact
	const finalProduct = document.getElementById("final-product");
  
	// Set the scroll position to trigger both elements at the same time
	const triggerScroll = 450;  // Change this value to control when both items appear
  
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
	
	const finalProductRect = finalProduct.getBoundingClientRect();
	const inViewport = finalProductRect.top <= window.innerHeight - 650 && finalProductRect.bottom >= 0;
  
	// Contact Links (targeting <a> inside .contact)
	contactLinks.forEach(function(item) {
	  if (inViewport) {
		item.style.color = 'grey';  // Change to grey when scrolling on final-product
	  } else if (window.scrollY > triggerScroll) {
		item.style.color = 'black';  // Change text color to black when scrolled
	  } else {
		item.style.color = 'black';  // Default color before scroll
	  }
	});
  
  });
  
  //FUNCTION: CASE STUDY MENU NAV HIGHLIGHT
  // Get the menu links and divs with the class 'casestudy-part'
  const menuLinks = document.querySelectorAll('#casestudy-menu li a');
  const casestudyParts = document.querySelectorAll('.casestudy');
  
  // Function to highlight the menu item when the user scrolls into the divs
  function highlightMenuItem() {
	  let currentPart = null;
	  const buffer = window.innerHeight * 0.4; // Adjust this to increase the bounds
  
	  casestudyParts.forEach(part => {
		  const rect = part.getBoundingClientRect();
  
		  // Increase the bounds by allowing sections to be considered "active" earlier and stay active longer
		  if (rect.top <= buffer && rect.bottom >= buffer) {
			  currentPart = part.id;
		  }
	  });
  
  
	  // Loop through the menu links and remove the 'active' class
	  menuLinks.forEach(link => {
		  if (link.getAttribute('href').slice(1) === currentPart) {
			  link.classList.add('active');  // Add active class to the current link
		  } else {
			  link.classList.remove('active');  // Remove active class from other links
		  }
	  });
  }
  
  // Listen to scroll event
  window.addEventListener('scroll', highlightMenuItem);
  
  // Optional: Initial check when page loads in case a div is already in view
  highlightMenuItem();
  
  
  
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
  
  
  
});