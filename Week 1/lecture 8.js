//Document methods
//  querySelctor()
const headings = document.querySelectorAll("h2");
const fheading = headings[0];
console.log(fheading.innerHTML);
const appleList  = document.querySelector(".apple-list");
console.log(appleList.children);
console.log(appleList.childNodes);
console.log(appleList.firstChild.innerText);
console.log(appleList.lastChild.innerText);
console.log(appleList.firstElementChild);
console.log(appleList.lastElementChild);

console.log(appleList.parentElement);

console.log(appleList.parentNode);
const orange = document.querySelector(".orange");
const apple = orange.previousElementSibling;
const avacado = orange.nextElementSibling;
console.log(apple);
console.log(avacado);
