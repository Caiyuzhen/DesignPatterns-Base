/*
	【💡外观模式】 
		包含
			🏠 外观 ｜ 门面角色（Facade）
       			1.知道哪些子系统负责处理请求。
       			2.将客户的请求委托给相应的子系统对象。
				3.为多个子系统提供给一个共同的接口。

			📐 子系统角色（SubSystem）
				1.实现系统的部分功能, 可以可以通过外观角色来访问它。

			😄 客户角色（Client）
				1.通过外观角色访问子系统的功能
*/


// 🌰例子一(客户去银行贷款): ——————————————————————————————————————————————————————————————————
class Facade {
	constructor(name) {
		this.name =name
	}

	// 暴露一个方法给到客户（也就是接口）
	applyFor(amount) { //调用子系统内的方法
		 // 访问多个子系统
		 let result = "批准";
		 if (!new Bank().verify(this.name, amount)) {
				 result = "拒绝";
		 } else if (!new Credit().get(this.name)) {
				 result = "拒绝";
		 } else if (!new Background().check(this.name)) {
				 result = "拒绝";
		 }
		 return this.name + "你的" + amount + " 抵押贷款,已经被" + result;
	}
}

//银行
const Bank = function() {
	this.verify = function(name, amount) { //校验名字对应的资金
			// 省略复杂的逻辑代码......
			return true
	}
}
//信用
const Credit = function() {
	this.get = function(name) { //校验名字对应的信用
			// 省略复杂的逻辑代码......
			return true
	}
}
//背景资料
const Background = function() {
	this.check = function(name) { //校验名字对应的背景
			// 省略复杂的逻辑代码......
			return true
	}
}


// 客户开始贷款
function clientStartMortgage() {
	let mortgageThing = new Facade("张三");
	let result = mortgageThing.applyFor("100,000元");
	console.info("%c%s", "color:#ff44cd; font-size:18px", result);
}

clientStartMortgage()




// 🌰例子二(绘制图形）: ——————————————————————————————————————————————————————————————————
// 外观类
class ShapeFacade {
	constructor() {
		this.circle = new Circle();
		this.square = new Square();
		this.triangle = new Triangle();
	}
  
	drawCircle() {
		this.circle.draw();
	}
  
	drawSquare() {
		this.square.draw();
	}

	drawTriangle() {
		this.triangle.draw();
	}
}
  
// 子系统之一 - 圆形
class Circle {
	draw() {
		console.log('Circle drawn');
	}
}
  
// 子系统之二 - 正方形
class Square {
	draw() {
		console.log('Square drawn');
	}
}
  
// 子系统之三 - 三角形
class Triangle {
	draw() {
		console.log('Triangle drawn');
	}
}
  
// 客户端代码
const facade = new ShapeFacade();
facade.drawCircle(); // 输出: Circle drawn
facade.drawSquare(); // 输出: Square drawn
facade.drawTriangle(); // 输出: Triangle drawn





// 🌰例子三(设置样式）: ——————————————————————————————————————————————————————————————————
function setStyles(elements, styles) {
    for (var i=0, length = elements.length; i < length; i++) {
        var element = document.getElementById(elements[i]);

        for (var property in styles) {
            element.style[property] = styles[property];
        }
    }
}

setStyles(['foo', 'bar', 'baz'], {
    color: 'red',
    width: '150px'
});