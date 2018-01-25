var mysql = require('mysql');
var dbconfig = require('../../config/db');
var pool = mysql.createPool(dbconfig);

DB = {
    Select: function(sql, param, callback) {
        pool.getConnection(function(err, conn){
            if(err) {
                conn.release();
                return;
            }

            var exec = conn.query(sql, param, function(err, rows){
                conn.release();
                
                if(err ==null && rows != null && rows.length > 0) {
                    callback(null, rows);
                }
                else {
                    callback(null, null);
                }
            });

        });
    },

    Insert: function(sql, param, callback){
        pool.getConnection(function(err, conn){
            if(err) {
                conn.release();
                return;
            }

            var exec = conn.query(sql, param, function(err, rows){
                conn.release();
                
                if(err ==null && rows != null && rows.length > 0) {
                    callback(null, rows);
                }
                else {
                    callback(null, null);
                }
            });

        });
    },

    Delete: function(sql, param, callback){
        pool.getConnection(function(err, conn){
            if(err) {
                conn.release();
                return;
            }

            var exec = conn.query(sql, param, function(err, rows){
                conn.release();
                
                if(err ==null && rows != null && rows.length > 0) {
                    callback(null, rows);
                }
                else {
                    callback(null, null);
                }
            });

        });
    },

    Update: function(sql, param, callback){
        pool.getConnection(function(err, conn){
            if(err) {
                conn.release();
                return;
            }

            var exec = conn.query(sql, param, function(err, rows){
                conn.release();
                
                if(err ==null && rows != null && rows.length > 0) {
                    callback(null, rows);
                }
                else {
                    callback(null, null);
                }
            });

        });
    }
}

module.exports = DB;
