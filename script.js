const letters = {
    "1": {
        title: "Open When <br> You Miss Me",
        message:
            "I wish I could be there with you right now. Until then, just remember that I'm always thinking of you. I love you."
    },

    "2": {
        title: "Open When<br> You're Having A Bad Day",
        message:
            "It's okay to have bad days. Take a breath, take a break, and remember that tomorrow is another day. You've got this."
    },

    "3": {
        title: "Open When <br> You Need A Hug",
        message:
            "Consider this your virtual hug. Squeeze your pillow really tight and pretend it's me. I can't wait to hug you for real."
    },

    "4": {
        title: "Open When <br> You Can't Sleep",
        message:
            "Still awake? Close your eyes, get comfy, and imagine we're lying next to each other. Hopefully I'll see you in your dreams."
    },

    "5": {
        title: "Open When <br> You Need To Know I Love You",
        message:
            "I love you more than I could ever fit into a little letter, but I hope this reminds you just how much you mean to me."
    },

    "6": {
        title: "Open When <br> You're Thinking Of Me",
        message:
            "If you're thinking about me right now, just know that there's a very good chance I'm thinking about you too."
    },

    "7": {
    title: "Open When <br> You're Thinking Of Me",
    message:
        "If you're thinking about me right now, just know that there's a very good chance I'm thinking about you too."
    },

    "8": {
    title: "Open When <br> You're Thinking Of Me",
    message:
        "If you're thinking about me right now, just know that there's a very good chance I'm thinking about you too."
    },

    "9": {
    title: "Open When <br> You're Thinking Of Me",
    message:
        "If you're thinking about me right now, just know that there's a very good chance I'm thinking about you too."
    },

    "10": {
    title: "Open When <br> You're Thinking Of Me",
    message:
        "If you're thinking about me right now, just know that there's a very good chance I'm thinking about you too."
    },

    "11": {
    title: "Open When <br> You're Thinking Of Me",
    message:
        "If you're thinking about me right now, just know that there's a very good chance I'm thinking about you too."
    },

    "12": {
    title: "Open When <br> You're Thinking Of Me",
    message:
        "If you're thinking about me right now, just know that there's a very good chance I'm thinking about you too."
    },

    "13": {
    title: "Open When <br> You're Thinking Of Me",
    message:
    "If you're thinking about me right now, just know that there's a very good chance I'm thinking about you too."
    },

    "14": {
    title: "Open When <br> You're Thinking Of Me",
    message:
    "If you're thinking about me right now, just know that there's a very good chance I'm thinking about you too."
    },

    "15": {
    title: "Open When <br> You're Thinking Of Me",
    message:
    "If you're thinking about me right now, just know that there's a very good chance I'm thinking about you too."
    },

    "16": {
    title: "Open When <br> You're Thinking Of Me",
    message:
    "If you're thinking about me right now, just know that there's a very good chance I'm thinking about you too."
    },

    "17": {
    title: "Open When <br> You're Thinking Of Me",
    message:
    "If you're thinking about me right now, just know that there's a very good chance I'm thinking about you too."
    },

    "18": {
    title: "Open When <br> You're Thinking Of Me",
    message:
    "If you're thinking about me right now, just know that there's a very good chance I'm thinking about you too."
    },

    "19": {
    title: "Open When <br> You're Thinking Of Me",
    message:
    "If you're thinking about me right now, just know that there's a very good chance I'm thinking about you too."
    },

    "20": {
    title: "Open When <br> You're Thinking Of Me",
    message:
    "If you're thinking about me right now, just know that there's a very good chance I'm thinking about you too."
    },

    "21": {
    title: "Open When <br> You're Thinking Of Me",
    message:
    "If you're thinking about me right now, just know that there's a very good chance I'm thinking about you too."
    },

    "22": {
    title: "Open When <br> You're Thinking Of Me",
    message:
    "If you're thinking about me right now, just know that there's a very good chance I'm thinking about you too."
    },

    "23": {
    title: "Open When <br> You're Thinking Of Me",
    message:
    "If you're thinking about me right now, just know that there's a very good chance I'm thinking about you too."
    },

    "24": {
    title: "Open When <br> You're Thinking Of Me",
    message:
    "If you're thinking about me right now, just know that there's a very good chance I'm thinking about you too."
    },
};

// fetching the letter name
const params = new URLSearchParams(window.location.search);
const letterId = params.get("letter");

const letter = letters[letterId];

if (letter) {
    document.getElementById("letter-title").innerHTML = letter.title;
    document.getElementById("letter-message").textContent = letter.message;
} else {
     document.getElementById("letter-title").textContent = "Letter not found.";
    document.getElementById("letter-message").textContent = "Hmm this letter doesn't seem to exist.";
}




const letterText = document.querySelector(".letter-text");
const gif = document.querySelector(".opening-gif");

// Select the correct envelope colour
const gifNumber = ((Number(letterId) - 1) % 6) + 1;

// Preload the final letter image
const finalLetter = new Image();
finalLetter.src = "images/letter-final.png";

// Opening animation
gif.addEventListener("load", () => {

    setTimeout(async () => {

        // Make sure the final image is ready
        try {
            await finalLetter.decode();
        } catch (error) {
            console.error("Final image failed to load", error);
            return;
        }

        // Replace the GIF without fading
        gif.src = finalLetter.src;

        // Reveal the letter text
        letterText.classList.remove("hidden");

        // December 6 - Saint Nicolas
        if (Number(letterId) === 6) {
            showSaintNicolas();
        }

        // December 9 - Birthday
        if (Number(letterId) === 9) {
            launchBirthdayBalloons();
        }

        // December 12 - Hearts
        if (Number(letterId) === 12) {
            launchLoveHearts();
        }

        // December 24 - Snow
        if (Number(letterId) === 24) {
            launchChristmasSnow();
        }

    }, 1200);

}, { once: true });

gif.src = `images/envelope-opening ${gifNumber}.GIF`;

function launchBirthdayBalloons() {

    const colors = [
        "#E8A0BF", // Pink
        "#A8C4E0", // Blue
        "#B5A4D6", // Purple
        "#F4D58D", // Yellow
        "#A8D5BA", // Green
        "#F3B49F"  // Peach
    ];

    for (let i = 0; i < 30; i++) {

        const balloon = document.createElement("div");

        balloon.classList.add("birthday-balloon");
        balloon.setAttribute("aria-hidden", "true");

        // Random horizontal position
        balloon.style.left = Math.random() * 95 + "%";

        // Random colour
        balloon.style.backgroundColor =
            colors[Math.floor(Math.random() * colors.length)];

        // Random size
        const size = 25 + Math.random() * 25;

        balloon.style.width = size + "px";
        balloon.style.height = size * 1.25 + "px";

        // Random floating speed
        balloon.style.animationDuration =
            4 + Math.random() * 4 + "s";

        // Random starting delay
        balloon.style.animationDelay =
            Math.random() * 3 + "s";

        document.body.appendChild(balloon);

        // Remove the balloon once its animation finishes
        balloon.addEventListener("animationend", () => {
            balloon.remove();
        });

    }
}


function launchChristmasSnow() {

    const snowflakes = ["❄", "❅", "❆", "•"];

    for (let i = 0; i < 80; i++) {

        const snow = document.createElement("span");

        snow.classList.add("christmas-snow");
        snow.setAttribute("aria-hidden", "true");

        // Random snowflake shape
        snow.textContent =
            snowflakes[Math.floor(Math.random() * snowflakes.length)];

        // Random horizontal position
        snow.style.left = Math.random() * 100 + "%";

        // Random size
        snow.style.fontSize = 5 + Math.random() * 15 + "px";

        // Random transparency
        snow.style.opacity = 0.3 + Math.random() * 0.7;

        // Random falling speed
        snow.style.animationDuration =
            5 + Math.random() * 10 + "s";

        // Random starting delay
        snow.style.animationDelay =
            Math.random() * 5 + "s";

        document.body.appendChild(snow);
    }
}

function showSaintNicolas() {
    const saintNicolas = document.querySelector(".saint-nicolas");

    if (saintNicolas) {
        saintNicolas.classList.add("show");
    }
}


function launchLoveHearts() {

    const colors = [
        "#B94E60", // Muted red
        "#D88C9A", // Dusty pink
        "#E9B5BD", // Soft pink
        "#873C50", // Burgundy
        "#C86B79", // Rose
        "#DCA29A"  // Peach pink
    ];

    for (let i = 0; i < 30; i++) {

        const heart = document.createElement("span");

        heart.classList.add("love-heart");
        heart.setAttribute("aria-hidden", "true");

        heart.textContent = "♥";

        // Random horizontal position
        heart.style.left = Math.random() * 95 + "%";

        // Random colour
        heart.style.color =
            colors[Math.floor(Math.random() * colors.length)];

        // Random size
        heart.style.fontSize =
            14 + Math.random() * 24 + "px";

        // Random floating speed
        heart.style.animationDuration =
            4 + Math.random() * 4 + "s";

        // Random starting delay
        heart.style.animationDelay =
            Math.random() * 3 + "s";

        document.body.appendChild(heart);

        // Remove the heart after the animation
        heart.addEventListener("animationend", () => {
            heart.remove();
        });
    }
}
