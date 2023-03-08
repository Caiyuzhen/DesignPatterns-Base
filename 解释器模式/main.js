/*
	【💡解释器模式】 
		比如一个场景发生的频率非常高, 那么可以抽象成一个简单的表达式（比如终端命令或者是一些预处理器中）
			
*/


// 🌰例子一(): ——————————————————————————————————————————————————————————————————
/*
	当用户输入一个表达式时，解释器模式会将其转化为一组可执行的操作

	使用 parse 函数将字符串表达式解析为 NumberExpression 和P lusExpression 对象的操作链，并使用 interpret 方法计算其结果
*/ 

// 🚀加号解释器
class PlusExpression {
	// 保存一下左右两个表达式
	constructor(left, right) {
		this.left = left;
		this.right = right;
	}

	// 计算结果
	interpret() {
		return this.left.interpret() + this.right.interpret()
	}
}

	
// 🚀数字解释器
class NumberExpression {
	constructor(value) {
		this.value = value
	}

	// 计算结果
	interpret() {
		return this.value
	}
}


// 🔥🔥最终解析字符串的函数
function parse(expression) {
	const tokens = expression.split("+") //拆分成一个个数字

	let left = new NumberExpression(parseInt(tokens[0])) // 第一个数字

	for (let i = 1; i < tokens.length; i++) {
		let right = new NumberExpression(parseInt(tokens[i])) // 第二个数字
		left = new PlusExpression(left, right) // 
	}
	return left;
}
  
// 使用示例
const expression = "1+2+3"
const parsed = parse(expression) 
const result = parsed.interpret()
console.log(result); // 输出6




// 🌰例子二(): ——————————————————————————————————————————————————————————————————
// 抽象表达式
class Expression_2 {
	interpret() {
	  throw new Error("抽象表达式不能直接调用 interpret 方法。");
	}
  }
  
// 终端上下文
class Context {
	constructor(input) {
		this.input = input;
		this.output = 0;
	}

	setInput(input) {
		this.input = input;
	}

	setOutput(output) {
		this.output = output;
	}

	getInput() {
		return this.input;
	}

	getOutput() {
		return this.output;
	}
}

// 具体表达式：数字
class NumberExpression extends Expression_2 {
	constructor(number) {
		super();
		this.number = number;
	}

	interpret(context) {
		context.setOutput(this.number);
	}
}

// 具体表达式：加法
class PlusExpression extends Expression_2 {
	constructor(left, right) {
		super();
		this.left = left;
		this.right = right;
	}

	interpret(context) {
		this.left.interpret(context);
		const leftValue = context.getOutput();
		this.right.interpret(context);
		const rightValue = context.getOutput();
		context.setOutput(leftValue + rightValue);
	}
}

// 客户端代码
const context = new Context();
const expression_2 = new PlusExpression(
new NumberExpression(1),
new PlusExpression(new NumberExpression(2), new NumberExpression(3))
);
expression_2.interpret(context);
console.log(context.getOutput()); // 输出 6
