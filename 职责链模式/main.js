/*
	【职责链模式】
		跟【原型链】【作用域链】还有【DOM 冒泡机制】一样, 都是为了避免请求的【发送者】以及【接收者】产生过多的耦合！！
			本质上就是链表的调用模式
*/


// 🌰例子一(输入框的校验 - 如果没有使用【职责链】的方式, 扩展性不好): ——————————————————————————————————————————————————————————————————
const input = document.querySelector('#input')
const btn = document.querySelector('#btn')

btn.addEventListener('click', () =>{
	if(input.value.length === 0) {
		console.log('输入框不能为空')
		input.value = ''//清空
	} else {
		if(Number.isNaN(+input.value)) { //【🌟】Number.isNaN() 用来判断是不是数字;【🌟】+号表示转化为数字！！比如 +123 就是 数字 123!!!
			console.log('必须是数字！') //🔥因为上面有可能是字符串或者符号, 就没法转化为数字了
			input.value = ''//清空
		} else {
			if(input.value.length < 6) {
				console.log('必须大于 6 个数字！')
				input.value = ''//清空
			}
		}
	}
	console.log('🎉注册成功')
})







// 🌰例子二(输入框的校验 - 使用【职责链】的方式, 避免校验逻辑的耦合): ——————————————————————————————————————————————————————————————————
const input_2 = document.querySelector('#input2')
const btn_2 = document.querySelector('#btn2')


//给按钮绑定事件
btn_2.addEventListener('click', () => {
	//调用校验！！
	checkFnStart.check()
})


// 👇几个校验方法
function checkEmpty() {
	if(input_2.value.length === 0) { 
		console.log('输入框不能为空')
		return
	}
	return "next" //进行下一步校验
}

function checkNumber() {
	if(Number.isNaN(+input_2.value)) {//+转为数字后还不是数字（比如字符串转成数字), 就是 NaN
		console.log('必须是数字！')
		return
	}
	return "next"
}

function checkLength() {
	if(input_2.value.length < 6) {
		console.log('必须大于 6 个数字！')
		return
	}
	return "next"
}


// 【🌟核心】检验链⛓️
class Chain {
	constructor(fn) {
		this.checkRules = fn //🔥相当于把👆上边的校验方法进行传入; 然后 new 实例化时在下边的 check() 方法中进行调用
		this.nextRule = null //【🌟】调用下一条校验规则
	}

	addRule(nextRule) { //🔥🔥传入 Chain 的实例！！！！！！！
		this.nextRule = nextRule // 【🌟核心🌟】 添加下一条规则, 逻辑上也是添加进一个 Chain 实例
	}

	check() {
		// 因为 checkRule 是被传入的一个函数, 所以可以直接调用, 然后返回值是 "next" 或者 null (⚡️没通过都会返回 null)
		this.checkRules() === "next" ? this.nextRule.check() : 
		null//执行第一条规则, 如果执行后会获得 "next", 然后第二条 nextRule 又是一个 Chain 实例, 所以可以继续调用 check() 方法！！
	}
}


// 分离 new 实例化的方式
const checkFnStart = new Chain(checkEmpty)
const checkNum = new Chain(checkNumber)
const checkLen = new Chain(checkLength)

checkFnStart.addRule(checkNum) //基于 checkFnStart 来添加一条新规则, 放入 nextRule 中,  因为 checkFnStart 是一个 Chain 实例, 所以可以直接调用 addRule() 方法！！
checkNum.addRule(checkLen) //基于 checkNum 来添加下一条规则, 因为 checkNum 是一个 Chain 实例, 所以可以直接调用 addRule() 方法！！
checkLen.addRule({
	check: () => {"end" //【🌟】链尾返回 end, 用来结束链的调用
		console.log('🎉注册成功')
	}
})

// 不分离 new 实力化的方式
//const checkNum  = checkFn.addRule(new Chain(checkNumber)) //添加一条新规则, 放入 nextRule 中, 【⚡️】记得用一个变量保存一下, 才能基于它来进行下一步！！
// checkNum.addRule(new Chain(checkLength)) //基于 checkNum 来添加下一条规则, 因为 checkNum 是一个 Chain 实例, 所以可以直接调用 addRule() 方法！！









// 🌰例子三(输入框的校验 - 使用【职责链】的方式且写得更优雅): ——————————————————————————————————————————————————————————————————
//【🌟核心是在内部进行实例化！！！并且把实例进行返回！！！🌟】
const input_3 = document.querySelector('#input3')
const btn_3 = document.querySelector('#btn3')


//给按钮绑定事件
btn_3.addEventListener('click', () => {
	//调用校验！！
	checkFnStart_3.check()
})


// 👇几个校验方法
function checkEmpty_3() {
	if(input_3.value.length === 0) { 
		console.log('输入框不能为空')
		return
	}
	return "next" //进行下一步校验
}

function checkNumber_3() {
	if(Number.isNaN(+input_3.value)) {//+转为数字后还不是数字（比如字符串转成数字), 就是 NaN
		console.log('必须是数字！')
		return
	}
	return "next"
}

function checkLength_3() {
	if(input_3.value.length < 6) {
		console.log('必须大于 6 个数字！')
		return
	}
	return "next"
}


// 【🌟核心】检验链
class Chain_3 {
	constructor(fn) {
		this.checkRules = fn //🔥相当于把👆上边的校验方法进行传入; 然后 new 实例化时在下边的 check() 方法中进行调用
		this.nextRule = null //【🌟】调用下一条校验规则
	}

	addRule(nextRule) {
		this.nextRule = new Chain_3(nextRule) // 【🌟🌟核心🌟🌟】 在内部进行实例化！！！🌟🌟
		return this.nextRule// 【🌟🌟核心🌟🌟】 返回内部实例化的这个对象, 实现链式调用！！
	}

	end() {
		this.nextRule = {
			check: ()=>{"end", console.log("🎉注册成功！")}
		}
	}

	check() {
		// 因为 checkRule 是被传入的一个函数, 所以可以直接调用, 然后返回值是 "next" 或者 null (⚡️没通过都会返回 null)
		this.checkRules() === "next" ? this.nextRule.check() :
		null//执行第一条规则, 如果执行后会获得 "next", 然后第二条 nextRule 又是一个 Chain 实例, 所以可以继续调用 check() 方法！！
	}
}


// 因为在内部 实例化 并且 return 出来了, 所以可以实现 【🔥链式调用】!!!
const checkFnStart_3 = new Chain_3(checkEmpty_3)
checkFnStart_3.addRule(checkNumber_3).addRule(checkLength_3).end()
