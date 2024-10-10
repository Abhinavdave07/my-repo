import express  from 'express';
const router = express.Router();
import db, { Doubt } from '../Model/user.js'
import { isLoggedIn } from '../middleware/authMiddleware.js';
import upload from '../middleware/multeer.middleware.js';
import cloudinary from 'cloudinary'
import User from '../Model/user.js';
import AppError from '../utils/error.js';
// Get All Doubts (Students can post, Teachers can answer)
router.get('/', async(req, res) => {
    const doubts=await Doubt.GetAllDoubts()
    console.log('d',doubts);
    
    res.status(200).json({
        "Doubts":doubts,
        "success":true
    })
});




// Post a Doubt (Only students)
router.post('/',isLoggedIn,async(req, res,next) => {
    try{
        const { title, description } = req.body;
    const userId = req.user.id;
    console.log('let',title,description,req.user);
    if(!title || !description){
        return next(new AppError('Title,Description are Required',400))
    }
    // if (req.user.role !== 'student') {
    //     return res.status(403).send('Only students can post doubts.');
    // }

    await Doubt.PostDoubt(title,description,userId);
    res.status(200).json({success:true,message:"Doubt posted Successfully"});
    }
    catch(e){
        return next(new AppError(e.message,500))   
    }
});


router.post('/upload', isLoggedIn,upload.single('pdf'),async (req, res,next) => {
    
    let publicURL='dk'
    let secureUrl='cloudinary://378171611453713:jar_yV68UrVNSKbFbxleqoBxKJQ@dix9kn7zm'

    
    if(req.file){
        
        try{
             const result= await cloudinary.uploader.upload(req.file.path, { resource_type: "raw" }, function(error, result) {
                if (result) {
                //   console.log("PDF URL:", result.url);
                } else {
                //   console.log("Error:", error);
                }
              });

            // console.log('res',result);
            // try
            if(result){
                publicURL=result.public_id
                secureUrl=result.secure_url    
                // console.log("URL IMAGE",result.secure_url);

                // remove file from local system/server
                // fs.rm(`uploads/${req.file.filename}`)

            }
        }catch(e){
            // return next(
            //     new AppError(e.message || 'File not uploaded,please try again',500)
            // )
            res.status(500).json({success:false,message:e.message});
        }
    }
    const obj={
        public_url:publicURL,
        secure_url:secureUrl   
    }
    console.log('fkddkffdfdfdfdfdfdfd00',req.body);
    console.log('user',req.user);
    
    const { subject,description,year,branch } = req.body;
    if(!subject || !description || !year || !branch){
      return next(new AppError("All the fields are mandatory.",500))   
    }

    await Doubt.UploadResources(req.user.id, secureUrl, subject,description,year,branch);
    res.status(200).json({success:true,message:"Resources uploaded Successfully",url:secureUrl});
  });



  router.post('/uploadBook',isLoggedIn, upload.single('bookFile'), async (req, res,next) => {
    try {
      const { subjectName, bookName,year } = req.body;
        console.log('user is',req.user);
        
      // Check if all fields are provided
      if (!subjectName  || !bookName || !year || !req.file) {
        return res.status(400).json({ message: 'All fields are required.' });
      }
      if(req.user.role!="teacher")  return next(new AppError ("Not Allowed To Upload The Books."))
      // Upload the file to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'books'
      });
  
      // Prepare response data
      const uploadData = {
        subjectName,
        year,
        uploaderName:req.user.name,
        bookName,
        secureUrl: result.secure_url,
        cloudinaryId: result.public_id
      };
      await Doubt.UploadBook(uploadData)
      res.status(200).json({ message: 'File uploaded successfully!', data: uploadData });
    } catch (error) {
      console.error('Error uploading file:', error);
      res.status(500).json({ message: 'File upload failed.', error: error.message });
    }
  });


  router.get("/allBooks",isLoggedIn,async (req, res, next) => {
    try {
      const books = await Doubt.GetAllBooks(); // Fetch all books from the DB
  
      if (!books || books.length === 0) {
        return next(new AppError('No books found', 404));
      }
  
      res.status(200).json({
        success: true,
        message: 'Books retrieved successfully',
        data: books,
      });
    } catch (err) {
      return next(new AppError(err.message, 500));
    }
  });



  router.get("/allNotes",isLoggedIn,async (req, res, next) => {
    try {
      const Notes = await Doubt.GetAllNotes(); // Fetch all books from the DB
  
      if (!Notes || Notes.length === 0) {
        return next(new AppError('No books found', 404));
      }
  
      res.status(200).json({
        success: true,
        message: 'Notes retrieved successfully',
        data: Notes,
      });
    } catch (err) {
      return next(new AppError(err.message, 500));
    }
  });



  router.get("/allNotes",isLoggedIn,async (req, res, next) => {
    try {
      const Notes = await Doubt.GetAllNotes(); // Fetch all books from the DB
  
      if (!Notes || Notes.length === 0) {
        return next(new AppError('No books found', 404));
      }
  
      res.status(200).json({
        success: true,
        message: 'Notes retrieved successfully',
        data: Notes,
      });
    } catch (err) {
      return next(new AppError(err.message, 500));
    }
  });
  router.get('/Getpdf', isLoggedIn,async (req, res) => {
    
    console.log('insode');
    
    const result=await Doubt.GetResources();
    console.log(result);
    
    res.status(200).json({success:true,data:result});
  });  


router.get("/allPYQ",isLoggedIn,async (req, res, next) => {
    try {
      const PYQ = await Doubt.GetAllPaper(); // Fetch all books from the DB
  
      if (!PYQ || PYQ.length === 0) {
        return next(new AppError('No books found', 404));
      }
  
      res.status(200).json({
        success: true,
        message: 'Paper retrieved successfully',
        data: PYQ,
      });
    } catch (err) {
      return next(new AppError(err.message, 500));
    }
  });
  router.get('/Getpdf', isLoggedIn,async (req, res) => {
    
    console.log('insode');
    
    const result=await Doubt.GetResources();
    console.log(result);
    
    res.status(200).json({success:true,data:result});
  });

// Answer a Doubt (Only teachers)
router.post('/:id/answer',isLoggedIn,async(req, res,next) => {
    try{
        const doubtId = req.params.id;
    const { answer } = req.body;
    const Id = req.user;

    console.log('user',req.user);
    
    const result=await Doubt.SolveDoubt(doubtId,answer,Id)
    res.status(200).json({success:true,message:"Answer posted Successfully",result});
    }
    catch(e){
        return next(new AppError(e.message,500)) 
    }
});

router.get('/answer/:id',async(req,res)=>{
    // to get all the answers of particular doubt
    const doubtId=req.params.id
    const result=await Doubt.GetAnswers(doubtId)
    res.status(200).json({
        success:true,
        message:'All Answers',
        result
    })
})



router.post('/uploadPaper',isLoggedIn, upload.single('questionPaper'), async (req, res) => {
    try {
      const { subjectName, year,branch,paperYear } = req.body;
  
      // Check if all fields are provided
      if (!subjectName || !year || !paperYear || !branch || !req.file) {
        return res.status(400).json({ message: 'All fields are required.' });
      }
      if(req.user.role!="teacher")  return next(new AppError ("Not Allowed To Upload The Books."))
      // Upload the file to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'question-papers'
      });
  
      // Prepare response data
      const uploadData = {
        subjectName,
        year,
        paperYear,
        branch,
        cloudinaryUrl: result.secure_url,
        cloudinaryId: result.public_id
      };
  
      // TODO: Save uploadData to the database here (MySQL)
      await Doubt.UploadPaper(uploadData)
      // Save to the database function goes here
  
      res.status(200).json({ message: 'Question paper uploaded successfully!', data: uploadData });
    } catch (error) {
      console.error('Error uploading file:', error);
      res.status(500).json({ message: 'File upload failed.', error: error.message });
    }
  });

 export default router;
