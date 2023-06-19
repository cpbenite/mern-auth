import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import userRoutes from './routes/userRoutes.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import connectDb from './config/db.js';

connectDb();

const port = process.env.PORT || 5000;

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/users', userRoutes)

app.get("/", (req, res) => {
  res.send('Server is ready')
})  

app.use(notFound);
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server started on ${port}`)
})