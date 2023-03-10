/*
	ãð¡å¤è§æ¨¡å¼ã 
		åå«
			ð  å¤è§ ï½ é¨é¢è§è²ï¼Facadeï¼
       			1.ç¥éåªäºå­ç³»ç»è´è´£å¤çè¯·æ±ã
       			2.å°å®¢æ·çè¯·æ±å§æç»ç¸åºçå­ç³»ç»å¯¹è±¡ã
				3.ä¸ºå¤ä¸ªå­ç³»ç»æä¾ç»ä¸ä¸ªå±åçæ¥å£ã

			ð å­ç³»ç»è§è²ï¼SubSystemï¼
				1.å®ç°ç³»ç»çé¨ååè½, å¯ä»¥å¯ä»¥éè¿å¤è§è§è²æ¥è®¿é®å®ã

			ð å®¢æ·è§è²ï¼Clientï¼
				1.éè¿å¤è§è§è²è®¿é®å­ç³»ç»çåè½
*/


// ð°ä¾å­ä¸(å®¢æ·å»é¶è¡è´·æ¬¾): ââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
class Facade {
	constructor(name) {
		this.name =name
	}

	// æ´é²ä¸ä¸ªæ¹æ³ç»å°å®¢æ·ï¼ä¹å°±æ¯æ¥å£ï¼
	applyFor(amount) { //è°ç¨å­ç³»ç»åçæ¹æ³
		 // è®¿é®å¤ä¸ªå­ç³»ç»
		 let result = "æ¹å";
		 if (!new Bank().verify(this.name, amount)) {
				 result = "æç»";
		 } else if (!new Credit().get(this.name)) {
				 result = "æç»";
		 } else if (!new Background().check(this.name)) {
				 result = "æç»";
		 }
		 return this.name + "ä½ ç" + amount + " æµæ¼è´·æ¬¾,å·²ç»è¢«" + result;
	}
}

//é¶è¡
const Bank = function() {
	this.verify = function(name, amount) { //æ ¡éªåå­å¯¹åºçèµé
			// çç¥å¤æçé»è¾ä»£ç ......
			return true
	}
}
//ä¿¡ç¨
const Credit = function() {
	this.get = function(name) { //æ ¡éªåå­å¯¹åºçä¿¡ç¨
			// çç¥å¤æçé»è¾ä»£ç ......
			return true
	}
}
//èæ¯èµæ
const Background = function() {
	this.check = function(name) { //æ ¡éªåå­å¯¹åºçèæ¯
			// çç¥å¤æçé»è¾ä»£ç ......
			return true
	}
}


// å®¢æ·å¼å§è´·æ¬¾
function clientStartMortgage() {
	let mortgageThing = new Facade("å¼ ä¸");
	let result = mortgageThing.applyFor("100,000å");
	console.info("%c%s", "color:#ff44cd; font-size:18px", result);
}

clientStartMortgage()




// ð°ä¾å­äº(ç»å¶å¾å½¢ï¼: ââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
// å¤è§ç±»
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
  
// å­ç³»ç»ä¹ä¸ - åå½¢
class Circle {
	draw() {
		console.log('Circle drawn');
	}
}
  
// å­ç³»ç»ä¹äº - æ­£æ¹å½¢
class Square {
	draw() {
		console.log('Square drawn');
	}
}
  
// å­ç³»ç»ä¹ä¸ - ä¸è§å½¢
class Triangle {
	draw() {
		console.log('Triangle drawn');
	}
}
  
// å®¢æ·ç«¯ä»£ç 
const facade = new ShapeFacade();
facade.drawCircle(); // è¾åº: Circle drawn
facade.drawSquare(); // è¾åº: Square drawn
facade.drawTriangle(); // è¾åº: Triangle drawn





// ð°ä¾å­ä¸(è®¾ç½®æ ·å¼ï¼: ââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
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