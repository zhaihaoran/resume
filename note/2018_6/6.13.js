/* 60行mvvm框架  */

class Vue {
    constructor(opt) {
        this.opt = opt
        this.observe(opt.data)
        let root = document.querySelector(opt.el)
        this.compile(root)
    }
    /* 为响应式data的每一个key绑定一个观察者对象 */
    observe(data) {
        Object.keys(data).forEach(key => {
            // 观察者类
            let obv = new Observer(); // 每一次循环都是一个闭包，所以将观察者对象存放到闭包中。
            // 闭包的本质是内存作用域堆地址暴露。这里巧妙的通过了getter和setter暴露了for里的观察者
            data["_" + key] = data[key];
            Object.defineProperty(data, key, {
                get() {
                    Observer.target && obv.addSubNode(Observer.target);
                    return data['_' + key];
                },
                set(newVal) {
                    // 后续修改了key值，会触发Observer的update函数，完成响应式更新
                    obv.update(newVal);
                    data["_" + key] = newVal
                }
            })
        })
    }
    // 初始化页面，遍历 DOM，收集每一个key变化时，随之调整的位置，以观察者方法存放起来
    compile(node) {
        [].forEach.call(node.childNodes, child => {
            // 从根节点向下遍历，遇到mustache形式的文本。则映射成data.key的值。
            if (!child.firstElementChild && /\{\{(.*)\}\}/.test(child.innerHTML)) {
                let key = RegExp.$1.trim();
                child.innerHTML = child.innerHTML.replace(new RegExp('\\{\\{\\s*' + key + '\\s*\\}\\}', 'gm'), this.opt.data[key])
                // ？？？？？？
                // 为了满足后续响应式的更新，将该节点存储在 key 对应的观察者对象中，我们用 getter 函数巧妙的操作了闭包
                Observer.target = child
                // 触发getter
                this.opt.data[key]
                Observer.target = null
                /* 如果有子节点，递归处理 */
            } else if (child.firstElementChild) {
                this.compile(child)
            }
        })
    }
}

// 常规观察者类
class Observer {
    constructor() {
        this.subNode = []
    }
    addSubNode(node) {
        this.subNode.push(node)
    }
    update(newVal) {
        this.subNode.forEach(node => {
            node.innerHTML = newVal
        })
    }
}