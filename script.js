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


// Single-page navigation and media lifecycle.
const home = document.querySelector('.home');
const page = document.querySelector('.letter-page');
const text = document.querySelector('.letter-text');
const extras = document.getElementById('letter-extras');
const gif = document.querySelector('.opening-gif');
const saint = document.querySelector('.saint-nicolas');
const finalLetter = new Image();
finalLetter.src = 'images/letter-final.png';
let active = null;
let homeScroll = 0;

function later(session, callback, delay) {
    const id = setTimeout(() => {
        session.timers.delete(id);
        if (active === session) callback();
    }, delay);
    session.timers.add(id);
}

function stopLetter() {
    const previous = active;
    active = null;
    if (previous) {
        previous.timers.forEach(clearTimeout);
        if (previous.media) {
            previous.media.pause();
            previous.media.removeAttribute('src');
            previous.media.load();
            previous.media.remove();
        }
    }
    gif.onload = gif.onerror = null;
    document.querySelectorAll('.letter-surprise').forEach(dialog => dialog.remove());
    document.querySelectorAll('.birthday-balloon, .love-heart, .christmas-snow').forEach(el => el.remove());
    saint.classList.remove('show');
    extras.replaceChildren();
    text.classList.add('hidden');
    text.scrollTop = 0;
}

function showHome() {
    stopLetter();
    page.hidden = true;
    home.hidden = false;
    home.scrollTop = homeScroll;
}

function playMedia(media) {
    return media.play().then(() => true).catch(() => false);
}

// Start playback within the actual envelope click. Keep it paused and
// rewind until the intended reveal time; browser policies can still block a restart.
function prepareMedia(session) {
    const item = session.letter;
    if (!item.music && !item.video) return;
    const media = document.createElement(item.music ? 'audio' : 'video');
    session.media = media;
    media.preload = 'auto';
    media.controls = true;
    media.playsInline = true;
    media.setAttribute('playsinline', '');
    media.src = item.music || item.video;
    media.className = item.music ? 'letter-audio' : 'letter-video' + (item.portrait ? ' portrait' : '');
    // Muted priming avoids leaking the surprise before the paper opens.
    media.muted = true;
    media.classList.add('media-preparing');
    page.append(media);
    session.priming = playMedia(media).then(ok => {
        if (active !== session || session.revealed) return ok;
        media.pause();
        try { media.currentTime = 0; } catch (_) {}
        return ok;
    });
}

function revealMedia(session, destination) {
    if (active !== session || !session.media) return;
    const media = session.media;
    session.revealed = true;
    media.classList.remove('media-preparing');
    destination.append(media);
    try { media.currentTime = 0; } catch (_) {}
    media.muted = false;
    // Native controls provide a fallback if audible autoplay is denied.
    playMedia(media).then(ok => {
        if (active !== session || ok || !media.paused || !media.isConnected) return;
        const button = document.createElement('button');
        button.className = 'surprise-button';
        button.textContent = session.letter.music ? '♫ Écouter' : '▶ Regarder';
        button.onclick = () => {
            media.muted = false;
            playMedia(media).then(success => { if (success) button.remove(); });
        };
        media.addEventListener('playing', () => button.remove(), { once: true });
        destination.append(button);
    });
}

function showSurprise(session, content) {
    if (active !== session) return;
    const dialog = document.createElement('dialog');
    dialog.className = 'letter-surprise';
    dialog.setAttribute('aria-label', 'Surprise');
    const holder = document.createElement('div');
    const close = document.createElement('button');
    close.className = 'surprise-button';
    close.textContent = 'Fermer ×';
    close.onclick = () => dialog.close();
    dialog.append(holder, close);
    dialog.addEventListener('close', () => {
        if (content instanceof HTMLMediaElement) content.pause();
        dialog.remove();
    }, { once: true });
    dialog.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });
    document.body.append(dialog);
    dialog.showModal();
    if (content instanceof HTMLMediaElement) revealMedia(session, holder);
    else holder.append(content);
}

function finishOpening(session) {
    if (active !== session || session.finished) return;
    session.finished = true;
    gif.src = finalLetter.src;
    text.classList.remove('hidden');
    const item = session.letter;
    if (item.music || (item.video && item.videoDelay === 0)) revealMedia(session, extras);
    else if (item.video) later(session, () => showSurprise(session, session.media), item.videoDelay ?? 5000);
    if (item.popup) {
        const image = new Image();
        image.src = item.popup.image;
        image.alt = 'Surprise du jour';
        image.className = 'surprise-image';
        later(session, () => showSurprise(session, image), item.popup.delay);
    }
    if (session.day === 6) showSaintNicolas();
    if (session.day === 9) launchBirthdayBalloons();
    if (session.day === 12) launchLoveHearts();
    if (session.day === 24) launchChristmasSnow();
}

function openLetter(day) {
    if (!Object.hasOwn(letters, day)) return showHome();
    if (!home.hidden) homeScroll = home.scrollTop;
    stopLetter();
    const session = {day: Number(day), letter: letters[day], timers: new Set(), media: null};
    active = session;
    home.hidden = true;
    page.hidden = false;
    document.getElementById('letter-title').innerHTML = session.letter.title;
    document.getElementById('letter-message').textContent = session.letter.message.replace(/<br\s*\/?>/gi, '\n');
    prepareMedia(session); // Must run synchronously inside the click handler.
    const gifNumber = ((session.day - 1) % 6) + 1;
    gif.onload = () => {
        gif.onload = null;
        later(session, async () => {
            try { await finalLetter.decode(); } catch (error) { console.error(error); }
            finishOpening(session);
        }, 1200);
    };
    gif.onerror = () => { gif.onerror = null; gif.onload = null; finishOpening(session); };
    // A fresh URL per opening restarts the GIF even when revisiting a colour.
    gif.src = `images/envelope-opening ${gifNumber}.gif?open=${Date.now()}`;
}

function route() {
    const day = new URLSearchParams(location.search).get('letter');
    if (day && Object.hasOwn(letters, day)) openLetter(day);
    else showHome();
}

home.querySelectorAll('.envelope').forEach(link => {
    const day = new URL(link.href).searchParams.get('letter');
    link.href = `index.html?letter=${day}`;
    link.addEventListener('click', event => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
        event.preventDefault();
        history.pushState({}, '', `?letter=${day}`);
        openLetter(day);
    });
});
page.querySelector('.back-link').addEventListener('click', event => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    history.pushState({}, '', location.pathname);
    showHome();
});
window.addEventListener('popstate', route);
window.addEventListener('pagehide', () => { if (active?.media) active.media.pause(); });
route();

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
