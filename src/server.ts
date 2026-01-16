//Importing dependencies
import express from "express"
import { routes } from "./routes/index.js"
import { errorHandling } from "./middlewares/error-handling.js"

//Creating const for the port and express
const PORT = 3333
const app = express()

//Using routes
app.use(express.json())
app.use(routes)

app.use(errorHandling)

//Listening to server on PORT (3333)
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));