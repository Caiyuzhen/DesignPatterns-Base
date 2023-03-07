/*
	【💡状态模式】 
		有什么好处？
			更好的遵循开放封闭原则(分离对象跟对象的状态)
			状态的切换更明显 (比如 弱光 -> 强光 -> 关灯)
			切换状态的关系更明显
		
		特点:
			有点类似责任链，各个状态之间有关联的调用！！链式调用！

		类似状态机:
			1.状态
			2.动作		
*/


// 🌰例子一(比如一盏灯, 有开关、有强弱、有冷暖): ——————————————————————————————————————————————————————————————————
// 🔥🔥把更改状态的方法抽离出来, 子类可以去修改父类的方法(调用父类的方法去修改父类的状态属性！这里的父子类是依赖关系而不是从属关系！)
// 弱光状态
class WeakLightState {
	constructor(light) {
		this.light = light //保存一下父类的实例化对象, this 就是父类
	}
	buttonWasPressed() { // 点击按钮的事件(由父类调用)
		console.log('弱光')
		console.log(this.light)
		this.light.setState(this.light.strongLightState) //操作的父类的状态(👈这里改变为下一级别的强光！实现状态之间的关联！🌟)
	}
}


// 强光状态
class StrongLightState {
	constructor(light) {
		this.light = light //保存一下父类的实例化对象, this 就是父类
	}
	buttonWasPressed() {// 点击按钮的事件(由父类调用)
		console.log('强光')
		console.log(this.light)
		this.light.setState(this.light.offLightState) //操作的父类的状态(👈这里改变为下一级别的强光！实现状态之间的关联！🌟)
	}
}


// 无光状态
class OffLightState {
	constructor(light) {
		this.light = light //保存一下父类的实例化对象, this 就是父类
	}
	buttonWasPressed() {// 点击按钮的事件(由父类调用)
		console.log('关灯')
		console.log(this.light)
		this.light.setState(this.light.weakLightState) //操作的父类的状态(👈这里改变为下一级别的强光！实现状态之间的关联！🌟)
	}
}


//💡父类 - 灯
class Light {
	constructor() {
		// 👇灯的三个状态
		this.offLightState = new OffLightState(this) //🌟🌟this 就是父类本身！把自己传给子类, 让风子类调用自己的方法！！【因为这里是伪子类！】
		this.weakLightState = new WeakLightState(this)
		this.strongLightState = new StrongLightState(this)
		this.currentState = this.weakLightState //🔥当前状态 = 初始状态(弱灯)
		this.init()
	}

	setState (newState) {
		// 切换状态
		this.currentState = newState
	}
	
	init() {
		const btn = document.querySelector('#btn')
		btn.addEventListener('click', () => { //包装在一个箭头函数中, 不然会立即执行, 会拿不到 this 的状态, 因为箭头函数的 this 指向的是外层的 this, 也就是父类
			this.currentState.buttonWasPressed() //🔥🔥点击后调用的是【当前状态】的实例化对象【身上的方法】, 也就是【子类中的方法】！！
		})
	}
}

const light = new Light() //实例化父类





// 🌰例子二(状态机模式, 把所有状态整合到一起): ——————————————————————————————————————————————————————————————————
// 🚀状态机
const FSM = {
	// 关灯状态
	offLight: {
		buttonClick: function() { //【🌟这里不能用箭头函数！🌟】因为它们没有自己的 this, 而是继承自其所在的上下文, 所以会指向全局作用域!!
			console.log('关灯')
			this.setState(this.weakLight) //操作的父类的状态(👈这里改变为下一级别的强光！实现状态之间的关联！🌟)
		}
	},
	// 弱光状态
	weakLight: {
		buttonClick: function() {//【🌟这里不能用箭头函数！🌟】因为它们没有自己的 this, 而是继承自其所在的上下文, 所以会指向全局作用域!!
			console.log('弱光')
			this.setState(this.strongLight) //操作的父类的状态(👈这里改变为下一级别的强光！实现状态之间的关联！🌟)
		}
	},
	// 强光状态
	strongLight: {
		buttonClick: function() {//【🌟这里不能用箭头函数！🌟】因为它们没有自己的 this, 而是继承自其所在的上下文, 所以会指向全局作用域!!
			console.log('强光')
			this.setState(this.offLight) //操作的父类的状态(👈这里改变为下一级别的强光！实现状态之间的关联！🌟)
		}
	}
}


//💡父类 - 灯
class Light_2 {
	constructor() {
		// 👇灯的三个状态
		this.offLight = FSM.offLight
		this.weakLight = FSM.weakLight
		this.strongLight =  FSM.strongLight
		this.currentState = this.weakLight //🔥当前状态 = 初始状态(弱灯)
		this.init()
	}

	setState (newState) {
		// 切换状态
		this.currentState = newState
	}
	
	init() {
		const btn = document.querySelector('#btn_2')
		btn.addEventListener('click', () => { //包装在一个匿名函数中, 不然会立即执行, 会拿不到 this 的状态
			this.currentState.buttonClick.call(this) //🔥🔥点击后调用的是【状态机】身上的方法！
		})
	}
}

const light_2 = new Light_2() //实例化父类