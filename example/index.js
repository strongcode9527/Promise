import Promise2 from '../src/index.js'

let promise = new Promise2((resolve) => {
  setTimeout(() => {
      resolve('Hello World!');
  }, 1000)
});

promise.then('呵呵哒').then((data) => {
  console.log(data);           // Hello World
})

console.log('end')

