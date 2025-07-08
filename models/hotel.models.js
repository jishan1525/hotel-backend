const mongoose = require("mongoose")
const hotelSchema = mongoose.Schema({
   name: {
    type:String,
    required:true
   },
   location: {
    type:String,
    required:true
   },
   phoneNumber: {
    type:String,
    required:true
   },
   checkInTime: {
    type:String,
    required:true
   },
   checkOutTime: {
    type:String,
    required:true
   },
   rating: {
    type:Number,
    min:0,
    max:5,
    
   },
   reviews: [{
    type: String
}],
website: {
    type: String
},
   category: [{
    type: String,
    required: true,
    enum: ['Budget', 'Mid-Range', 'Luxury', 'Boutique', 'Resort','Other']
   }],
   priceRange: {
    type: String,
    enum: ['$$ (11-30)', '$$$ (31-60)', '$$$$ (61+)', 'Other']
},
   amenities: [{
    type: String
   }],
   photos: [{
    type: String
   }],
   reservationsNeeded:{
    type:Boolean,
    default:false
   },
   isParkingAvailable:{
    type:Boolean,
    default:false
   },
   isWifiAvailable:{
    type:Boolean,
    default:false
   },
   isPoolAvailable:{
    type:Boolean,
    default:false
   },
   isSpaAvailable:{
    type:Boolean,
    default:false
   },
   isRestaurantAvailable:{
    type:Boolean,
    default:false
   },

},{
    timestamps:true
})

const Hotel = mongoose.model("Hotel", hotelSchema)

module.exports = Hotel;