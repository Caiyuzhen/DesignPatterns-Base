/*
	【发布订阅模式】 ———— 相比起观察者模式多了个【调度中心】
		1.包含【被观察目标】和【观察者本身】两个部分, 两者之间没有直接联系, 通过【调度中心】进行通信
		2.可以事件细分, 绑定事件名（有点像策略模式）
*/


// 🌰例子一(概念理解, 还没有细分事件的订阅模式): ——————————————————————————————————————————————————————————————————
const PubSub = {
	list: [], //👀收集所有【订阅者】的数组

	publish (){
		this.list.forEach(item => item()) //遍历执行每一个【👀订阅者】的方法
	},

	subscribe (fn){
		this.list.push(fn) //把事件收集到【list 数组】中
	}
}


function testA() {
	console.log('testA')
}

function testB() {
	console.log('testB')
}


//订阅者,可以理解为一个实例化的对象
PubSub.subscribe(testA)  //🔥🔥注册事件
PubSub.subscribe(testB) //🔥🔥注册事件

// PubSub.publish() //执行发布者方法, 通知所有订阅者执行方法




// 🌰例子二(有细分事件的订阅模式): ——————————————————————————————————————————————————————————————————
const PubSub_2 = {
	message: {},  //👀收集所有【订阅者】的数组

	// 调度中心
	publish (type, data){
		if(!this.message[type]) { //如果没有这个事件, 就返回, 不执行
			alert('没有这个事件');
			return
		}
		
		this.message[type].forEach(item => item(data)) //遍历执行每一个【👀订阅者】的方法, 然后把数据传递过去
	},

	// 注册订阅事件
	subscribe (type, fn){ //👀细分事件（1.事件名, 2.订阅者）, 然后把事件收集到【message 对象】中
		if(!this.message[type]) {
			this.message[type] = [fn] //如果（第一次执行时）没有这个事件, 就创建一个数组, 并把订阅者放进去
		} else {
			this.message[type].push(fn) //如果（第二次执行时）有这个事件, 就把订阅者放进去
		}
	},

	// 取消订阅事件
	unSubscribe (type, fn){
		if(!this.message[type]) {//如果没有对应的类型
			return
		}

		if(!fn) { //如果没有传要取消哪个【👀订阅者】的事件, 这里就是 true, 那么久取消所有【🔵收集完的事件】
			this.message[type] && (this.message = {})// 取消所有事件 （短路运算, 只有当 this.message[type] 的值为真时（即不为 null、undefined、0、false、空字符串等假值），才会执行后面的语句）
			console.log(this.message)
		} else { //如果传了对应要取消哪个【👀订阅者】的事件, 那么就取消对应的【👀订阅者】的事件
			this.message[type] = this.message[type].filter(item => item !== fn) //过滤掉要取消的事件
			console.log(this.message)
		}
	}
}


function testA_2(data) {
	// A的业务... 比如 mouseEnter 事件
	console.log('testA', data)
}

function testB_2(data) {
	// B的业务... 比如 click 事件
	console.log('testB', data)
}

function testC_3(data) {
	// B的业务... 比如 mouseOver 事件
	console.log('testC', data)
}


//订阅者,可以理解为一个实例化的对象
PubSub_2.subscribe('A', testA_2)  //🔥🔥注册事件
PubSub_2.subscribe('B', testB_2) //🔥🔥注册事件
PubSub_2.subscribe('C', testC_3) //🔥🔥注册事件

// PubSub_2.unSubscribe('C') //🌟取消订阅所有事件
PubSub_2.unSubscribe('C', testC_3) //🌟取消订阅 C 事件


PubSub_2.publish('A', 66)
PubSub_2.publish('C', '传入一个 data 数据') //执行发布者方法, 通知所有订阅者执行方法
// PubSub_2.publish('D') //没有这个事件




// 🌰例子三(用有细分事件的订阅模式来实现观察者模式中的例子): ——————————————————————————————————————————————————————————————————
const PubSub_3 = {
	message: {},  //👀收集所有【订阅者】的数组

	// 调度中心
	publish (type, data){
		if(!this.message[type]) { //如果没有这个事件, 就返回, 不执行
			alert('没有这个事件');
			return
		}
		
		this.message[type].forEach(item => item(data)) //遍历执行每一个【👀订阅者】的方法, 然后把数据传递过去
	},

	// 注册订阅事件
	subscribe (type, fn){ //👀细分事件（1.事件名, 2.订阅者）, 然后把事件收集到【message 对象】中
		if(!this.message[type]) {
			this.message[type] = [fn] //如果（第一次执行时）没有这个事件, 就创建一个数组, 并把订阅者放进去
		} else {
			this.message[type].push(fn) //如果（第二次执行时）有这个事件, 就把订阅者放进去
		}
	},

	// 取消订阅事件
	unSubscribe (type, fn){
		if(!this.message[type]) {//如果没有对应的类型
			return
		}

		if(!fn) { //如果没有传要取消哪个【👀订阅者】的事件, 这里就是 true, 那么久取消所有【🔵收集完的事件】
			this.message[type] && (this.message = {})// 取消所有事件 （短路运算, 只有当 this.message[type] 的值为真时（即不为 null、undefined、0、false、空字符串等假值），才会执行后面的语句）
			console.log(this.message)
		} else { //如果传了对应要取消哪个【👀订阅者】的事件, 那么就取消对应的【👀订阅者】的事件
			this.message[type] = this.message[type].filter(item => item !== fn) //过滤掉要取消的事件
			console.log(this.message)
		}
	}
}


// 🌟注册事件(面包屑订阅者)
PubSub_3.subscribe('updateBread', function(data){ 
	console.log('订阅者收到通知了')
	console.log(data)//收到信息
	// 三元运算符判断有 data 就显示为 data, 没有就显示为 '首页'
	document.querySelector('.bread').innerHTML = data
})

// 🌟注册事件(header 订阅者)
PubSub_3.subscribe('updateHeader', function(data){ 
	console.log('订阅者收到通知了')
	console.log(data)//收到信息
	// header 显示为 data
	document.querySelector('.header').innerHTML = data
})


//🔥🔥找到所有 li 【🔵被观察对象】, 统一添加事件并触发通知
let oLi = document.querySelectorAll('.left li') 
for(let i = 0; i < oLi.length; i++) {
	oLi[i].addEventListener('click', function(){ //给每一个 li 添加点击事件
		// console.log(this.innerHTML) // 拿到 tab 的文本内容, this 就是当前点击的 li
		PubSub_3.publish('updateBread', this.innerHTML)//🚀需要对应好【事件名】和【数据】！把这两个消息发送过去就行了
		PubSub_3.publish('updateHeader', this.innerHTML)//🚀需要对应好【事件名】和【数据】！把这两个消息发送过去就行了)
	})
}
