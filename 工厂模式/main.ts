/*
	🏭【工厂模式】就是能够帮我们生产不同实例的函数
		🔥如果子类的属性或方法太多, 那么可以把这些属性跟方法抽象到父类里边, 子类去继承父类(父类解决公共方法, 子类解决具体问题)
			【父类是抽象类, 子类是具体类】

*/
// 引入 ts
import './ts'

// 通过【函数】模拟工厂模式 ——————————————————————————————————————————————————————————————

// 👇简单工厂模式
type IPerson = {
	name ?: string
	age ?: number
	sex ?: string
}

function CreatePerson(name: string, age:number, sex:string) {
	let obj:IPerson = {}
	obj.name = name
	obj.age = age
	obj.sex = sex

	return obj
}


