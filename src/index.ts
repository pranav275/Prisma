import express from 'express';
import cookieParser from 'cookie-parser';
import Userrouter from "./routes/userRoutes";
import Postrouter from "./routes/postRoutes"

const app = express();
const port = 3000;



app.use(express.json());
app.use(express.urlencoded({extended : true}))
app.use(cookieParser());

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Hello, Express with TypeScript!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use('/api/v1',Userrouter);
app.use('/api/v1',Postrouter);