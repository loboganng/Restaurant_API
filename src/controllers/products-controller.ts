import { Request, Response, NextFunction } from "express"

class ProductController {
  async index(request: Request, response: Response, next: NextFunction){
    try {
      
      return response.json({ message: "ok"})
    } catch (error) {
      next(error);
    }
  }
}

export { ProductController }