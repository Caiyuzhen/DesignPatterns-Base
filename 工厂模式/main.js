/*
	๐ญใ็ฎๅๅทฅๅๆจกๅผใ
		ๆ นๆฎไธๅ็ใๆกไปถใๅปใๅฎไพๅไธๅ็็ฑปใ
			ๅทฅๅๆจกๅผๆดๅณๆณจ็ไบงๅบๆฅ็็ปๆใไบงๅใ
*/

// ๐๐๐๐้่ฟใๅฝๆฐใๆจกๆๅทฅๅๆจกๅผ โโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโ

// ๅๅปบ User ๅฎไพ็ๅทฅๅ
function UserFactory (role) { //๐ฅไผ ๅฅ่ง่ฒ, ่ฟๅไธๅ็ๅฎไพ
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
			throw new Error('ๅๆฐ้่ฏฏ')
	}
}


let user = new UserFactory ("superadmin")
let user2 = new UserFactory ("admin")
let user3 = new UserFactory ("editor")
let user4 = new UserFactory ("user")

console.log(user)//๐๐ pages: Array(4) , ๅฐๆถๅ่ฟไธๆญฅ็ๅป้ๅ่ฟไธชๆฐ็ป, ็ถๅๅปๆธฒๆ้กต้ขๅณๅฏ






// ๐๐๐๐้่ฟใ็ฑปใๅ้ ๅทฅๅๆจกๅผ โโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโ
class User {
	constructor (role, pages) {
		this.role = role
		this.pages = pages
	}

	// ้ๆๆนๆณ, ้่ฟ็ฑปๅป็ดๆฅ่ฐ็จ
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
				throw new Error('ๅๆฐ้่ฏฏ')
		}
	}
}

let user5 = User.UserFactory ("superadmin")
console.log(user5)






/*
	๐ญใๆฝ่ฑกๅทฅๅๆจกๅผ(ๅคๆๅบๆฏ, ๆดๅ ็่งฃ่ฆ, ๅฏนๆฉๅฑๅผๆพ, ๅฏนไฟฎๆนๅณ้ญ๏ผใ
		๐ฅๅฆๆๅญ็ฑป็ๅฑๆงๆๆนๆณๅคชๅค, ้ฃไนๅฏไปฅๆ่ฟไบๅฑๆง่ทๆนๆณๆฝ่ฑกๅฐ็ถ็ฑป้่พน, ๅญ็ฑปๅป็ปงๆฟ็ถ็ฑป(็ถ็ฑป่งฃๅณๅฌๅฑๆนๆณ, ๅญ็ฑป่งฃๅณๅทไฝ้ฎ้ข)
			็ถ็ฑปๆฏๆฝ่ฑก็ฑป, ๅญ็ฑปๆฏๅทไฝ็ฑป, ็ถ็ฑปไธๅปๅฎไพ, ๅญ็ฑปๅปๅฎไพ
*/
class UserAbstract { //๐๐้ป่พไธๅบ่ฏฅๆฏใๆฝ่ฑก็ฑปใ, ๐ฅๆทปๅ ไธไธชๅ่ฝๅ, ๆๆๅญ็ฑป้ฝไผ็ปงๆฟ่ฟไธชๅ่ฝ!!
	constructor (name, role, pages) {
		this.name = name
		this.role = role
		this.pages = pages
	}

	// ๆๆไบบ้ฝๆ็ๆนๆณ
	welcome() {
		console.log('ๆฌข่ฟๅๆฅ', this.name)
	}

	dataShow() {
		throw new Error('ๅญ็ฑปๅฟ้กปๅฎ็ฐ dataShow ๆนๆณ')
	}
}


// ่ถ็บง็ฎก็ๅๅญ็ฑป
class SuperAdmin extends UserAbstract {
	constructor (name) {
		// ๐ฅ๐็ธๅฝไบไผ ๅฅไบ name \ role \ pages
		super(
			name, 
			'superadmin', 
			['home', 'user-manage', 'right-manage', 'new-manage']
		)
	}

	// ้ๅ็ถ็ฑป็ๆนๆณ
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


// ๆฎ้็ฎก็ๅๅญ็ฑป
class Admin extends UserAbstract {
	constructor (name) {
		super(
			name, 
			'admin', 
			['home', 'user-manage']
		)
	}

	// ้ๅ็ถ็ฑป็ๆนๆณ
	dataShow() {
		//...
		console.log('admin-dataShow')
	}

	addUser() {
		//...
	}
}


// ็ผ่พๅญ็ฑป
class Editor extends UserAbstract {
	constructor (name) {
		super(
			name, 
			'editor', 
			['home', 'new-manage']
		)
	}

	// ้ๅ็ถ็ฑป็ๆนๆณ
	dataShow() {
		//...
		console.log('editor-dataShow')
	}
}


// ๆฎ้็จๆทๅญ็ฑป
class User_ extends UserAbstract {
	constructor (name) {
		super(
			name, 
			'user', 
			['home']
		)
	}

	// ้ๅ็ถ็ฑป็ๆนๆณ
	dataShow() {
		//...
		console.log('user-dataShow')
	}
}

// ๐ฅๆ นๆฎไธๅ็่ง่ฒๅป่ฟๅไธๅ็็ฑป(็ไบง็ฑป็ๅทฅๅ๐ญ), ๐ฅ๐ฅๆณจๆ่ฟ้ใๅนถๆฒกๆๅฎไพๅใ๏ผ๏ผๅ ไธบๆฏใๆฝ่ฑก็ๅทฅๅๆจกๅผใ
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
			throw new Error('ๅๆฐ้่ฏฏ')
	}
}

//โก๏ธๆฟๅฐ็ๅชๆฏไธไธชไธช็ฑป
let userClass = getAbstractUserFactory('superadmin')
console.log(userClass) 

//โก๏ธๅฎไพๅ็ฑป๏ผ
let user6 = new userClass('superadmin')
console.log(user6)
