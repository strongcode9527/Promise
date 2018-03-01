import Promise2 from '../src/index.js'

var promise = new Promise2((resolve) => {
  setTimeout(() => {
    resolve('haha')
  }, 1000)
})
var a = promise.then(function onSuccess() {})
var b = promise.catch(function onError() {})
console.dir(promise)
console.log(promise.queue[0].Promise === a)
console.log(promise.queue[1].Promise === b)

