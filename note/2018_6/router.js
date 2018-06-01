/*  */

var VueRouter = function(options) {
    if (options === void 0) {
        options = {}
    }

    this.app = null;
    this.apps = [];
    this.options = options;
    this.beforeHooks = [];
    this.resolveHooks = [];
    this.afterHooks = [];
    // 创建matcher函数
    this.matcher = createMatcher(options.routes || [], this);
    // 根据mode实例化具体的History，默认为'hash'模式
    var mode = options.mode || 'hash';
    // 通过 supportsPushState 判断浏览器是否支持'history'模式，如果不支持'history' 会自动降级为 'hash'
    this.fallback = mode === 'history' && !supportsPushState && options.fallback !== false
    if (this.fallback) {
        mode = 'hash';
    }
    if (!inBrowser) {
        // 不在浏览器环境下运行需强制为'abstract'模式
        mode = 'abstract';
    }
    this.mode = mode;

    // 根据不同的模式选择实例化对应的History类
    switch (mode) {
        case 'history':
            this.history = new HTML5History(this, options.base);
            break;

        case 'hash':
            this.history = new HashHistory(this, options.base, this.fallback);
            break;

        case 'abstract':
            this.history = new AbstractHistory(this, options.base)
            break;

        default:
            {
                assert(false, ("invalid mode: " + mode));
            }
    }
}

VueRouter.prototype.init = function init(app /* Vue component instance */ ) {
    var history = this.history;
    // 根据history的类别执行相应的初始化操作和监听
    if (history instanceof HTML5History) {
        history.transitionTo(history.getCurrentLocation());
    } else if (history instanceof HashHistory) {
        var setupHashListener = function() {
            history.setupListeners();
        };
        history.transitionTo(
            history.getCurrentLocation(),
            setupHashListener,
            setupHashListener
        );
    }

    history.listen(function(route) {
        this$1.apps.forEach(function(app) {
            app._route = route;
        });
    });

}


/* Hash类 */

function HashHistory(router, base, fallback) {
    History$$1.call(this, router, base);
    // 如果是从history模式降级过来的，需要做降级检查
    if (fallback && checkFallback(this.base)) {
        // 如果降级且做了降级处理，则直接返回
        return;
    }

    ensureSlash();
}

function checkFallback(base) {
    // 得到除去base的真正location值
    var location = getLocation(base);
    if (!/^\/#/.test(location)) {
        // 如果此时地址不是以/#开头，需要做降级处理，降为hash模式下的/#开头
        window.location.replace(
            clearPath(base + '/#' + location)
        )
    }
    return true;
}

function ensureSlash() {
    // 得到 hash 值
    var path = getHash();
    // 如果是以 / 开头的，直接返回即可
    if (path.charAt(0) === '/') {
        return true
    }
    // 不是的话，需要手动保证一次 替换 hash 值
    replaceHash('/' + path);
    return false
}

function getHash() {
    // 因为兼容性的问题，这里没有直接使用 window.location.hash
    // 因为 Firefox decode hash 值
    var href = window.location.href;
    var index = href.indexOf('#');
    return index === -1 ? '' : href.slice(index + 1)
}

// 通过push来进行hash的修改。
// hash改变会自动添加浏览器的访问记录里。
HashHistory.prototype.push = function push(location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function(route) {
        pushHash(route.fullPath);
        handleScroll(this$1.router, route, fromRoute, false);
        onComplete && onComplete(route);
    }, onAbort);
};

// 通过transitionTo 来控制视图更新
History.prototype.transitionTo = function transitionTo(location, onComplete, onAbort) {
    var this$1 = this;

    var route = this.router.match(location, this.current);
    this.confirmTransition(route, function() {
        this$1.updateRoute(route);
        ...
    });
};

History.prototype.updateRoute = function updateRoute(route) {
    var prev = this.current;
    this.current = route;
    this.cb && this.cb(route);
    this.router.afterHooks.forEach(function(hook) {
        hook && hook(route, prev);
    });
};

History.prototype.listen = function listen(cb) {
    this.cb = cb;
};


/* replace 是 替换掉当前的路径，push是将新路由添加到浏览器访问历史栈顶 */
HashHistory.prototype.replace = function replace(location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function(route) {
        replaceHash(route.fullPath);
        handleScroll(this$1.router, route, fromRoute, false);
        onComplete && onComplete(route);
    }, onAbort);
};

function replaceHash(path) {
    const i = window.location.href.indexOf('#')
    // 直接调用 replace 强制替换 以避免产生“多余”的历史记录
    // 主要是用户初次跳入 且hash值不是以 / 开头的时候直接替换
    // 其余时候和push没啥区别 浏览器总是记录hash记录
    window.location.replace(
        window.location.href.slice(0, i >= 0 ? i : 0) + '#' + path
    )
}



/* 因为路由的变化除了内部的push和replace方法调用，用户还可以通过直接改变url来改变路由，因此还需要监听浏览器路由地址的变化 */
/* 并具有与通过代码调用相同的响应行为 */

/* hash模式 --- 在HashHistory类内部的setupListeners里实现 */
setupListeners() {
    window.addEventListener('hashchange', () => {
        if (!ensureSlash()) {
            return
        }
        this.transitionTo(getHash(), route => {
            replaceHash(route.fullPath)
        })
    })
}

/* 更新逻辑基本相似 */

/* hash 模式是 通过window.location.hash赋值 和 window.location.replace 进行 替换 */
/* history 对应的更新逻辑与hash相同，只不过替换方法变为了history.pushState 和 history.replaceState */

/* HTML5History 类里浏览器url的变化是通过监听popStates实现 , 在构造函数里执行的 */

constructor(router, base) {
    window.addEventListener('popstate', e => {
        const current = this.current
        this.transitionTo(getLocation(this.base), route => {
            if (expectScroll) {
                handleScroll(router, route, current, true)
            }
        })
    })
}

/* history模式的问题 */
/* 
    1. hash模式仅改变hash部分的内容，而hash部分是不会包含在http请求中的（hash带#）：
    http://oursite.com/#/user/id  只会发送http://oursite.com/
*/



var tmp = 123;
var mks = 1234;
if (true) {
    console.log(mks); // 1234
    console.log(tmp); // tmp is not defined
    let tmp;
}