/*
	☕️【享元模式】
		享元模式可以用来优化内存的使用，以减少相似对象的重复创建和消耗。
		享元模式的基本思想是通过共享相同的数据来减少内存占用。它的实现方式是把对象分成内部状态和外部状态两部分，内部状态是对象的固定部分，而外部状态是可变的、不影响对象基本特性的部分
*/ 


// 创建图形对象工厂(🔥享元工厂, 会缓存一些用过的类实例！)
var ShapeFactory = (function() {
	var shapes = {}
  
	// 🔥闭包保存【缓存对象】
	return {
		getShape: function(color, shape) {
			if (!shapes[color + shape]) {//🔥🔥匹配键值对, 如果没有, 就创建一个！！比如 shapes[red + circle]  =>  shapes[redcricle] 
				shapes[color + shape] = new Shape(color, shape) //🔥相当于缓存, 以后再次创建相同的对象时, 直接从缓存中取!!把 colro + shape 两个字符串加起来作为 key！
				/* 👆比如缓存为这样的键值对模式！！  {redcircle: Shape, greencircle: Shape, redsquare: Shape, greensquare: Shape}
				*/
			}

		return shapes[color + shape]
		}
	}
})()
  
// 定义图形对象
function Shape(color, shape) {
	this.color = color
	this.shape = shape
}
  
// 使用图形对象工厂来创建多个对象
let redCircle = ShapeFactory.getShape("red", "circle")
let greenCircle = ShapeFactory.getShape("green", "circle")
let redSquare = ShapeFactory.getShape("red", "square")
let greenSquare = ShapeFactory.getShape("green", "square")

// 检查对象是否被共享
console.log(redCircle === ShapeFactory.getShape("red", "circle")) // true
console.log(greenCircle === ShapeFactory.getShape("green", "circle")) // true
console.log(redSquare === ShapeFactory.getShape("red", "square"));// true
console.log(greenSquare === ShapeFactory.getShape("green", "square"));// true