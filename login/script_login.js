const input = document.querySelector('.input');
const btn = document.querySelector('.btn');
const form = document.querySelector('.login_div')

input.addEventListener('input', (event => {
    const size = event.target.value.length;
    if (size > 2) {
        btn.classList.add('active');
    }
    else {
        btn.classList.remove('active');
    }
}));

form.addEventListener('submit', (event => {
    event.preventDefault();
    localStorage.setItem('Player', input.value);
    window.location = 'game/index_game.html';
}))

