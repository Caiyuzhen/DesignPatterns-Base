/*
	【💡备忘录模式】 
		1.本质就是历史纪录, 把需要保存的数据存到一个堆栈中；
		2.可以一步步撤回保存过的数据；

		备忘录模式由三个主要组件组成：
			发起人（Originator）：负责创建备忘录，并从备忘录中恢复其内部状态。
			备忘录（Memento）：用于存储发起人的内部状态。备忘录可以有多个实例，每个实例的内部状态可能不同。
			管理者（Caretaker）：负责存储备忘录，并提供一个用于恢复备忘录的接口。管理者不需要了解备忘录的具体实现细节。	
*/


// 🌰例子一(保存水果到冰箱中): ——————————————————————————————————————————————————————————————————


// 🔥发起者, 负责保存水果（状态）
class Caretaker {
	constructor() {
		this.fruitName = ''
	}

	getFruitName() {
		return this.fruitName
	}

	setFruitName(fruitName) {
		this.fruitName = fruitName
	}

	createFruit() { //🔥创建备忘录方法
		return new Fruit(this.fruitName) //🔥【第一步】传入水果名, 创建水果, 返回给到【管理者】的 push 方法中
	}

	restoreFruit() { //🔥恢复备忘录方法
		this.setFruitName((new Fruit).getName())
	}
}

// 【备忘录本身】,因为它保存了需要备忘的状态（水果名称），并且它提供了 getName 和 setName 方法来获取和设置状态, 将被保存到 Manager 类的数组中
class Fruit {
	constructor(name) {
		this.name = name
	}

	getName() {
		return this.name
	}

	setName(name) {
		this.name = name
	}
}


//【管理者】, 它有一个数组来保存备忘录对象（即水果对象)
class Manager {
	constructor() {
		this.container = []
		this.top = 0 //搭建一个堆栈, 用于保存【备忘录】！！
	}

	// 把水果放入冰箱 🔥【第二步】
	push(f) {
		this.container[this.top] = f //把水果放入冰箱的顶部, 比如 fruit[0] = '西瓜'
		if(this.top >= 3) {
			console.log("冰箱已满！, 储存不下" + f.getName())
			return false
		}else{
			console.log("已存入" + f.getName())
			this.top ++
			return true
		}
	}

	// 把水果从冰箱取出
	pop() {
		this.top --
		let f = this.container[this.top] //从冰箱的顶部取出水果
		if(this.top <= 0) {
			console.log("已达到最大撤回数量" + f.getName())
		}else{
			console.log("撤回了" + f.getName())
		}
	}
}



class Customer {
	static main() {
		let p = new Caretaker()
		let m = new Manager()

		p.setFruitName("苹果") //🔥【第三步】
		m.push(p.createFruit()) //保存【苹果】到备忘录（冰箱）

		p.setFruitName("香蕉")
		m.push(p.createFruit()) //保存【香蕉】到备忘录（冰箱）

		p.setFruitName("橘子")
		m.push(p.createFruit()) //保存【橘子】到备忘录（冰箱）

		p.setFruitName("西瓜")
		m.push(p.createFruit()) //冰箱已满！, 储存不下西瓜

		p.restoreFruit(m.pop()) //恢复状态, 撤回了【橘子】
	}
}


Customer.main()