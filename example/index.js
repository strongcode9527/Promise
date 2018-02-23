import Promise2 from '../src/index.js'


new Promise2(function(resolve){
  console.log('in promise')
  setTimeout(()=>{
    resolve('3')
  }, 3000)
})
.then(() => {
  console.log('in then')
})

