const axios = require("axios");
const httpError = require("../models/http-error");
const API_KEY = "AIzaSyAQLNTQ4l_CBz0q31MtbhbqZJMoEI87iYw";


 async function getCoordsForAddress (address){
   //return {
    //lat: 40.7484474,
    //lng: -73.9871516
   //}
   const response  = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`)

   const data = response.data

   if(!data || data.status ==="ZERO_RESULTS"){
   const error = new httpError("could not found location for the spedcified address",422);
   throw error 
   }

   const coordinates = data.results[0].geometry.location;
   return coordinates 

}

//install axios module
//Get API_KEY
//from google geocoding 
module.exports =getCoordsForAddress;