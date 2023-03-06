/*
	【享元模式】
		享元模式可以用来优化内存的使用，以减少相似对象的重复创建和消耗。
		享元模式的基本思想是通过共享相同的数据来减少内存占用。它的实现方式是把对象分成内部状态和外部状态两部分，内部状态是对象的固定部分，而外部状态是可变的、不影响对象基本特性的部分
*/ 

// 创建图形对象工厂
var ShapeFactory = (function() {
	var shapes = {};
  
	return {
	  getShape: function(color, shape) {
		if (!shapes[color + shape]) {
		  shapes[color + shape] = new Shape(color, shape);
		}
  
		return shapes[color + shape];
	  }
	};
  })();
  
  // 定义图形对象
  function Shape(color, shape) {
	this.color = color;
	this.shape = shape;
  }
  
  // 使用图形对象工厂来创建多个对象
  var redCircle = ShapeFactory.getShape("red", "circle");
  var greenCircle = ShapeFactory.getShape("green", "circle");
  var redSquare = ShapeFactory.getShape("red", "square");
  var greenSquare = ShapeFactory.getShape("green", "square");
  
  // 检查对象是否被共享
  console.log(redCircle === ShapeFactory.getShape("red", "circle")); // true
  console.log(greenCircle === ShapeFactory.getShape("green", "circle")); // true
  console.log(redSquare === ShapeFactory.getShape("red", "square")); // true
  console.log(greenSquare === ShapeFactory.getShape("green", "square")); // true