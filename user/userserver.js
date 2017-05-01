/**
 * Created by saravanan on 01-05-2017.
 */
module.exports = function(app, sendResponseJson ){
    app.get('/saru/users', function(req, res ){
        if(!app.connected()){
            console.log("DB connection error")
        }
        app.getAllUsers(function(err, data){
            console.log("size:"+data.length);
            sendResponseJson(res,data);
        });

    });

    app.get('/saru/users/:id', function(req, res ){
        console.log("request received with id"+req.params.id);
        if(!app.connected()){
            console.log("DB connection error")
        }

        app.getUserForID(req.params.id,function(err, data){
            console.log("size:"+JSON.stringify(data));
            sendResponseJson(res,data[0]);
        });

    });

    app.post('/saru/fbuser', function(req, res){
        var data = req.body;
        if(!app.connected()){
            console.log("DB connection error")
            res.status(500).send("DB connectivity lost!");
        }else{
            app.addFBUser(data,function(err,result){
                if(err!=null){
                    console.log("Error during insert of data"+err);
                    res.status(500).send("Internal error during insert"+err);
                }else{
                    console.log("Data successfully inserted!");
                    sendResponseJson(res,result.ops[0]);
                }
            });
        }

    });

    app.post('/saru/user', function(req, res){
        var data = req.body;
        if(!app.connected()){
            console.log("DB connection error")
            res.status(500).send("DB connectivity lost!");
        }else{
            app.addUser(data,function(err,result){
                if(err!=null){
                    console.log("Error during insert of data"+err);
                    res.status(500).send("Internal error during insert"+err);
                }else{
                    console.log("Data successfully inserted!");
                    sendResponseJson(res,result.ops[0]);
                }
            });
        }

    });

    app.put('/saru/fbuser', function(req,res){
        var data = req.body;

        if(!app.connected()){
            console.log("DB connection error")
            res.status(500).send("DB connectivity lost!");
        }else{
            app.updateFBInfo(data, function(err, result){
                if(err!=null){
                    console.log("Error during insert of data"+err);
                    res.status(500).send("Internal error during insert"+err);
                }else{
                    console.log("Data successfully inserted!");
                    sendResponseJson(res,result);
                }
            });
        }
    });

    app.put('/saru/user', function(req,res){
        var data = req.body;

        if(!app.connected()){
            console.log("DB connection error")
            res.status(500).send("DB connectivity lost!");
        }else{
            app.updateUser(data, function(err, result){
                if(err!=null){
                    console.log("Error during insert of data"+err);
                    res.status(500).send("Internal error during insert"+err);
                }else{
                    console.log("Data successfully inserted!");
                    sendResponseJson(res,result);
                }
            });
        }
    });

    app.post('/saru/authenticate', function(req,res){
        var data = req.body;

        if(!app.connected()){
            console.log("DB connection error")
            res.status(500).send("DB connectivity lost!");
        }else{
            app.getUserForEmail(data.email, function(err, result){
                if(err!=null){
                    res.status(500).send("Internal error during insert"+err);
                }else{
                    if(result.length>0){
                        console.log(JSON.stringify(result[0]));
                    if(result[0].content.password==data.password){
                        result[0].authenticated=true;
                        sendResponseJson(res,result[0]);
                    }
                }else{
                    var result = {};
                    result.authenticated=false;
                    sendResponseJson(res,result);
                }

                }
            });
        }
    });

    app.delete('/saru/users', function(req,res){
        var data = req.body;
        if(!app.connected()){
            console.log("DB connection error")
            res.status(500).send("DB connectivity lost!");
        }else{
            app.deleteUser(data,function(err, result){
                if(err!=null){
                    console.log("Error during delete of data"+err);
                    res.status(500).send("Internal error during delete"+err);
                }else{
                    console.log("Data successfully deleted!");
                    sendResponseJson(res,result);
                }
            });
        }
    });
}
