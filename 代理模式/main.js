/*
	【代理模式】
		为其他对象提供一种代理以控制对这个对象的访问
			被代理对象可以是【文件、资源、内存中的对象等等】
*/

// 🌰例子一: ——————————————————————————————————————————————————————————————————
class Star {
	play() {
		console.log('🌟 明星开始表演 ~')
	}
}


class StarProxy { //代理类
	constructor () {
		this.superStar = new Star()
	}

	talk(price) {
		if(price > 8888) { 
			this.superStar.play() //⚡️代理 star 对象
		} else {
			throw new Error('价格太低')
		}
	}
}

const abc = new StarProxy().talk(99999) //明星开始表演





// 🌰例子二 (proxy 是 ES6 的能力): ——————————————————————————————————————————————————————————————————
let star_2 = {
	name: 'Jimmy',
	workprice: 8888
}

let proxy = new Proxy(star_2, { //🔥🔥一个拦截的函数, 如果被代理对象的属性被【访问】, 就会触发 get 方法, 如果被代理对象的属性被【修改】, 就会触发 set 方法
	get(target, key) {
		if(key === 'workprice') {
			console.log('被代理的对象的 workprice 属性被访问了')
		}
		return target[key]
	},

	set(target, key, value) {
		if(key === 'workprice') {
			console.log('被代理的对象被修改了')

			if(value > 8888) { 
				this.superStar.play() //⚡️代理 star 对象
			} else {
				throw new Error('价格太低')
			}
		}
	}
})

console.log(proxy.workprice) //被代理的对象被访问了
proxy.name = 'Tom' //被代理的对象被修改了




// 🌰例子三（Vue 响应式模板来操作 DOM, 基于数据驱动来更新 DOM ）: ——————————————————————————————————————————————————————————————————
let vueObj = {

}

// 封装好一个操作 DOM 的库
let proxy_2 = new Proxy(vueObj, { //对源对象进行代理
	get(target, key) {
		return target[key]
	},

	set(target, key, value) {
		if(key === 'data') {{ //如果是修改 对象.data, 就会触发 set 方法
			//操作 box 这个 DOM
			box.innerHTML = value
		}
			target[key] = value
		}
	}
})


proxy_2.data = '222'