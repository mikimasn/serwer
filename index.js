var express = require('express')
var app = express();
var path = require('path');
var config = require('./config.json')
const bodyParser = require("body-parser");
var cryptico = require("cryptico");
fs=require('fs');
var sqlite3=require('sqlite3').verbose();
let db = new sqlite3.Database(config.database);
var seesions = require('./sessions.js');
const e = require('express');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
function createrandomstring(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }
function update(
)
{
    return JSON.parse(fs.readFileSync(path.join(__dirname,"config.json")).toString())
}
app.get('/',(req,res)=>{

    res.send({code:10,message:"connection stable"});
})
app.post('/login',(req,res)=>{
    config = update()
    if(config.blockedip.find(element=>req.ip.search(element)>-1)!=undefined||(config.whitelist&&config.whitelistip.find(element=>req.ip.search(element)>-1)==undefined))
    {
        res.status(401).send({code:402,message:"You are blocked or not whitelisted on this server"});
        return;
    }
    if(req.body==undefined||req.body.login==undefined||req.body.pass==undefined)
    {
        res.status('401').send({code:200,message:"Missing arguments"})
    }else
    {
        var crypto = require('crypto');
        const login = mysql_real_escape_string(req.body.login);
        var islogin=false;
        const pass = mysql_real_escape_string(crypto.createHash(config.hash).update(req.body.pass).digest('hex'));
        var rsapublic = null;
        db.all(`Select * From users WHERE \`user_name\`='${login}' AND \`pass\`='${pass}'`,(err, rows ) => {
            if(err)
            {
                console.log(err);
                return;
            }
                if(rows.length.toString()!="0")
                {
                    seesions.createsession(rows[0].id,req,res,{code:10,message:"Logined in."},{user_name:rows[0].user_name,email:rows[0]['e-mail'],token:rows[0].token});
                    rsapriv=null;
                    islogin = true;
                return;
            }
            else
            {
                res.send({code:201,message:"Invalid authorization data."});
            }
              });
              
        
    }
})
app.all('/register',(req,res)=>{
    config = update()
    if(config.blockedip.find(element=>req.ip.search(element)>-1)!=undefined||(config.whitelist&&config.whitelistip.find(element=>req.ip.search(element)>-1)==undefined))
    {
        res.status(401).send({code:402,message:"You are blocked or not whitelisted on this server"});
        return;
    }
    db.all(`Select * From users WHERE \`ip_create\`='${req.ip}' AND \`timestamp\`>'${new Date().getTime()-config.registercooldown*60*1000}'`,(err, rows ) => {
        if(err)
        {
            console.log(err);
        }
            if(rows.length>=config.registercount)
            {
                res.send({ code: 500, message: "You are begin rate. Try again later" });
        }
        else
        {
            if(req.body==undefined||req.body.login==undefined||req.body.pass==undefined||req.body.email==undefined||req.body.publickey==undefined)
            {
                res.status(401).send({code:200,message:"Missing Arguments"})
            }
            else
            {
                var crypto = require('crypto');
                var login  = mysql_real_escape_string(req.body.login);
                var pass = mysql_real_escape_string(crypto.createHash(config.hash).update(req.body.pass).digest('hex'));
                var email = mysql_real_escape_string(req.body.email);
                var rsapublic = mysql_real_escape_string(req.body.publickey);
                    
                db.all(`Select * From users Where user_name="${login}" OR \`e-mail\`="${email}"`,(err,rows)=>{
                    if(err)
                    {
                        res.send({code:1001,message:"Undefinded error"});
                        console.log(err)
                        return;
                    }
                    if(rows.length.toString()=="0")
                    {
                        db.all(`Select * From "id's"`,(err,rowsids)=>{
                            if(err)
                            {
                                res.send({code:1001,message:"Undefinded error"});
                                console.log(err);
                                return;
                            }
                            var token=createrandomstring(128);
                            db.all(`INSERT INTO "main"."users"("e-mail","user_name","pass","token","timestamp","ip_create","id") VALUES ("${email}","${login}","${pass}","${mysql_real_escape_string(token)}","${mysql_real_escape_string(new Date().getTime().toString())}","${mysql_real_escape_string(req.ip)}","${mysql_real_escape_string(rowsids.length.toString())}");`,(err,rowsuser)=>{
                                if(err)
                                {
                                    res.send({code:1001,message:"Undefinded error"});
                                    console.log(err);
                                    return;
                                }
                                db.all(`INSERT INTO "id's"("id","type") VALUES ("${mysql_real_escape_string(rowsids.length.toString())}","USER");`,(err,rowsintoid)=>{
                                    if(err) 
                                    {
                                        res.send({code:1001,message:"Undefinded error"});
                                        console.log(err);
                                        return;
                                    }
                                    db.all(`INSERT INTO "main"."user_options"("id_user","meta_id","value_meta") VALUES ("${mysql_real_escape_string(rowsids.length.toString())}",1,"${mysql_real_escape_string(rsapublic)}");`,(err,rowsmeta)=>{
                                        if(err)
                                        {
                                            res.send({code:1001,message:"Undefinded error"});
                                            console.log(err);
                                            return;
                                        }
                                        seesions.createsession(rowsids.length,req,res,{id:rowsids.length,publickey:rsapublic,token:token},{code:10,message:"succesful register"});
                                        rsapriv=null;
                                    })
                                })
                                

                                })
                            })
                        
                        
                    }
                    else
                    {
                        res.send({code:601,message:"username taken"})
                        return;
                    }
                })
               

            }
        }
          });
          
    
})
app.post('/authorize',(req,res)=>{
    config = update()
    if(config.blockedip.find(element=>req.ip.search(element)>-1)!=undefined||(config.whitelist&&config.whitelistip.find(element=>req.ip.search(element)>-1)==undefined))
    {
        res.status(401).send({code:402,message:"You are blocked or not whitelisted on this server"});
        return;
    }
    if(req.body.token!=undefined||req.body.utoken!=undefined||req.body.uid!=undefined||req.body.sid!=undefined)
    {
        console.log("2");
        var stoken = mysql_real_escape_string(req.body.token)
        var utoken = mysql_real_escape_string(req.body.utoken)
        var uid = mysql_real_escape_string(req.body.uid);
        var sid = mysql_real_escape_string(req.body.sid);
        console.log("2");
        seesions.checksession(req,uid,utoken,stoken,sid,(authorized)=>{
            if(authorized)
            {
                res.send({code:10,message:"Authorized"});
                return
            }
            else
            {
                res.status(401).send({code:401,message:"Unathorized"})
                return
            }
        })
    }
    else
    {
        res.status(401).send({code:200,message:"Missing Arguments"})
    }
})
app.listen(config.port, function () {
    console.log(`Listening to Port ${config.port}` );
  });
  app.use((req,res,next)=>{
    config = update();
    if(config.blockedip.find(element=>req.ip.search(element)>-1)!=undefined||(config.whitelist&&config.whitelistip.find(element=>req.ip.search(element)>-1)==undefined))
    {
        res.status(401).send({code:402,message:"You are blocked or not whitelisted on this server"});
        return;
    }
      res.status('404').send({code:404,message:"page not found"});
  });

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