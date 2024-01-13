const express = require("express")
const mysql = require("mysql")
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:false}))

//create connection
const db = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "",
    database : "node_mysql_db"
})

//get all list customer
app.get("/api/customer",(req,res)=>{
    db.query("SELECT * FROM customer",(err,result)=>{
        if(err){
            res.json({
                error : true ,
                message : err
            })
        }
        else{
            res.json({
                list : result
            })
        }
    })
})

//get one customer by id
app.get("/api/customer/:id",(req,res)=>{
    db.query("SELECT * FROM customer WHERE customer_id = ?",[req.params.id],(err,result)=>{
        if(err){
            res.json({
                error : true ,
                message : err
            })
        }
        else{
            res.json({
                list : result
            })
        }
    })
})

//create customer
app.post("/api/customer/",(req,res)=>{
    //get parameters from body json
    var body = req.body;
    console.log(body)
    var sqlInsert = "INSERT INTO customer (firstname,lastname,gender,tel,email) VALUES (?,?,?,?,?)"
    db.query(sqlInsert,[body.firstname,body.lastname,body.gender,body.tel,body.email],(err,result)=>{
        if(err){
            res.json({
                error : true ,
                message : err
            })
        }
        else{
            res.json({
                message : "save successfully!",
                data : result
            })
        }
    })
})

//update customer
app.put("/api/customer/",(req,res)=>{
    var body = req.body
    var sqlUpdate = "UPDATE customer set firstname = ?, lastname = ?, gender = ?, tel = ?, email = ? WHERE customer_id = ?"
    db.query(sqlUpdate,[body.firstname,body.lastname,body.gender,body.tel,body.email,body.id],(err,result)=>{
        if(err){
            res.json({
                error : true,
                message : err 
            })
        }
        else{
            res.json({
                message : "update successfully!"
            })
        }
    })

})

//delete customer
app.delete("/api/customer/",(req,res)=>{
    var body = req.body
    if(body.id == "" || body.id == null){
        res.json({
            error : true,
            message : "Param id required!"
        })
        return false
    }
    db.query("DELETE FROM customer WHERE customer_id = ?",[body.id],(err,result)=>{
        if(err){
            res.json({
                error : true,
                message : err
            })
        }
        else{
            res.json({
                message : "Delete successfully!"
            })
        }
    })
})

//route at port 8080 
app.listen(8080,() => {
    console.log("http://localhost:8080")
})