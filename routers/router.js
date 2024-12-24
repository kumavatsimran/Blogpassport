const  {Router}=require('express')
const { isAuth}=require('../middlewar/Auth')
// const {isAuth}= require('../middlewar/Auth');
const { blogPage, AddBlog, uploadImage,form, deleteData,edit,editdata,login,loginPage,signupPage,logout,singup} = require('../controller/controller');

const router=Router();

router.get('/',isAuth,blogPage);
router.get('/blog',form);
router.get('/deleteData',deleteData);
router.get('/editData',edit);
router.get('/signup',signupPage);
router.get('/logout',logout);
router.get('/login',loginPage);

router.post('/insertData',uploadImage,AddBlog);
router.post('/edit',uploadImage,editdata);


router.post('/logindata',login);


router.post('/singupdata',singup);

module.exports=router
