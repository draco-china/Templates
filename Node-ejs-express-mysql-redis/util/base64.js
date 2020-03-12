/**
 * Created by Monarch on 2016/8/17.
 */

var base64url = require("base64-url");
//base64加密
function encodeSpecial(encodeStr){
    //	var str = base64url.encode(encodeStr);
    var b = new Buffer(encodeStr);
    var str= b.toString('base64');
    str = str.replace("+", "*").replace("/", "-").replace("=", ".");
    return str;
}
//base64解密
function decodeSpecial(decodeStr){
    decodeStr = decodeStr.replace("*", "+").replace("-", "/").replace(".", "=");
    //	var b = new Buffer('SmF2YVNjcmlwdA==', 'base64');
    //	var str = b.toString('utf8');
    var str = base64url.decode(decodeStr);
    return str;
}

exports.encode = encodeSpecial;

exports.decode = decodeSpecial;