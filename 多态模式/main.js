/*
	ใ๐ๅคๆๆจกๅผใ
		๐ฅๅไธไธช่กไธบๅทๆๅคไธชไธๅ่กจ็ฐๅฝขๅผๆๅฝขๆ็่ฝๅ
			ๆ "ๅไปไน" ๅ "่ฐๅปๅไปฅๅๆไนๅปๅ" ๅ็ฆปๅผ๏ผๆฝ่ฑกๆฆๆฌๅฐฑๆฏๆ "ไธๅ็ไบ็ฉ" ๅ "ๅฏ่ฝๆนๅ็ไบ็ฉ" ๅ็ฆปๅผ

			ๆฏๅฆๆใๅซใ่ฟไธชๅจไฝ่ทใไธๅ็ๅจ็ฉใๅ็ฆปๅผ
*/

// ๐ฐไพๅญไธ๏ผๅจ็ฉๅซๅฃฐ๏ผ  โโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโ
// ้ๅคๆ็ๆนๅผ, ๆใๅจ็ฉใ่ทใๅซๅฃฐใ็ปๅฎๅจไธ่ตทไบ
const makeSound = function(animal) {
    if(animal instanceof Duck) {
        console.log('ๅๅๅ')
    } else if (animal instanceof Chicken) {
        console.log('ๅฏๅฏๅฏ')
    }
}
let Duck = function(){}
let Chiken = function() {}

makeSound(new Chicken())
makeSound(new Duck())



// ๅคๆ็ๆนๅผ, ๆใๅจ็ฉใ่ทใๅซๅฃฐใๅ็ฆปๅผ
var makeSound_ = function(animal) {
    animal.sound();
}

var Duck_ = function(){}
Duck.prototype.sound = function() {
    console.log('ๅๅๅ')
}
var Chiken_ = function() {};
Chiken.prototype.sound = function() {
    console.log('ๅฏๅฏๅฏ')
}

makeSound_(new Chicken_())
makeSound_(new Duck())





// ๐ฐไพๅญไบ ๏ผ่ฎก็ฎ้ข็งฏ๏ผ  โโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโ
function calculateArea(shape) {
	if (shape.type === 'circle') {
	  	return Math.PI * shape.radius ** 2
	} else if (shape.type === 'rectangle') {
		return shape.width * shape.height;
	} else {
		throw new Error('Unknown shape type')
	}
}
  
// ๐ฅcalculateArea ไผๆ นๆฎไฝ ไผ ๅฅ็ไธๅๅฏน่ฑก type, ็ๆไธๅ็่ฎก็ฎๆนๆณ!!
const circle = { type: 'circle', radius: 5 }
const rectangle = { type: 'rectangle', width: 10, height: 20 }
  

console.log(calculateArea(circle)); // 78.53981633974483
console.log(calculateArea(rectangle)); // 200