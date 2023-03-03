/* 🧮 本质是根据一定的策略（或算法）返回对应的数值 
		开放封闭原则
			对扩展开放，对修改封闭
*/
// 函数式的写法
let strategryFn = {
	'S': (salary) => {
		return salary * 4
	},
	'A': (salary) => {
		return salary * 3
	},
	'B': (salary) => {
		return salary * 2
	},
	'C': (salary) => {
		return salary * 1
	}
}

function calBonus (level, salary)  {
	return strategryFn[level] (salary) //🔥🔥返回的是👆一个函数, 所以这里要传入参数！！ (salary) => {return salary * n},
}

const LeeMing = calBonus('A', 10000) //
console.log(LeeMing)


/*//不抽象类的写法
	let performaceLevelS = function (salary) {
		return salary * 4
	}
	let performaceLevelA = function (salary) {
		return salary * 3
	}

	let performaceLevelB = function (salary) {
		return salary * 2
	}

	let performaceLevelC = function (salary) {
		return salary * 1
	}

	let calculate = function(performaceLevel, salary) {
	if (performaceLevel === 'S') {
		performaceLevelS ()
	}
	if (performaceLevel === 'A') {
		performaceLevelA ()
	}
	if (performaceLevel === 'B') {
		performaceLevelB ()
	}
	if (performaceLevel === 'C') {
		performaceLevelC ()
	}
}
*/



/*抽象出【策略类】, 后续方便扩展*/
class PerformanceS {
	calculate (salary) {
		return salary * 4
	}
}

class PerformanceA {
	calculate (salary) {
		return salary * 3
	}
}

class PerformanceB {
	calculate (salary) {
		return salary * 2
	}
}

class PerformanceC {
	calculate (salary) {
		return salary * 1
	}
}

// 选择策略的函数 （输入等级）
let performances = (performance) => {
	switch (performance) {
		case 'S':
			return new PerformanceS()
		case 'A':
			return new PerformanceA()
		case 'B':
			return new PerformanceB()
		case 'C':
			return new PerformanceC()
		default:
			return new PerformanceC() //至少有一倍的奖金
	}
}



/*抽象出【奖金流程类】, 获得奖金的流程*/
class Bouns {
	// 静态属性
	salary = null //基础薪资
	level = null //等级

	// 如果 class() 要 传参，就要用 constructor
	// constructor (salary, level) {
	// 	this.salary = salary
	// 	this.level = level
	// }

	setSalary (salary) {
		this.salary = salary
	}

	setLevel (level) { 
		this.level = level
	}

	getBouns () {
		return this.level.calculate(this.salary) //根据不同的等级计算不同的奖金数
	}
}




/*测试策略, 面向对象的写法*/
// let bouns = new Bouns()
// bouns.setSalary(10000)
// bouns.setLevel(new PerformanceS())
// console.log(bouns.getBouns()) //40000

// let bouns2 = new Bouns()
// bouns2.setSalary(20000)
// bouns.setLevel(new PerformanceB())
// console.log(bouns2.getBouns()) //40000


		
/*测试策略, 函数整合的写法*/
let bouns = new Bouns()
bouns.setSalary(20000)
bouns.setLevel(performances('S'))
console.log(bouns.getBouns()) //80000


	