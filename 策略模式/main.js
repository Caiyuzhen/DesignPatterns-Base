/* 🧮 本质是根据一定的策略（或算法）返回对应的数值 
		开放封闭原则
			对扩展开放，对修改封闭
*/
// 函数式的写法 (🔥抽离出算法)
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





/*(👇 具体场景的例子 
	比如根据后端返回的【文章审核列表】, 有不同的状态, 根据不同的状态显示【不同的页面颜色】
*/
// 🔥🔥🔥 写法一: 不用策略模式的写法  ———————————————————————————————————————————————————————————————————————————————————				
let listData = [
	{
		title: '标题1',
		status: 3//审核不通过
	},
	{
		title: '标题2',
		status: 1//待审核
	},
	{
		title: '标题3',
		status: 2//审核通过
	},
	{
		title: '标题4',
		status: 1//已发布
	},
	{
		title: '标题5',
		status: 3//审核不通过
	}
]

const myList = document.querySelector('#myList_1')

myList.innerHTML = listData.map((item) => {
	if(item.status === 1) {
		return (
			`
			<li>
				<div>${item.title}</div>
				<div class="noStart"> 未审核:  ${item.status}</div>
			</li>`
		)
	}
	if(item.status === 2) {
		return (
			`
			<li>
				<div>${item.title}</div>
				<div class="approve">已通过: ${item.status}</div>
			</li>`
		)
	}
	if(item.status === 3) {
		return (
			`
			<li>
				<div>${item.title}</div>
				<div class="noApprove">被驳回: ${item.status}</div>
			</li>`
		)
	}
}).join('')//join 用来把数组转成字符串






// 🔥🔥🔥 👍👍 写法二: 用策略模式的写法  ———————————————————————————————————————————————————————————————————————————————————				
let listData2 = [
	{
		title: '标题1',
		status: 3//审核不通过
	},
	{
		title: '标题2',
		status: 1//待审核
	},
	{
		title: '标题3',
		status: 2//审核通过
	},
	{
		title: '标题4',
		status: 1//已发布
	},
	{
		title: '标题5',
		status: 3//审核不通过
	}
]

const listStrategry = { //🔥策略模式的算法 (根据不同的状态显示不同的页面颜色, 后续维护这里就可以了)
	1: {
		content: '未审核', //在 TS 中可以用枚举来管理字符串
		className: 'noStart'
	},
	2: {
		content: '已通过', //在 TS 中可以用枚举来管理字符串
		className: 'approve'
	},
	3: {
		content: '被驳回', //在 TS 中可以用枚举来管理字符串
		className: 'noApprove'
	}
}

const myList2 = document.querySelector('#myList_2')

myList2.innerHTML = listData2.map(item => {//🔥🔥item 是 listData2 内遍历出来的每一项 【title + status】 数据！
	// 🔥item.status 是索引位！！
	return (
		`<li>
			<div>${item.title}</div> 
			<div class="${listStrategry[item.status].className}">${listStrategry[item.status].content}</div> 
		</li>`
	)
}).join('')//join 用来把数组转成字符串

	