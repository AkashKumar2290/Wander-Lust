const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const User = require("../models/user.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function main() {
    await mongoose.connect(MONGO_URL);
}

main()
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((err) => {
        console.log("MongoDB connection error:", err);
    });


const initDB = async () => {
    await Listing.deleteMany({});
    const owner = await User.findOne();
    if (!owner) {
        console.log("No user found! Signup a user first.");
        return;
    }
    initData.data = initData.data.map((obj) => ({ ...obj, owner: owner._id }));
    await Listing.insertMany(initData.data);
    console.log("Data was initialized");
};

// const initDB= async()=>{
//     await Listing.deleteMany({});
//     initData.data = initData.data.map((obj)=>({...obj,owner:"6a76a9c61f9a221ee39fdaa1"}));
//     await Listing.insertMany(initData.data);
//     console.log("Data was initialized");
// }

initDB();