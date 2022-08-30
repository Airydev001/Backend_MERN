const express = require("express");
const bodyParser = require("body-parser");
const placesRoutes = require('./route/places-route')
const userRoutes = require('./route/user-route');
const httpError = require('./models/http-error');
const app = express();

//app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())

//app.use("/api/user",userRoutes)
app.use("/api/places",placesRoutes);

app.use('/api/users',userRoutes);
//Error handling middleware properties for Api communication

app.use((req,res,next)=>{
  
const error = new httpError ("Couldn't find the route");
throw error;

})

app.use((error,req,res,next)=>{
    if(res.headerSent){
        return next(error)
    } 
    res.status(error.code || 500)
    res.json({message:error.message || 'An unknown error Occured'})
})



app.listen(4100,()=>{
    console.log("Connected to  the network at 4100");
})