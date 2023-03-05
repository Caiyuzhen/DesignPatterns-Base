/*
	【🌟🌟桥接模式 —— 有点像 PPT 的动画设置】
		应该用抽象类的实现方式
		 将抽象部分与它的实现部分分离，使它们都可以独立地变化
		 	比如汽车零件的桥接, 一辆汽车【在组装过程中】有着不同功率的配置 (🔥比如有着不同功率的发动机), 并且发动机可以对接不同的桥接平台
*/


// 🌰例子一(工厂组装发动机): ——————————————————————————————————————————————————

// 🚗汽车装载平台 1 —— 用于装载发动机, 生产【跑车】
function Audi_Platform_1(engine) { //一个函数定义了一个类的属性或方法，并且使用 this 关键字引用了它们, 这个函数就会变成构造函数！⚡️需要用 new() 来实例化！
	this.engine = engine
}

Audi_Platform_1.prototype.platform = function() {
	console.log('Audi_1 平台')
}

Audi_Platform_1.prototype.loadEngine = function() { //🔥装装载发动机 -> 相当于 engine.run() = V6.run()
	this.engine.run()
}



// 🚗汽车装载平台 2 —— 用于装载, 生产【SUV】
function Audi_Platform_2(engine) {
	this.engine = engine
}

Audi_Platform_2.prototype.platform = function() {
	console.log('Audi_1 平台')
}

Audi_Platform_2.prototype.loadEngine = function() { //🔥装装载发动机 -> 相当于 engine.run() = V6.run()
	this.engine.run()
}







// 👇不同型号的发动机, 可以【对接不同的平台】!!
function V6() { //一个函数定义了一个类的属性或方法，并且使用 this 关键字引用了它们, 这个函数就会变成构造函数！⚡️需要用 new() 来实例化！
	this.run = function() {
		console.log('V6 发动机')
	}
}

function V8() { //一个函数定义了一个类的属性或方法，并且使用 this 关键字引用了它们, 这个函数就会变成构造函数！⚡️需要用 new() 来实例化！
	this.run = function() { //🔥最终调用的是这个方法
		console.log('V8 发动机')
	}
}





let AudiCar_1 = new  Audi_Platform_1(new V6()) //🚗🚗传入发动机型号的【🔥实例】 -> 相当于 engine.run() = V6.run()
AudiCar_1.loadEngine() //装载发动机

let AudiCar_2 = new Audi_Platform_2(new V8())
AudiCar_2.loadEngine() //装载发动机







/* 🌰例子二: ————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
	比如不同的提示形态的【模态框 ｜ Toast ｜ Message】 —————— Platform
	以及不同的动画【bounce | slide | rotate】两两之间还可以任意的【相互组合】 ——————— 发动机
*/

// 可以【🔥方便扩展, 类似库的方式】的动画, 以及不同的动画组合(具体实现动画)
const animationFn = {
	bounce: {//类比 V6
		show(ele) {
			console.log(ele, '弹跳出来')
		},
		hide(ele) {
			console.log(ele, '弹跳隐藏')
		}
	},
	slide: {//类比 V8
		show(ele) {
			console.log(ele, '滑动出来')
		},
		hide(ele) {
			console.log(ele, '滑动隐藏')
		}
	},
	rotate: {//类比 V12
		show(ele) {
			console.log(ele, '旋转出来')
		},
		hide(ele) {
			console.log(ele, '滑动隐藏')
		}
	}
}

//组装平台
function Toast(ele, animation) { 
	this.ele = ele
	this.animation = animation
}

Toast.prototype.show = function() { // 抽象, 不具体实现
	this.animation.show(this.ele) //🔥🔥具体实现!!!
}

Toast.prototype.hide = function() { // 抽象, 不具体实现
	this.animation.hide(this.ele) //🔥🔥具体实现!!!
}


// 比如实现一个弹跳式的模态框
let toast_1 = new Toast('div_1', animationFn.bounce)
toast_1.show()


setTimeout(() => { // toast 1s 消失
	toast_1.hide()
},1000)


//