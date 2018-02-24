import Promise2 from '../src/index.js'

console.log('start')

var a = new Promise2(function(resolve){
  console.log('in promise')
  setTimeout(()=>{
    resolve(3)
  }, 3000)
})
.then(
  (res) => new Promise2(function(resolve) {
    console.log(`${res} s 后`)
    setTimeout(() => {
      resolve(res + 5)
    }, 5000)
  })
  .then((res) => {
    console.log(`${res} 秒 后`)
  })
)

console.log(a)
