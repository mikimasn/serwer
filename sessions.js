var config = require('./config.json');
var sqlite3=require('sqlite3').verbose();
var pach = require('path');
let db = new sqlite3.Database(config.database);
var fs= require('fs');
exports.createsession = (id,req,res,data,info)=>{
db.all(`Select * From "id's"`,(err,rowsids)=>{
    if(err)
    {
         console.log(err);
    }
    var token=createrandomstring(128);
    var auth_token=createrandomstring(64);
    if(rowsids==undefined)
    {
        idrows=0;
    }
    else
    {
        idrows=rowsids.length
    }
    console.log(idrows);
    console.log(mysql_real_escape_string(idrows.toString()));
    console.log("test");
    db.all(`INSERT INTO "main"."sessions"("id","Timestamp","uid","token","auth_token") VALUES ("${mysql_real_escape_string(Math.round(idrows).toString())}","${mysql_real_escape_string(new Date().getTime().toString())}","${mysql_real_escape_string(id.toString())}","${token.toString()}","${auth_token.toString()}");`,(err,rowsinto)=>{
        if(err)
        {
            console.log(err);
        }
        db.all(`INSERT INTO "main"."sessionslog"("s_id","type_action","action_data","id") VALUES ("${mysql_real_escape_string(Math.round(idrows).toString())}","register","${JSON.stringify({ip:mysql_real_escape_string(req.ip)})}",${mysql_real_escape_string((idrows+1).toString())});`,(err,rowssesopt)=>{
            if(err)
            {
                console.log(err);
            }
            db.all(`INSERT INTO "main"."id's"("id","type") VALUES ("${mysql_real_escape_string(idrows.toString())}","Register");`,(err,rowsids1)=>{
                if(err)
                {
                    console.log(err);
                }
                idrows++;
                db.all(`INSERT INTO "main"."id's"("id","type") VALUES ("${mysql_real_escape_string((idrows).toString())}","Register log");`,(err,rowsids2)=>
                {                if(err) 
                {
                    console.log(err);
                }
                res.send({code:info.code,message:info.message,data:data,session:{id:idrows,token:token,auth_token:auth_token,uid:id}})
            })

            })
        })
    })
})
}
exports.checksession=(uid,tokenu,token,sid,callback)=>{
    db.all(`select * From "sessions" where id="${mysql_real_escape_string(sid)}" And token="Register"`,(err,rows)=>{
        if(err)
        {
            console.log(err);
            return;
        }
        if(rows==undefined)
        {
            callback(false);
        }

    })
}
function mysql_real_escape_string (str) {
    return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
        switch (char) {
            case "\0":
                return "\\0";
            case "\x08":
                return "\\b";
            case "\x09":
                return "\\t";
            case "\x1a":
                return "\\z";
            case "\n":
                return "\\n";
            case "\r":
                return "\\r";
            case "\"":
            case "'":
            case "\\":
            case "%":
                return "\\"+char; // prepends a backslash to backslash, percent,
                                  // and double/single quotes
            default:
                return char;
        }
    });
}
function createrandomstring(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }
 