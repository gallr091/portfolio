const gallery = document.querySelector("#playground-gallery");
const filters = document.querySelectorAll("#description .filter");


// ==========================================
// GET ORIGINAL ITEMS
// ==========================================

const items = Array.from(
	gallery.querySelectorAll(".playground-item")
);


// ==========================================
// GROUP ITEMS
// ==========================================

function createGroups(itemsToGroup) {

	const groups = [];
	const groupedItems = new Map();

	itemsToGroup.forEach(item => {

		const groupName = item.dataset.group;

		// NORMAL ITEM
		if (!groupName) {
			groups.push([item]);
			return;
		}

		// GROUPED ITEM
		if (!groupedItems.has(groupName)) {

			const group = [];

			groupedItems.set(groupName, group);

			groups.push(group);

		}

		groupedItems.get(groupName).push(item);

	});

	return groups;
}


// ==========================================
// SHUFFLE
// ==========================================

function shuffleArray(array) {

	const shuffled = [...array];

	for (let i = shuffled.length - 1; i > 0; i--) {

		const j = Math.floor(
			Math.random() * (i + 1)
		);

		[
			shuffled[i],
			shuffled[j]
		] = [
			shuffled[j],
			shuffled[i]
		];

	}

	return shuffled;
}

// ==========================================
// CREATE COLUMNS
// ==========================================

const columnsWrapper = document.createElement("div");

columnsWrapper.classList.add("playground-columns");

gallery.innerHTML = "";

gallery.appendChild(columnsWrapper);


let columns = [];


function createColumns() {

	columnsWrapper.innerHTML = "";

	columns = [];

	const columnCount =
		window.matchMedia("(max-width: 600px)").matches
			? 2
			: 3;


	for (let i = 0; i < columnCount; i++) {

		const column = document.createElement("div");

		column.classList.add("playground-column");

		columnsWrapper.appendChild(column);

		columns.push(column);

	}

}


createColumns();


// ==========================================
// PREPARE RANDOMIZED GALLERY
// ==========================================

const itemGroups = createGroups(items);

const shuffledGroups = shuffleArray(itemGroups);


// ==========================================
// FIND SHORTEST COLUMN
// ==========================================

function getShortestColumn() {

	return columns.reduce((shortest, column) => {

		return column.offsetHeight < shortest.offsetHeight
			? column
			: shortest;

	});

}


// ==========================================
// DISTRIBUTE ITEMS
// ==========================================

function distributeGroups(groupsToDisplay) {

	// CLEAR COLUMNS
	columns.forEach(column => {
		column.innerHTML = "";
	});


	groupsToDisplay.forEach(group => {

		// FIND CURRENT SHORTEST COLUMN
		const shortestColumn = getShortestColumn();


		// KEEP GROUPED ITEMS TOGETHER
		group.forEach(item => {
			shortestColumn.appendChild(item);
		});

	});

}


// ==========================================
// INITIAL RANDOMIZED GALLERY
// ==========================================

// Wait until images/video metadata are available
// before calculating column heights.

const media = gallery.querySelectorAll("img, video");

const mediaPromises = Array.from(media).map(element => {

	if (element.tagName === "IMG") {

		if (element.complete) {
			return Promise.resolve();
		}

		return new Promise(resolve => {
			element.addEventListener("load", resolve, { once: true });
			element.addEventListener("error", resolve, { once: true });
		});

	}


	if (element.tagName === "VIDEO") {

		if (element.readyState >= 1) {
			return Promise.resolve();
		}

		return new Promise(resolve => {
			element.addEventListener(
				"loadedmetadata",
				resolve,
				{ once: true }
			);

			element.addEventListener(
				"error",
				resolve,
				{ once: true }
			);
		});

	}

	return Promise.resolve();

});


Promise.all(mediaPromises).then(() => {
	distributeGroups(shuffledGroups);
});


// ==========================================
// FILTERING
// ==========================================

filters.forEach(filter => {

	filter.addEventListener("click", () => {

		const selectedCategory = filter.dataset.filter;


		filters.forEach(button => {
			button.classList.remove("active");
		});

		filter.classList.add("active");


		let filteredGroups;


		if (selectedCategory === "all") {

			filteredGroups = shuffledGroups;

		} else {

			filteredGroups = shuffledGroups
				.map(group => {

					return group.filter(item => {

						const categories =
							item.dataset.category.split(" ");

						return categories.includes(
							selectedCategory
						);

					});

				})
				.filter(group => group.length > 0);

		}


		distributeGroups(filteredGroups);

		gallery.scrollTop = 0;

	});

// ==========================================
// UPDATE COLUMNS ON RESIZE
// ==========================================

let previousIsMobile =
	window.matchMedia("(max-width: 600px)").matches;


window.addEventListener("resize", () => {

	const isMobile =
		window.matchMedia("(max-width: 600px)").matches;


	// only rebuild if crossing mobile/desktop breakpoint
	if (isMobile !== previousIsMobile) {

		previousIsMobile = isMobile;

		createColumns();

		const activeFilter =
			document.querySelector(
				"#description .filter.active"
			);

		const selectedCategory =
			activeFilter?.dataset.filter || "all";


		let groupsToDisplay;


		if (selectedCategory === "all") {

			groupsToDisplay = shuffledGroups;

		} else {

			groupsToDisplay = shuffledGroups
				.map(group => {

					return group.filter(item => {

						const categories =
							item.dataset.category.split(" ");

						return categories.includes(
							selectedCategory
						);

					});

				})
				.filter(group => group.length > 0);

		}


		distributeGroups(groupsToDisplay);

	}

});

});