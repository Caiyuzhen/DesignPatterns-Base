/*
	【🌟高阶函数】
		参数是函数 或者 返回值是函数的函数

			参数是函数 => 业务能够抽离成函数

			返回值是函数的话 => 功能的延续

	【🌟高阶组件】
		参数是组件 或者 返回值是组件的组件！一半在 React 内使用

*/

// 🌰例子一  ——————————————————————————————————————————————————————————————————
// 比如 sort 排序函数是一个高阶函数
let arr = [3,1,2]
arr.sort(function(a,b) {
	console.log(a - b) //当 a 大于 b 时，a - b 的值为正数，表示 a 应该排在 b 的后面
	return a - b //就是 > 0 的放后面, 由小到大排序
})

console.log(arr)



// 🌰例子一  ——————————————————————————————————————————————————————————————————
//👇立即执行函数返回出一个函数, 这样做本身也是高阶函数
// (function(){
// 	return function() {
// 		//...
// 	}
// })()


// 🌰例子一  ——————————————————————————————————————————————————————————————————
// promise 也是高阶函数
new Promise(function(res, rej){
	//...
})


// 🌰例子一  ——————————————————————————————————————————————————————————————————
// 🌟功能的延续比如判断【传入的变量】是什么类型
let isType = function(type) {
	return function(obj) { //要判断 obj 是什么类型
		return Object.prototype.toString.call(obj) === '[object ' + type + ']'//🔥🔥返回的是【变量 obj 】的类型, 比如  '[object Array]'、'[object String]'、'[object Number]'
	}
}

isString = isType('String')
console.log(isString(111)) //false

isArray = isType('Array')
console.log(isArray([1,2,3])) //true

isNumber = isType('Number')
console.log(isNumber(123)) //true
