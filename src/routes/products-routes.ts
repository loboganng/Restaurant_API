//Importing dependencies
import { Router } from "express"
import { ProductController } from "@/controllers/products-controller.js"

//Injecting router and controller into a const
const productsRoutes = Router()
const productsController = new ProductController()

//GET
productsRoutes.get("/", productsController.index)

//POST
productsRoutes.post("/", productsController.create)

export { productsRoutes }