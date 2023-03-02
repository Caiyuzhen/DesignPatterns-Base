/*
	🏭【简单工厂模式】
		根据不同的【条件】去【实例化不同的类】
			工厂模式更关注生产出来的结果【产品】
*/

// 🌟🌟🌟🌟通过【函数】模拟工厂模式 ——————————————————————————————————————————————————————————————

// 创建 User 实例的工厂
function UserFactory (role) { //🔥传入角色, 返回不同的实例
	function User (role, pages) {
		this.role = role
		this.pages = pages
	}

	switch (role) {
		case 'superadmin':
			return new User ("superadmin", ['home', 'user-manage', 'right-manage', 'new-manage'])
		case 'admin':
			return new User ("admin", ['home', 'user-manage'])
		case 'editor':
			return new User ("editor", ['home', 'new-manage'])
		case 'user':
			return new User ("user", ['home'])
		default:
			throw new Error('参数错误')
	}
}


let user = new UserFactory ("superadmin")
let user2 = new UserFactory ("admin")
let user3 = new UserFactory ("editor")
let user4 = new UserFactory ("user")

console.log(user)//🌟🌟 pages: Array(4) , 到时候进一步的去遍历这个数组, 然后去渲染页面即可






// 🌟🌟🌟🌟通过【类】创造工厂模式 ——————————————————————————————————————————————————————————————
class User {
	constructor (role, pages) {
		this.role = role
		this.pages = pages
	}

	// 静态方法, 通过类去直接调用
	static UserFactory (role) {
		switch (role) {
			case 'superadmin':
				return new User ("superadmin", ['home', 'user-manage', 'right-manage', 'new-manage'])
			case 'admin':
				return new User ("admin", ['home', 'user-manage'])
			case 'editor':
				return new User ("editor", ['home', 'new-manage'])
			case 'user':
				return new User ("user", ['home'])
			default:
				throw new Error('参数错误')
		}
	}
}

let user5 = User.UserFactory ("superadmin")
console.log(user5)






/*
	🏭【抽象工厂模式(复杂场景, 更加的解耦, 对扩展开放, 对修改关闭）】
		🔥如果子类的属性或方法太多, 那么可以把这些属性跟方法抽象到父类里边, 子类去继承父类(父类解决公共方法, 子类解决具体问题)
			父类是抽象类, 子类是具体类, 父类不去实例, 子类去实例
*/
class UserAbstract { //👈👈逻辑上应该是【抽象类】, 🔥添加一个功能后, 所有子类都会继承这个功能!!
	constructor (name, role, pages) {
		this.name = name
		this.role = role
		this.pages = pages
	}

	// 所有人都有的方法
	welcome() {
		console.log('欢迎回来', this.name)
	}

	dataShow() {
		throw new Error('子类必须实现 dataShow 方法')
	}
}


// 超级管理员子类
class SuperAdmin extends UserAbstract {
	constructor (name) {
		// 🔥👇相当于传入了 name \ role \ pages
		super(
			name, 
			'superadmin', 
			['home', 'user-manage', 'right-manage', 'new-manage']
		)
	}

	// 重写父类的方法
	dataShow() {
		//...
		console.log('superadmin-dataShow')
	}

	addUser() {
		//...
	}

	addRight() {
		//...
	}
}


// 普通管理员子类
class Admin extends UserAbstract {
	constructor (name) {
		super(
			name, 
			'admin', 
			['home', 'user-manage']
		)
	}

	// 重写父类的方法
	dataShow() {
		//...
		console.log('admin-dataShow')
	}

	addUser() {
		//...
	}
}


// 编辑子类
class Editor extends UserAbstract {
	constructor (name) {
		super(
			name, 
			'editor', 
			['home', 'new-manage']
		)
	}

	// 重写父类的方法
	dataShow() {
		//...
		console.log('editor-dataShow')
	}
}


// 普通用户子类
class User_ extends UserAbstract {
	constructor (name) {
		super(
			name, 
			'user', 
			['home']
		)
	}

	// 重写父类的方法
	dataShow() {
		//...
		console.log('user-dataShow')
	}
}

// 🔥根据不同的角色去返回不同的类(生产类的工厂🏭), 🔥🔥注意这里【并没有实例化】！！因为是【抽象的工厂模式】
function getAbstractUserFactory(role) {
	switch (role) {
		case 'superadmin':
			return SuperAdmin
		case 'admin':
			return Admin
		case 'editor':
			return Editor
		case 'user':
			return User_
		default:
			throw new Error('参数错误')
	}
}

//⚡️拿到的只是一个个类
let userClass = getAbstractUserFactory('superadmin')
console.log(userClass) 

//⚡️实例化类！
let user6 = new userClass('superadmin')
console.log(user6)
