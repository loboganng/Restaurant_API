import { Request, Response, NextFunction } from "express"
import { knex } from "@/database/knex.js"
import { z } from "zod";


//Creating controller class to manage use cases
class ProductController {
  //Function to add index to class
  async index(request: Request, response: Response, next: NextFunction){
    try {
      const { name } = request.query

      const products = await knex<ProductRepository>("products")
        .select()
        .whereLike("name", `%${name ?? ""}%`) //If find a name, use name, else, use empty string
        .orderBy("name")

      return response.json(products)
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

      // await knex("products").insert({ name, price })

      // Utilizing knex with type of our custom class, to avoid inserting
      // wrong types of data into the database
      await knex<ProductRepository>("products").insert({ name, price })

      return response.status(201).json("Product inserted!")
    } 
    catch (error) {
      next(error)
    }
  }
}

export { ProductController }