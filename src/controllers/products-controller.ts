import { Request, Response, NextFunction } from "express"
import { knex } from "@/database/knex.js"
import { z } from "zod";


//Creating controller class to manage use cases
class ProductController {
  //Function to add index to class
  async index(request: Request, response: Response, next: NextFunction){
    try {

      return response.json({ message: "ok"})
    } catch (error) {
      next(error);
    }
  }

  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        name: z.string({ required_error: "Name is a required field."}).trim().min(6),
        price: z.number().gt(0, { message: "Number must be greater than $0."})
      })

      const { name, price } = bodySchema.parse(request.body)

      await knex("products").insert({ })

      return response.status(201).json({ name, price})
    } 
    catch (error) {
      next(error)
    }
  }
}

export { ProductController }