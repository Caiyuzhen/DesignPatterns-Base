/*
	【观察者模式】
		1.包含【被观察目标】和【观察者本身】两个部分, 两者之间相互依赖
		2.一个【被观察目标】可以有多个【观察者】, 当目标【被观察者对象】状态发生改变时, 会通知所有【观察者】
		3.好处是不用在一个对象内再去调用另外一个对象, 减少了耦合度
		4.比如用在后台系统的通信

		// 优点是实现了功能的接耦合
		// 缺点则是无法进行更细致的事件细分管控（比如筛选通知的观察者, 这方面只能通过【📮订阅模式】来解决）
*/


// 🌰例子一: ——————————————————————————————————————————————————————————————————
//🔵【被观察目标方法】
class Subject {
	constructor() {
		this.observers = [] //👀收集所有观察者数组
	}

	// 收集观察者的方法
	add(observer) {
		this.observers.push(observer)
	}

	// 通知所有👀观察者 （调用观察者身上的 update 方法）
	notify() {
		this.observers.forEach(item => {
			item.update()
		})
	}

	// 移除观察者的方法
	remove(observer) {
		this.observers = this.observers.filter(item => item !== observer) //item 就是每一个观察者
	}
}


//👀【观察者方法】
class Observer { 
	constructor(name) {
		this.name = name
	}

	update() {
		console.log('观察者状态发生改变', this.name)
	}
}


const subject = new Subject()
const observer1 = new Observer('Kim')
const observer2 = new Observer('Tom')

subject.add(observer1) //把 👀 观察者加入【被观察者的数组】中
subject.add(observer2) //把 👀 观察者加入【被观察者的数组】中

//2s 后
setTimeout(() => {
	subject.remove(observer1) //❌ 移除掉一位观察者
}, 1000)

//5s 后
setTimeout(() => {
	subject.notify() //触发通知所有👀观察者的方法
}, 2000)







// 🌰例子二(跨组件的通讯  - 比如 header 跟 content 中的面包屑一起观察同一个 tab): ——————————————————————————————————————————————————————————————————
//🔵【被观察目标方法】- 触发更新 DOM, 比如自己被点击后, 去通知所有观察者
class SubjectFn { 
	constructor() {
		this.observers = [] //👀收集所有观察者数组
	}
	// 收集观察者的方法
	add(observer) {
		this.observers.push(observer)
	}
	// 通知所有👀观察者 （调用观察者身上的 update 方法）
	notify(data) {
		this.observers.forEach(item => {
			item.update(data) //🔥🔥🔥把数据传回给【👀观察者】的 update 方法
		})
	}
	// 移除观察者的方法
	remove(observer) {
		this.observers = this.observers.filter(item => item !== observer) //item 就是每一个观察者
	}
}


//👀【观察者方法】- 最终操作 DOm , 自己需要被更新
class ObserverFn { 
	constructor(className) {
		this.ele = document.querySelector(className) //🔥🔥🔥找到传入的 DOM 节点, name 就是传入的 DOM 节点的 class 
	}
	update(data) {
		console.log('观察者状态发生改变!', this.ele)
		this.ele.innerHTML = data //🔥🔥🔥接收到 被观察者 发来的数据后, 更新 DOM
	}
}


//实例化一个【被观察者】方法
const subjectFn = new SubjectFn() 

// 添加第一个观察者
// const breadObs = document.querySelector('.bread') //找到面包屑 DOM (未封装进构造函数的写法)
const observerFn_1 = new ObserverFn('.bread') //实例化并传入面包屑 DOM, 作为【👀观察者】
subjectFn.add(observerFn_1)//🌟把所有 【👀观察者】 都加入到【被观察者的数组】中

// 添加第二个观察者 (同样也是观察 【首页】 tab 的点击事件)
// const header = document.querySelector('.header') //找到 header DOM (未封装进构造函数的写法)
const observerFn_2 = new ObserverFn('.header') //实例化并传入 header DOM, 作为【👀观察者】
subjectFn.add(observerFn_2)


//🔥🔥找到所有 li 【🔵被观察对象】, 统一添加事件并触发通知
let oLi = document.querySelectorAll('.left li') 
for(let i = 0; i < oLi.length; i++) {
	oLi[i].addEventListener('click', function(){ //给每一个 li 添加点击事件
		console.log(i, oLi[i]) //0 , 1 , 2 , 3
		console.log(this.innerHTML) // 拿到 tab 的文本内容, this 就是当前点击的 li
		subjectFn.notify(this.innerHTML) //🔥🔥🔥把 tab 的文本内容传入到【🔵被观察者的方法】中, 去更新 DOM
	}
)}