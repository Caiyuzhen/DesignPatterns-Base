/*
	【职责链模式】
		跟【原型链】【作用域链】还有【DOM 冒泡机制】一样, 都是为了避免请求的【发送者】以及【接收者】产生过多的耦合！！
			本质上就是链表的调用模式
*/


// 🌰例子一(输入框的校验 - 如果没有使用【职责链】的方式, 扩展性不好): ——————————————————————————————————————————————————————————————————
const input = document.querySelector('#input')
const btn = document.querySelector('#btn')

btn.addEventListener('click', () =>{
	if(input.value.length === 0) {
		console.log('输入框不能为空')
		input.value = ''//清空
	} else {
		if(Number.isNaN(+input.value)) { //【🌟】Number.isNaN() 用来判断是不是数字;【🌟】+号表示转化为数字！！比如 +123 就是 数字 123!!!
			console.log('必须是数字！') //🔥因为上面有可能是字符串或者符号, 就没法转化为数字了
			input.value = ''//清空
		} else {
			if(input.value.length < 6) {
				console.log('必须大于 6 个数字！')
				input.value = ''//清空
			}
		}
	}
	console.log('🎉注册成功')
})




// 🌰例子二(输入框的校验 - 使用【职责链】的方式, 避免校验逻辑的耦合): ——————————————————————————————————————————————————————————————————
const input_2 = document.querySelector('#input')
const btn_2 = document.querySelector('#btn')

btn_2.addEventListener('click', () => {
	
})