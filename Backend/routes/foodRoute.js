import express from 'express'
import { addFood, listFood, removeFood } from '../controllers/foodController.js'
import multer from 'multer'

const foodRouter = express.Router();

//Image Store Engine

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"uploads")
    },
    filename:(req,file,cb)=>{
        const modifiedName = `${Date.now()}${file.originalname}`.replace(/\s/g, '_');
        return cb(null, modifiedName);
    }
})


const upload = multer({storage:storage});

foodRouter.post("/add",upload.array('img',4),addFood);
foodRouter.get("/list", listFood);
foodRouter.delete("/remove",removeFood)
export default foodRouter;