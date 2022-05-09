import express from 'express';
import 'dotenv/config';

const router=express.Router();

router.post('/', (req,res,next)=>{
        function generateName(){
            let name='';
            let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            for(let i=0;i<30;i++){
                   name +=chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return name;
        }

        try{
             console.log('req.body',req.body);
             console.log('req.file: ',req.files);
            if(!req.files){
                res.json({msg:'there is no file for upload'});
            }
            else{
                //@ we generate a new name for the file
                //@ to avoid having problems with the original names
                let name = generateName();
                console.log('generatedName ',name);

                let fileInput = req.files.fileInput;
                console.log('fileInput :',fileInput);
                let xExtension = fileInput.name.split('.')[1];
                console.log('xExtension',xExtension);
                //@we try to change the name of the fileInput
                fileInput.name=`${name}.${xExtension}`;
                //we use now the mv() method to place the file in uploads directory
                let uploadPath='./uploads/'+fileInput.name;
                fileInput.mv(uploadPath);
                
                //send response
                res.json({msg:'file uploaded',fileName:fileInput.name});
            }
        }
        catch(err){
                res.status(500).json({error:err}); 
        }
});

export default router;