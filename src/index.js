import immediate from 'immediate'

function Promise(resolver) {

  // 子promise也就是then产生的新的promise。
  this.queue = []

  // Promise 的三种状态
  this.state = 0

  // Promise 要传给子promise的值
  this.value = undefined

  // promise执行过程中产生的错误对象
  this.errror = undefined

  // 更改promise状态为1， 并且调用队列中的回调函数。
  this.fullFilled = (result) => {
    if(this.state !== 0) {
      return
    }
    this.state = 1
    this.value = result

    this.queue.forEach(item => {
      item.queueFullFilled(this.value)
    })
  }

  // 更改promise的状态为2.

  this.rejected = (error) => {
    if(this.state !== 0) {
      return
    }
    this.state = 2
    this.error = new Error(error)
  }

  
  try {
    resolver && resolver(this.fullFilled, this.rejected)
  }
  catch(e) {
    // 在resove之后的
    if(this.state !== 0) {
      return
    }
    this.error = e
  }
}



/**
 * 首先then函数可以接收非函数参数，这样就会造成值穿透，也就是说不管是什么非函数值，promise都认为是null
 * Promise.resolve('1').then('2').then(res => console.log(res))
 * 最后输出为 1 而不是2
 * 
 * @param {*} success 
 * @param {*} failure 
 */ 

Promise.prototype.then = function(success, reject) {


  if(this.state === 2 && typeof reject === 'function') {
    reject(this.error)
  }

  const newPromise = new Promise()
  if(typeof success !== 'function') {
    this.queue.push(QueueItem(newPromise, createCallBack(newPromise, function() {}, true)))
  }
  else {
    immediate(() => {
      if(this.state !== 0) {
        handleThenFulfilled(newPromise, success, this.value)
      }else {
        this.queue.push(QueueItem (newPromise, createCallBack(newPromise, success)))
      }
    })
  }
  return newPromise
}

function asignPromise(target, promise) {
  if(promise.state !== 0) {
    target.fullFilled(promise.value)
  }else {
    return {...target, ...promise}
  }
}

function QueueItem(Promise, queueFullFilled, queueRejected, ) {
  return {
    Promise,
    queueRejected,
    queueFullFilled,
  }
}

// 创建promise队列里面的回调函数
function createCallBack(promise, success, isPenetrate) {
  return function(value) {
    handleThenFulfilled(promise, success, value, isPenetrate)
  }
}





/**
 * 
 * @param {Promise} promise 
 * @param {function} success 
 * @param {*} value 
 * @param {boolean} isPenetrate  // 判断是否为值穿透then的回调
 */
function handleThenFulfilled(promise, success, value, isPenetrate) {
  try{
    const result = isPenetrate ? value :  success(value)

    // then 执行函数返回的是promise对象
    if(result instanceof Promise) {
      asignPromise(promise, result)
    }else {
      promise.fullFilled(result)
    }
  }
  catch(e) {
    console.log(e)
  }
}





Promise.prototype.catch = function() {}

Promise.resolve = function() {

}
Promise.reject = function() {}
Promise.all = function() {}
Promise.race = function() {}

export default Promise