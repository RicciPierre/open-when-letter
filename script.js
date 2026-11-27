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
        "How you should feel waking up pwincess",
        video: "video/2.mp4", videoDelay: 2000
    },

    "3": {
        title: "The third",
        message:
        "Est-ce que Saint-Nicolas est passé dans tes pantoufles ?",
        video: "video/3.mp4", question: true, questionDelay: 2000
    },

    "4": {
        title: "The fourth",
        message:
        "Boomeeeeeeer alert !",
        popup: { image: "images/Smile-Friday.jpg", delay: 2000 }
    },

    "5": { title: "The fifth", message: "", game: "murdle" },

    "6": {
        title: "The sixth",
        message:
        "Je crois que Saint-Nicolas est vraiment passé dans tes pantoufles cette fois-ci 👀"
    },

    "7": {
        title: "The seventh",
        message:
        "Qu'est-ce qui est magnifique mais me réveille de façon sporadique ?",
        popup : { image : "images/7.jpeg", delay : 2000 }
    },

    "8": {
        title: "The eighth",
        message:
        "J'aime très beaucoup mon bebou mais ....",
        video: "video/8.mp4", videoDelay: 2000
    },

    "9": {
    title: "The ninth",
        message:
        "Ouuuuuuh it's your birthdayyyyyy le bebz ! <br> So grateful d'avoir un bebzibou à l'écoute, soft as a kwoissant, si drôle, toujours la à mes côtés. <br> J'espère pouvoir encore te fêter pendant pleins d'années, tu le mérites tellement ! <br> Happy birthday ! <br> Je t'aime ❤️",
        music: "audio/9.mp3"
    },

    "10": { title: "The tenth", message: "", game: "drag" },

    "11": {
        title: "The eleventh",
        message:
        "Toujours pas fatigué d'être that hot ?",
        popup: { image: "images/dog.jpeg", delay: 2000 }
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
        popup: { image: "images/rpdr.gif.webp", delay: 2000 }
    },

    "14": {
        title: "The fourteenth",
        message:
        "Finir à 20h I don't even know her",
        music: "audio/14.mp3", delay : 4000
    },

    "15": {
        title: "The fifteenth",
        message:
        "Is it....",
        popup : { video : "video/15.mp4" , videoDelay : 1000 }
    },

    "16": {
        title: "The sixteenth",
        message:
        "La semaine est bientôt fi...",
        popup : { image : "images/16.gif", delay : 2000 }
    },

    "17": { title: "The seventeenth", message: "", game: "cemantix" },

    "18": {
        title: "The eighteenth",
        message:
        "",
        video: "video/18.mp4", portrait: true, videoDelay: 0
    },

   "19": {
        title: "The nineteenth",
        message: "",
        countdownStart: "2026-12-19T00:00:00+01:00",
        countdown: "2026-12-24T00:00:00+01:00"
    },

    "20": {
        title: "The twentieth",
        message:
        "Qu'est-ce qui est grand et brillant comme un diamand ?",
        popup: { image: "images/20.jpeg", delay: 2000 }
    },

    "21": {
        title: "The twenty-first",
        message:
        "Gooooood morning ptit muffin remplis de douceur à l'amande de mon coeur",
        music : "audio/21.mp3" 
    },

    "22": { title: "The twenty-second", message: "", game: "bebou" },

    "23": {
        title: "The twenty-third",
        message:
        "J-1 avant les cadeaux mouhahahaahahha"
    },

    "24": {
        title: "The twenty-fourth",
        message:
        "I'm almost heeeeeeere",
        popup: { image: "images/24.gif", delay: 2000 }
    },

    "25": {
        title: "The twenty-fifth",
        message:
        "Merry Kristler ! ",
        music : "audio/25.mp3"
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
    document.querySelectorAll('.birthday-balloon, .love-heart, .christmas-snow, .gift-rain').forEach(el => el.remove());
    saint.classList.remove('show');
    extras.replaceChildren();
    page.classList.remove('murdoku-open', 'letter-open', 'reading-open', 'countdown-open');
    text.classList.add('hidden');
    text.scrollTop = 0;
}

function showHome() {
    stopLetter();
    page.hidden = true;
    home.hidden = false;
    window.scrollTo(0, 0);
    home.scrollTop = homeScroll;
}

function playMedia(media) {
    return media.play().then(() => true).catch(() => false);
}

// Start audible music directly in the envelope click. Only videos are
// primed silently for their later reveal; browser policies may still block playback.
function prepareMedia(session) {
    const item = session.letter;
    if (!item.music && !item.video && !item.popup?.video) return;
    const media = document.createElement(item.music ? 'audio' : 'video');
    session.media = media;
    media.preload = 'auto';
    media.controls = true;
    media.playsInline = true;
    media.loop = session.day === 25 && Boolean(item.music);
    media.setAttribute('playsinline', '');
    media.src = item.music || item.video || item.popup.video;
    media.className = item.music ? 'letter-audio' : 'letter-video' + (item.portrait ? ' portrait' : '');
    media.classList.add('media-preparing');
    page.append(media);

    // Music starts audibly during the actual envelope click.
    if (item.music) {
        media.muted = false;
        session.priming = playMedia(media);
        return;
    }

    // Day 3 must wait for the recipient to choose Non.
    if (item.question) return;

    // Other videos retain their existing delayed reveal.
    media.muted = true;
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
    if (!session.letter.music) {
        try { media.currentTime = 0; } catch (_) {}
    }
    media.muted = false;
    // Music already started by the click must not be restarted.
    if (session.letter.music && !media.paused) return;
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

// December 3: ask the question before revealing the video.
function showSaintNicolasQuestion(session) {
    if (active !== session) return;

    const dialog = document.createElement('dialog');
    dialog.className = 'letter-surprise';
    dialog.setAttribute('aria-label', 'Question de Saint-Nicolas');

    const question = document.createElement('p');
    question.textContent = session.letter.message;

    const choices = document.createElement('div');
    choices.className = 'surprise-choices';

    const yes = document.createElement('button');
    yes.className = 'surprise-button';
    yes.textContent = 'Oui';

    const no = document.createElement('button');
    no.className = 'surprise-button';
    no.textContent = 'Non';

    yes.onclick = () => dialog.close();
    no.onclick = () => {
        if (active !== session) return;
        dialog.close();
        // Play directly within the Non click for better audible autoplay.
        showSurprise(session, session.media);
    };

    choices.append(yes, no);
    dialog.append(question, choices);
    dialog.addEventListener('close', () => dialog.remove(), { once: true });
    document.body.append(dialog);
    dialog.showModal();
}

function finishOpening(session) {
    if (active !== session || session.finished) return;
    session.finished = true;
    gif.src = finalLetter.src;
    text.classList.remove('hidden');
    const item = session.letter;
    page.classList.add('letter-open');
    if (item.countdown) page.classList.add('countdown-open');
    if (item.message.length > 160 || item.music || (item.video && item.videoDelay === 0) || item.countdown) page.classList.add('reading-open');
    if (item.countdown) startHolidayCountdown(session);
    if (item.game) showCalendarGame(session);
    if (item.question) later(session, () => showSaintNicolasQuestion(session), item.questionDelay ?? 0);
    else if (item.music || (item.video && item.videoDelay === 0)) revealMedia(session, extras);
    else if (item.video) later(session, () => showSurprise(session, session.media), item.videoDelay ?? 5000);
    if (item.popup?.video) {
        later(session, () => showSurprise(session, session.media), item.popup.videoDelay ?? item.popup.delay ?? 0);
    } else if (item.popup?.image) {
        const image = new Image();
        image.src = item.popup.image;
        image.alt = 'Surprise du jour';
        image.className = 'surprise-image';
        later(session, () => showSurprise(session, image), item.popup.delay);
    }
    if (session.day === 6) showSaintNicolas();
    if (session.day === 9) launchBirthdayBalloons();
    if (session.day === 12) launchLoveHearts();
    if (session.day === 23) launchGiftRain(session);
    if (session.day === 25) launchChristmasSnow();
}



// December 19: countdown from December 19 to December 24, 2026.
function startHolidayCountdown(session) {
    const message = document.getElementById('letter-message');

    const start = Date.parse(session.letter.countdownStart);
    const target = Date.parse(session.letter.countdown);

    function tick() {
        if (active !== session) return;

        const now = Math.max(Date.now(), start);

        let seconds = Math.max(0, Math.ceil((target - now) / 1000));

        if (!seconds) {
            message.textContent = 'Ça y est, les vacances !!! 🎄';
            return;
        }

        const days = Math.floor(seconds / 86400);
        seconds %= 86400;

        const hours = Math.floor(seconds / 3600);
        seconds %= 3600;

        const minutes = Math.floor(seconds / 60);
        seconds %= 60;

        const pad = n => String(n).padStart(2, '0');

        message.replaceChildren(document.createTextNode('Plus que '));

        const clock = document.createElement('span');
        clock.className = 'holiday-countdown';

        for (const [value, label] of [[days, 'jours'], [hours, 'heures'], [minutes, 'minutes'], [seconds, 'secondes']]) {
            const unit = document.createElement('span');
            unit.className = 'countdown-unit';
            const number = document.createElement('strong');
            number.textContent = pad(value);
            const caption = document.createElement('small');
            caption.textContent = label;
            unit.append(number, caption);
            clock.append(unit);
        }

        message.append(clock, document.createTextNode(' avant les vacances !!!'));

        later(session, tick, 1000 - (Date.now() % 1000));
    }

    tick();
}


// December 23: a shower of Christmas presents fills the page.
function launchGiftRain(session) {
    if (active !== session) return;

    document.querySelector('.gift-rain')?.remove();

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const rain = document.createElement('div');
    rain.className = 'gift-rain';
    rain.setAttribute('aria-hidden', 'true');
    document.body.append(rain);

    const colors = [
        ['#91474e', '#e4bf72'],
        ['#64795c', '#fff1d9'],
        ['#d6a0a8', '#91474e'],
        ['#bb955d', '#f8e9ca'],
        ['#8098b9', '#e4c681'],
        ['#79404d', '#dfb66c']
    ];

    const total = window.innerWidth < 700 ? 70 : 110;

    for (let i = 0; i < total; i++) {
        const gift = document.createElement('div');
        gift.className = 'christmas-gift';

        const [box, ribbon] = colors[Math.floor(Math.random() * colors.length)];
        const size = 26 + Math.random() * 32;

        gift.style.setProperty('--size', `${size}px`);
        gift.style.setProperty('--left', `${Math.random() * 96}%`);
        gift.style.setProperty('--duration', `${1.9 + Math.random() * 3.2}s`);
        gift.style.setProperty('--delay', `${Math.random() * 4.5}s`);
        gift.style.setProperty('--rotation', `${Math.random() * 90 - 45}deg`);
        gift.style.setProperty('--pile', `${Math.random() * 120}px`);

        gift.innerHTML = `
            <svg viewBox="0 0 60 60" aria-hidden="true" focusable="false">
                <rect x="7" y="23" width="46" height="34" rx="2" fill="${box}" stroke="#584638"/>
                <rect x="4" y="18" width="52" height="10" rx="2" fill="${box}" stroke="#584638"/>
                <path d="M25 18V57H35V18Z" fill="${ribbon}"/>
                <path d="M30 18 C0 17 9 -5 30 18 C51 -5 60 17 30 18" fill="none" stroke="${ribbon}" stroke-width="5"/>
            </svg>
        `;

        rain.append(gift);
    }

    // stopLetter removes the entire gift layer on navigation.
}


// December 20: original 6 x 6 Murdoku-style puzzle.
function showMurdoku(session) {
    if (active !== session) return;
    page.classList.add('murdoku-open');
    const names = ['Mon cœur', 'Le bebou', 'Le muffin', 'Le kwoissant', 'Le lutin', 'Le renne'];
    const initials = ['C', 'B', 'M', 'K', 'L', 'R'];
    // One source of illustrations for both the board and the legend.
    const furnitureArt = [
        '<path d="M0 20H60 M0 40H60" stroke="#b7a490" opacity=".22"/>',
        '<rect x="13" y="10" width="34" height="11" rx="4" fill="#98694d" stroke="#76533d"/><rect x="15" y="20" width="30" height="27" rx="6" fill="#b78962" stroke="#76533d" stroke-width="2"/><rect x="19" y="24" width="22" height="19" rx="3" fill="#dfb49c"/>',
        '<rect x="6" y="5" width="48" height="50" rx="3" fill="#b77b7c" stroke="#96595c"/><rect x="11" y="10" width="38" height="40" fill="none" stroke="#f0d1ac" stroke-width="2"/><path d="M30 15L44 30 30 45 16 30Z" fill="#e7bfa3" stroke="#98696b"/>',
        '<rect x="5" y="10" width="50" height="38" rx="6" fill="#71866d" stroke="#465e4b" stroke-width="2"/><rect x="12" y="17" width="36" height="26" rx="3" fill="#9cae91"/><rect x="10" y="10" width="40" height="9" rx="3" fill="#62795d"/><path d="M30 19V43" stroke="#62795d"/>',
        '<rect x="6" y="6" width="48" height="48" rx="6" fill="#a57a52" stroke="#785638" stroke-width="2"/><rect x="11" y="11" width="38" height="38" rx="4" fill="#bc946d" stroke="#89643f"/><path d="M14 18H46 M14 32H46 M14 44H46" stroke="#9c7651" opacity=".5"/>',
        '<circle cx="30" cy="30" r="25" fill="#3d6345" stroke="#2e4c34"/><circle cx="30" cy="30" r="19" fill="#577c51"/><circle cx="31.5" cy="28" r="12" fill="#77975f"/><circle cx="33" cy="26" r="5" fill="#e5bf69"/><g fill="#b84c55"><circle cx="14" cy="22" r="3"/><circle cx="39" cy="14" r="3"/><circle cx="45" cy="35" r="3"/><circle cx="24" cy="47" r="3"/></g>',
        '<rect x="5" y="6" width="50" height="48" fill="#9f7d59" stroke="#725339" stroke-width="2"/>' + [0,1].map(k => [0,1,2,3,4].map(j => `<rect x="${10+j*8}" y="${11+k*22}" width="6" height="17" fill="${["#913e4c","#78856c","#d2af76","#78899e","#d3b49a"][(j+k)%5]}"/>`).join('') + `<path d="M8 ${29+k*22}H52" stroke="#644b38" stroke-width="3"/>`).join('')
    ];
    function furnitureIcon(type) {
        const icon = document.createElement('span');
        icon.className = 'murdoku-symbol';
        icon.setAttribute('aria-hidden', 'true');
        icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60" focusable="false" aria-hidden="true">${furnitureArt[type]}</svg>`;
        return icon;
    }
    const objects = ['sol libre', 'chaise', 'tapis', 'canapé', 'table', 'sapin', 'étagère'];
    const rooms = ['Salon', 'Cuisine', 'Bibliothèque', 'Chambre'];
    const clues = [
        'La victime était seule avec le meurtrier dans une même pièce.',
        'Il était assis sur une chaise.',
        'Il se trouvait sur un tapis.',
        'Il était assis sur un canapé.',
        'Il était seul dans la bibliothèque.',
        'Il se trouvait sur une case directement voisine d’une étagère (pas en diagonale), sans mur entre lui et cette étagère.'
    ];
    const layout = [
        [0,2,0,0,0,6],
        [3,3,0,5,0,6],
        [0,4,0,0,0,0],
        [0,2,5,0,0,1],
        [2,0,0,1,0,0],
        [0,4,1,0,0,0]
    ];
    const roomOf = (r,c) => Math.floor(r/3)*2 + Math.floor(c/3);
    const besideShelf = (r,c) => [[-1,0],[1,0],[0,-1],[0,1]].some(([dr,dc]) => {
        const rr=r+dr, cc=c+dc;
        return layout[rr]?.[cc] === 6 && roomOf(rr,cc)===roomOf(r,c);
    });
    const crosses = new Set();
    let markMode = false;
    const positions = Array(6).fill(null);
    let selected = 0;
    const root = document.createElement('section');
    root.className = 'murdoku';
    root.innerHTML = `
      <div class="murdoku-kicker">❦ DOSSIER CONFIDENTIEL · 20 DÉC. ❦</div>
      <h2>Le mystère du réveillon</h2>
      <p>Mon cœur a été retrouvé sans défense. Un seul suspect se trouvait avec lui dans la même pièce. À toi de démasquer le coupable !</p>
      <details open><summary>Règles de l'enquête</summary>
        <p>Place les six personnages en respectant leurs indices : une personne par ligne et par colonne. Les tables, sapins et étagères sont infranchissables. Les chaises, tapis, canapés et sols libres sont accessibles. À côté signifie juste au-dessus, au-dessous, à gauche ou à droite, dans la même pièce. La victime partage sa pièce avec exactement un suspect.</p>
      </details>
      <div class="murdoku-people" aria-label="Personnages et indices"></div>
      <div class="murdoku-rooms"></div>
      <div class="murdoku-tools"><button type="button" class="surprise-button" data-mark aria-pressed="false">✕ Marquer les cases</button></div><div class="murdoku-grid" role="group" aria-label="Plan des quatre pièces"></div>
      <p class="murdoku-help">Sélectionne un personnage puis une case, ou active le mode ✕ pour éliminer des cases. Les lignes et colonnes occupées sont légèrement ombrées.</p>
      <label class="murdoku-verdict">Qui est le meurtrier ?<select aria-label="Choisir le meurtrier"><option value="">Choisir un suspect…</option></select></label>
      <div class="murdoku-actions"><button type="button" class="surprise-button" data-check>Vérifier l'enquête</button><button type="button" class="surprise-button" data-reset>Recommencer</button></div>
      <p class="murdoku-status" role="status" aria-live="polite"></p>`;
    extras.append(root);
    const mark = root.querySelector('[data-mark]');
    mark.onclick = () => { markMode = !markMode; mark.setAttribute('aria-pressed', String(markMode)); render(); };
    const people = root.querySelector('.murdoku-people');
    const board = root.querySelector('.murdoku-grid');
    const legend = root.querySelector('.murdoku-rooms');
    const verdict = root.querySelector('select');
    const status = root.querySelector('.murdoku-status');
    const personButtons = [], cells = [];
    function say(message, success = false) {
        status.textContent = message;
        status.classList.toggle('solved', success);
    }
    names.forEach((name,i) => {
        const b = document.createElement('button');
        b.type = 'button'; b.className = 'murdoku-person';
        const heading = document.createElement('strong'); heading.textContent = `${initials[i]} · ${name}${i===0?' (victime)':''}`;
        const clue = document.createElement('span'); clue.textContent = clues[i]; b.append(heading, clue);
        b.setAttribute('aria-label', `${name} : ${clues[i]}`);
        b.onclick = () => { selected = i; markMode = false; mark.setAttribute('aria-pressed', 'false'); render(); };
        people.append(b); personButtons.push(b);
        if (i) verdict.add(new Option(name, String(i)));
    });
    rooms.forEach((name,i) => {
        const tag = document.createElement('span'); tag.className = `room-${i}`;
        tag.textContent = name; legend.append(tag);
    });
    for (let r=0;r<6;r++) for (let c=0;c<6;c++) {
        const b = document.createElement('button'); b.type = 'button';
        b.className = `murdoku-cell room-${roomOf(r,c)}`;
        if (r===2) b.classList.add('room-bottom');
        if (c===2) b.classList.add('room-right');
        b.onclick = () => {
            const existing = positions.findIndex(p => p && p[0]===r && p[1]===c);
            if (markMode) {
                if (existing!==-1) return say('Retire d’abord le personnage.');
                const key = r*6+c;
                if (crosses.has(key)) crosses.delete(key); else crosses.add(key);
                say(''); render(); return;
            }
            crosses.delete(r*6+c);
            if (existing===selected) positions[selected] = null;
            else if (existing!==-1) { say('Cette case est déjà occupée. Retire d’abord le personnage.'); return; }
            else { positions[selected] = [r,c]; }
            say(''); render();
        };
        if (layout[r][c]>=4) { b.disabled = true; b.classList.add('obstacle'); }
        board.append(b); cells.push({b,r,c});
    }
    function render() {
        personButtons.forEach((b,i) => {
            b.setAttribute('aria-pressed', String(selected===i));
            b.classList.toggle('placed', !!positions[i]);
        });
        cells.forEach(({b,r,c}) => {
            const occupant = positions.findIndex(p => p && p[0]===r && p[1]===c);
            b.replaceChildren();
            b.append(furnitureIcon(layout[r][c]));
            b.classList.toggle('line-used', occupant===-1 && positions.some(p=>p && (p[0]===r || p[1]===c)));
            if (crosses.has(r*6+c)) { const x=document.createElement('span'); x.className='murdoku-cross'; x.textContent='×'; b.append(x); }
            if (occupant!==-1) {
                const mark = document.createElement('strong'); mark.textContent = initials[occupant]; b.append(mark);
            }
            b.setAttribute('aria-label', `${rooms[roomOf(r,c)]}, ligne ${r+1}, colonne ${c+1}, ${objects[layout[r][c]]}${occupant!==-1?', '+names[occupant]:''}`);
        });
    }
    verdict.onchange = () => say('');
    root.querySelector('[data-reset]').onclick = () => {
        positions.fill(null); crosses.clear(); selected=0; markMode=false; mark.setAttribute('aria-pressed','false'); verdict.value=''; say(''); render();
    };
    root.querySelector('[data-check]').onclick = () => {
        if (positions.some(p=>!p)) return say('Il reste des personnages à placer.');
        if (new Set(positions.map(p=>p[0])).size!==6 || new Set(positions.map(p=>p[1])).size!==6)
            return say('Deux personnages partagent une ligne ou une colonne.');
        if (positions.some(([r,c])=>layout[r][c]>=4)) return say('Un personnage occupe un obstacle.');
        if ([1,2,3].some(i=>layout[positions[i][0]][positions[i][1]]!==i)) return say('Vérifie les indices de la chaise, du tapis et du canapé.');
        if (roomOf(...positions[4])!==2 || positions.filter(p=>roomOf(...p)===2).length!==1) return say('Le lutin doit être seul dans la bibliothèque.');
        if (!besideShelf(...positions[5])) return say('Le renne doit être sur une case voisine d’une étagère, sans diagonale ni mur entre les deux.');
        const victimRoom = roomOf(...positions[0]);
        const suspects = positions.map((p,i)=>i && roomOf(...p)===victimRoom ? i : -1).filter(i=>i!==-1);
        if (suspects.length!==1) return say('Mon cœur doit se trouver seul avec un suspect dans sa pièce.');
        if (!verdict.value) return say('Il reste à désigner le meurtrier !');
        if (Number(verdict.value)!==suspects[0]) return say('La grille est correcte, mais revois ton accusation.');
        say('Affaire classée ! Le meurtrier : le bebou. La victime : mon cœur. Coupable de m’avoir fait mourir d’amour. Je t’aime ♡', true);
        launchLoveHearts();
    };
    const furniture = document.createElement('section');
    furniture.className = 'murdoku-furniture';
    furniture.setAttribute('aria-label', 'Légende des objets');
    const furnitureTitle = document.createElement('h3');
    furnitureTitle.textContent = 'Légende des objets';
    furniture.append(furnitureTitle);
    const furnitureGrid = document.createElement('div');
    furnitureGrid.className = 'murdoku-furniture-grid';
    objects.forEach((name, i) => {
        const item = document.createElement('div');
        item.className = 'murdoku-furniture-item';
        const icon = furnitureIcon(i);
        icon.classList.add('murdoku-furniture-icon');
        if (i >= 4) icon.classList.add('blocked');
        const label = document.createElement('span');
        const title = document.createElement('strong');
        title.textContent = name.charAt(0).toUpperCase() + name.slice(1);
        const rule = document.createElement('small');
        rule.textContent = i >= 4 ? 'Inaccessible' : 'Accessible';
        label.append(title, rule);
        item.append(icon, label);
        furnitureGrid.append(item);
    });
    furniture.append(furnitureGrid);
    legend.after(furniture);
    render();
}

function openLetter(day) {
    if (!Object.hasOwn(letters, day)) return showHome();
    if (!home.hidden) homeScroll = home.scrollTop;
    stopLetter();
    const session = {day: Number(day), letter: letters[day], timers: new Set(), media: null};
    active = session;
    home.hidden = true;
    page.hidden = false;
    window.scrollTo(0, 0);
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
// Four original Christmas calendar games.
function showCalendarGame(session) {
    if (active !== session) return;
    page.classList.add('murdoku-open');
    const root = document.createElement('section');
    root.className = 'murdoku calendar-game';
    extras.append(root);
    const el = (tag, value, parent=root) => { const n=document.createElement(tag); n.textContent=value; parent.append(n); return n; };
    const button = (label, fn, parent=root) => { const b=el('button',label,parent); b.type='button'; b.className='surprise-button'; b.onclick=fn; return b; };
    const heading = (title, intro) => { const k=el('div',`❦ DOSSIER DU ${session.day} DÉCEMBRE ❦`); k.className='murdoku-kicker'; el('h2',title); el('p',intro); };
    const status = () => { const s=el('p',''); s.className='murdoku-status'; s.setAttribute('role','status'); return s; };
    function win(s, message) { if (s.classList.contains('solved')) return; s.textContent=message; s.classList.add('solved'); launchLoveHearts(); }
    function selectField(label, choices, parent=root) {
        const wrap=el('label','',parent); wrap.className='game-field';
        el('span',label,wrap); const select=el('select','',wrap);
        el('option','Choisir…',select).value='';
        choices.forEach(x=>el('option',x,select).value=x); return select;
    }
    if (session.letter.game==='murdle') {
        const people=['Le bebou','Le lutin','Le renne','Le bonhomme de neige'];
        const places=['Salon','Cuisine','Atelier','Jardin'];
        const things=['Gui','Ruban','Clochette','Boule de Noël'];
        heading('Le crime sous le gui','Mon cœur a été retrouvé sans vie dans le salon. Quatre suspects étaient présents, chacun dans un lieu différent et avec un objet différent.');
        el('p','Lis les indices. Les trois grilles sont ton brouillon : touche une case pour passer de · (inconnu) à × (impossible), puis ✓ (certain). Tu peux résoudre directement avec les trois menus du verdict, même sans remplir les grilles.');
        const ul=el('ol',''); ['Le lutin était dans l’atelier.','Le renne était dans le jardin.','Le bonhomme de neige ne se trouvait pas dans le salon.','La boule de Noël était dans l’atelier.','Le ruban était dans le jardin.','La clochette était dans la cuisine.','Mon cœur a été retrouvé dans le salon, sous le gui.'].forEach(c=>el('li',c,ul));
        el('h3','Ton carnet de déductions');
        const tabs=el('div',''); tabs.className='game-tabs'; tabs.setAttribute('role','tablist');
        const panels=el('div',''); const resetters=[], buttons=[], sections=[];
        const switchTab=i=>{sections.forEach((p,j)=>p.hidden=i!==j);buttons.forEach((b,j)=>b.setAttribute('aria-selected',String(i===j)));};
        [[people,places,'Suspects / Lieux'],[people,things,'Suspects / Objets'],[places,things,'Lieux / Objets']].forEach(([rows,cols,label],i)=>{
            const tab=button(label,()=>switchTab(i),tabs); tab.setAttribute('role','tab'); tab.id='logic-tab-'+i; tab.setAttribute('aria-controls','logic-panel-'+i); buttons.push(tab);
            const panel=el('div','',panels); panel.id='logic-panel-'+i; panel.setAttribute('role','tabpanel'); panel.setAttribute('aria-labelledby',tab.id); sections.push(panel);
            const table=el('table','',panel); table.className='logic-grid'; const hr=el('tr','',table); el('th','',hr); cols.forEach(c=>el('th',c,hr).scope='col');
            rows.forEach(r=>{const tr=el('tr','',table); el('th',r,tr).scope='row'; cols.forEach(c=>{const td=el('td','',tr); let mark=0; const b=button('·',()=>{mark=(mark+1)%3;paint();},td); b.className=''; const paint=()=>{b.textContent=['·','×','✓'][mark];b.dataset.mark=mark;b.setAttribute('aria-label',`${r} / ${c} : ${['inconnu','impossible','certain'][mark]}`);};paint();resetters.push(()=>{mark=0;paint();});});});
        });switchTab(0);
        el('p','· Inconnu   × Impossible   ✓ Certain');
        el('h3','Ton accusation finale'); const who=selectField('Qui est le meurtrier ?',people), where=selectField('Où le crime a-t-il eu lieu ?',places), what=selectField('Quel objet était associé au crime ?',things);
        const s=status(); const fields=[who,where,what]; fields.forEach(f=>f.onchange=()=>{s.textContent='';s.classList.remove('solved');});
        button('Résoudre l’affaire',()=>{if(fields.some(f=>!f.value)){s.textContent='Complète les trois réponses.';return;}if(who.value==='Le bebou'&&where.value==='Salon'&&what.value==='Gui')win(s,'Affaire classée ! Le bebou, dans le salon, sous le gui. Victime : mon cœur. Coupable de m’avoir fait mourir d’amour ♡');else s.textContent='Pas tout à fait ! Relis les indices.';});
        button('Recommencer',()=>{resetters.forEach(f=>f());fields.forEach(f=>f.value='');s.textContent='';s.classList.remove('solved');switchTab(0);}); return;
    }
    if (session.letter.game==='drag') {
        root.classList.add('drag-dossier');
        heading('The Missing Wig','Oh, pit crew! La perruque rose de Trixie Mattel a disparu avant le runway. RuPaul refuse de commencer le défilé tant que l’affaire n’est pas résolue. Scénario entièrement fictif.');
        el('p','Ouvre les six pièces à conviction, puis rends ton verdict.');
        const evidence=[['Le témoignage de Bianca','J’étais dans la loge. J’ai entendu quelqu’un répéter un numéro de comédie dans la Werk Room.'],['Le témoignage de Trixie','Ma perruque était encore dans sa boîte avant que je parte sur le Main Stage.'],['Le témoignage de Bob','J’ai vu Jinkx entrer dans la Werk Room avec une grande boîte rose.'],['Le planning du runway','Jinkx : Werk Room. Bianca : loge. Bob : Runway. Trixie : Main Stage.'],['La photographie','La boîte rose porte une étiquette au nom de Trixie Mattel.'],['Le message mystérieux','Oups ! J’ai emprunté la perruque pour mon numéro de comédie dans la Werk Room. Je la rapporte après la répétition. — J.M.']];
        el('h3','Les pièces à conviction'); const progress=el('p','0/6 examinées'); progress.setAttribute('aria-live','polite'); const examined=new Set(), cards=[];
        evidence.forEach(([name,detail],i)=>{const d=el('details','');d.className='drag-evidence';const summary=el('summary',name,d);el('p',detail,d);cards.push([d,summary]);d.addEventListener('toggle',()=>{if(d.open){examined.add(i);summary.textContent=name+' ✓';update();}});});
        el('h3','Your final verdict');
        const who=selectField('Qui a pris la perruque ?',['Jinkx Monsoon','Bianca Del Rio','Trixie Mattel','Bob the Drag Queen']);
        const where=selectField('Dans quelle pièce l’a-t-elle emportée ?',['Werk Room','Loge','Runway','Main Stage']);
        const why=selectField('Pour quelle raison ?',['Pour saboter le défilé','Pour répéter son numéro de comédie','Pour se venger de Trixie','Pour l’offrir à RuPaul']);
        const s=status(), fields=[who,where,why]; const submit=button('Révéler la vérité',()=>{if(fields.some(f=>!f.value)){s.textContent='Complète les trois réponses.';return;}if(who.value==='Jinkx Monsoon'&&where.value==='Werk Room'&&why.value==='Pour répéter son numéro de comédie')win(s,'Shantay, you stay! 👑 Condragulations, diva slay the house down boots ♡');else s.textContent='Something’s not right, queen! Réexamine les preuves.';});
        const update=()=>{progress.textContent=`${examined.size}/6 examinées`;submit.disabled=examined.size!==6;};update();
        fields.forEach(f=>f.onchange=()=>{s.textContent='';s.classList.remove('solved');});
        button('Recommencer l’enquête',()=>{cards.forEach(([d,summary],i)=>{d.open=false;summary.textContent=evidence[i][0];});examined.clear();update();fields.forEach(f=>f.value='');s.textContent='';s.classList.remove('solved');}); return;
    }
    if (session.letter.game==='cemantix') {
        heading('Cémantix du bebou','Devine le mot secret en proposant des mots proches par leur sens, et non par leur orthographe.');
        el('p','Version maison : cette version utilise un lexique de proximité préparé pour cette énigme. Un mot inconnu du lexique ne compte pas comme un essai.');
        const groups=[[95,'constellation constellationnel astral astre étoiles étoile firmament'],[85,'ciel nuit galaxie univers cosmos astronomie céleste voie lactée'],[75,'planète lune soleil satellite télescope comète météore nébuleuse espace'],[60,'lumière lumineux briller scintiller observation horizon obscurité'],[45,'science physique orbite infini distance temps rêve'],[25,'nature montagne mer forêt voyage amour hiver noël'],[10,'table chaise chat chien voiture maison cuisine pain livre musique travail']];
        const norm=x=>x.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');const scores=new Map();groups.forEach(([v,words])=>words.split(' ').forEach(w=>scores.set(norm(w),v)));scores.set('voie lactee',85);scores.set('constellation',100);
        const form=el('form','');form.className='word-form';const input=el('input','',form);input.placeholder='Ton mot…';input.setAttribute('aria-label','Mot proposé');input.autocomplete='off';const submit=el('button','Essayer',form);submit.type='submit';submit.className='surprise-button';const s=status();const list=el('div','');list.className='word-results';const tries=new Map();
        function render(){list.replaceChildren();[...tries].sort((a,b)=>b[1]-a[1]).forEach(([w,v])=>{const row=el('div','',list);row.className='word-row';el('strong',w,row);el('span',`${v} %`,row);const bar=el('div','',row);bar.className='word-bar';bar.style.setProperty('--score',v+'%');});}
        form.onsubmit=e=>{e.preventDefault();if(s.classList.contains('solved'))return;const w=norm(input.value);if(!w)return;if(!scores.has(w)){s.textContent='Mot absent du lexique : essaie un autre mot.';return;}tries.set(w,scores.get(w));render();input.value='';if(w==='constellation')win(s,'Bravo ! Le mot était CONSTELLATION. Tu es mon étoile ♡');else s.textContent=`${tries.size} essai(s) · ${scores.get(w)} % de proximité.`;};
        let hints=0;button('Un indice',()=>{if(!s.classList.contains('solved'))s.textContent=['Regarde vers le haut.','On en voit surtout la nuit.','Des étoiles forment ensemble une figure.'][Math.min(hints++,2)];});button('Recommencer',()=>{tries.clear();hints=0;render();s.textContent='';s.classList.remove('solved');});return;
    }
    heading('Où est le bebou ?','Le marché de Noël est bondé ! Retrouve le personnage aux cheveux courts et à la barbe, sans bonnet.');
    const board=el('div','');board.className='bebou-crowd';const s=status();let attempts=0;let target=0;
    function draw(){board.replaceChildren();target=Math.floor(Math.random()*48);attempts=0;s.textContent='';s.classList.remove('solved');for(let i=0;i<48;i++){const correct=i===target;const short=correct||i%3===0;const beard=correct||i%4===1||i%5===0;const hat=!correct&&short&&beard;const skin=['#f3c5a2','#b97e58','#e2a87e','#8c583e'][i%4];const hair=['#4b3429','#a86c3c','#382b29','#75614d'][i%4];const coat=['#91474e','#64795c','#536d95','#bc9252','#8b7394'][i%5];const b=el('button','',board);b.type='button';b.setAttribute('aria-label',`Personnage ${i+1} : ${hat?'bonnet':short?'cheveux courts':'cheveux longs'}, ${beard?'barbe':'sans barbe'}`);b.innerHTML=`<svg viewBox="0 0 56 76" aria-hidden="true"><path d="M12 76V60Q13 48 28 48Q43 48 44 60V76" fill="${coat}"/><path d="M18 76V65M38 76V65" stroke="#483e37"/><circle cx="28" cy="31" r="17" fill="${hair}"/><ellipse cx="28" cy="33" rx="13" ry="15" fill="${skin}"/>${short?`<path d="M15 27Q14 9 28 12Q43 10 42 27L35 20 21 21Z" fill="${hair}"/>`:`<path d="M13 22Q28 5 43 22V50L36 46V24L20 24V46L13 50Z" fill="${hair}"/>`}${beard?`<path d="M15 35Q16 53 28 51Q40 53 41 35L34 42H22Z" fill="${hair}"/>`:''}<g fill="#40322d"><circle cx="23" cy="31" r="1.5"/><circle cx="33" cy="31" r="1.5"/></g>${hat?`<path d="M11 23Q10 2 28 2Q46 2 45 23Z" fill="${coat}"/><rect x="9" y="20" width="38" height="7" rx="3" fill="#fff4da"/>`:''}<path d="M18 51H38L35 57H23Z" fill="${i%2?'#e6c890':'#e4ddd0'}"/></svg>`;b.onclick=()=>{if(s.classList.contains('solved'))return;attempts++;if(correct){b.classList.add('found');win(s,`Tu as retrouvé le bebou en ${attempts} essai(s) ! ♡`);}else{b.classList.add('miss');s.textContent='Ce n’est pas lui ! Observe ses cheveux, sa barbe et son bonnet.';}};}}
    button('Rejouer',draw);draw();
}