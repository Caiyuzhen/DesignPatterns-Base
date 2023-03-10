/*
	ãð²ç»åæ¨¡å¼ã - å¨é¡¶å±æ ¹é¨è°ç¨, åé¨ç»æä¹ä¼ä¾æ¬¡è°ç¨
		1.è®©å¯¹è±¡å½¢ææ å½¢æ¨¡å¼, æ¯å¦å½¢æä¾§è¾¹æ èå, æ æåé¨ä¼è¿è¡è¿­ä»£è°ç¨

*/


// ð°ä¾å­ä¸(æ«æç¨æ·çæææä»¶å¤¹): ââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
// ãæ ¹æä»¶å¤¹ãæ¹æ³
const FolderFn = function(folder) {
	this.folder = folder 
	this.list = [] //ç¨äºå­æ¾æä»¶å¤¹ä¸çãæä»¶ãæãå­æä»¶å¤¹ã
}

FolderFn.prototype.add = function(res) {
	this.list.push(res) //ãðæ ¸å¿ðãæ¯ææ¯ä¸ªãæä»¶ãããå­æä»¶å¤¹ãé½æ¾å° list ä¸­
}

FolderFn.prototype.scan = function() { //æ«ææä»¶å¤¹çæ¹æ³
	console.log('å¼å§æ«ææä»¶å¤¹: ' + this.folder)

	for(let i = 0; i < this.list.length; i++) {
		this.list[i].scan() //ð¥ð¥ð¥å¦ææä»¶å¤¹åè¢«æ·»å äºå¾å¤ãå­æä»¶å¤¹ã, â¡ï¸é£ä¹å°±ä¼è¿è¡éå½è°ç¨ï¼è®©ãå­æä»¶å¤¹ãä¹è°ç¨ ãFolderãè¿ä¸ªæ¹æ³!!
	}
}


//ãæä»¶ãæ¹æ³
const FileFn = function(file) {
	this.file = file
}

FileFn.prototype.scan = function() {
	console.log('å¼å§æ«ææä»¶: ' + this.file)
}


// ðæ¨¡ææä»¶å¤¹ç»æ
// åå»ºãæ ¹æä»¶å¤¹ã
let rootFolder = new FolderFn('root') 
//åå»ºãå­æä»¶å¤¹ã
let htmlFolder = new FolderFn('html') 
let cssFolder = new FolderFn('css') 
let jsFolder = new FolderFn('js') 

//æãå­æä»¶å¤¹ãæ·»å å°ãæ ¹æä»¶å¤¹ãä¸­
rootFolder.add(htmlFolder)
rootFolder.add(cssFolder)
rootFolder.add(jsFolder)

//åå»ºãæä»¶ã
let htmlA = new FileFn('htmlA')
let htmlB = new FileFn('htmlB')
let cssA = new FileFn('cssA')
let cssB = new FileFn('cssB')
let jsA = new FileFn('jsA')
let jsB = new FileFn('jsB')

//æãæä»¶ãæ·»å å°ãå­æä»¶å¤¹ãä¸­
htmlFolder.add(htmlA)
htmlFolder.add(htmlB)
cssFolder.add(cssA)
cssFolder.add(cssB)
jsFolder.add(jsA)
jsFolder.add(jsB)

//ä»ãæ ¹æä»¶å¤¹ãå¼å§æ«æ ââ ãæ«ææ ¹æä»¶å¤¹ã->ãæ«æå­æä»¶å¤¹ã->ãæ«ææä»¶ã->ãæ«æå­æä»¶å¤¹ã->ãæ«ææä»¶ã-> ...
// rootFolder.scan() //å¼å§æ«ææä»¶å¤¹: root




//ð°ä¾å­äº(ä¾§è¾¹æ çäºãä¸çº§å­èå, ä¸åç¨æ·ç±»åçå°çä¸ä¸æ ·, ðæ ¹æ®ç¨æ·ç»å½çèº«ä»½æ¥æ¸²æä¾§è¾¹æ ): ââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
// ãæ ¹æä»¶å¤¹ãæ¹æ³
const FolderFn_2 = function(folder) {
	this.folder = folder 
	this.list = [] //ðððç¨äºå­æ¾æä»¶å¤¹ä¸çãæä»¶ãæãå­æä»¶å¤¹ã, æ­¤æ¶å°±æ¶éäºææçãæä»¶ãããå­æä»¶å¤¹ãï¼ï¼ï¼ï¼
}

FolderFn_2.prototype.add = function(res) {
	this.list.push(res) //ãðæ ¸å¿ðãæ¯ææ¯ä¸ªãæä»¶ãããå­æä»¶å¤¹ãé½æ¾å° list ä¸­
}

FolderFn_2.prototype.scan = function() { //æ«ææä»¶å¤¹çæ¹æ³
	console.log('å¼å§æ«ææä»¶å¤¹...: ' + this.folder)
	// å£°æ oChildUl
	let oChildUl = null

	if(this.folder === 'root') {
		console.log('ä¸åå»ºæ ¹èç¹, å ä¸ºå·²ç»å¨ html ååå»ºäº')
	} else {
		const root = document.querySelector('#root') //è·åæ ¹èç¹
		const oUl = document.createElement('ul')//åå»º list ç»æ
		const oLi = document.createElement('li') //åå»º list ç»æ
		oLi.innerHTML = this.folder

		oChildUl = document.createElement('ul') //ð¥åå»ºãå­æä»¶ãåå®¹(ç¨æ¥è£ä¸é¢ FileFn_2 çæåºæ¥çåå®¹)

		oLi.appendChild(oChildUl)//å­æä»¶ãå­æä»¶å¤¹é½æ¾å° oLi ä¸­
		oUl.appendChild(oLi)
		root.appendChild(oUl)
	}

	for(let i = 0; i < this.list.length; i++) {
		// ðððæ ¸å¿å°±æ¯è°ç¨ãæä»¶ãããå­æä»¶å¤¹ãç scan æ¹æ³, å¹¶æè¿äºæ°æ®æè½½å° oChildUl ä¸ï¼ï¼å½¢ææ ç¶ç»æï¼ï¼
		this.list[i].scan(oChildUl) //ð¥ð¥ð¥å¦ææä»¶å¤¹åè¢«æ·»å äºå¾å¤ãå­æä»¶å¤¹ã, â¡ï¸é£ä¹å°±ä¼è¿è¡éå½è°ç¨ï¼è®©ãå­æä»¶å¤¹ãä¹è°ç¨ ãFolderãè¿ä¸ªæ¹æ³!!
	}
}


//ãæä»¶ãæ¹æ³
const FileFn_2 = function(file) {
	this.file = file
}

FileFn_2.prototype.scan = function(oChildUl) {//æç©ºç ul ï¼oChildUlï¼ ä¼ å¥ç» FileFn_2
	console.log(oChildUl)
	console.log('å¼å§æ«ææä»¶: ' + this.file)
	const oLi = document.createElement('li')//æ·»å åå¤«ç»ä»¶ä¼ æ¥ç oChildUl
	oLi.innerHTML = this.file
	oChildUl.appendChild(oLi)
}


// ðæ¨¡ææä»¶å¤¹ç»æ
// åå»ºãæ ¹æä»¶å¤¹ã
let rootFolder_2 = new FolderFn_2('root') 
//åå»ºãå­æä»¶å¤¹ã
let htmlFolder_2 = new FolderFn_2('ç¨æ·ç®¡ç') 
let cssFolder_2 = new FolderFn_2('æéç®¡ç') 
let jsFolder_2 = new FolderFn_2('æ°é»ç®¡ç') 

//æãå­æä»¶å¤¹ãæ·»å å°ãæ ¹æä»¶å¤¹ãä¸­ï¼ðððäº§çå³èãï¼
rootFolder_2.add(htmlFolder_2)
rootFolder_2.add(cssFolder_2)
rootFolder_2.add(jsFolder_2)

//åå»ºãæä»¶ã
let addUser = new FileFn_2('æ·»å ç¨æ·')
let editUser = new FileFn_2('ç¼è¾ç¨æ·')
let addPermission = new FileFn_2('æ·»å æé')
let editPermission = new FileFn_2('cssB')
let addNews = new FileFn_2('æ·»å æ°é»')
let editNews = new FileFn_2('ç¼è¾æ°é»')

//æãæä»¶ãæ·»å å°ãå­æä»¶å¤¹ãä¸­ï¼ðððäº§çå³èãï¼
htmlFolder_2.add(addUser)
htmlFolder_2.add(editUser)
cssFolder_2.add(addPermission)
cssFolder_2.add(editPermission)
jsFolder_2.add(addNews)
jsFolder_2.add(editNews)

//ä»ãæ ¹æä»¶å¤¹ãå¼å§æ«æ ââ ãæ«ææ ¹æä»¶å¤¹ã->ãæ«æå­æä»¶å¤¹ã->ãæ«ææä»¶ã->ãæ«æå­æä»¶å¤¹ã->ãæ«ææä»¶ã-> ...
rootFolder_2.scan() //å¼å§æ«ææä»¶å¤¹: root