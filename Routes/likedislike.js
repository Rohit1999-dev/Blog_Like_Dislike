module.exports = (likedislike, knex, jwt)=>{
    likedislike.post('/createlike',(req, res)=>{
       var get_cookie = req.headers.cookie.split(" ");
        var slice_cookie = get_cookie[get_cookie.length-1].slice(0,-10);
        // console.log(slice_cookie);
        jwt.verify(slice_cookie, "rohit", (err, data)=>{
            // console.log(data)
            if(!err){
                var dict = req.body;
                dict["Date"] = new Date();
                dict["User_id"] = data.Id;
                knex("likedislike").insert(dict)
                .then((data)=>{
                    res.send({data:data});
                })
                .catch((err)=>{
                    res.send(err.message);
                })
            }
        })

})
}