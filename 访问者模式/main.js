/*
	【🌟访问者模式】
		解决什么问题
	 		稳定的数据结构和易变的操作耦合问题。
		
		表现
			同一个数据结构，因不同的对象访问所得到的结构会不同。它保留了原数据结构的完整性，但是添加了访问者的封装逻辑

		前置条件
			如果系统的数据结构是比较稳定的，但其操作（算法）是易于变化的，那么使用访问者模式是个不错的选择；如果数据结构是易于变化的，则不适合使用访问者模式。
		
*/

// 🌰例子一(访问购物车内的 goods 并进行计算总额1)  ——————————————————————————————————————————————————————————————————
/*
	要计算购物车中商品的【总价】以及【总税费】, 可以通过访问者模式来解决, 使用访问者模式来计算购物车中所有商品的总价，而不必修改商品对象的结构
*/



// 定义购物车对象 （用来保存所有 goods 实例, 遍历并执行它们身上的方法！）
class ShoppingCart {
	constructor() {
		this.goods = [] //存放购物车中的商品
	}

	addGoods(item) {
		this.goods.push(item)
	}

	// 🔥访问购物车中的所有商品的方法
	accept(Visitor) {
		for(let i = 0; i < this.goods.length; i++) {
			this.goods[i].see(Visitor) // 【🌟】让【访问者】访问【每一个商品 Goods_1、Goods_2、...】, 🔥本质是调取 Goods 身上的 see 方法
		}
	}
}


// 定义商品对象, 保存商品【名称】以及【价格】, 核心是用来保存数据并把自己传递给不同的访问者
class Goods {
	constructor(name, price) {
		this.name = name //🔥在 Goods 被 new 时就保存了,   good_1.name = '🍎'
		this.price = price //🔥在 Goods 被 new 时就保存了,   good_1.price = 100
	}

	// 【🌟】定义商品对象的访问方法
	see(visitor) {
		visitor.visit(this) // 【🌟此处访把 goods 自己传入到【访问者】对象中！！最核心的代码🌟】👇把 goods 实例给到了下面
	}
}



// 定义访问者对象, 访问商品, 计算总价
class TotalPriceVisitor {
	constructor() {
		this.totalPrice = 0
	}

	// 🔥访问商品对象并计算出总价的方法, 该方法会被【商品对象】调用, 传入【商品对象】, item 就是商品对象
	visit(good) { //【🌟本质上接收了 Goods 身上的 this, 也就是货物本身！！最核心的代码🌟】 👆接收了 goods 实例并访问其身上的属性！
		this.totalPrice += good.price
	}

	// 获取总价
	getTotalPrice() {
		return this.totalPrice
	}
}



// 定义税费访问者对象, 访问商品, 计算税费
class TaxVisitor {
	constructor() {
		this.tax = 0
	}

	// 🔥访问商品对象并计算出总价的方法, 该方法会被【商品对象】调用, 传入【商品对象】, item 就是商品对象
	visit(good) {  //【🌟本质上接收了 Goods 身上的 this, 也就是货物本身！！最核心的代码🌟】 👆接收了 goods 实例并访问其身上的属性！
		this.tax += good.price * 0.1 //假设税费为 10%, 每件商品都收 10% 的税
	}

	// 获取总税费
	getTax() {
		return this.tax
	}
}



const cart = new ShoppingCart() // 创建购物车对象
const goods1 = new Goods('🍎', 100) // 创建商品对象, 此时就把数据保存到 Goods 身上了
const goods2 = new Goods('🍌', 200) // 创建商品对象, 此时就把数据保存到 Goods 身上了
const goods3 = new Goods('🍇', 300) // 创建商品对象, 此时就把数据保存到 Goods 身上了

cart.addGoods(goods1) // 将商品添加到购物车中, 也就把 goods1 数据保存到了 cart 身上
cart.addGoods(goods2) // 将商品添加到购物车中, 也就把 goods1 数据保存到了 cart 身上
cart.addGoods(goods3) // 将商品添加到购物车中, 也就把 goods1 数据保存到了 cart 身上

const totalPriceVisitor = new TotalPriceVisitor() // 创建总价访问者对象
const taxVisitor = new TaxVisitor() // 创建税费访问者对象

cart.accept(totalPriceVisitor) // 🔥🔥 轮询访问购物车中的所有商品, 计算总价, 调用 3 个 Goods 实例身上的 see , 传入 totalPriceVisitor , 在调用身上的 visit 方法
cart.accept(taxVisitor) // 🔥🔥 accept -> see 并把货物自身 this 传入给访问者 -> visit

console.log('🛒购物车中商品的总价为: ', totalPriceVisitor.getTotalPrice()) // 600
console.log('🛒购物车中商品的总税费为: ', taxVisitor.getTax()) // 60





// 🌰例子二(为每个元素节点都增加一个淡入的动画效果)  ——————————————————————————————————————————————————————————————————

// 访问者对象
const animationVisitor = {
	visitEleNode : function(node) {
		/* 添加 CSS 过渡效果 */
		node.style.color = 'red'
		node.style.opacity = '0'
		node.style.transition = 'opacity 0.5s'
		console.log(`添加动画效果到元素节点 ${node.nodeName}`)
		

		setTimeout(() => {
			node.style.opacity = '1'
		}, 300)
	}
}


// 遍历 DOM 树并执行访问者对象中的方法
function addDomAnim(node, animvisitorFn) {
	if(node.tagName ===  'BODY' || node.tagName === 'HTML') { 
		return 
	}
	// 如果是 DIV 则添加动画
	if (node.tagName === 'DIV') {
		console.log('开始添加动画:', node)
		animvisitorFn.visitEleNode(node) //传入 animationVisitor 对象执行 方法
	}
	// 如果是 ul 则递归遍历
	if (node.tagName === 'UL') {
		const children = node.children //li li li
		for(let i = 0; i < children.length; i++) {
			animvisitorFn.visitEleNode(children[i]) //🔥给每个 ul 子节点 list 添加动画
		}
	}
}


// 获取 span 元素节点并添加动画效果
// 文档渲染完后再执行
window.onload = function() {

	const title = document.querySelector('.title')
	const ul = document.querySelector('.list')

	addDomAnim(title, animationVisitor)
	addDomAnim(ul, animationVisitor)
}


