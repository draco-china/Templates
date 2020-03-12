/**
 * Created by Monarch on 2016/8/17.
 */
var crypto = require('crypto');
//console.log(crypto.getHashes()); //输出可用加密算法
//MD5加密
function encodeMd5(encodeStr){
    var md5 = crypto.createHash('md5');
    md5.update(encodeStr);              //更新hash的内容为指定的data。当使用流数据时可能会多次调用该方法。
    var encodeStr = md5.digest('hex');  //计算所有传入数据的hash摘要。参数encoding（编码方式）可以为'hex', 'binary' 或者'base64'。
    return encodeStr;
}

//SHA1加密
function encodeSha1(encodeStr){
    var shasum = crypto.createHash('sha1',"Gemini"); //创建并返回一个hash对象，它是一个指定算法的加密hash，用于生成hash摘要。
    // 参数algorithm可选择系统上安装的OpenSSL版本所支持的算法。例如：'sha1', 'md5', 'sha256', 'sha512'等。在近期发行的版本中，openssl list-message-digest-algorithms会显示这些可用的摘要算法。
    shasum.update(encodeStr);             //更新hash的内容为指定的data。当使用流数据时可能会多次调用该方法。
    var encodeStr = shasum.digest('hex');//计算所有传入数据的hash摘要。参数encoding（编码方式）可以为'hex', 'binary' 或者'base64'。
    return encodeStr;
}


//console.log(crypto.getCiphers());//输出可用加密算法
//加密
function cipher(buf){
    var encrypted = "";
    var cip = crypto.createCipher('aes-256-cbc', 'Gemini');
    encrypted += cip.update(buf, 'binary', 'hex');
    encrypted += cip.final('hex');
    return encrypted;
}
//解密
function decipher(encrypted){
    var decrypted = "";
    var decipher = crypto.createDecipher('aes-256-cbc', 'Gemini');
    decrypted += decipher.update(encrypted, 'hex', 'binary');
    decrypted += decipher.final('binary');
    return decrypted;
}