/*
	🏭【构造器模式】
		- 用于基于一定的结构, 创建特定类型的对象（ 比如批量创造员工 ）
*/

// 1. 函数的方式创造构造器 ————————————————————————————————————————————————————————————————————————————————————————
function Employee(name, age) {
	this.name = name
	this.age = age
	// 这个函数很浪费内存空间, 可以放在原型上, 原型的内存只有一份
	// this.say = function() {
	// 	return(this.name + '说: 我今年' + this.age + '岁了')
	// }
}

// 在原型上添加方法, 省内存空间
Employee.prototype.say = function () {
	return(this.name + '说: 我今年' + this.age + '岁了')
}


let person1 = new Employee('Kim', 18)
console.log(person1)
// console.log(person1.say())


let person2 = new Employee('Jimmy', 20)





// 2. 🌟🌟🌟类的方式创造构造器 ————————————————————————————————————————————————————————————————————————————————————————
class Employee2 {
	constructor(name, age) {
		this.name = name
		this.age = age
	}

	say() {
		return(this.name + '说: 我今年' + this.age + '岁了')
	}
}

let person3 = new Employee2('Lee', 26)
console.log(person3.say())




// 【🌟🌟🌟案例】面向对象的选项卡 ————————————————————————————————————————————————————————————————————————————————————————
function Tabs(selector, type) {
	this.selector = document.querySelector(selector)	
	this.headerItems = this.selector.querySelectorAll('.header li') //🔥🔥找 header 下的所有 li
	this.boxItems = this.selector.querySelectorAll('.box li')
	this.type = type

	console.log(this.headerItems, this.boxItems)

	this.change()// 🔥👈调用原型方法 change！实例化原型的时候会自动执行！
}

// 原型方法
Tabs.prototype.change = function() {
	for (let i = 0; i < this.headerItems.length; i ++)  {
		//给每一项绑定一个点击事件 (🔥箭头函数的 this 指向父级)！！
		this.headerItems[i].addEventListener(this.type, () => { //this.type 为传入的参数(🔥🔥🔥事件类型为 click 或 mouseover！)
			// console.log(i) //当前选中的这项 tab 的索引

			for(let m = 0; m < this.headerItems.length; m ++) {
				this.headerItems[m].classList.remove('active') //🔥先移除所有的类名然后再加上
				this.boxItems[m].classList.remove('active') //先移除所有的类名

				// 给当前选中的这项 tab 添加类名
				this.headerItems[i].classList.add('active')
				this.boxItems[i].classList.add('active')
			}
		}, false)
	}
}

new Tabs('.container1', 'click')
new Tabs('.container2', 'mouseover')
