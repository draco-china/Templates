/**
 * Created by Monarch on 2016/9/13.
 */
/*
    function getUserNumByName(username, callback) {
        var insertUser_Sql = "INSERT INTO userinfo(id,username,userpass) VALUES(0,?,?)";
        connection.query(insertUser_Sql, [user.username, user.userpass], function (err,result) {
            if (err) {
                console.log("insertUser_Sql Error: " + err.message);
                return;
            }
            connection.release();
            callback(err,result);
        });
    };

    function getUserNumByName(username, callback) {
        var getUserNumByName_Sql = "SELECT COUNT(1) AS num FROM userinfo WHERE username = ?";
        connection.query(getUserNumByName_Sql, [username], function (err, result) {
            if (err) {
                console.log("getUserNumByName Error: " + err.message);
                return;
            }
            connection.release();
            callback(err,result);
        });
    };

   function getUserNumByName(username, callback) {
        var getUserByUserName_Sql = "SELECT * FROM userinfo WHERE username = ?";
        connection.query(getUserByUserName_Sql, [username], function (err, result) {
            if (err) {
                return;
            }
            connection.release();
            callback(err,result);
        });
    };

});*/
