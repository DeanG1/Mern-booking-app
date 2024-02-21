import express,{Request, Response} from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

mongoose.connect("mongodb+srv://admin:<password>@mern-booking-app-db.dftjwoz.mongodb.net/?retryWrites=true&w=majority" as string)
    .then(()=> console.log("connected to db"))
    .catch((err)=> console.log(err))

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cors());

app.get("/api/test", async(req: Request, res: Response) => {
    res.json({message:"hello from express endpoint!"});
})

app.listen(7001, ()=>{
    console.log("server is listening on port 7001");
})