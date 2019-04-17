# 基于bigjs封装的计算方法

Addition, subtraction, multiplication, division calculation and decimal point processing

###  文件依赖

[lodash](https://www.npmjs.com/package/lodash/)
[big.js](https://www.npmjs.com/package/big.js/)

###  使用方法

加
let addResult = add(1,1,3.666,443,4432,23211.1122222222222)
console.log( addResult )  //28091.778222222222

减
let subtractResult = subtract(1,0.312355123)
console.log( subtractResult ) //0.687644877

乘
let multiplyResult = multiply(1.23451,43.232299999)
console.log( multiplyResult ) //0.02855527001867944269

除
let divideResult = divide(8888,3)
console.log( divideResult ) //2962.66666666666666666667

自定义小数点位数，小数点保留方式
import { myMath , add, subtract, multiply, divide } from '@/assets/Math'
let M = myMath({ decimalPoint : 8 , type : 3 })
let res = M.divide(8888,3)
console.log( res )  //28091.778222222222
