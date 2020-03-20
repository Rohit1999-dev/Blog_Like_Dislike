module.exports = (postcreate, Knex, jwt)=>{
    postcreate.post('/create',(req, res)=>{
        var get_cookie = req.headers.cookie.split(" ");
        var slice_cookie = get_cookie[get_cookie.length-1].slice(0,-10);
        console.log(slice_cookie)
        jwt.verify(slice_cookie, "rohit",(err, data)=>{
            console.log(data)
            if(!err){   
                var dict=req.body;
                dict["Date"]=new Date();
                dict["User_id"]=data.Id;
                Knex("postcreate").insert(dict)
                .then((id)=>{
                    res.send({id:id})
                })
                .catch((err)=>{
                    res.send("some thing is going wrong !")
                })
            }
        })
    })
    postcreate.get('/findpost',(req, res)=>{
        var Text = req.body.Text;
        var Description = req.body.Description;
        var get_cookie = req.headers.cookie.split(" ");
        var slice_cookie = get_cookie[get_cookie.length-1].slice(0,-10);
        // console.log(slice_cookie)
        jwt.verify(slice_cookie, "rohit",(err, data)=>{
            // console.log(data)
            if(!err){
                Knex.select('*').from('postcreate').where('User_id', data.Id)
                .then((data)=>{
                    console.log(data)
                    // res.send(data)
                })
                .catch((err)=>{
                    res.send(err.message);
                })
                
            }
        })
    })
}