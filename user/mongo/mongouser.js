/**
 * Created by saravanan on 01-05-2017.
 */
var ObjectID = require('mongodb').ObjectID;

module.exports = function (app, getDB) {
    app.getAllUsers = function (cb) {
        var cursor = getDB().collection('Users').find();
        cursor.toArray(cb);
    }

    app.addFBUser = function(data,cb){
        if(data!=null){
            var userData = {};
            userData.fbUser=true;
            userData.content={};
            userData.content.name =  data._json.name;
            userData.content.gender =  data._json.gender;
            userData.content.email =  data._json.email;
            userData.fbUserData = data;
            userData.crteDt = new Date();
            getDB().collection('Users').insert(userData,cb);
        }else{
            console.log("Error null data cannot be inserted!");
            cb();
        }
    }

    app.addUser = function(data,cb){
        if(data!=null){

            data.fbUser=false;
            data.fbUserData={};
            data.crteDt = new Date();
            getDB().collection('Users').insert(data,cb);
        }else{
            console.log("Error null data cannot be inserted!");
            cb();
        }
    }

    app.updateUser= function(data, cb){
        if(data!=null){
            var id = data._id;
            data.content.mdfydDt = new Date();
            getDB().collection('Users').updateOne({_id: new ObjectID(id)},{
                    $set: { content: data.content }},
                cb);
        }else{
            console.log("Error null data cannot be inserted!");
            cb();
        }
    };

    app.updateFBInfo= function(id,fbdata, cb){
        if(fbdata!=null){
            getDB().collection('Users').updateOne({_id: new ObjectID(id)},{
                    $set: { fbUserData: fbdata }},
                cb);
        }else{
            console.log("Error null data cannot be inserted!");
            cb();
        }
    };
    app.deleteUser= function(userData, cb){
        if(userData!=null){
            getDB().collection('Users').deleteOne({_id: new ObjectID(userData._id)},cb);
        }else{
            console.log("Error null data cannot be inserted!");
            cb();
        }
    };
    app.getUserForID= function(id,cb){
        if(id!=null){
            var cursor = getDB().collection('Users').find({_id: new ObjectID(id)});
            cursor.toArray(cb);
        }else{
            console.log("Id is null");
            cb();
        }
    };

    app.getUserForEmail = function(email,cb){
        if(email!=null){
                var cursor = getDB().collection('Users').find({"content.email":email});
                cursor.toArray(cb);
        }else{
            cb();
        }
    }

    app.getUserForEmail2 = function(email,cb,cb1){
        if(email!=null){
            var cursor = getDB().collection('Users').find({"content.email":email});
            cursor.toArray(cb);
        }else{
            cb(cb1);
        }
    }
}