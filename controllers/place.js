const HttpError = require('../models/http-error');
const getCoordsForAddress = require("../util/location")
const {validationResult} = require("express-validator")
let dummyPlaces = [
    {
        id:"p1",
        title:"Empire State Building",
        description:'One of the most famous sky scrappers in the world!',
        location:{
            lat: 40.7484474,
            lng: -73.9871516
        },
        address: '20 W 34th St, New York, NY 10001',
        creator:{
            
                    _id:"8989998rt",
                    name:"Mr dewunmi Rokeeb",
                    email:"Dewunmi@gmail.com",
                    place:"texas"
        },
            
        }
    
]
 const getByPlaceId = (req,res)=>{
    const placeId = req.params.pid;
 //console.log(typeof(placeId))
    const place = dummyPlaces.find(p =>{
     return p.id ===placeId;
    })
   
     if(!place){
        throw new HttpError('Could not find a place for the provided id',404); //This won't run the next function
     }
     res.json({
         // message:"It's connected"
      place // => {place} = {place:place}
      });
      }
const getByUsersId = (req,res)=>{
    const userId = req.params.uid;

    const userDatas = dummyPlaces.find(u=>{
        return u.creator._id === userId;
    });
    if(!userDatas || userDatas.length === 0){
        //const error = new Error("Could not find a place for the user provided id.")
      //error.code = 404;
      return new HttpError("Couldn't find a user in the user provided id",404);
       //return next(error); or used the models to avoid repeated patterns
    }
    res.json({userDatas});
   

}
const createPlace = async (req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        next(new HttpError("Invalid input please check your data",422));
    }
    
    const {id,title,description,address,creator} = req.body;
    let coordinates ;
    try {
       coordinates = await getCoordsForAddress(address);
//in async we don't throw function instead use next()
    } catch(error){
return next(error)
    }
    const newcreatedPlace = {
        id,
        title,
        description,
        location:coordinates,
        address,
        user:creator,

    }
dummyPlaces.push(newcreatedPlace);
res.status(201).json({
    place:newcreatedPlace
})    
}
const updatedPlace = (req,res,next)=>{
 //the part that we will want to change 

 const errors = validationResult(req);
 if(!errors.isEmpty()){
     throw new HttpError("Invalid input please check your data",422)
 }
 
 const {title,description}= req.body;
 const placeId = req.params.pid;


const updatedPlace = {...dummyPlaces.find(p => p.id === placeId)};
const placeIndex = dummyPlaces.findIndex(p => p.id ===placeId );
updatedPlace.title = title
updatedPlace.description = description
dummyPlaces[placeIndex]=updatedPlace;

res.status(200).json({
    place:updatedPlace
})
    
    //updatedPlace
    //placeIndex
}

const deleteById = (req,res,next)=>{
    const delId = req.params.pid;
   if(!(dummyPlaces.find(p=>p.id === delId))){
    throw new HttpError("Couldn't find a for that id.",404);
   }
   
    dummyPlaces = dummyPlaces.find(p => p.id !== delId);

    res.status(200).json({
        deleteMessage:"Successfully deleted"
    })
}
exports.getByPlaceId = getByPlaceId;
exports.getByUsersId = getByUsersId;
exports.createPlace = createPlace;
exports.updatedPlace = updatedPlace;
exports.deleteById = deleteById;