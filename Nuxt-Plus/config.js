#!/usr/bin/env node

var path = process.argv[2], // 请输入项目路径
    exec = require('child_process').exec,
    fs   = require('fs'),
    dir  = './file',
    __dirname = path;

function fileMerge(fileSource, exportFilePath) {

  var readFiles = [];
  var newFileSize = 0;
  var newFileData = "";
  var mergeFileProgress = 0;

  function searchFile(path) {
    try{
      var stats = fs.statSync(path);
      if(stats.isFile()){
        newFileSize += stats.size;
        readFiles.push({absPath:path,size:stats.size});
      }else if(stats.isDirectory()){
        //合并路径下所有文件
        var dirfiles = fs.readdirSync(path);
        for(let i = 0;i<dirfiles.length;i++){
          searchFile(path.join(path,dirfiles[i]));
        }
      }
    }catch(err){
      console.log("error not find "+path);
    }
  }

  for(let i=0;i<fileSource.length;i++){
    searchFile(fileSource[i]);
  }

  for(var i = 0;i<readFiles.length;i++){
    newFileData += fs.readFileSync(readFiles[i].absPath);
    mergeFileProgress++;
    // console.log("读取第"+mergeFileProgress+"个文件。");
  }

  fs.writeFile(exportFilePath,newFileData,err =>{
    if(null != err){
    throw err;
  }else{
    // console.log("总共合并 "+readFiles.length+"个文件 "+newFileSize+" bytes");
  }
});
}

/**
 * 复制文件到指定文件
 * @param src {String} 要复制的文件
 * @param dist {String} 复制到目标文件
 */
function copyFile(src, dist) {
  fs.writeFileSync(dist, fs.readFileSync(src));
}
/**
 * 复制目录、子目录，及其中的文件
 * @param src {String} 要复制的目录
 * @param dist {String} 复制到目标目录
 */
function copyDir(src, dist, callback) {
  fs.access(dist, function(err){
    if(err){
      // 目录不存在时创建目录
      fs.mkdirSync(dist);
    }
    _copy(null, src, dist);
  });

  function _copy(err, src, dist) {
    if(err){
      callback(err);
    } else {
      fs.readdir(src, function(err, paths) {
        if(err){
          callback(err)
        } else {
          paths.forEach(function(path) {
            var _src = src + '/' +path;
            var _dist = dist + '/' +path;
            fs.stat(_src, function(err, stat) {
              if(err){
                callback(err);
              } else {
                // 判断是文件还是目录
                if(stat.isFile()) {
                  console.log(path+'添加成功')
                  fs.writeFileSync(_dist, fs.readFileSync(_src));
                } else if(stat.isDirectory()) {
                  // 当是目录是，递归复制
                  copyDir(_src, _dist, callback)
                }
              }
            })
          })
        }
      })
    }
  }
}
/**
 * 合并json对象
 * @param jsonbject1 {Object} json1
 * @param jsonbject2 {Object} json2
 */
function mergeJsonObject(jsonbject1, jsonbject2) {
  var resultJsonObject={};
  for(var attr in jsonbject1){
    resultJsonObject[attr]=jsonbject1[attr];
  }
  for(var attr in jsonbject2){
    resultJsonObject[attr]=jsonbject2[attr];
  }
  return resultJsonObject;
};
/**
 * 返回安全的JSON字符串
 *
 * @param {Object} data
 * @param {String|Number} space 缩进
 * @return {String}
 */
function jsonStringify(data, space) {
  var seen = [];
  return JSON.stringify(data, function (key, val) {
    if (!val || typeof val !== 'object') {
      return val;
    }
    if (seen.indexOf(val) !== -1) {
      return '[Circular]';
    }
    seen.push(val);
    return val;
  }, space);
};

copyDir(dir+'/assets', __dirname+'/assets', function(err) {
  if(err) {
    console.log('assets写入失败')
  }
})

copyDir(dir+'/filters', __dirname+'/filters', function(err) {
  if(err) {
    console.log('filters写入失败')
  }
})

copyDir(dir+'/middleware', __dirname+'/middleware', function(err) {
  if(err) {
    console.log('middleware写入失败')
  }
})

copyDir(dir+'/plugins', __dirname+'/plugins', function(err) {
  if(err) {
    console.log('plugins写入失败')
  }
})

copyDir(dir+'/server', __dirname+'/server', function(err) {
  if(err) {
    console.log('server写入失败')
  }
})

//console.log('eslint配置')
copyFile(dir+'/.eslintignore', __dirname+'/.eslintignore')
copyFile(dir+'/.eslintrc.js', __dirname+'/.eslintrc.js')
// console.log('添加pm2启动配置文件')
copyFile(dir+'/ecosystem.config.js', __dirname+'/ecosystem.config.js')

// console.log('开始处理nuxt.config.js')
fs.readFile(__dirname + '/nuxt.config.js', {flag: 'r+', encoding: 'utf8'}, function (err, data) {
  if(err) {
    console.error(err);
    return;
  }
  var reg = /\/\*-{10} START -{10}\*\/[\S\s]*\/\*-{10} END -{10}\*\//g;
  if(!data.match(reg)) {
    var fileSourceNuxt = [__dirname+'/nuxt.config.js', dir+'/nuxt.config.js'];
    var goalFileNuxt = __dirname+"/nuxt.config.js";
    fileMerge(fileSourceNuxt,goalFileNuxt);
    console.log('nuxt.config.js处理完成')
  } else {
    replace(data, data.match(reg)[0])
  }
});
function replace(oldData, matchData) {
  fs.readFile(dir + '/nuxt.config.js', {flag: 'r+', encoding: 'utf8'}, function (err, data) {
    if (err) throw err;
    fs.writeFile(__dirname + '/nuxt.config.js', oldData.replace(matchData, data), 'utf8', (err) => {
      if (err) throw err;
    console.log('nuxt.config.js处理完成')
  });
  })
}
// console.log('开始处理package.json')
var json1,json2;
fs.readFile(dir + '/package.json', {flag: 'r+', encoding: 'utf8'}, function (err, data) {
  if(err) {
    console.error(err);
    return;
  }
  json1 = JSON.parse(data)
  fs.readFile(__dirname + '/package.json', {flag: 'r+', encoding: 'utf8'}, function (err, data) {
    if(err) {
      console.error(err);
      return;
    }
    json2 = JSON.parse(data)
    merge(json1,json2)
  });
});

function merge(json1, json2) {
  var dependencies = mergeJsonObject(json2.dependencies, json1.dependencies)
  var devDependencies = mergeJsonObject(json2.devDependencies,json1.devDependencies)
  json2 = mergeJsonObject(json2, {dependencies: dependencies})
  json2 = mergeJsonObject(json2, {devDependencies: devDependencies})
  fs.writeFile(__dirname + '/package.json', jsonStringify(json2, 2), 'utf8', (err) => {
    if (err) throw err;
  console.log('package.json处理完成')
});
}
