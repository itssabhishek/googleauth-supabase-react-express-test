import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import protectedRoutes from './routes/protected';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/protected', protectedRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
