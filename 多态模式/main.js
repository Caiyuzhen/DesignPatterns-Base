/*
	【🌟多态模式】
		🔥根据对象深生成不同的操作！！
*/

// 🌰例子一 （计算面积）  ——————————————————————————————————————————————————————————————————
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