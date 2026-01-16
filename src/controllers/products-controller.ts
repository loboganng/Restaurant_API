import { Request, Response, NextFunction } from "express"


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
}

export { ProductController }