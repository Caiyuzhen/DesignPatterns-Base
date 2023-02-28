/*
	单例模式是【只是（不是只能！）】实例化一次的模式
*/

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
		return this.instance
	}

}

const a = new Singleton('a')
const b = new Singleton('b')

