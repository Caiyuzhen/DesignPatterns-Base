/*
	【🌟 适配器模式】
		让两个不兼容的接口（类）可以一起工作
			比如一个接口调用 百度地图，一个接口调用 高德地图
*/

// 不同的类
class TencentMap {
	show () { //🔥差异
		console.log('开始渲染腾讯地图')
	}
}

// 不同的类
class GaoDeMap {
	display () { //🔥差异
		console.log('开始渲染高德地图')
	}
}


// 🔥适配器（将 TencentMap 适配成 GaoDeMap 的开始渲染的方法）
class TencentAdapter extends TencentMap {
	constructor () {
		super()
	}
	display () {
		this.show() //因为腾讯地图是 display() 才开始渲染，所以这里要适配一下
	}
}

// 开始渲染地图的方法
function renderMap(map) {
	map.display()
}

// 调用渲染地图的方法
renderMap(new TencentAdapter())
renderMap(new GaoDeMap())


