const jwt = require('jsonwebtoken');
const userModel = require('../models/user')
const checkAuth = async (req , res, next)=>{
    const token = req.cookies.token;
    // console.log(token)
    if(!token)return res.status(401).json({ message: "Unauthorized"});
    try{
        const decoded = jwt.verify(token,'6264');
        // console.log(decoded)
        //fetch full user frpm DB 
        const user = await userModel.findById(decoded.ID);
        if(!user) return res.stauts(401).json({message:"user not found"});
        req.user =user;//full user now available
        next();

    }catch (err){
        console.log(error)
        res.status(401).json({message:"invalid token"});
    }
}
module.exports= checkAuth 