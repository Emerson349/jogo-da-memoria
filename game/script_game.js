// Seção para o carregamento das cartas

const deck = {
    "css": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
    "html": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
    "js": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
    "java": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
    "python": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
    "vsCode": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg",
    "kotlin": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg",
    "c": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg",
    "gitHub": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
    "mySql": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg"
}

const container = document.querySelector('.main-container');
const player = document.querySelector('.player');
const time = document.querySelector('.time');

const createImg = (imgUrl, deckElement) => {
    const img = document.createElement('img');
    img.src = imgUrl;
    img.alt = deckElement;
    return img;
}

const createIcon = () => {
    const icon = document.createElement('i');
    icon.classList.add('fas', 'fa-code');
    return icon;
}

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

const createCard = (deckElement) => {
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.appendChild(createImg(deck[deckElement], deckElement));
    back.appendChild(createIcon());

    card.appendChild(front);
    card.appendChild(back);

    return card;
}

const loadGame = () => {
    const keys = Object.keys(deck);
    const duplicatedDeck = [...keys, ...keys];

    duplicatedDeck.sort(() => Math.random() - 0.5);

    for (let key of duplicatedDeck) {
        const card = createCard(key);
        container.appendChild(card);
    }
}

const startTimer = () => {
    setInterval(() => {
        const currentTime = Number(time.innerHTML);
        time.innerHTML = currentTime + 1;
    }, 1000);
}

window.onload = () => {
    player.innerHTML = localStorage.getItem('Player');
    startTimer();
}

loadGame(); 


// Seção para a fucionalidade do jogo

const cards = [...document.querySelectorAll('.card')];

 let moves = 0;
cards.forEach((card) => {
    card.addEventListener('click', () => {
        if (card.classList.contains('matched')) {
            return;
        }

        card.classList.toggle('active');

        const actives = cards.filter(el => el.classList.contains('active'));
        
        const movesElement = document.querySelector('#moves');
        if (actives.length == 2) {
            const [a, b] = actives;
            moves += 1;
            movesElement.textContent = moves;

            if (a.querySelector('.face.front img').alt == b.querySelector('.face.front img').alt) {
                setTimeout(() => {
                    actives.forEach(el => el.classList.add('matched'));
                    actives.forEach(el => el.classList.remove('active'));
                }, 700)
            }
            else {
                setTimeout(() => {
                    actives.forEach(el => el.classList.remove('active'));
                }, 700);
            }
        }
    });
});

