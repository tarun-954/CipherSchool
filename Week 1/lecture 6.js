
// local variable and global and const keyword
// var x=15;
// {
//     let x=5;
//     console.log(x);
// }
// console.log(x);
// const y=10;
// console.log(y);
// y=5;
// console.log(y);

//  Writing a function in js 
// normal function
var x= function (x,y){
    return x+y;
} 

// arrow function 
const a=(x,y)=>x+y;
console.log(a(10,10));

// spread operator
const q1=["jan","febuery","march"];
const q2=["April","May","June"];
const q3=["july","August","September"];
const q4=["octuber","november","December"];
const month=[...q1,...q2,...q3,...q4];
console.log(month);


//inbuild function iwth spread operator
const mynumbers=[25,46,32,84,64,43];
let maxValue=Math.max(...mynumbers);
console.log(maxValue);

//for of loop 
let sum=0;
for(let num of mynumbers){
    sum=sum+num;
}
console.log(sum);

//for of to count print the character of the string
const name="TarunChoudhary";
let text="";
for(let ch of name){
    text=text+ch+" ";

}
console.log(text);
// very important 
//hash in js 

const fruits=new Map([
    ["apples",500],
    ["grapes",300],
    ["oranges",800]
]);
console.log(fruits);
console.log(fruits.get("oranges"));


// sets in js
const letter =new Set();
letter.add("a");
letter.add("b");
letter.add('a');
console.log(letter);
