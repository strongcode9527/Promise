import Promise2 from './index'

export default function then(fulfilled, rejected) {
  if(arguments.length === 0 ) {
   !this.error && (this.error = Error('then方法参数至少有一个函数'))
  }
  if(typeof fulfilled !== 'function' || (rejected && typeof rejected === 'function')) {
    !this.error && (this.error = Error('then方法的参数必须是函数'))
  }
  return new Promise2(function(){})


}