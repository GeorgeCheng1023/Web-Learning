const h1 = document.querySelector('h1');
const btn = document.querySelector('button');
const bg = document.querySelector('body');
btn.addEventListener('click', () => {
    const color = `rgb(${randomColor()},${randomColor()},${randomColor()})`
    bg.style.backgroundColor = color;
    h1.innerText = color;
});

function randomColor() {
    return Math.floor(Math.random() * 255);
}