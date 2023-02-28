/*
	【发布订阅模式】 ———— 一对多的关系
		核心要素
			1.主题
			2.缓存列表
			3 事件触发（状态发生变化, 依次执行回调）
*/




let salesOffice = {} // 定义一个主题

salesOffice.clientList = [] // 缓存列表


salesOffice.listen = function (key, fn) { //事件监听
	if (!this.clientList[key]) {
		this.clientList[key] = [] // 如果还没有订阅过此类消息，给该类消息创建一个缓存列表 // [(square88 = []), (square60 = []),(square140 = [])]
	}
	this.clientList[key].push(fn) //把订阅的事件【添加到缓存列表中】, 后续再依次执行 (每种 key 对应一种方法)
}

salesOffice.trigger = function () { //事件发布（触发）
	let key = Array.prototype.shift.call(arguments) // 取出对应的【方法】
	fns = this.clientList[key] // 拿到对应的数组

	for(var i = 0; i < fns.length; i ++) {
		fns[i].apply(this, arguments) // this 为 salesOffice 当前对象, arguments 为 trigger 传入的参数
	}
}


salesOffice.listen('square88', function (price, squareMeter) { //通知接收方
	console.log('价格: ' + price)
	console.log('面积: ' + squareMeter)
})

salesOffice.listen('square60', function (price, squareMeter) { //通知接收方
	console.log('价格: ' + price)
	console.log('面积: ' + squareMeter)
})

salesOffice.listen('square140', function (price, squareMeter) { //通知接收方
	console.log('价格: ' + price)
	console.log('面积: ' + squareMeter)
})

salesOffice.trigger('square88', 53000, 88) //事件发布（触发）, 依次执行缓存列表中的函数