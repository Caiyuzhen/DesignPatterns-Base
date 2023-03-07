/*
	【💡解释器模式】 
		
			
*/


// 🌰例子一(): ——————————————————————————————————————————————————————————————————
/*
	当用户输入一个表达式时，解释器模式会将其转化为一组可执行的操作

	使用parse函数将字符串表达式解析为NumberExpression和PlusExpression对象的操作链，并使用interpret方法计算其结果
*/ 

class PlusExpression {
	constructor(left, right) {
	  this.left = left;
	  this.right = right;
	}
	interpret() {
	  return this.left.interpret() + this.right.interpret();
	}
  }
  
  class NumberExpression {
	constructor(value) {
	  this.value = value;
	}
	interpret() {
	  return this.value;
	}
  }
  
  function parse(expression) {
	const tokens = expression.split("+");
	let left = new NumberExpression(parseInt(tokens[0]));
	for (let i = 1; i < tokens.length; i++) {
	  let right = new NumberExpression(parseInt(tokens[i]));
	  left = new PlusExpression(left, right);
	}
	return left;
  }
  
  // 使用示例
  const expression = "1+2+3";
  const parsed = parse(expression);
  const result = parsed.interpret();
  console.log(result); // 输出6
