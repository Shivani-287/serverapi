const CourseModel = require('../models/course')
const cloudinary = require ('cloudinary')
// Configuration
    cloudinary.config({ 
        cloud_name: 'dmxzoyt0j', 
        api_key: '771541621386115', 
        api_secret: 'im_0-2pWVPXN2FTTUqtrDuu4Y6M' // Click 'View API Keys' above to copy your API secret
    });

class CourseController{
    static display = async(req,res)=>{
        try{
            // res.send("hello display")
            const data =await CourseModel.find()
            res.json(data) 
        }catch (error){
            console.log(error)
        }
    }
    static create =async (req,res) =>{
        try{
            //console.log(req.files)
            
            //console.log(file)
             const {title,description,price,duration}= req.body
             const file = req.files.image
              const imageUpload = await cloudinary.uploader.upload(file.tempFilePath,{
                folder:"courseImage"
              })
            const data = await CourseModel.create({
                title,
                description,
                price,
                duration,
                image:{
                    public_id:imageUpload.public_id,
                    url:imageUpload.secure_url
                }
             })
             res.json(data)
        } catch (error){
            console.log(error)
        }
    }
    static view = async (req,res)=> {
        try {
            const id = req.params.id
            const data = await CourseModel.findById(id)
            res.json(data)
        }
        catch(error){
            console.log(error)
        }
    }
    static update = async (req,res) =>{
        try{
            const id =req.params.id
            const {title,description,price,duration} = req.body
            const data = await CourseModel.findByIdAndUpdate(id,{
                title,
                description,
                price,
                duration
            })
            res.json({
                msg:"update contact success"
            })
        } catch (error){
            console.log(error)
        }
    }
    static delete = async (req, res) =>{
        try {
            const id = req.params.id 
            const data = await CourseModel.findByIdAndDelete(id)
            res.json({
                msg:"delete contact success"
            })
        } catch (error) {
            console.log(error)
        }
    }


}
module.exports = CourseController