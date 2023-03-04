/*
	【装饰器】
		1.不改变原有功能的情况上, 为对象添加新的功能
		2.可以插拔式的使用
			前提是抽象出来的公共方法（比如报错）

			比如在发送 ajax 请求之前, 要先注入 token

			比如点击按钮时候, 注入一个 log 的日志发送给后端, 记录点击的时间, 用来统计 PV UV

*/


// 🌰例子一: ——————————————————————————————————————————————————————————————————
// 👇👇需要！！！先在底层的原型链上定义一下 （前置方法）
Function.prototype.before = function (beforeFn) {
	let _this = this //保存原函数

	return function () { 
		// 前置执行
		beforeFn.apply(this, arguments) //arguments 先收集参数, 然后传入 beforeFn, 🌟🌟 apply() 方法用来改变 this 指向

		//执行原本的函数
		return _this.apply(this, arguments) //arguments 收集参数)
	}
}


// 👇👇需要！！先在底层的原型链上定义一下 （后置方法）
Function.prototype.after = function (afterFn) {
	let _this = this //保存原函数

	return function () { 
		//执行原本的函数
		let result = _this.apply(this, arguments) //arguments 收集参数

		// 后置执行
		afterFn.apply(this, arguments) //arguments 先收集参数, 然后传入 beforeFn, 🌟🌟 apply() 方法用来改变 this 指向

		// 返回原本函数的执行结果
		return result

	}
}



// 函数
function Test() {
	console.log('666')
	return 666
}

// 定义函数的装饰器（前置执行）
let test_1 = Test.before(function () {
	console.log('前置方法')
}).after(function () {
	console.log("后置方法")
})

test_1()




// 🌰例子二（上报按钮的点击事件）: ——————————————————————————————————————————————————————————————————
const fileBtn = document.querySelector('#fileBtn')

function log () {
	console.log('上报用户 PV UV 等用户访问行为')
}

function render() { 
	console.log('渲染页面')
}

// 写法二: 在 render 之前执行 log, 上报用户 PV UV 等用户访问行为
render = render.before(log)


fileBtn.addEventListener('click', function() {
	//...其他业务逻辑
	// log() //写法一: 在 render 之前执行 log, 上报用户 PV UV 等用户访问行为
	render() //渲染页面
	//...其他业务逻辑
})




// 🌰例子三（发送 ajax 请求之前, 给后端发送  localStorage 内的用户 token ）: ——————————————————————————————————————————————————————————————————
function ajax(url, method, params) {
	console.log(url, method, params)
}

// ⚡️切片的方式, 需要传 token 的页面才加 token, 🔥🔥也就是需要的页面才调用 ajax_1 方法!! 🔥注入了获取 token 的方法！不用重新实现原有 ajax 方法！
ajax_1 = ajax.before((url, method, params)=>{
	// 获得 loaclStorage 中的 token！
	let token = localStorage.getItem('token')
	params.token = token
})

// 🔥🔥不需要传入 token 就使用 ajax 方法！！
ajax('/api', 'post', {
	name: 'jimmy',
})

// 🔥🔥需要传入 token 就使用 ajax_1 方法！！
ajax_1('/api', 'post', {
	name: 'jimmy',
})

