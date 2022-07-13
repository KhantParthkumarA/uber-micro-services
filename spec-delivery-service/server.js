import express from 'express';
import middlewares from './app/routes/middleware';
import routes from './app/routes';
import connectDB from './app/config/db';

connectDB();
const app = express();
middlewares(app);
routes(app);

(async()=>{
    try {
        app.listen(process.env.PORT, (err)=>{
            if(err){
                console.log("Server Connection Failed");
                throw err;
            }
            console.log(`Database Established to port ${process.env.PORT}`);
        });
    } catch (err) {
        console.log("Database Connection Error");
        throw err;
    }
})();