/*
	【迭代器模式】
		提供一种方式访问一个聚合对象中的各个元素, 并且不需要暴露聚合对象的内部元素
			比如在一个对象的【某一处数据】部署迭代器！！【🌟核心🌟】
*/


// 🌰例子一(基础概念, 简单迭代器): ——————————————————————————————————————————————————————————————————
// 迭代元素的方法
let findEach = function(arr,  callback) { //接收一个数组跟回调函数
	for(let i = 0; i < arr.length; i++) {
		callback(i, arr[i]) //就是👇下面的函数
	}
}

// 外部调用
findEach([1,2,3,4,5], function(index, value){ //把一个数组跟一个函数传给迭代器
	console.log(index, value)
	//拿到迭代回来的内容的后续的业务逻辑... 比如👇创建一个列表, 或者发送给后端等等

	let oLi = document.createElement('li')
	oLi.innerHTML = value
	const list = document.querySelector('.list')
	list.appendChild(oLi)
})




// 🌰例子二(ES6 的 Iterator 迭代器): ——————————————————————————————————————————————————————————————————
//Array  map  set  String  argument  NodeList 这几个对象都内置迭代器

let arr = ['jimmy', 'kim', 'zeno']
// 方法一: for...of
for(let i of arr) {
	console.log(i)
}


console.log('——————————————————————————————')


// 方法二: Symbol.interator + .next() 【🔥🔥🔥也可以给普通的对象装上这个迭代器！】
let arr2 = arr[Symbol.iterator]()
console.log(arr2.next().value)
console.log(arr2.next().value)
console.log(arr2.next().value)



console.log('——————————————————————————————')


// 🔥🔥给普通的对象装上迭代器！！注意, 对象本身不支持迭代器！！
let obj = { //规整的数据结构
	0: {
		name: 'jimmy',
		age: 26,
		run: () => {console.log('running')}
	},
	1: {
		name: 'kim',
		age: 22,
		run: () => {console.log('sleeping')}
	},
	2: {
		name: 'kim',
		age: 22,
		run: () => {console.log('sitting')}
	},
	length: 2, //👈👈要给迭代器一个长度！
	[Symbol.iterator]: Array.prototype[Symbol.iterator] //👈👈给一个对象安装上迭代器！！
}

for(let i of obj) {
	console.log(i)
}

console.log('——————————————————————————————')


// 🔥🔥给普通的对象装上迭代器！！【🌟核心🌟】
let obj_2 = { //不规整的数据结构
	code: 200,
	name: 'jimmy',
	list: ['a', 'b', 'c', 'd'],
	[Symbol.iterator]: function() { //【🌟核心🌟】部署迭代器接口, 别人就可以直接拿出这个数据, 而不必关系你的数据结构！！！
		let index = 0
		return {
			next:() => { //🚀🚀🚀因为是在上面那个函数的内层, 所以要改成箭头函数！！！
				// 👇定义迭代器的 index！
				if(index < this.list.length) {//🌟🌟🌟 因为只要打印 list !!! 🌟🌟🌟 
					return {
						value: this.list[index++],
						done: false
					}
				} else {
					return { //🌟终止条件
						value: undefined,
						done: true,
					}
				}
			}
		}
	}
}


// 方法一:遍历 for...in, 👈注意这个不是迭代器的方法！不是 for...of!!
for(let i in obj_2) {
	console.log(i, obj_2[i])
}


console.log('——————————————————————————————')
// 方法二: 给对象安装上迭代器后的方式
let res = obj_2[Symbol.iterator]()
console.log(res.next())
console.log(res.next())
console.log(res.next())
console.log(res.next())


for(let k of obj_2) {
	console.log(k)
}


