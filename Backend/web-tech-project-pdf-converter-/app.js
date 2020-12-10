var express    = require('express');
var bodyParser = require('body-parser');
var pdf        = require('html-pdf');
var fs         = require('fs');
var options    = {format:'Letter'};
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./Schemas/UserSchemas.js');

//init app
var app = express();

//set the templat engine
app.set('view engine','ejs');

//fetch data from the request
app.use(cors());
app.use(express.json());

//db config
const dbURL = "mongodb+srv://new-user:sXEzRrFKgXzEvh6a@cluster0.rnsmf.mongodb.net/<pdfConverterDB>?retryWrites=true&w=majority";
mongoose.connect(dbURL,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
});

const db = mongoose.connection;
db.once('open',()=>{
    console.log("Connected to mongo db");
});


//api's

app.get('/',(req,res)=>{
    console.log("Got a request from client");
    // res.render('home')
});



//sign in api's
app.post('/signUp',(req,res)=>{
    const auth = req.body;
    console.log(auth.userName);
    console.log(auth.pwd);
    User.find({'userName':auth.userName},(err,data)=>{
        if(err){
            res.status(500).send(err);
        }else{
            if(data.length>0){
                res.status(201).send({
                    "authStatus":2 //user name taken
                });
            }else{
                User.create(auth,(err,data)=>{
                    if(err){
                        res.status(500).send(err);
                    }else{
                        res.status(201).send({
                            "authStatus":1,
                            "data":data
                        });
                    }
                });   
            }
        }
    });
});

//sign in 
app.post('/signIn',(req,res)=>{
    const auth = req.body;
    console.log(auth.userName);
    console.log(auth.pwd);
    User.find({'userName':auth.userName,'pwd':auth.pwd},(err,data)=>{
        if(err){
            res.status(500).send(err);
        }else{
            if(data.length>0){
                console.log("Sign in successful");
                res.status(201).send(data);
            }else{
                console.log("Sign in failed");
                res.status(201).send(data);
            }
        }
    });   
});


//we need _id as userName from front end
app.post('/addConversion',(req,res)=>{
    console.log(req.body);
    // res.render('',{data:req.body.article},function(err,html){
    //     pdf.create(html, options).toFile('./public/uploads/demopdf.pdf', function(err, result) {
    //         if (err){
    //             return console.log(err);
    //         }
    //          else{
    //         console.log(res);
    //         var datafile = fs.readFileSync('./public/uploads/demopdf.pdf');
    //         res.header('content-type','application/pdf');
    //         res.send(datafile);
    //          }
    //       });
    // });

    res.render('demopdf.ejs',{data:req.body.article},(err,html)=>{
        console.log(html);
        fs.truncate('./public/uploads/demopdf6.pdf',0,()=>{
            console.log("Deleted old content");
        });
        pdf.create(html, options).toFile('./public/uploads/demopdf6.pdf', function(err, result) {
            if (err){
                return console.log("Conversion failed");
            }
             else{
            console.log("SuccessFull Conversion");
            var datafile = fs.readFileSync('./public/uploads/demopdf6.pdf');
            // var file = fs.createReadStream('./public/uploads/demopdf4.pdf');
            // var stat = fs.statSync('./public/uploads/demopdf4.pdf');
            // res.setHeader('Content-Length', stat.size);
            // res.setHeader('Content-Type', 'application/pdf');
            // res.setHeader('Content-Disposition', 'attachment; downdloadFile.pdf');
            // file.pipe(res);
            const fileLocation = "./public/uploads/demopdf4.pdf";
            const file = "demopdf4.pdf"
            // res.download(fileLocation,file,(err)=>{
            //     console.log(err);
            // });
            res.contentType("application/pdf");
            res.send(datafile);
             }
          });
    });

   

    
});

app.post('/updateConversionHistory',(req,res)=>{
    const info = req.body;
    console.log(info);
    User.updateOne({"_id":info.userID},{
        $push:{
            pastConversion:{
                "fileName":info.fileName,
                "timeOfConversion": new Date(),
            }
        }
    },(err,data)=>{
        if(err)throw err;
        else{
            res.status(201).send("Item Updated in Mongo DB");
        }
    });
});

app.get('/getHistory',(req,res)=>{
    const info = req.query;
    console.log(info);
    User.findOne({"_id":info.userID},(err,data)=>{
        if(err)throw err;
        else{
            res.status(201).send(data);
        }
    });
})

//assign port
var port = process.env.PORT || 9000;
app.listen(port,()=>console.log('server run at port '+port));

//On the terminal node app.js to run it