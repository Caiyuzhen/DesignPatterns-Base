/*
	【状态模式】 
		更好的遵循开放封闭原则
		状态的切换更明显 (比如 弱光 -> 强光 -> 关灯)
		切换状态的关系更明显
*/


// 🌰例子一(比如一盏灯, 有开关、有强弱、有冷暖): ——————————————————————————————————————————————————————————————————
class Light {

	constructor() {
		// 定义一下 this.light, 然后在子类中可以直接使用 this.light
		this.light = this
		this.offLightState = new OffLightState(light)
		this.weakLightState = new WeakLightState(light)
		this.strongLightState = new StrongLightState(light)
		this.currentState = this.OffLightState //🔥初始状态
		this.button = button
	}

	setState () {
		// 切换状态
		this.currentState = newState
	}
	
	init() {
		const btn = document.querySelector('#btn')
		btn.addEventListener('click', 
			this.currentState.buttonWasPressed() //🔥🔥点击后调用的是【当前状态】的实例化对象【身上的方法】, 也就是【子类中的方法】！！
		)
	}
}


// 把更改状态的方法抽离出来, 子类可以去修改父类的方法
// 弱光
class WeakLightState {
	constructor(light) {
		this.light = light //保存一下父类的实例化对象
		console.log(light)
	}

	// 点击按钮的事件(由父类调用)
	buttonWasPressed() {
		console.log('弱光')
		this.light.currentState = this.light.weakLightState //操作的父类的状态
	}
}


// 强光
class StrongLightState {
	constructor(light) {
		this.light = light //保存一下父类的实例化对象
		console.log(light)
	}

	// 点击按钮的事件(由父类调用)
	buttonWasPressed() {
		console.log('强光')
		this.light.currentState = this.light.strongLightState //操作的父类的状态
	}
}

// 无光
class OffLightState {
	constructor(light) {
		this.light = light //保存一下父类的实例化对象
		console.log(light)
	}

	// 点击按钮的事件(由父类调用)
	buttonWasPressed() {
		console.log('无光')
		this.light.currentState = this.light.offLightState //操作的父类的状态
	}
}