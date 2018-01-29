import all from './all'
import then from './then'
import race from './race'
import catch2 from './catch'
import reject from './reject'
import resolve from './resolve'

export default function Promise2(func) {
  // state 记录promise的状态 
  // 0 pending
  // 1 fulfilled
  // 2 rejected
  this.state = 0
  // value 用来存储异步函数的返回值。
  this.value = undefined
  // error 用来存储异步函数的错误信息
  this.error = undefined

 //resolve 和 reject 都还是有一点问题，欠考虑，调研后在搞。
  const resolve = (value) => {
    this.value = value
    this.state = 1
  }

  const reject = (error) => {
    this.error = error
    this.state = 2
  }

  try{
    func(resolve, reject)
  }
  catch(e) {
    this.error = e
  }
}





Promise2.prototype.then = then
Promise2.prototype.catch = catch2

Promise2.all = all
Promise2.race = race
Promise2.reject = reject
Promise2.resolve = resolve