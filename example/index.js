import Promise2 from '../src/index.js'

let promise = new Promise2((resolve, reject) => {
  reject('3')
})

promise.then(()=>{})
.then(()=>{}, () => {
  console.log('in error')
})

console.log('end')

