/**
 *  vector 向量
 */

function vector(a, b) {
    return {
        x: b.x - a.y,
        y: b.y - a.y
    }
}

/**
 * 向量叉乘公式
 * 
 * 向量内积的值与a,b夹角的cos余弦有关，如果夹角为锐角，则为正，为钝角则为负，在程序上可以通过判断符号来确定，该点所在区域的位置！！
 * 
 * 实际应用：判断一个点是否在三角形，多边形之内。
 * 等于平行四边形的面积
 */

function vectorProduct(v1, v2) {
    return v1.x * v2.y - v2.x * v1.y
}

// 判断点是否在三角形内
function isPointInTrangle(p, a, b, c) {
    var pa = vector(p, a)
    var pb = vector(p, b)
    var pc = vector(p, c)

    var t1 = vectorProduct(pa, pb)
    var t2 = vectorProduct(pb, pc)
    var t3 = vectorProduct(pa, pc)

    return sameSign(t1, t2) && sameSign(t2, t3) && sameSign(t3, t1)
}

// 判断符号相同
function sameSign(a, b) {
    return (a ^ b) >= 0
}