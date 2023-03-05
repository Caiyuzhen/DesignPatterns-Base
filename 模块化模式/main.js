/*
	【模块模式】
		JS 中管理私有跟公有方法, 减少变量冲突问题, 减少依赖关系混乱的问题, 使代码更加清晰, 更加易于维护
*/


// 🌰例子一: 过去以闭包的方式实现模块化 ——————————————————————————————————————————————————
const obj = (function(){ //⚡️闭包形式, 外部无法直接访问 count 变量, 因为 count 是临时变量, 只能通过 obj 的【内部提供的方法】来访问
	let count = 0  //闭包私有变量, 不怕命名冲突

	return { //暴露出去的公有方法
		increse() {
			return ++count
		},

		decrese() {
			return --count
		}
	}
})()




// 🌰例子二: ES6 模块化 ——————————————————————————————————————————————————————————————
let count = 0
function increse() {
	return ++count //++count 就是先返回 + 后的值也就是 1, count 就是先返回 0 再加 1
}

function decrese() { //
	return --count
}

console.log(increse()) //1
console.log(increse()) //2
console.log(increse()) //3

//导出模块, 供外部使用, 此时 count 不能被访问到, 只能通过 increse() 、 decrese 来访问
export default { 
	increse,
	decrese 
}