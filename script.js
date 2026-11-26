
// AKASH TRAVEL JAVASCRIPT

// MOBILE NAVIGATION
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", function () {

    const isOpen = navLinks.classList.toggle("show");

    menuToggle.setAttribute("aria-expanded", isOpen);

    menuToggle.textContent = isOpen ? "✕" : "☰";

});

// CLOSE MENU AFTER CLICKING A LINK
document.querySelectorAll(".nav-links a").forEach(function(link) {

    link.addEventListener("click", function() {

        navLinks.classList.remove("show");

        menuToggle.textContent = "☰";

        menuToggle.setAttribute("aria-expanded", "false");

    });

});

// AUTOMATIC COPYRIGHT YEAR
document.getElementById("year").textContent =
    new Date().getFullYear();

console.log("Welcome to Akash Travel!");

// =================================
// DESTINATION SEARCH AND FILTER
// =================================

const destinationSearch =
    document.getElementById("destinationSearch");

const filterButtons =
    document.querySelectorAll(".filter-btn");

const destinationItems =
    document.querySelectorAll(".destination-item");

const noResults =
    document.getElementById("noResults");

let selectedCategory = "all";

// FILTER DESTINATIONS
function filterDestinations() {

    const searchText = destinationSearch.value.toLowerCase().trim();

    let visibleCount = 0;

    destinationItems.forEach(function(item) {

        const title = item.querySelector("h3").textContent.toLowerCase();

        const description = item.querySelector("p").textContent.toLowerCase();

        const location = item.querySelector(".destination-location").textContent.toLowerCase();

        const categories = item.dataset.category.split(" ");

        const matchesSearch =
            title.includes(searchText) ||
            description.includes(searchText) ||
            location.includes(searchText);

        const matchesCategory =
            selectedCategory === "all" ||
            categories.includes(selectedCategory);

        if (matchesSearch && matchesCategory) {

            item.classList.remove("hidden");

            visibleCount++;

        } else {

            item.classList.add("hidden");

        }

    });

    noResults.hidden = visibleCount !== 0;

}

// CATEGORY BUTTONS
filterButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        filterButtons.forEach(function(btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        selectedCategory = button.dataset.filter;

        filterDestinations();

    });

});

// SEARCH INPUT
if (destinationSearch) {

    destinationSearch.addEventListener("input", filterDestinations);

}

console.log("Akash Travel destinations loaded!");

// =================================
// TOUR PACKAGE FILTERING
// =================================

const packageButtons =
    document.querySelectorAll(".package-filter-btn");

const packageCards =
    document.querySelectorAll(".package-card");

const noPackages =
    document.getElementById("noPackages");

packageButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        // Remove active class from all buttons
        packageButtons.forEach(function(btn) {
            btn.classList.remove("active");
        });

        // Activate selected button
        button.classList.add("active");

        const selectedFilter = button.dataset.filter;

        let visiblePackages = 0;

        // Filter the packages
        packageCards.forEach(function(card) {

            const categories = card.dataset.category.split(" ");

            const matches =
                selectedFilter === "all" ||
                categories.includes(selectedFilter);

            if (matches) {

                card.classList.remove("hidden");
                visiblePackages++;

            } else {

                card.classList.add("hidden");

            }

        });

        // Show message if no packages match
        if (noPackages) {
            noPackages.hidden = visiblePackages !== 0;
        }

    });

});

console.log("Akash Travel tour packages loaded!");
// ==============================
// CONTACT PAGE FORM
// ==============================

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    // Replace this with your real WhatsApp number.
    // Include country code, digits only. Example format: 2519XXXXXXXX
    const AKASH_WHATSAPP_NUMBER = "251717213487";

    const contactDate = document.getElementById("travelDate");
    const contactStatus = document.getElementById("formStatus");

    // Prevent visitors from selecting a date in the past.
    const today = new Date();
    const localToday = new Date(
        today.getTime() - today.getTimezoneOffset() * 60000
    ).toISOString().split("T")[0];

    contactDate.min = localToday;

    // Read destination or package from the page URL.
    const contactParams = new URLSearchParams(window.location.search);
    const requestedDestination =
        contactParams.get("destination") || contactParams.get("package");

    if (requestedDestination) {
        const destinationSelect = document.getElementById("destination");
        const matchingOption = Array.from(destinationSelect.options).find(
            option => option.value.toLowerCase() === requestedDestination.toLowerCase()
        );

        if (matchingOption) {
            destinationSelect.value = matchingOption.value;
        } else {
            document.getElementById("message").value =
                "I am interested in: " + requestedDestination;
        }
    }

    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const name = document.getElementById("customerName").value.trim();
        const email = document.getElementById("customerEmail").value.trim();
        const phone = document.getElementById("customerPhone").value.trim();
        const destination = document.getElementById("destination").value;
        const travelDate = contactDate.value;
        const travelers = document.getElementById("travelers").value;
        const message = document.getElementById("message").value.trim();

        const whatsappMessage =
`Hello Akash Travel!

I would like to make a travel inquiry.

Name: ${name}
Email: ${email}
Phone: ${phone}
Destination/Tour: ${destination}
Preferred Travel Date: ${travelDate}
Number of Travelers: ${travelers}

Message:
${message}

Please provide more information about this trip. Thank you!`;

        if (
            AKASH_WHATSAPP_NUMBER === "YOUR_COUNTRY_CODE_AND_NUMBER" ||
            !/^\d+$/.test(AKASH_WHATSAPP_NUMBER)
        ) {
            contactStatus.textContent =
                "Please add your real WhatsApp number in js/script.js first.";
            return;
        }

        const whatsappURL =
            "https://wa.me/" + AKASH_WHATSAPP_NUMBER +
            "?text=" + encodeURIComponent(whatsappMessage);

        window.open(whatsappURL, "_blank", "noopener,noreferrer");

        contactStatus.textContent =
            "Your WhatsApp message is ready. Review it and press Send in WhatsApp.";
    });
}
// ==============================
// GALLERY FILTER
// ==============================

const galleryButtons = document.querySelectorAll(".gallery-filter");
const galleryItems = document.querySelectorAll(".gallery-item");

galleryButtons.forEach(function(button) {
    button.addEventListener("click", function() {

        galleryButtons.forEach(function(btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const selectedFilter = button.dataset.filter;

        galleryItems.forEach(function(item) {
            const category = item.dataset.category;

            if (selectedFilter === "all" || category === selectedFilter) {
                item.classList.remove("hidden");
            } else {
                item.classList.add("hidden");
            }
        });
    });
});