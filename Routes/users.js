module.exports = (users, knex, jwt)=>{
    users.post("/signup",(req, res)=>{             
        var Name = req.body.Name;
        var Email = req.body.Email;
        var Password = req.body.Password;
        knex.insert({Name:Name, Email:Email, Password:Password}).into("users")
        .then((data)=>{
            knex.select("Id").from("users").where("Email",Email)
            .then((userdata)=>{
                let id=JSON.parse(JSON.stringify(userdata))
                var accesskey = jwt.sign(id[0], "rohit",{expiresIn:"24hr"});
                res.cookie(accesskey)
                if (accesskey.length!=0){
                    // console.log(accesskey);
                    res.send("sucessfully create account !")
                }
            }).catch((err)=>{
                console.log(err)
            })
        }).catch((err)=>{
            res.send("user is already exists")
            console.log(err)
        })
    })


    users.post ("/login" , (req,res) => {

        var Email = req.body.Email;
        var Password = req.body.Password;
        knex.select("Id").from("users").where({"Email":Email, "Password":Password})
        .then((data)=>{
            if (data.length==0){
                res.send("your email or password is not exits");
            }else{
                knex.select("Id").from("users").where("Email",Email)
                .then((userdata)=>{
                    let id=JSON.parse(JSON.stringify(userdata))
                    var accesskey = jwt.sign(id[0], "rohit",{expiresIn:"24hr"});
                    res.cookie(accesskey)
                    if(accesskey.length!=0){
                        // console.log(accesskey);
                        res.send("loign sucessfully !")
                    }
                }).catch((err)=>{
                    console.log(err)
                })  
            }
        })
    });
   
    users.get("/logout",(req, res)=>{
       
        var cookie = []
        var get_cookie = req.headers.cookie.split(" ");
        var slice_cookie = get_cookie[get_cookie.length-1].slice(0,-10);
        cookie.push(slice_cookie)
        cookie.pop()
        console.log("sucessfully remove token !");
    })
  
}