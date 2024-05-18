var tabLinks = document.getElementsByClassName("tabLinks");
var tabContents = document.getElementsByClassName("tabContents")

function opentab(tabName) {
    for (tabLink of tabLinks) {
        tabLink.classList.remove("activeLink");
    }
    for (tabContent of tabContents) {
        tabContent.classList.remove("activeTab");
    }
    event.currentTarget.classList.add("activeLink");
    document.getElementById(tabName).classList.add("activeTab");
}