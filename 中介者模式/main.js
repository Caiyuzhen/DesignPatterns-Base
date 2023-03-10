/*
	ãð¡ä¸­ä»èæ¨¡å¼ã 
		ä¸ç§è¡ä¸ºåè®¾è®¡æ¨¡å¼ï¼å®éè¿ä¸ä¸ªä¸­ä»å¯¹è±¡æ¥åè°å¤ä¸ªå¯¹è±¡ä¹é´çéä¿¡ï¼ä»èåå°å¯¹è±¡ä¹é´çç´æ¥è¦å

		å¨ä¸­ä»èæ¨¡å¼ä¸­ï¼éå¸¸ä¼æä¸ä¸ªä¸­ä»èå¯¹è±¡ï¼å®å°è£äºå¯¹è±¡ä¹é´çäº¤äºç»èï¼æ¯ä¸ªå¯¹è±¡åªéè¦ç¥éä¸­ä»èå¯¹è±¡å³å¯ï¼èä¸éè¦äºè§£å¶ä»å¯¹è±¡çå·ä½å®ç°ã
			
*/


// ð°ä¾å­ä¸(ä¸é¢æ¯ä¸ä¸ªå¾ä¹¦é¦ç®¡çç³»ç»çä¾å­ï¼ä½¿ç¨ä¸­ä»èæ¨¡å¼å®ç°äºåä¸ªç»ä»¶ä¹é´çéä¿¡): ââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
/*
	å¨è¿ä¸ªä¾å­ä¸­ï¼Library åå½ä¸­ä»èè§è²ï¼è´è´£ç®¡çå¾ä¹¦åç¨æ·ï¼å¹¶å°äºä»¶éç¥ç»ææç¨æ·ã
	Book å User æ¯åäºè§è²ï¼å®ä»¬éè¿ä¸­ä»è Library æ¥éä¿¡ã
	å½å¾ä¹¦æç¨æ·è¢«æ·»å æ¶ï¼Library ä¼éç¥ææçç¨æ·ã
	è¿ç§æ¹å¼é¿åäºåäºä¹é´çç´æ¥ä¾èµå³ç³»ï¼ä½¿ç³»ç»æ´å çµæ´»åæäºæ©å±ã
*/ 

//ä¸­ä»è(Book æ´æ°åå°±ä¼éç¥ææç User)
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
  
	// éç¥ææçç¨æ· User
	notifyAll(eventName, data) {
	  this.users.forEach((user) => user.onNotify(eventName, data)) //ð¥éç¥ææç user å®ä¾
	}
  }
  


  class Book {
	constructor(title, author) {
	  this.title = title
	  this.author = author
	}
  
	// å¾ä¹¦çä½èåæ é¢
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
