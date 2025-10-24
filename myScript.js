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