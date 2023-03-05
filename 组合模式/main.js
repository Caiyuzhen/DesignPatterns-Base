/*
	【🌲组合模式】 - 在顶层根部调用, 内部结构也会依次调用
		1.让对象形成树形模式, 比如形成侧边栏菜单, 树枝内部会进行迭代调用

*/


// 🌰例子一(扫描用户的所有文件夹): ——————————————————————————————————————————————————————————————————
// 【根文件夹】方法
const FolderFn = function(folder) {
	this.folder = folder 
	this.list = [] //用于存放文件夹下的【文件】或【子文件夹】
}

FolderFn.prototype.add = function(res) {
	this.list.push(res) //【🌟核心🌟】是把每个【文件】、【子文件夹】都放到 list 中
}

FolderFn.prototype.scan = function() { //扫描文件夹的方法
	console.log('开始扫描文件夹: ' + this.folder)

	for(let i = 0; i < this.list.length; i++) {
		this.list[i].scan() //🔥🔥🔥如果文件夹内被添加了很多【子文件夹】, ⚡️那么就会进行递归调用（让【子文件夹】也调用 【Folder】这个方法!!
	}
}


//【文件】方法
const FileFn = function(file) {
	this.file = file
}

FileFn.prototype.scan = function() {
	console.log('开始扫描文件: ' + this.file)
}


// 👇模拟文件夹结构
// 创建【根文件夹】
let rootFolder = new FolderFn('root') 
//创建【子文件夹】
let htmlFolder = new FolderFn('html') 
let cssFolder = new FolderFn('css') 
let jsFolder = new FolderFn('js') 

//把【子文件夹】添加到【根文件夹】中
rootFolder.add(htmlFolder)
rootFolder.add(cssFolder)
rootFolder.add(jsFolder)

//创建【文件】
let htmlA = new FileFn('htmlA')
let htmlB = new FileFn('htmlB')
let cssA = new FileFn('cssA')
let cssB = new FileFn('cssB')
let jsA = new FileFn('jsA')
let jsB = new FileFn('jsB')

//把【文件】添加到【子文件夹】中
htmlFolder.add(htmlA)
htmlFolder.add(htmlB)
cssFolder.add(cssA)
cssFolder.add(cssB)
jsFolder.add(jsA)
jsFolder.add(jsB)

//从【根文件夹】开始扫描 —— 【扫描根文件夹】->【扫描子文件夹】->【扫描文件】->【扫描子文件夹】->【扫描文件】-> ...
// rootFolder.scan() //开始扫描文件夹: root




//🌰例子二(侧边栏的二、三级子菜单, 不同用户类型看到的不一样, 🌟根据用户登录的身份来渲染侧边栏): ——————————————————————————————————————————————————————————————————
// 【根文件夹】方法
const FolderFn_2 = function(folder) {
	this.folder = folder 
	this.list = [] //用于存放文件夹下的【文件】或【子文件夹】
}

FolderFn_2.prototype.add = function(res) {
	this.list.push(res) //【🌟核心🌟】是把每个【文件】、【子文件夹】都放到 list 中
}

FolderFn_2.prototype.scan = function() { //扫描文件夹的方法
	console.log('开始扫描文件夹: ' + this.folder)

	for(let i = 0; i < this.list.length; i++) {
		this.list[i].scan() //🔥🔥🔥如果文件夹内被添加了很多【子文件夹】, ⚡️那么就会进行递归调用（让【子文件夹】也调用 【Folder】这个方法!!
	}
}


//【文件】方法
const FileFn_2 = function(file) {
	this.file = file
}

FileFn_2.prototype.scan = function() {
	console.log('开始扫描文件: ' + this.file)
}


// 👇模拟文件夹结构
// 创建【根文件夹】
let rootFolder_2 = new FolderFn_2('root') 
//创建【子文件夹】
let htmlFolder_2 = new FolderFn_2('用户管理') 
let cssFolder_2 = new FolderFn_2('权限管理') 
let jsFolder_2 = new FolderFn_2('新闻管理') 

//把【子文件夹】添加到【根文件夹】中
rootFolder_2.add(htmlFolder_2)
rootFolder_2.add(cssFolder_2)
rootFolder_2.add(jsFolder_2)

//创建【文件】
let addUser = new FileFn_2('添加用户')
let editUser = new FileFn_2('编辑用户')
let addPermission = new FileFn_2('添加权限')
let editPermission = new FileFn_2('cssB')
let addNews = new FileFn_2('添加新闻')
let editNews = new FileFn_2('编辑新闻')

//把【文件】添加到【子文件夹】中
htmlFolder_2.add(addUser)
htmlFolder_2.add(editUser)
cssFolder_2.add(addPermission)
cssFolder_2.add(editPermission)
jsFolder_2.add(addNews)
jsFolder_2.add(editNews)

//从【根文件夹】开始扫描 —— 【扫描根文件夹】->【扫描子文件夹】->【扫描文件】->【扫描子文件夹】->【扫描文件】-> ...
rootFolder_2.scan() //开始扫描文件夹: root