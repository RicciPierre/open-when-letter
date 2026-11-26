const letters = {
    "1": {
        title: "The one",
        message:
            "Plus que 23 jours before Christmaaaas let's get motivated !",
        music: "audio/1.mp3"
    },

    "2": {
        title: "The second",
        message:
            "J'aime très beaucoup mon bebou mais ....",
        video: "video/2.mp4", videoDelay: 5000
    },

    "3": {
        title: "The third",
        message:
            "Est-ce que Saint-Nicolas est passé dans tes pantoufles ?",
        video: "video/3.mp4", videoDelay: 5000
    },

    "4": {
        title: "The fourth",
        message:
            "Boomeeeeeeer alert !",
        popup: { image: "images/Smile-Friday.jpg", delay: 5000 }
    },

    "5": {
        title: "The fifth",
        message:
            "How you should feel waking up pwincess",
        video: "video/5.mp4", videoDelay: 5000
    },

    "6": {
        title: "The sixth",
        message:
            "Je crois que Saint-Nicolas est vraiment passé dans tes pantoufles cette fois-ci 👀"
    },

    "7": {
    title: "The seventh",
    message:
        "Toujours pas fatigué d'être that hot ?",
        popup: { image: "images/dog.jpeg", delay: 5000 }
    },

    "8": {
    title: "The eighth",
    message:
        "",
        video: "video/8.mp4", portrait: true, videoDelay: 0
    },

    "9": {
    title: "The ninth",
    message:
        "Ouuuuuuh it's your birthdayyyyyy le bebz ! <br> So grateful d'avoir un bebzibou à l'écoute, soft as a kwoissant, si drôle, toujours la à mes côtés. <br> J'espère pouvoir encore te fêter pendant pleins d'années, tu le mérites tellement ! <br> Happy birthday ! <br> Je t'aime ❤️",
        music: "audio/9.mp3"
    },

    "10": {
    title: "The tenth",
    message:
        "If you're thinking about me right now, just know that there's a very good chance I'm thinking about you too."
    },

    "11": {
    title: "The eleventh",
    message:
        "If you're thinking about me right now, just know that there's a very good chance I'm thinking about you too."
    },

    "12": {
    title: "The twelfth",
    message:
        "Happy moisiversaire hihi",
        music: "audio/12.mp3"
    },

    "13": {
    title: "The thirteenth",
    message:
    "Plus que 11 jours avant Noël !",
        popup: { image: "images/rpdr.gif.webp", delay: 10000 }
    },

    "14": {
    title: "The fourteenth",
    message:
    "Finir à 20h I don't even know her",
        music: "audio/14.mp3"
    },

    "15": {
    title: "The fifteenth",
    message:
    "If you're thinking about me right now, just know that there's a very good chance I'm thinking about you too."
    },

    "16": {
    title: "The sixteenth",
    message:
    "If you're thinking about me right now, just know that there's a very good chance I'm thinking about you too."
    },

    "17": {
    title: "The seventeenth",
    message:
    "If you're thinking about me right now, just know that there's a very good chance I'm thinking about you too."
    },

    "18": {
    title: "The eighteenth",
    message:
    "If you're thinking about me right now, just know that there's a very good chance I'm thinking about you too."
    },

    "19": {
    title: "The nineteenth",
    message:
    "If you're thinking about me right now, just know that there's a very good chance I'm thinking about you too."
    },

    "20": {
    title: "The twentieth",
    message:
    "If you're thinking about me right now, just know that there's a very good chance I'm thinking about you too."
    },

    "21": {
    title: "The twenty-first",
    message:
    "If you're thinking about me right now, just know that there's a very good chance I'm thinking about you too."
    },

    "22": {
    title: "The twenty-second",
    message:
    "If you're thinking about me right now, just know that there's a very good chance I'm thinking about you too."
    },

    "23": {
    title: "The twenty-third",
    message:
    "If you're thinking about me right now, just know that there's a very good chance I'm thinking about you too."
    },

    "24": {
    title: "The twenty-fourth",
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
    document.getElementById("letter-message").textContent = letter.message.replace(/<br\s*\/?>/gi, "\n");
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
        renderLetterExtras(letter);

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

gif.src = `images/envelope-opening ${gifNumber}.gif`;

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


// Extra content configured in const letters.
// Autoplay with sound is subject to the browser's permissions.
function createVideo(path, portrait = false) {
    const video = document.createElement("video");
    video.className = "letter-video" + (portrait ? " portrait" : "");
    video.controls = true;
    video.playsInline = true;
    video.preload = "auto";
    video.src = path;
    video.setAttribute("aria-label", "Video surprise");
    return video;
}

function tryAutoplay(media) {
    media.play().catch(() => {
        // Native controls remain available if autoplay is blocked.
    });
}

function showSurprise(content) {
    const dialog = document.createElement("dialog");
    dialog.className = "letter-surprise";
    dialog.setAttribute("aria-label", "Surprise");
    const close = document.createElement("button");
    close.className = "surprise-button";
    close.textContent = "Fermer ×";
    close.onclick = () => dialog.close();
    dialog.append(content, close);
    dialog.addEventListener("close", () => {
        if (content instanceof HTMLMediaElement) content.pause();
        dialog.remove();
    }, { once: true });
    dialog.addEventListener("click", e => {
        if (e.target === dialog) dialog.close();
    });
    document.body.append(dialog);
    dialog.showModal();
    if (content instanceof HTMLMediaElement) tryAutoplay(content);
}

function renderLetterExtras(letter) {
    if (!letter) return;
    const extras = document.getElementById("letter-extras");
    if (letter.video) {
        const video = createVideo(letter.video, letter.portrait);
        if (letter.videoDelay === 0) {
            extras.append(video);
            tryAutoplay(video);
        } else {
            setTimeout(() => showSurprise(video), letter.videoDelay ?? 5000);
        }
    }
    if (letter.popup) {
        const image = new Image();
        image.src = letter.popup.image;
        image.alt = "Surprise du jour";
        image.className = "surprise-image";
        setTimeout(() => showSurprise(image), letter.popup.delay);
    }
    if (letter.music) {
        const audio = new Audio(letter.music);
        audio.preload = "auto";
        const button = document.createElement("button");
        button.className = "surprise-button";
        button.textContent = "♫ Écouter";
        button.onclick = () => audio.paused ? tryAutoplay(audio) : audio.pause();
        audio.addEventListener("play", () => button.textContent = "Ⅱ Pause");
        audio.addEventListener("pause", () => button.textContent = "♫ Écouter");
        audio.addEventListener("ended", () => button.textContent = "♫ Réécouter");
        audio.addEventListener("error", () => {
            button.textContent = "Audio indisponible";
            button.disabled = true;
            console.error("Cannot load audio:", letter.music);
        });
        extras.append(button);
        tryAutoplay(audio);
        window.addEventListener("pagehide", () => audio.pause(), { once: true });
    }
}
