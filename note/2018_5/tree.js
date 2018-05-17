/**
 * 二叉树节点
 * 
 * @param {any} data  当前节点数据
 * @param {any} left  左节点
 * @param {any} right 右节点
 */
class Node {

    constructor(data, left, right) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

/**
 * BST类
 * 注意：排序二叉树中，不能有相同的数存在
 * 
 * @class BST
 */
class BST {

    constructor() {
        this.root = null;
    }
    /**
     * 插入数值
     * 
     * @memberof BST
     */
    insert(data) {
        let node = new Node(data, null, null);
        if (this.root === null) {
            this.root = node;
        } else {
            let current = this.root; // 当前的节点
            while (current.data !== null) {
                if (current.data > data) {
                    if (current.left === null) {
                        current.left = node;
                        break;
                    }
                    current = current.left;
                } else {
                    if (current.right === null) {
                        current.right = node;
                        break;
                    }
                    current = current.right;
                }
            }
        }
    }

    /**
     * 一次插入多值
     * 
     * @param {any} datas 
     * @memberof BST
     */
    inserts(...datas) {
        let _this = this;
        if (datas.length === 1) {
            _this.insert(datas);
        } else {
            datas.forEach(v => {
                _this.insert(v)
            })
        }
    }

    /**
     * 查找值是否存在于BST中
     * 
     * @param {any} data 值
     * @returns 
     * @memberof BST
     */
    find(data) {
        var current = this.root;
        while (current.data !== null) {
            if (data === current.data) {
                return current;
            }
            current = data < current.data ? current.left : current.right
            if (current === null) {
                return null
            }
        }
    }

    /**
     * 
     * 二叉树的缺点：如果节点要频繁删除的话，不适合使用二叉树，特别是被删除的节点有两个子节点的；
     * 
     * @param {any} data 
     * @memberof BST
     */
    remove(data) {
        this.root = this.removeNode(this.root, data);
    }

    removeNode(node, data) {
        if (node === null) {
            return null;
        }
        if (data === node.data) {
            if (node.left === null && node.right === null) {
                return null;
            }
            if (node.left === null) {
                return node.right;
            }
            if (node.right === null) {
                return node.left;
            }
        } else if (data < node.data) {
            node.left = this.removeNode(node.left, data);
            return node;
        } else {
            node.right = this.removeNode(node.right, data);
            return node;
        }
    }
}

var bst = new BST();
bst.insert(5);
bst.inserts(3, 7, 2)

console.log(bst);
console.log(bst.find(3));
console.log(bst.find(1));
console.log(bst.remove(7));
console.log(bst);