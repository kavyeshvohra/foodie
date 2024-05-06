import express from 'express'
import {checkUser, loginUser, registerUser} from '../controllers/userController.js'

const userRouter = express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.post('/verify',checkUser)

export default userRouter;