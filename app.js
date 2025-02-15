const express = require('express');
const app = express();
const userModel = require("./models/user");
const cookieParser =require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
app.set("view engine","ejs");

app.use(express.json())
app.use(express.urlencoded({ extended:true}));

app.use(express.static("public"));

app.use(cookieParser())


app.get("/", function(req,res){

    res.render("index");

})

app.get("/login", function(req,res){
    res.render("login");
})



    app.post('/create', (req,res)=>
    {
        let {username ,email ,password ,age} =  req.body;

        bcrypt.genSalt(10,(err, salt)=>{

            bcrypt.hash(password,salt, async (err,hash)=>{
                
                let createdUser = await userModel.create({
                    username,
                    email,
                    password:hash,   
                    age
                })
               let token = jwt.sign({email},"shshsshshshsh");
               res.cookie("token",token);
               res.send(createdUser);
               
        
            })

            })



        })

    app.post("/login", async function(req,res){
       let user = await userModel.findOne({email: req.body.email});
       if(!user) return res.send("something is wrong");


       bcrypt.compare(req.body.password,user.password,function(err,result){
        if(result){
            let token = jwt.sign({email:user.email},"shshsshshshsh");
            res.cookie("token",token);
            res.send("yes u con login");

         } 
        else res.send("something is wrong");


     })

    });

        
   

    app.post("/logout",function(req,res){


    })
 
    
app.listen(3000);