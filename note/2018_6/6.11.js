/* 
    @descirption 检测密码强度
*/
let util = {
    checkPwdLevel(str) {
        let nowLv = 0;
        if (str.length < 6) {
            return nowLv;
        }
        // 将规则整理成数组，再进行循环判断
        let rules = [/[0-9]/, /[a-z]/, /[A-Z]/, /[\.|-|_]/];
        for (let i = 0; i < rules.length; i++) {
            if (rules[i].test(str)) {
                nowLv++;
            }
        }

        return nowLv;
    }
}


/* 
Http 缓存
*/