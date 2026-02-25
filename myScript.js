// FIX: Changed 'var' to 'const' for modern JS
const tabLinks = document.getElementsByClassName("tabLinks");
const tabContents = document.getElementsByClassName("tabContents");

// FIX: Added 'clickedElement' as a second argument
function opentab(tabName, clickedElement) {
    
    // FIX: Added 'const' to declare the loop variable
    for (const tabLink of tabLinks) {
        tabLink.classList.remove("activeLink");
    }
    for (const tabContent of tabContents) {
        tabContent.classList.remove("activeTab");
    }

    // FIX: Used 'clickedElement' instead of the undefined 'event.currentTarget'
    clickedElement.classList.add("activeLink");
    document.getElementById(tabName).classList.add("activeTab");
}

/*
========================================
--- CERTIFICATE MODAL LOGIC ---
========================================
*/

// Get the modal elements
const modal = document.getElementById("certModal");
const modalImg = document.getElementById("modalImg");
const captionText = document.getElementById("caption");

// Get all certificate thumbnails by their class
const certImages = document.querySelectorAll(".cert-thumbnail");

// Loop through all images and add a click listener to each
certImages.forEach(img => {
    img.addEventListener("click", function() {
        modal.style.display = "block";
        modalImg.src = this.src; // Set the modal image src to the clicked img src
        captionText.innerHTML = this.alt; // Use the image's 'alt' text as the caption
    });
});

// Get the <span> element that closes the modal
const closeModalButton = document.querySelector(".close-modal");

// When the user clicks on <span> (x), close the modal
closeModalButton.addEventListener("click", function() {
    modal.style.display = "none";
});

// Also close the modal if the user clicks anywhere on the dark background
modal.addEventListener("click", function(event) {
    // Check if the clicked target is the modal background itself
    if (event.target === modal) {
        modal.style.display = "none";
    }
});


// --- INTERSECTION OBSERVER FOR ACTIVE NAV LINKS ---

// Select all sections that have an ID and a corresponding nav link
const sections = document.querySelectorAll("section[id]");

const navObserverOptions = {
    threshold: 0.6 // Trigger when 60% of the section is visible
};

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            // Get the ID of the current section
            const id = entry.target.getAttribute("id");
            
            // Remove 'active' class from all links
            document.querySelectorAll(".nav-links li a").forEach((link) => {
                link.classList.remove("active");
            });

            // Add 'active' class to the matching link
            const activeLink = document.querySelector(`.nav-links li a[href="#${id}"]`);
            if (activeLink) {
                activeLink.classList.add("active");
            }
        }
    });
}, navObserverOptions);

// Tell the observer to watch each section
sections.forEach((section) => {
    navObserver.observe(section);
});