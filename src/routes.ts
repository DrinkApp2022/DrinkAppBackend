import { Router } from 'express'
import { ProductController, UserController } from './controllers'
// import {isAdmin} from './middlewares/isAdmin'

const router = Router()
const prefix = '/api'

const productController = new ProductController()
const usersController = new UserController()

// GET REQUESTS
router.get(prefix.concat('/users'), usersController.list)
router.get(prefix.concat('/products'), productController.list)

// POST REQUESTS
router.post(prefix.concat('/users'), usersController.insert)
router.post(prefix.concat('/auth/login'), usersController.login)
router.post(prefix.concat('/products'), productController.insert)

export { router }