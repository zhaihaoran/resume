/**
 * Set 集合
 */

class Sets {

    constructor() {
        this.elements = [];
    }


    /**
     * 添加元素,false失败，true为成功
     * 
     * @param {any} data 
     * @memberof Sets
     */
    add(data) {
        if (!this.contains(data)) {
            this.elements.push(data);
            return true;
        } else {
            return false;
        }
    }

    /**
     * 删除元素，false失败，true为成功
     * 
     * @param {any} data 
     * @memberof Sets
     */
    remove(data) {
        var pos = this.elements.indexOf(data)
        if (this.contains(data)) {
            this.elements.splice(pos, 1);
            return true;
        } else {
            return false;
        }
    }

    /**
     * 展示集合元素
     * 
     * @returns 
     * @memberof Sets
     */
    show() {
        return this.elements;
    }

    /**
     * 展示集合尺寸
     * 
     * @returns 
     * @memberof Sets
     */
    size() {
        return this.elements.length;
    }

    /**
     * 判断某个元素是否属于集合
     * 
     * @param {any} data 
     * @returns 
     * @memberof Sets
     */
    contains(data) {
        if (this.elements.indexOf(data) > -1) {
            return true;
        } else {
            return false;
        }
    }


    /**
     * 取交集
     * 
     * 通过第三方集合进行比对
     * @param {any} set 
     * @memberof Sets
     */
    union(set) {
        // 存放临时集合
        var tempSet = new Sets();
        this.elements.forEach(v => {
            tempSet.add(v)
        })
        set.show().forEach(v => {
            if (!tempSet.contains(v)) {
                tempSet.show().push(v)
            }
        });
        return tempSet;
    }

    /**
     * 取并集
     * 
     * @param {any} set 
     * @returns 
     * @memberof Sets
     */
    intersect(set) {
        var tempSet = new Sets();

        set.show().forEach(v => {
            if (this.contains(v)) {
                tempSet.add(v)
            }
        });
        return tempSet;
    }

    /**
     * 是否属于set
     * 
     * @param {any} set 
     * @returns 
     * @memberof Sets
     */
    subset(set) {
        if (this.size() > set.size()) {
            return false;
        } else {
            return this.elements.every(v => set.contains(v))
        }
    }
}

// union test
var cis = new Sets();
cis.add("Mike");
cis.add("Clayton");
cis.add("Jennifer");
cis.add("Raymond");
cis.add("Raymondasdasd");
console.log(cis.show());
cis.remove("Raymondasdasd");
console.log(cis.show());

var dmp = new Sets();
dmp.add("Raymond");
dmp.add("Cynthia");
dmp.add("Jonathan");

var it = new Sets();
var is = new Sets();
it = cis.union(dmp);
is = cis.intersect(dmp);
console.log(it.show());
console.log(is.show());
console.log(cis.subset(it));
console.log(it.subset(cis));