const mongoose = require("mongoose");
require("dotenv").config();
const fs = require("fs");
const express = require("express");
const { initializeDatabase } = require("./db/db.connect");
const cors = require("cors");

const HotelModel = require("./models/hotel.models");
const Hotel = require("./models/hotel.models");

const app = express();


initializeDatabase();


app.use(express.json());
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

async function getAllHotel(){
    try {
        const allHotel=await HotelModel.find();
        return allHotel;
    } catch (error) {
        throw error
    }
}

async function createHotel(newHotel){
    try {
        const hotel= new Hotel(newHotel)
        const savedHotel =await hotel.save();
        return savedHotel;
        
    } catch (error) {
        throw error;
    }
}

app.post("/hotel", async(req,res)=>{
    try {
        const savedHotel = await createHotel(req.body)
        res.status(201).json({
            message:"Hotel added successfully.",
            hotel:savedHotel
        });
        
    } catch (error) {
        res.status(500).json({error})
    }
})

app.get("/hotels",async(req,res)=>{

    try {
    const hotelList = await getAllHotel();
    if(hotelList.length!=0){
        res.json(hotelList);
    }   else{
        res.status(401).json({ error: "No hotel found" });
    } 
    } catch (error) {
        res.status(404).json({ error: "Unable to fetch Data" });
    }
})

async function getHotelByName(hotelName){
    try {
        const hotelResult = await HotelModel.findOne({name:hotelName})
        return hotelResult
        
    } catch (error) {
        throw error
    }
}
app.get("/hotels/:hotelName",async(req,res)=>{
    try {
        const hotelData = await getHotelByName(req.params.hotelName)
        if(hotelData){
            res.json(hotelData)
        }else{
             res.status(401).json({ error: "No hotel found" });
        }
    } catch (error) {
         res.status(404).json({ error: "Unable to fetch Data" });
    }
})

async function getHotelByPhoneNumber(resPhoneNumber){
    try {
        const hotelResult = await HotelModel.findOne({phoneNumber:resPhoneNumber})
        return hotelResult
    } catch (error) {
        throw error
    }
}
app.get("/hotels/directory/:phoneNumber",async(req,res)=>{
    try {
        const hotel= await getHotelByPhoneNumber(req.params.phoneNumber)
        if(hotel){
            res.json(hotel)
        }else{
             res.status(401).json({ error: "No hotel found" });
        }
    } catch (error) {
        res.status(404).json({ error: "Unable to fetch Data" });
    }
})

async function getHotelByRating(resHotelRating){
    try {
        const hotelResult = await HotelModel.findOne({rating:resHotelRating})
        return hotelResult
    } catch (error) {
        throw error
    }
}
app.get("/hotels/rating/:hotelRating",async(req,res)=>{
    try {
        const hotel= await getHotelByRating(req.params.hotelRating)
        if(hotel){
            res.json(hotel)
        }else{
             res.status(401).json({ error: "No hotel found" });
        }
    } catch (error) {
        res.status(404).json({ error: "Unable to fetch Data" });
    }
})

async function getHotelByCategory(resHotelCategory){
    try {
        const hotelResult = await HotelModel.findOne({category:resHotelCategory})
        return hotelResult
    } catch (error) {
        throw error
    }
}
app.get("/hotels/category/:hotelCategory",async(req,res)=>{
    try {
        const hotel= await getHotelByCategory(req.params.hotelCategory)
        console.log(JSON.stringify(req.params.hotelCategory))
        if(hotel){
            res.json(hotel)
        }else{
             res.status(401).json({ error: "No hotel found" });
        }
    } catch (error) {
        res.status(404).json({ error: "Unable to fetch Data" });
    }
})

async function deleteHotel(hotelId){
    try {
        const deletedHotel = await HotelModel.findByIdAndDelete(hotelId)
        return deletedHotel
    } catch (error) {
        error
    }
}
app.delete("/hotel/:hotelId",async(req,res)=>{
    try {
        const deletedRes = await deleteHotel(req.params.hotelId)
        res.status(200).json({message:"Hotel deleted successfully."})
    } catch (error) {
             res.status(500).json({ error: "Unable to fetch Data" });
    }
})

async function updateHotel(hotelId,updatedHotelData){
    try {
        const updatedHotel=await HotelModel.findByIdAndUpdate(hotelId,updatedHotelData,{
            new:true
        })
        return updatedHotel
    } catch (error) {
        throw error
    }
}

app.post("/hotel/:hotelId",async(req,res)=>{
    try {
        const updatedData = await updateHotel(req.params.hotelId,req.body)
        if(updatedData){
             res.status(200).json({message:"Data updated Successfully",updatedData:updatedData})
        }
        else{
            res.status(404).json({error:"Unable to update"})
        }
    } catch (error) {
        res.status(500).json({ error: "Unable to fetch Data" });
    }
})
//683f519c8c225283ec4d9790

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

