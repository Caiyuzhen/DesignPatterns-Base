/*
	【🌟 构造器模式】
		跟工厂模式不同的是工厂模式更关注生产出来的结果【产品】, 它更关注创建的【流程】跟【细节(可以拿到返回值）】
*/

class NavBar {
	init () {
		console.log('NavBar 初始化')
	}

	getData () {
		return new Promise((res) => {
			setTimeout(() => {
				console.log('NavBar 成功发送异步 ajax 请求')
				res('NavBarData')
			},1000)
		})
	}

	render () {
		console.log('NavBar 渲染视图')
	}
}


class List {
	init () {
		console.log('List 初始化')
	}

	getData () {
		return new Promise((res) => {
			setTimeout(() => {
				console.log('List 成功发送异步 ajax 请求')
				res('ListData')
			},1000)
		})
	}

	render () {
		console.log('List 渲染视图')
	}
}

// 🔥🔥统一执行相同的方法(比如上面的类都要经历 init, getData, render 三个过程)
class Creator {
	async startBuild(builder) { //async 后面可以接同步也可以接异步, 异步就是一个 promise
		await builder.init()
		let res = await builder.getData()//🔥🔥也可以关注细节, 比如拿到返回值！！
		console.log(res) 
		await builder.render()
	}
}

const op = new Creator()
op.startBuild(new NavBar())
op.startBuild(new List())
