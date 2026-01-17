import { Request, Response, NextFunction } from "express"
import { AppError } from "@/utils/AppError.js";
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

  async update(request: Request, response: Response, next: NextFunction){
    try {
      //Validate to number
      const id = z
        .string()
        .transform((value) => Number(value))
        .refine((value) => !isNaN(value), {message: "ID must be a number"})
        .parse(request.params.id)

      //Validate request.body
      const bodySchema = z.object({
        name: z.string({ required_error: "Name is a required field."}).trim().min(6),
        price: z.number().gt(0, { message: "Number must be greater than $0."})
      })

      const { name, price } = bodySchema.parse(request.body)

      const product = await knex<ProductRepository>("products")
        .select()
        .where({ id })
        .first()

        if (!product) {
          throw new AppError("Product not found")
        }

      await knex<ProductRepository>("products").update({ name, price, updated_at: knex.fn.now() }).where({ id })

      return response.json({ message: "Updated"})
    } catch (error) {
      next(error)
    }
  }

  async remove(request: Request, response: Response, next: NextFunction){
    try {
      //Validating the ID of the product
        const id = z
          .string()
          .transform((value) => Number(value))
          .refine((value) => !isNaN(value), {message: "ID must be a number"})
          .parse(request.params.id)

          //Validating if the product exists in the database
          const product = await knex<ProductRepository>("products")
            .select() //Return an array
            .where({ id })
            .first()  //Select only the first item

            if (!product) {
              throw new AppError("Product not found")
            }

          //Removing product
          await knex<ProductRepository>("products")
            .delete()
            .where({id})

          return response.json("Product removed successfully")
    } catch (error) {
      next(error)
    }
  }
}

export { ProductController }