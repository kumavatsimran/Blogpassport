// const blogDB=require("../models/blogdata")
const { blogDB, user } = require("../models/blogdata")
const multer = require('multer')

const fs = require('fs')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./upload/images");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
})
const uploadImage = multer({ storage }).single("image")

const form = async (req, res) => {
    return res.render('pages/blog')
}
const blogPage = async (req, res) => {
    console.log("enter");
    const blog = await blogDB.find()



    return res.render('pages/index', { blog })
}
const AddBlog = async (req, res) => {
    const image = req.file.path;
    const { name, discribtion, date } = req.body

    try {
        let blog = await blogDB.create({ name, discribtion, date, image })
        return res.redirect('/')
    } catch (error) {
        console.log(error);
    }
}
const deleteData = async (req, res) => {
    let { id } = req.query
    console.log({ id }, "q");
    try {
        let data = await blogDB.findByIdAndDelete(id)
            .then((singleRecord) => {
                console.log(singleRecord.image)
                fs.unlinkSync(singleRecord.image)

                return res.redirect('/')
            })
    }
    catch (err) {
        console.log(err);
    }
}
const edit = async (req, res) => {
    let id = req.query.id;  
    console.log("Editing blog ", id);  
    blogId = id;

    let blog = await blogDB.findById(id);
    if (!blog) {
        return res.status(404).send("Blog not found");
    }

    return res.render('./pages/edit', { blog });
};
const editdata = async (req, res) => {
    let blogId = req.query.id;  
    if (!blogId) {
        return res.status(400).send("Blog ID is missing");
    }

    console.log("Editing ", blogId); 

    let blog = req.body;
    console.log("Blog data to update:", blog);  

    if (req.file) {
        blog.image = req.file.path;
    }

    try {
        let result = await blogDB.findByIdAndUpdate(blogId, blog, { new: true });
        if (!result) {
            return res.status(404).send("Blog not found for update");
        }
        console.log("Update result:", result);  
        return res.redirect("/"); 
    } catch (error) {
        console.log("Error during update:", error);
        return res.status(500).send("Error updating blog");
    }
};





const loginPage = (req, res) => {
    return res.render('pages/login');
}
const login = async (req, res) => {
    const { email, password } = req.body;
    let User = await user.findOne({ email: email })
    if (User) {
        if (User.password == password) {
            return res.cookie('user', User.id).redirect('/')
        }
        console.log("invalid password");
        return res.redirect('/login');
    }
    console.log("invalid email");
    return res.redirect('/login');
}
const singup = async (req, res) => {
    let data = await user.create(req.body)
    return res.redirect('/login')
}

const signupPage = (req, res) => {

    return res.render('pages/singup');
}
const logout = async (req, res) => {
    res.clearCookie('user'),
        res.render('/login')
}


module.exports = { blogPage, uploadImage, AddBlog, form, deleteData, edit, editdata, loginPage, signupPage, singup, logout, login }
