/*
	单例模式是【只是（不是只能！）】实例化一次的模式
		🌟 比如 Redux 的 store 也是唯一的
*/

// 🌟ES5 闭包的方式创建单例 ——————————————————————————————————————————————————————————————————
let Singleton_ = (function () {
	let instance  //闭包的私有变量, 不会被回收

	// 类
	function User(name, age) {
		this.name = name	
		this.age = age
	}

	return function (user, age) {
		if(!instance) {
			// 创建实例
			instance = new User(user, age)
		}
		return instance //🔥返回之前的实例
	}
})()

let User_01 = Singleton_('Jimmy', 18)
console.log(User_01)





// 🌟ES6 类的写法 ——————————————————————————————————————————————————————————————————
// 写法一:
class _Singleton_ {
	constructor (name, age) {
		if(!_Singleton_.instance) {
			this.name = name
			this.age = age
			_Singleton_.instance = this
			console.log('实例化一个类')
		}

		return _Singleton_.instance //🔥返回之前的实例
	}
}

let User_02 = new _Singleton_('Kim', 20)
console.log(User_02)



// 写法二:
class Singleton {
	// 单实例
	name = ''
	static instance = null

	constructor(name) {
		this.name = name
		this.getInstance()
	}

	// 🔥判断是否实例化过
	getInstance() {
		if (!Singleton.instance) {
			Singleton.instance = this
			return this
		}
		console.log('已经实例化过了');
		return this.instance //🔥返回之前的实例
	}

}

const a = new Singleton('a')
const b = new Singleton('b')




//🌟 实际的场景, 比如: 一个页面只有一个登录框 (🔥登录过期后就会弹出, 这样可以避免创造多个实例, 以节省内存空间) ———————————————————————————

//闭包的方式创建模态框
const Modal = (function(){
	let instance = null

	return function () {
		if (!instance) {
			// 创建登录框实例
			instance = document.createElement('div')
			instance.innerHTML = "登录对话框"
			instance.className = "login-modal"
			instance.style.display = "none" //🔥🔥一开始不显示, 在有需要的时候再创建!! 不用一开始就创建！节省内存！

			// 把登录框放到页面内
			document.body.appendChild(instance)
		}
		return instance //🔥返回之前的实例
	}
})()


const openBtn = document.querySelector('.openBtn')
openBtn.onclick = function () {
	const modal = Modal()
	modal.style.display = "block" //🔥一开始不显示
}


const closeBtn = document.querySelector('.closeBtn')
closeBtn.onclick = function () {
	const modal = Modal()
	// remove 弹窗
	modal.style.display = "none"
}