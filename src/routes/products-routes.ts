//Importing dependencies
import { Router } from "express"
import { ProductController } from "@/controllers/products-controller.js"

//Injecting router and controller into a const
const productsRoutes = Router()
const productsController = new ProductController()

//Defining get method
productsRoutes.get("/", productsController.index)

export { productsRoutes }