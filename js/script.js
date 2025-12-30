
//! --------------------------------- HOME SECTION TYPING SCRIPT-------------------------

document.addEventListener('DOMContentLoaded', () => {
    const typingTextElement = document.getElementById('typing-text');
    // Get the lines of code from the data-lines attribute
    const lines = JSON.parse(typingTextElement.getAttribute('data-lines'));
    let lineIndex = 0;
    let charIndex = 0;

    function highlightSyntax(text) {
        // 1. Regex for string values (text inside double quotes)
        // Uses $& to replace the WHOLE MATCHED STRING with the wrapped <span>
        // text = text.replace(/('')/g, '<span class=" ">$&</span>');

        // 2. Regex for JS keywords (const, var, let)
        // Uses $& to replace the WHOLE MATCHED STRING with the wrapped <span>
        // text = text.replace(/(\b('')\b)/g, '<span class=" ">$1</span>');

        // 3. Regex for object properties (before a colon)
        // Uses $& to replace the WHOLE MATCHED STRING (property name and colon) with the wrapped <span>
        // text = text.replace(/(\b('')\b\s*:)/g, '<span class="prob">$1</span>');

        // 4. Regex for operators and symbols (brackets, comma, colon, semicolon, equals sign)
        // Uses $& to replace the WHOLE MATCHED STRING with the wrapped <span>
        // text = text.replace(/([\[\]\{\}:;,=])/g, '<span class="">$1</span>');

        return text;
    }
    function typeLine() {
        if (lineIndex < lines.length) {
            const currentLine = lines[lineIndex];

            // Clean the line and add a final cursor
            const textToDisplay = highlightSyntax(currentLine.substring(0, charIndex)) + '<span class=""></span>';

            // Append the line to the pre element
            // We use innerHTML directly to allow for the span tags from highlighting
            if (charIndex === 0) {
                typingTextElement.innerHTML += '<div id="line-' + lineIndex + '"' + textToDisplay + '</div>';
            } else {
                // Update the current line element
                document.getElementById('line-' + lineIndex).innerHTML = textToDisplay;
            }

            charIndex++;

            if (charIndex > currentLine.length) {
                // Remove the cursor from the finished line
                document.getElementById('line-' + lineIndex).innerHTML = highlightSyntax(currentLine);

                // Move to the next line
                lineIndex++;
                charIndex = 0;

                // Add a slight pause before starting the next line
                setTimeout(typeLine, 500);
            } else {
                // Continue typing the current line
                setTimeout(typeLine, 50); // Typing speed (milliseconds per character)
            }
        } else {
            // Animation finished: remove the final cursor
            const lastLineElement = document.getElementById('line-' + (lines.length - 1));
            if (lastLineElement) {
                lastLineElement.innerHTML = highlightSyntax(lines[lines.length - 1]);
            }
        }
    }

    // Start the typing animation
    typeLine();
});

//! ------------------------ NAV TOGGLE SCRIPT -----------------------------
const toggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

/* Toggle menu */
toggle.addEventListener("click", (e) => {
    e.stopPropagation(); // prevent document click
    toggle.classList.toggle("active");
    navLinks.classList.toggle("open");
});

/* Close menu when clicking outside */
document.addEventListener("click", (e) => {
    if (
        navLinks.classList.contains("open") &&
        !navLinks.contains(e.target) &&
        !toggle.contains(e.target)
    ) {
        navLinks.classList.remove("open");
        toggle.classList.remove("active");
    }
});

/* Close when clicking any nav link */
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        toggle.classList.remove("active");
    });
});


// ! --------------------- TIMELNE SCRIPT -----------------------------

const timelineItems = document.querySelectorAll(".experince-body");

function setActiveItem() {
    let closestItem = null;
    let closestDistance = Infinity;

    timelineItems.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const itemCenter = rect.top + rect.height / 2;
        const viewportCenter = window.innerHeight / 2;
        const distance = Math.abs(itemCenter - viewportCenter);

        if (distance < closestDistance) {
            closestDistance = distance;
            closestItem = item;
        }
    });

    // remove active from all
    timelineItems.forEach((item) =>
        item.classList.remove("active")
    );

    // activate closest
    if (closestItem) {
        closestItem.classList.add("active");
    }
}

window.addEventListener("scroll", setActiveItem);
window.addEventListener("load", setActiveItem);


// ! --------------------- LOADER SCRIPT -----------------------------


window.addEventListener("load", () => {
    setTimeout(() => {
        document.getElementById("dot-loader").classList.add("hide");
    }, 800);
});


// ! --------------------- GET IN TOUCH MESSAGE SCRIPT -----------------------------

 (function () {
            emailjs.init("Bcnt-Q6hbIVsX_Hdv");
        })();

        function sendEmail() {
            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const subject = document.getElementById("subject").value.trim();
            const message = document.getElementById("message").value.trim();

            if (!name || !email || !message) {
                alert("Please fill all required fields");
                return;
            }

            const params = {
                name: name,
                email: email,
                subject: subject,
                message: message
            };

            emailjs.send("service_8bhl16i", "template_mp5u4v5", params)
                .then(() => {
                    alert("Message sent successfully ✅");

                    // Clear form
                    document.getElementById("name").value = "";
                    document.getElementById("email").value = "";
                    document.getElementById("subject").value = "";
                    document.getElementById("message").value = "";
                })
                .catch((error) => {
                    alert("Failed to send message ❌");
                    console.log(error);
                });
        }