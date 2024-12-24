const mongoose=require('mongoose')
const blogSchema=new mongoose.Schema({
    name:String,
    discribtion:String,
    date:String,
    image:String,
});

const userSchema = new mongoose.Schema({
    username : String,
    email : String,
    password : String,
})
const user= mongoose.model("userTBL", userSchema)
const blogDB=mongoose.model("blogTBL",blogSchema)
console.log(blogDB)

module.exports={blogDB, user};

