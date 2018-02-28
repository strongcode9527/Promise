import Promise2 from '../src/index.js'

let promise = new Promise2((resolve, reject) => {
  reject('3')
})

promise.then(()=>{})
.then(()=>{})
.catch((e) => {
  console.log(e) 
})
  

console.log('end')

