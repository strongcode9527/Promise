import { setTimeout } from 'timers';

var immediate = require('immediate')



immediate(function() {
  console.log('3')
})

console.log('1') 

setTimeout(() => {
  console.log('time out')
})