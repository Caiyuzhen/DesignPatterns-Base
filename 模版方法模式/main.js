/*
	☕️🍵【模版方法模式】
		根据一套模板创造出两套相似的页面 
			模板可以是【抽象的公共方法】或【公共的流程】, 比如在父类去封装子类的算法框架, 包含公共方法跟执行顺序, 子类去调用它并继承整个结构
				比如: 烧水 => 倒入调料 A => 倒入调料 B
					比如做【热奶茶】跟【做咖啡】

*/


// 🌰例子一(AB 页面结构一样, 但是数据不一样, 那么可以把 AB 页面抽象成一个公共方法, 让子类继承, 子类提供数据即可): ——————————————————————————————————————————————————————————————————

// 🔥🔥模拟抽象父类 (也就是模板本身)
const Container = function(params = {}) {//🚀需要给个对象来存放 getData 方法！!!
	let F = function() {}

	F.prototype.init = async function() { //🔥异步请求也可以, async function
		// this.getData()
		let listData = await this.getData() //🔥接住子类 getData() 后返回的数据！
		this.render(listData)
	}

	// 🔥抽象方法, 需要子类去实现！！用来体现页面内数据的差异!!!
	F.prototype.getData = params.getData || function() { //实例化时有传入 getData 的话, 就执行传入的 getData 方法！
		throw new Error('必须传入 getData 方法')
	}

	// 🔥公共方法, 都要去渲染
	F.prototype.render = function(listData) {
		console.log('渲染视图数据:', listData)
	}

	return F
}




// 🔥传入 A 数据
const PageA = Container({
	getData() { //相当于在继承父类的基础上去重写 getData() 方法
		console.log('获取 A 页面的数据')
		return [1,2,3]
	}
})

new PageA().init()


// 🔥传入 A 数据
const PageB = Container({
	getData() { //相当于在继承父类的基础上去重写 getData() 方法
		console.log('获取 A 页面的数据')
		return [4,5,6]
	}
})

new PageB().init()
