/* 手写双向绑定 */
// 基本原理：Object.defineProperty 来实现重写data的set和get函数

var myVue = function(options) {
    this._init(options);
}

myVue.prototype = {

    _init: function(options) {
        this.$options = options;
        this.$el = document.querySelector(options.el);
        this.$data = options.data;
        this.$methods = options.methods;

        this._binding = {}; // binding 保存这mode与view的银蛇关系，也就是我们前面定义的watcher实例，当model改变时，保证view也能实时更新
        this._observe(this.$data);

    },
    /**
     * 实现v-bind 对data重写set和get实现双向绑定
     * 
     */
    _observe: function(obj) {
        var value;
        var _this = this;
        Object.keys(obj).forEach(key => {
            /* 过滤原型链上的属性，我们只需要自身的属性 */
            if (obj.hasOwnProperty(key)) {
                _this._binding[key] = {
                    _directives: [] // 指令集
                }
                console.log(_this._binding[key])

                var value = obj[key];

                if (typeof value === 'object') {
                    /* 递归 */
                    _this._observe(value);
                }

                var binding = _this._binding[key];

                Object.defineProperty(_this.$data, key, {
                    enumerable: true,
                    configurable: true,
                    get: function() {
                        console.log(`获取${value}`);
                        return value
                    },
                    set: function(val) {
                        console.log(`更新${val}`);
                        if (value !== newVal) {
                            value = newVal;

                            binding._directives.forEach(item => {
                                item.update();
                                // 当number 改变时，触发_binding[number]._directives 中的绑定的Watcher类的更新
                            })
                        }
                    }
                })
            }
        });
    },
    /**
     * 更新视图
     * 
     */
    _complie: function(root) {
        var _this = this;
        var nodes = root.children;
        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];
            if (node.children.length) { // 对所有元素进行遍历，并进行处理
                this._complie(node);
            }

            if (node.hasAttribute('v-click')) { // 如果有v-click属性，我们监听它的onclick事件，触发increment事件，即number++
                node.onclick = (function() {
                    var attrVal = nodes[i].getAttribute('v-click');
                    return _this.$methods[attrVal].bind(_this.$data); //bind是使data的作用域与method函数的作用域保持一致
                })();
            }

            if (node.hasAttribute('v-model') && (node.tagName == 'INPUT' || node.tagName == 'TEXTAREA')) { // 如果有v-model属性，并且元素是INPUT或者TEXTAREA，我们监听它的input事件
                node.addEventListener('input', (function(key) {
                    var attrVal = node.getAttribute('v-model');
                    //_this._binding['number']._directives = [一个Watcher实例]
                    // 其中Watcher.prototype.update = function () {
                    //	node['vaule'] = _this.$data['number'];  这就将node的值保持与number一致
                    // }
                    _this._binding[attrVal]._directives.push(new Watcher(
                        'input',
                        node,
                        _this,
                        attrVal,
                        'value'
                    ))

                    return function() {
                        _this.$data[attrVal] = nodes[key].value; // 使number 的值与 node的value保持一致，已经实现了双向绑定
                    }
                })(i));
            }

            if (node.hasAttribute('v-bind')) { // 如果有v-bind属性，我们只要使node的值及时更新为data中number的值即可
                var attrVal = node.getAttribute('v-bind');
                _this._binding[attrVal]._directives.push(new Watcher(
                    'text',
                    node,
                    _this,
                    attrVal,
                    'innerHTML'
                ))
            }
        }
    }

}

function Watcher(name, el, vm, exp, attr) {
    this.name = name; // 指令名称
    this.el = el; // 指定对应dom元素
    this.vm = vm // 指令对应所属的myVue实例
    this.exp = exp // 指令对应的值，本例如“number”
    this.attr = attr; // 绑定的属性值，本例为innerHTML

    this.update();
}

Watcher.prototype.update = function() {
    this.el[this.attr] = this.vm.$data[this.exp];
}

Function.prototype.bind = Function.prototype.bind || function(context) {
    return this.apply(context, arguments)
}