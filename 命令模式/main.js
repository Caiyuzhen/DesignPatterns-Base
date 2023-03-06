/*
	【命令模式】
		发布者(客户) —— invoker : 发出命令, 调用对象
		命令者(订单) —— command : 接收命令, 调用接收者对应接口, 处理发布者的请求 
		接收者(仓库) —— receiver : 提供对应接口处理请求, 不知道谁发起请求
*/

// 🌰例子一（概念理解）:  ——————————————————————————————————————————————————————————————————
// 接收类(仓库)
class Receiver {
	execute() {
		console.log('第三步: 接收者执行请求')
	}
}

// 命令类(订单)
class Command {
	constructor(receiver) {
		this.receiver = receiver //保存【接收者】实例
	}
	
	execute() {
		console.log('第二步: 命令对象 => 告知👆接收者如何处理')
		this.receiver.execute() //执行【接收者】的方法
	}
}

// 发布类(客户)
class Invoker {
	constructor(command) {
		this.command = command //保存【命令者】实例
	}

	order() {
		console.log('第一步: 发布请求')
		this.command.execute() //执行【命令者】的方法
	}
}


const order = new Command(new Receiver()) //订单
const client = new Invoker(order) //客户

client.order() //下订单 A
client.order() //下订单 B





// 🌰例子二【宏命令模式 - 一键完成】 —— 利用【组合模式收集实例】 + 利用【命令模式发布实例】 => 比如一个页面有【选项卡】跟【轮播图】跟【瀑布流】等多个模块:  ——————————————————————————————————————————————————————————————————
// 宏命令
class MacroCommand {
	constructor() {
		this.list = [] //🔥🔥收集所有子命令
	}

	add(command) {
		this.list.push(command)
	}

	execute(){//🔥🔥暴露出去的接口, 执行所有搜集的命令
		// 方法一: for...of 的遍历方法 //🔥🔥🔥🚀
		for(let item of this.list) { 
			item.execute() //要被执行的类需要有同堂的 execute 方法！
		}
		// // 方法一: 用 i 控制循环遍历的数量 //🔥🔥🔥🚀
		// for(let i = 0; i < this.list.length; i++) {
		// 	let item = this.list[i]
		// 	item.execute()
		// }
	}
}

// 模块 A
const Tabs = {
	execute() {
		console.log('选项卡执行')

		this.init()
		this.getData()
		this.render()
		//... 可以随意的扩展业务
	},

	init() {
		console.log('初始化')
	},
	getData() {
		console.log('获取数据')
	},
	render() {
		console.log('渲染 Tab')
	}
}

// 模块 B
const Swipe = {
	execute() {
		console.log('轮播图执行')
		//... 可以随意的扩展业务
	}
}

const macroCommand = new MacroCommand()

// 把子模块添加到宏命令内
macroCommand.add(Tabs)
macroCommand.add(Swipe)

// 🌟🌟执行宏命令 (一键盘执行所有模块)
macroCommand.execute()