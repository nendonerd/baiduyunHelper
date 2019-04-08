let str = '文章編碼1vNTnbrd1NX07mhAQHG7-nQ【3a9c'
let str1 = '文章編碼1KUyzaWYKSDugP1WSiqNOpA【thxg'
let str2 = '1ZsEn2v0swq3MT-VzACmxUg 提取码: 8276'
let str3 = '13.3.1-43365链接: https://pan.baidu.com/s/1QCEt4mFjNg8fRQN04Kee5Q 密码: 7nnn'
let str4 = '链接: https://pan.baidu.com/s/1GER5ysrStsP6fm-gqX_stA 提取码: j1kf 复制这段内容后打开百度网盘手机App，操作更方便哦'
let regex = /([A-Za-z0-9\-\_]+)/g

let arr = str4.match(regex) //?

let res = arr.slice().sort((a, b) => b.length - a.length) //?
let [hash] = res
let i = arr.findIndex(s => s === hash)//?
let psw = arr.slice(i).find(x => x.length === 4)

hash //?
psw //?

// const path = require('path')

// path.resolve('./profile') //?