
var ary1 = [2, 4, 3, 1, 6, 8, 5, 12, 11];

// 冒泡排序

function bubleSort(ary) {
    let i, l = ary.length;
    for (i = 0; i < l; i++) {
        for (var j = l - 1; j > i; j--) {
            if (ary[j] < ary[j - 1]) {
                [ary[j], ary[j - 1]] = [ary[j - 1], ary[j]];
            }
        }
    }
    return ary;
}
console.log(bubleSort(ary1))

// 快速排序

function quickSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    let pivotIndex = ~~(arr.length / 2);
    let pivot = arr.splice(pivotIndex, 1)[0];
    let left = [], right = [], i, l = arr.length;
    for (i = 0; i < l; i++) {
        arr[i] <= pivot ? left.push(arr[i]) : right.push(arr[i])
    }

    return quickSort(left).concat([pivot], quickSort(right));
}

console.log(quickSort(ary1))

// 归并排序

var arr2 = [2, 3, 1, 5, 4, 8, 12, 43, 21, 32, 9]

function mergeSort(arr) {
    if (arr.length === 1) {
        return arr;
    }
    let pivot = ~~(arr.length / 2),
        left = arr.slice(0, pivot),
        right = arr.slice(pivot);

    return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
    var tmp = [];
    while (left.length && right.length) {
        if (left[0] < right[0]) {
            tmp.push(left.shift());
        } else {
            tmp.push(right.shift());
        }
    }
    return tmp.concat(left, right)
}


console.log(mergeSort(arr2))

String.prototype.trimaaa = function () {
    return this.replace(/^(\s*)|(\s*)$/g, '')
}

console.log(" asd   asd ".trimaaa())

// 二分查找

function findIndex(arr, n) {
    let low = 0, high = arr.length - 1, mid;
    while (low <= high) {
        mid = ~~((high + low) / 2)
        if (arr[mid] > n) {
            high = mid - 1
        } else if (arr[mid] < n) {
            low = mid + 1
        } else {
            return mid;
        }
    }
    return -1;
}

console.log(findIndex([1, 3, 5, 7, 9, 11, 13, 15], 9))