import { Router } from "express";

import { productsRoutes } from "./products-routes.js";

//Listing the index of all the routes

const routes = Router()
routes.use("/products", productsRoutes)

export { routes }