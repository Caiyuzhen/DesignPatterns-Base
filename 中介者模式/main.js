/*
	【💡中介者模式】 
		一种行为型设计模式，它通过一个中介对象来协调多个对象之间的通信，从而减少对象之间的直接耦合

		在中介者模式中，通常会有一个中介者对象，它封装了对象之间的交互细节，每个对象只需要知道中介者对象即可，而不需要了解其他对象的具体实现。
			
*/


// 🌰例子一(下面是一个图书馆管理系统的例子，使用中介者模式实现了各个组件之间的通信): ——————————————————————————————————————————————————————————————————
/*
	在这个例子中，Library 充当中介者角色，负责管理图书和用户，并将事件通知给所有用户。
	Book 和 User 是同事角色，它们通过中介者 Library 来通信。
	当图书或用户被添加时，Library 会通知所有的用户。
	这种方式避免了同事之间的直接依赖关系，使系统更加灵活和易于扩展。
*/ 

class Library {
	constructor() {
	  this.books = []
	  this.users = []
	}
  
	addBook(book) {
	  this.books.push(book)
	  this.notifyAll('bookAdded', book)
	}
  
	addUser(user) {
	  this.users.push(user)
	  this.notifyAll('userAdded', user)
	}
  
	notifyAll(eventName, data) {
	  this.users.forEach((user) => user.onNotify(eventName, data))
	}
  }
  
  class Book {
	constructor(title, author) {
	  this.title = title
	  this.author = author
	}
  
	toString() {
	  return `${this.title} by ${this.author}`
	}
  }
  
  class User {
	constructor(name) {
	  this.name = name
	}
  
	onNotify(eventName, data) {
	  switch (eventName) {
		case 'bookAdded':
		  console.log(`User ${this.name} has been notified that the book ${data.toString()} has been added.`)
		  break
		case 'userAdded':
		  console.log(`User ${this.name} has been notified that the user ${data.name} has been added.`)
		  break
		default:
		  console.log(`User ${this.name} has been notified about ${eventName} with data ${data}.`)
	  }
	}
  }
  
  const library = new Library()
  const user1 = new User('Alice')
  const user2 = new User('Bob')
  const book1 = new Book('The Lord of the Rings', 'J.R.R. Tolkien')
  const book2 = new Book('Harry Potter and the Philosopher\'s Stone', 'J.K. Rowling')
  
  library.addUser(user1)
  library.addUser(user2)
  library.addBook(book1)
  library.addBook(book2)
