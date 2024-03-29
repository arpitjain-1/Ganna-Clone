
const hamburger = document.querySelector('.hamburger');
const sideBar = document.querySelector('.side-bar');
const closeButton = document.querySelector('.close-button');
const showButton = document.querySelector('.selected-quality')
const audioSet = document.querySelector('.audio-set');
hamburger.addEventListener('click', () => {
    if (sideBar.style.display === 'none' || sideBar.style.display === '') {
        sideBar.style.display = 'block'
    }
})

closeButton.addEventListener('click', () => {
    if (sideBar.style.display === 'block') {
        sideBar.style.display = 'none';
    }
})

showButton.addEventListener('click', () => {
    if (audioSet.style.display === 'block') {
        audioSet.style.display = 'none'
    } else {
        audioSet.style.display = 'block'
    }
});