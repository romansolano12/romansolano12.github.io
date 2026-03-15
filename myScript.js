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

function copyEmail() {
    const email = "Romansolano12@Gmail.com";
    navigator.clipboard.writeText(email).then(() => {
        const btn = document.getElementById("emailBtn");
        const originalText = btn.innerText;
        
        btn.innerText = "Email Copied!";
        btn.style.background = "#28a745"; // Success green
        
        setTimeout(() => {
            btn.innerText = originalText;
            btn.style.background = ""; // Resets to your cyan
        }, 2000);
    });
}

// Logic to handle multiple project modals
document.querySelectorAll('.open-modal').forEach(button => {
    button.addEventListener('click', function() {
        const modalId = this.getAttribute('data-target');
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = "block";
            document.body.style.overflow = "hidden"; // Prevents background scrolling
        }
    });
});

// Close logic for all modals
document.querySelectorAll('.close-modal').forEach(closeBtn => {
    closeBtn.addEventListener('click', function() {
        this.closest('.modal').style.display = "none";
        document.body.style.overflow = "auto";
    });
});

function toggleChat() {
    const chatWindow = document.getElementById('chat-window');
    chatWindow.style.display = chatWindow.style.display === 'none' ? 'flex' : 'none';
}

async function sendMessage() {
    const input = document.getElementById('chat-input');
    const messages = document.getElementById('messages');
    const question = input.value.trim();
    const button = document.getElementById('send-btn');
    const formattedResponse = data.response.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');


    if (!question) return;

    input.disabled = true;
    button.disabled = true;
    button.style.opacity = "0.5";
    button.innerText = "WAIT...";

    // 1. Display User Message (Styled for Dark Theme)
    messages.innerHTML += `
        <div style="margin-bottom: 15px; border-left: 2px solid #00d2ff; padding-left: 10px;">
            <span style="color: #555; font-size: 10px; font-weight: bold; letter-spacing: 1px;">USER_QUERY ></span>
            <div style="color: #ffffff; margin-top: 4px;">${question}</div>
        </div>
    `;
    
    input.value = '';
    messages.scrollTop = messages.scrollHeight;

    // 2. Loading State
    const loadingId = 'loading-' + Date.now();
    messages.innerHTML += `
        <div id="${loadingId}" style="color: #00d2ff; font-size: 11px; margin-bottom: 15px; animate: pulse 1.5s infinite;">
            >> ACCESSING_CORE_DATABASE... <br>
        <span style="font-size: 9px; color: #666;">(Server may take 30s to wake up on first query)</span>
        </div>
    `;

    try {
        // Update this URL once you deploy your Flask app to Render/Vercel
        const response = await fetch('https://roman-ai-assistant.onrender.com/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: question })
        });

        if (!response.ok) {
            if (response.status === 429) {
                throw new Error("SYSTEM_COOLING: The AI is catching its breath. Please try again in 60 seconds.");
            }
            throw new Error("SYSTEM_OFFLINE: Secure link could not be established.");
        }
        
        const data = await response.json();
        document.getElementById(loadingId).remove();

        // 3. Display AI Response (Styled as Terminal Output)
        messages.innerHTML += `
            <div style="margin-bottom: 20px;">
                <span style="color: #00d2ff; font-size: 10px; font-weight: bold; letter-spacing: 1px;">ROMAN_AI_OUTPUT ></span>
                <div style="color: #e0e0e0; margin-top: 4px; line-height: 1.5; white-space: pre-wrap;">${formattedResponse}</div>
            </div>
        `;
    } catch (error) {
        document.getElementById(loadingId).innerHTML = `
            <span style="color: #ff4444;">>> CONNECTION_ERROR: SECURE_LINK_OFFLINE.</span><br>
            <span style="font-size: 10px;">Redirecting to LinkedIn for manual override...</span>
        `;
    } finally {
        // --- UNLOCK UI ---
        // This runs whether the try SUCCEEDS or FAILS
        input.disabled = false;
        button.disabled = false;
        button.style.opacity = "1";
        button.innerText = "Send";
        input.focus(); // Put the cursor back in the box for the user
    }
    
    messages.scrollTop = messages.scrollHeight;
}

// Allow "Enter" key to send message
document.getElementById('chat-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});