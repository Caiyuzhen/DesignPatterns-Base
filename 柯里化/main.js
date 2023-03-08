/*
	【柯里化】
		将一个多参数的函数转化为单参数的函数, 并返回一个新的函数, 该函数接收剩余的参数, 并返回结果, 让代码更加的灵活
*/

// 🌰例子一（加法）:  ——————————————————————————————————————————————————————————————————
// 多参数的函数
function add(x, y) {
	return x + y
}

// 柯里化后的函数
function add_2(x) {
	return function(y) {
		console.log(x + y)
		return x + y
	}
}

add_2(2)(3)



// 🌰例子二（根据关键字查询商品, 返回产品价格）:  ——————————————————————————————————————————————————————————————————
// 如果我们在多个地方都需要搜索商品列表，并且使用的搜索【关键字】都是相同的, 那么则会重复繁琐, 这时候就可以用到柯里化
function searchFn(keyword) { //【🌟】第一步: 传入关键词
	return function (productsList) { // 【🌟】第二步: 传入产品列表进行匹配
		return productsList.filter(function(productsList) {
			/*🔥🔥 indexOf 用于查找一个字符串在另外一个字符串内的【索引位！】, 先将商品名称转换为小写字母, 然后再在【keyword】内进行查找! 
			🔥🔥 没找到就会返回 -1 ！！！找到一个就返回索引位！！*/
			if(productsList.name.toLowerCase().indexOf(keyword.toLowerCase()) === 0) {
				console.log(productsList.name + ' ' + "的价格是:" + ' ' + productsList.price) // 打印匹配到索引位的产品 name 
			}
			return productsList.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1 
		})
	}
}

// 产品列表
const productsList = [
	{ id: 1, name: "iPhone", price: 699 },
	{ id: 2, name: "iPad", price: 499 },
	{ id: 3, name: "MacBook", price: 1299 }
]

// 搜索关键字
const searchKeyword = searchFn("ipad")
const productList = searchKeyword(productsList)//把产品列表进行传入, 匹配上面传入的"ipad"关键字!!
