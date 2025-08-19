const userModel = require('../models/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class userController {
    static register = async (req, res) => {
        try {
            // console.log(req.body)
            const { name, email, password } = req.body
            const exitingUser = await userModel.findOne({ email })
            if (exitingUser) {
                return res.status(400).json({
                    msg: "email allready exit"
                });

            }
            //hash password
            const hashPassword = await bcrypt.hash(password, 10)
            const data = await userModel.create({
                name,
                email,
                password: hashPassword
            })
            res.json({
                data,
                msg: "user register success"
            })
        } catch (error) {
            console.log(error)
        }
    }
    static login = async (req, res) => {
        try {
            //  console.log(req.body)
            const { email, password } = req.body;
            const user = await userModel.findOne({ email });
            // console.log(user)
            if (!user) {
                return res.status(400).json({ message: "invalid credentials" });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: "invalid credentials" });
            }
            // console.log(isMatch)
            // token create
            const token = jwt.sign({ ID: user._id }, process.env.jwt_SECRET,
                {expiresIn:"2d"}
            );
           // console.log(token)
            // send token in 
            res.cookie("token", token,{
                httpOnly: true
            });
            res.status(200)
                .json({
                    message: "login sucessful",
                });

        } catch (error) {
            console.log(error)
        }
    }
    static profile = async(req,res)=>{
        try {
            console.log("hello profile")
            
                
        }catch(error){
            console.log(error)
        }

    }

    static logout = async (req,res)=>{
        try{
            res.clearCookie('token')
            res.status(200).json({message:"logout succefully"})
        } catch (error){
              console.log(error)  
            }
    }
}
module.exports = userController
