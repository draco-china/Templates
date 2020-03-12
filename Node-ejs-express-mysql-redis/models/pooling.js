/**
 * Created by Monarch on 2016/9/13.
 */
//连接池配置
var mysql=require("mysql");

var DB_NAME = 'nodesample';

var db_config = {
    host     : '127.0.0.1',
    user     : 'root',
    password : 'gemini',
    database : 'nodesample'
};
var pool = mysql.createPool(db_config);

pool.on('connection', function(connection) {
    connection.query('SET SESSION auto_increment_increment=1');
});

//避免sql可以使用?作为标识符的占位符
var getConnection=function(sql,callback){
    pool.getConnection(function(err,conn){
        if(err){
            handleError();
            query();
            setInterval(query, 5000);
            callback(err,null,null);
        }else{
            conn.query(sql,function(qerr,vals,fields){
                //释放连接
                conn.release();
                //事件驱动回调
                callback(qerr,vals,fields);
            });
        }
    });
};

//exports.getConnection = getConnection;
module.exports=getConnection;

var conn;
//MySQL断线重连
function handleError () {
    conn = mysql.createConnection(db_config);

    //连接错误，2秒重试
    conn.connect(function (err) {
        if (err) {
            console.log('error when connecting to db:', err);
            setTimeout(handleError , 2000);
        }
    });

    conn.on('error', function (err) {
        console.log('db error', err);
        // 如果是连接断开，自动重新连接
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleError();
        } else {
            throw err;
        }
    });
};
//MySQL连接池的超时
function query(){
    console.log(new Date());
    var sql = "show variables like 'wait_timeout'";
    conn.query(sql, function (err, res) {
        console.log(res);
    });
};



/*获取插入行的id
 当使用自增主键时获取插入行id，如：
 connection.query('INSERT INTO posts SET ?', {title: 'test'}, function(err, result) {
 if (err) throw err;

 console.log(result.insertId);
 });*/

/*
 在js类使用如下
 var query=require("./lib/mysql.js");

 getConnection("select 1 from 1",function(err,vals,fields){
 });  */