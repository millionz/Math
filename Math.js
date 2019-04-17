import { reduce } from 'lodash'
import Big from 'big.js';

class MyMath {
  constructor(config = { decimalPoint : 8 , type : 1 }){
    this.decimalPoint = config.decimalPoint
    this.type = config.type
  }

  //累计运算
  cumulativeCalculation( arg , calculationType ){
    let result = reduce( arg , (pre,next) => {
      return new Big(pre)[calculationType](next).toString()
    })
    if( this.decimalPoint ) return this.decimalPointHandle( result )
    return result
  }

  //小数点处理
  decimalPointHandle( result ){
    let integer = result.split('.')[0]
    let decimal = result.split('.')[1]
    let getZero = num => {
      if( num > 0 ) return `${Math.pow(10,num)}`.replace('1','')
      return ''
    }
    switch( this.type ){
      case 1: //(默认)算出来多少位就返回多少位
        return result
      break
      case 2: //直接截取(补零)
        if( decimal ){
          if( decimal.length <= this.decimalPoint ){
            decimal = `${decimal}${getZero(this.decimalPoint-decimal.length)}`
            return `${integer}.${decimal}`
          }else{
            return `${integer}.${decimal.substring(0,this.decimalPoint)}`
          }
        }
        return `${integer}.${getZero(this.decimalPoint)}`
      break
      case 3: //四舍五入(补零)
        if( decimal ){
          if( decimal.length <= this.decimalPoint ){
            decimal = `${decimal}${getZero(this.decimalPoint-decimal.length)}`
            return `${integer}.${decimal}`
          }else{
            decimal = decimal.substring(0,this.decimalPoint+1)
            let decimalLastNumber = decimal[decimal.length-1]
            if( decimalLastNumber >= 5 ){
              decimal = ( decimal - decimalLastNumber + 10 ) / 10
            }else{
              decimal = ( decimal - decimalLastNumber ) / 10
            }
            return `${integer}.${decimal}`
          }
        }
        return `${integer}.${getZero(this.decimalPoint)}`
      break
      default:
        return result
    }
  }

  //加
  add(){
    return this.cumulativeCalculation( [...arguments] , 'plus' )
  }
  //减
  subtract(){
    return this.cumulativeCalculation( [...arguments] , 'minus' )
  }
  //乘
  multiply(){
    return this.cumulativeCalculation( [...arguments] , 'times' )
  }
  //除
  divide(){
    return this.cumulativeCalculation( [...arguments] , 'div' )
  }
}

const _myMath = new MyMath()
export function myMath(config){ return new MyMath(config) }
export function add(){ return _myMath.add( ...arguments ) }
export function subtract(){ return _myMath.subtract( ...arguments ) }
export function multiply(){ return _myMath.multiply( ...arguments ) }
export function divide(){ return _myMath.divide( ...arguments ) }
