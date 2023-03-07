/*
	【💡备忘录模式】 
		是一种行为型设计模式，它允许在不破坏封装性的前提下捕获并存储对象的内部状态，并在需要时恢复对象的状态。

		备忘录模式由三个主要组件组成：
			发起人（Originator）：负责创建备忘录，并从备忘录中恢复其内部状态。
			备忘录（Memento）：用于存储发起人的内部状态。备忘录可以有多个实例，每个实例的内部状态可能不同。
			管理者（Caretaker）：负责存储备忘录，并提供一个用于恢复备忘录的接口。管理者不需要了解备忘录的具体实现细节。
			
*/


// 🌰例子一(): ——————————————————————————————————————————————————————————————————
/*
	下面是一个使用备忘录模式的示例，其中 Editor 类是发起人，EditorState 类是备忘录，History 类是管理者：
		在这个例子中，Editor 类表示一个文本编辑器，它允许用户编辑文本内容。
		EditorState 类表示一个编辑器的状态，它保存了编辑器的内部状态，包括当前编辑的文本内容。
		History 类表示一个管理器，它保存了多个 EditorState 实例，并提供了恢复编辑器状态的方法。
		在使用备忘录模式时，我们可以在每次编辑器状态发生变化时，保存当前状态到 History 中，以便在需要时恢复状态。
*/

// 备忘录类
class EditorState {
	constructor(content) {
		this.content = content;
	}

	getContent() {
		return this.content;
	}
}


// 发起人类
class Editor {
	constructor() {
		this.content = "";
	}

	// 保存当前状态到备忘录
	createState() {
		return new EditorState(this.content);
	}

	// 恢复状态
	restore(state) {
		this.content = state.getContent();
	}

	setContent(content) {
		this.content = content;
	}

	getContent() {
		return this.content;
	}
}


// 管理者类
class HistoryFn {
	constructor() {
		this.states = [];
	}

	// 添加备忘录
	push(state) {
		this.states.push(state);
	}

	// 弹出最近的备忘录
	pop() {
		return this.states.pop();
	}
}


// 使用备忘录模式保存和恢复文本编辑器的状态
const editor = new Editor();
const history = new HistoryFn();

// 设置初始状态
editor.setContent("This is the initial content");

// 保存状态
history.push(editor.createState());

// 修改内容
editor.setContent("This is some new content");

// 再次保存状态
history.push(editor.createState());

// 恢复到上一个状态
editor.restore(history.pop());

console.log(editor.getContent()); // 输出: "This is some new content"

// 再次恢复到初始状态
editor.restore(history.pop());

console.log(editor.getContent()); // 输出: "This is the initial content"