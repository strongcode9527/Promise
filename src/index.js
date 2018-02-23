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


  this.fullFilled = (result) => {
    this.state = 1
    this.value = result

    this.queue.forEach(item => {
      item.fullFilled(this.value)
    })
  }

  this.rejected = (error) => {
    this.state = 2
    this.error = new Error(error)
  }

  // 执行resolver函数
  try {
    resolver && resolver(this.fullFilled, this.rejected)
  }
  catch(e) {
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

Promise.prototype.then = function(success, failure) {
  const newPromise = new Promise()

  immediate(() => {
    if(this.error) {
      failure(this.error)
    }
    
    }
  )

  return newPromise
}

function asignPromise(target, promise) {
  if(promise.state !== 0) {
    target.fullFilled(promise.value)
  }else {
    return {...target, ...promise}
  }
}

function QueueItem(Promise, fullFilled, rejected) {
  return {
    Promise,
    rejected,
    fullFilled,
  }
}

function handleThen(promise, success) {
  try{
    const result = success(this.value)

    // then 执行函数返回的是promise对象
    if(result instanceof Promise) {
      asignPromise(promise, result)
    }else {
      promise.fullFilled(result)
    }
  }
  catch(e) {
    this.error = e
  }
  else {
    this.queue.push(QueueItem(newPromise, success, failure))
  }
}





Promise.prototype.catch = function() {}

Promise.resolve = function() {

}
Promise.reject = function() {}
Promise.all = function() {}
Promise.race = function() {}

export default Promise