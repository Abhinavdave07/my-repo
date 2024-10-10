import express from 'express'
import cors from 'cors'
import cookieParser  from 'cookie-parser'
import morgan from 'morgan';
// import userRoutes from './Routes/userRoutes.js'
import userRoutes from './Routes/userRoutes.js'
import errorMiddleware from './middleware/error.middleware.js';
const app=express()
import doubtRoutes  from './Controller/Doubtcontroller.js';

// Enable CORS for all routes
app.use((req, res, next) => {

    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

    next();
});
// for parsing to json data directly
app.use(express.json());
app.use(express.urlencoded({extended:true}))        //it will extract out the query params from url
app.use(morgan('dev'))  //morgan will track all the access point or to which url the request made at localhost and it will print it in terminal 
app.use(cors({
    // frntend ka url will be different thatswhy by using cors we can interact with frontend page
    origin:[process.env.FRONTEND_URL],
    // credential used because cookie can be navigate from from different localhost
    credentials:true
}));
// cookie parser is udes to get the directly token which is used in isLoggedin method used in auth middleware
// for parsing the token
app.use(cookieParser()) //by using cookie parrser token can be extracted easily that is used in auth.middleware.js
// app.use(exp)
app.use('/ping',function(req,res){
    res.send('/pong')
})

app.use('/api',userRoutes)
app.use('/doubts',doubtRoutes)
app.all('*',(req,res)=>{
    res.status(404).send('OOPS!!! 404 page not found')
})
// error will be send to user
app.use(errorMiddleware)
export default app