const form = document.querySelector('form');
const input = document.querySelector('input');
const ul = document.querySelector('ul');
form.addEventListener('submit', function(e) {
    e.preventDefault();
    const newItem = document.createElement('li');
    newItem.innerText = input.value;
    ul.append(newItem);
})

ul.addEventListener('click', function(e) {
    e.target.remove();
})