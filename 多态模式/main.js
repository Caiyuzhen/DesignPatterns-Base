/*
	【🌟多态模式】
		🔥同一个行为具有多个不同表现形式或形态的能力
			把 "做什么" 和 "谁去做以及怎么去做" 分离开，抽象概括就是把 "不变的事物" 和 "可能改变的事物" 分离开

			比如把【叫】这个动作跟【不同的动物】分离开
*/

// 🌰例子一（动物叫声）  ——————————————————————————————————————————————————————————————————
// 非多态的方式, 把【动物】跟【叫声】绑定在一起了
const makeSound = function(animal) {
    if(animal instanceof Duck) {
        console.log('嘎嘎嘎')
    } else if (animal instanceof Chicken) {
        console.log('咯咯咯')
    }
}
let Duck = function(){}
let Chiken = function() {}

makeSound(new Chicken())
makeSound(new Duck())



// 多态的方式, 把【动物】跟【叫声】分离开
var makeSound_ = function(animal) {
    animal.sound();
}

var Duck_ = function(){}
Duck.prototype.sound = function() {
    console.log('嘎嘎嘎')
}
var Chiken_ = function() {};
Chiken.prototype.sound = function() {
    console.log('咯咯咯')
}

makeSound_(new Chicken_())
makeSound_(new Duck())





// 🌰例子二 （计算面积）  ——————————————————————————————————————————————————————————————————
function calculateArea(shape) {
	if (shape.type === 'circle') {
	  	return Math.PI * shape.radius ** 2
	} else if (shape.type === 'rectangle') {
		return shape.width * shape.height;
	} else {
		throw new Error('Unknown shape type')
	}
}
  
// 🔥calculateArea 会根据你传入的不同对象 type, 生成不同的计算方法!!
const circle = { type: 'circle', radius: 5 }
const rectangle = { type: 'rectangle', width: 10, height: 20 }
  

console.log(calculateArea(circle)); // 78.53981633974483
console.log(calculateArea(rectangle)); // 200