/*
	【🌟访问者模式】
	 	稳定的数据结构和易变的操作耦合问题。

		如果系统的数据结构是比较稳定的，但其操作（算法）是易于变化的，那么使用访问者模式是个不错的选择；如果数据结构是易于变化的，则不适合使用访问者模式。

*/

// 🌰例子一  ——————————————————————————————————————————————————————————————————
/*
	假设有一个电商网站，它有许多不同种类的商品，例如书籍、音乐 CD、电影 DVD 等等。
	每个商品都有自己的价格和描述。
	现在我们要实现一个计算商品总价的功能，可以通过访问者模式来解决。

	使用访问者模式来计算购物车中所有商品的总价，而不必修改商品对象的结构
*/

// 🔥商品
class Product {
	constructor(price, description) { //price 表示商品价格，description 表示商品描述
		this.price = price;
		this.description = description;
	}
  
	accept(visitor) {
		visitor.visit(this);
	}
}


//🔥购物车，包含多个商品
class Cart {
	constructor() {
		this.products = [] //🔥表示购物车中包含的商品
	}

	addProduct(product) {//🔥向购物车中添加商品
		this.products.push(product);
	}

	accept(visitor) { //🔥遍历购物车中的每个商品，并调用其 accept() 方法，最后返回访问者对象的总价
		for (let product of this.products) {
		product.accept(visitor)

		}
		return visitor.getTotalPrice();
	}
}

//🔥计算商品总价
class Visitor {
	constructor() {
		this.totalPrice = 0 //🔥商品总价
	}

	visit(product) { //🔥用于访问商品对象并计算价格
		this.totalPrice += product.price;
	}

	getTotalPrice() { //🔥获取商品总价
		return this.totalPrice;
	}
}



const cart = new Cart();
const visitor = new Visitor();

cart.addProduct(new Product(10, "Book"));
cart.addProduct(new Product(20, "CD"));
cart.addProduct(new Product(30, "DVD"));

const totalPrice = cart.accept(visitor);

console.log(totalPrice); // Output: 60