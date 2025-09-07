# JavaScript ES6+ Notes

এই ডকুমেন্টে JavaScript (ES6+) এর কিছু গুরুত্বপূর্ণ টপিক সহজভাবে বোঝানো হয়েছে।  
ইন্টারভিউ প্রস্তুতি এবং রিভিশনের জন্য খুবই কাজে দেবে। 🚀

---

## 1. Difference between `var`, `let`, and `const`

- **var**

  - Function scoped
  - Redeclare ✅, Reassign ✅
  - Hoisted with `undefined`
  - পুরোনো JavaScript এ বেশি ব্যবহৃত

- **let**

  - Block scoped
  - Redeclare ❌, Reassign ✅
  - Hoisted but Temporal Dead Zone (TDZ) এ থাকে

- **const**
  - Block scoped
  - Redeclare ❌, Reassign ❌
  - Constant reference ধরে রাখে (object এর ভেতরের property change করা যায়)

```js
var a = 10;
var a = 20; // allowed

let b = 30;
b = 40; // allowed

const c = 50;
// c = 60; ❌ not allowed
```

---

## 2. Difference between `map()`, `forEach()`, and `filter()`

- **forEach()** → শুধু loop চালায়, return করে না
- **map()** → প্রতিটা element transform করে নতুন array return করে
- **filter()** → condition অনুযায়ী true value গুলো নিয়ে নতুন array return করে

```js
const numbers = [1, 2, 3, 4, 5];

numbers.forEach((n) => console.log(n)); // শুধু print করবে

const squares = numbers.map((n) => n * n);
console.log(squares); // [1, 4, 9, 16, 25]

const evens = numbers.filter((n) => n % 2 === 0);
console.log(evens); // [2, 4]
```

---

## 3. Arrow Functions (ES6)

Arrow functions → shorter & cleaner syntax, এবং `this` inherit করে surrounding scope থেকে।

```js
// Normal Function
function add(a, b) {
  return a + b;
}

// Arrow Function
const addArrow = (a, b) => a + b;
```

**✅ Benefits:**

- Shorter syntax
- Lexical `this` binding
- Useful for callbacks, array methods

---

## 4. Destructuring Assignment (ES6)

Destructuring → array/object থেকে value বের করে variable এ রাখা যায়।

```js
// Array Destructuring
const numbers = [10, 20, 30];
const [x, y, z] = numbers;
console.log(x, y, z); // 10 20 30

// Object Destructuring
const user = { name: "Riyaz", age: 21 };
const { name, age } = user;
console.log(name, age); // Riyaz 21
```

---

## 5. Template Literals (ES6)

Template literals (backticks `` ` `` দিয়ে লেখা হয়):

- Variable ও expression embed করা যায় → `${}`
- Multi-line string লেখা যায়

```js
const name = "Md Riyaz Akondo";
const age = 21;

const text1 = "My name is " + name + " and I am " + age + " years old.";
const text2 = `My name is ${name} and I am ${age} years old.`;

console.log(text1);
console.log(text2);
```

---
