/*
	๐ญใๆ้ ๅจๆจกๅผใ
		- ็จไบๅบไบไธๅฎ็็ปๆ, ๅๅปบ็นๅฎ็ฑปๅ็ๅฏน่ฑก๏ผ ๆฏๅฆๆน้ๅ้ ๅๅทฅ ๏ผ
*/

// 1. ๅฝๆฐ็ๆนๅผๅ้ ๆ้ ๅจ โโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโ
function Employee(name, age) {
	this.name = name
	this.age = age
	// ่ฟไธชๅฝๆฐๅพๆตช่ดนๅๅญ็ฉบ้ด, ๅฏไปฅๆพๅจๅๅไธ, ๅๅ็ๅๅญๅชๆไธไปฝ
	// this.say = function() {
	// 	return(this.name + '่ฏด: ๆไปๅนด' + this.age + 'ๅฒไบ')
	// }
}

// ๅจๅๅไธๆทปๅ ๆนๆณ, ็ๅๅญ็ฉบ้ด
Employee.prototype.say = function () {
	return(this.name + '่ฏด: ๆไปๅนด' + this.age + 'ๅฒไบ')
}


let person1 = new Employee('Kim', 18)
console.log(person1)
// console.log(person1.say())


let person2 = new Employee('Jimmy', 20)





// 2. ๐๐๐็ฑป็ๆนๅผๅ้ ๆ้ ๅจ โโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโ
class Employee2 {
	constructor(name, age) {
		this.name = name
		this.age = age
	}

	say() {
		return(this.name + '่ฏด: ๆไปๅนด' + this.age + 'ๅฒไบ')
	}
}

let person3 = new Employee2('Lee', 26)
console.log(person3.say())




// ใ๐๐๐ๆกไพใ้ขๅๅฏน่ฑก็้้กนๅก โโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโโ
function Tabs(selector, type) {
	this.selector = document.querySelector(selector)	
	this.headerItems = this.selector.querySelectorAll('.header li') //๐ฅ๐ฅๆพ header ไธ็ๆๆ li
	this.boxItems = this.selector.querySelectorAll('.box li')
	this.type = type

	console.log(this.headerItems, this.boxItems)

	this.change()// ๐ฅ๐่ฐ็จๅๅๆนๆณ change๏ผๅฎไพๅๅๅ็ๆถๅไผ่ชๅจๆง่ก๏ผ
}

// ๅๅๆนๆณ
Tabs.prototype.change = function() {
	for (let i = 0; i < this.headerItems.length; i ++)  {
		//็ปๆฏไธ้กน็ปๅฎไธไธช็นๅปไบไปถ (๐ฅ็ฎญๅคดๅฝๆฐ็ this ๆๅ็ถ็บง)๏ผ๏ผ
		this.headerItems[i].addEventListener(this.type, () => { //this.type ไธบไผ ๅฅ็ๅๆฐ(๐ฅ๐ฅ๐ฅไบไปถ็ฑปๅไธบ click ๆ mouseover๏ผ)
			// console.log(i) //ๅฝๅ้ไธญ็่ฟ้กน tab ็็ดขๅผ

			for(let m = 0; m < this.headerItems.length; m ++) {
				this.headerItems[m].classList.remove('active') //๐ฅๅ็งป้คๆๆ็็ฑปๅ็ถๅๅๅ ไธ
				this.boxItems[m].classList.remove('active') //ๅ็งป้คๆๆ็็ฑปๅ

				// ็ปๅฝๅ้ไธญ็่ฟ้กน tab ๆทปๅ ็ฑปๅ
				this.headerItems[i].classList.add('active')
				this.boxItems[i].classList.add('active')
			}
		}, false)
	}
}

new Tabs('.container1', 'click')
new Tabs('.container2', 'mouseover')
