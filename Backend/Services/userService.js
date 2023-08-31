const dbCon=require('../config/dbConfig')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken');
const { data } = require('autoprefixer');

//const securityKey="12345@Ra";
console.log('check1 server');
const userLogin=async(req,res)=>{
    const {email,password}=req.body;
    console.log('checking the post request');
    const checkPassword=(req,data,res)=>{
        if(data.length>0){
            if(data[0].password===password){
                res.json({
                    status:200,
                    message:'Login Success'
                })
            }else{
                res.json({
                    status:400,
                    message:'Password does not match'
                })
            }
        }
    }

    const sqlQuery=`select * from user_information where email='${email}'`;
    const sqlQuery1=`select * from user_information where username='${email}'`;

    await dbCon.query(sqlQuery,async(error,data)=>{
        try {
            if(data.length===0){
                await dbCon.query(sqlQuery1,async(error,data1)=>{
                    if(data1.length===0){
                      res.json({
                        status:400,
                        message:"user not exist"
                      })
                    }else{
                        checkPassword(data1,req.body,res)
                    }
                })
            }
            if(data.length>0){
                console.log('second',req.body)
                checkPassword(data,req.body,res)
            }
        } catch (error) {
            res.json({
                status:400,
                message:error
            })
        }
    })
}

/*const userSignup=async(req,res)=>{
const {username,email,password}=req.body;
const salt=await bcrypt.genSalt(10);
const hashpwd=await bcrypt.hash(password,salt)
const values=[username,email,hashpwd]

const sqlQuery=`select * from user_information where email='${email}'`;
const sqlQuery1=`insert into user_information(username,email,password) values(?)`

await dbCon.query(sqlQuery,async(error,data)=>{
    try {
        if(data.length>0){
            res.json({
                status:400,
                message:'User already exist'
            })
        }
        if(data.length==0){
            await dbCon.query(sqlQuery1,[values],(error,data1)=>{
                if(data1){
                    res.json({
                        status:200,
                        data:data1,
                        message:`Sucessfully ${username} Registred`
                    })
                }else{
                    res.json({
                        status:400,
                        message:error
                    })
                }
            })
            
        }
    } catch (error) {
        res.json({
            status:400,
            message:error
        })
    }
})

}*/






module.exports={/*userSignup,*/userLogin}