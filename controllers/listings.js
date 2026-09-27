const Listing = require("../models/listing.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });
const defaultImage =
    "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60";

// stylesService exposes listStyles(), createStyle(), getStyle(), etc.
// module.exports.index = async (req, res) => {
//     const allListings = await Listing.find({});
//     res.render("listings/index.ejs", { allListings });
// }

module.exports.index = async (req, res) => {
    let { location } = req.query;

    let filter = {};

    if (location && location.trim() !== "") {
        filter = {
            $or: [
                {
                    location: {
                        $regex: location.trim(),
                        $options: "i"
                    }
                },
                {
                    country: {
                        $regex: location.trim(),
                        $options: "i"
                    }
                }
            ]
        };
    }

    const allListings = await Listing.find(filter);

    res.render("listings/index.ejs", { allListings });
}

module.exports.renderNewForm = (req, res) => {
    // if(!req.isAuthenticated()){
    //     req.flash("error","you must be logged in to create listing!");
    //     return res.redirect("/login");
    // }
    res.render("listings/new.ejs");
}

module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate({path:"reviews",populate:{
        path:"author",
    },
    }).populate("owner");
    if(!listing){
        req.flash("error","Listing you requested for does not exist!");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
}

// module.exports.createListing = async (req, res ,next) => {
//     let response = await geocodingClient.forwardGeocode({
//     query:req.body.listing.location,
//     limit: 1,
//     })
//     .send();
//     console.log(response.body.features[0].geometry);

//     let url  =req.file.path;
//     let filename = req.file.filename;
//     const newListing = new Listing(req.body.listing);
//     newListing.owner = req.user._id;
//     newListing.image = {url,filename};
//     newListing.geometry = response.body.features[0].geometry; 
//     let savedListing = await newListing.save();
//     console.log(savedListing);
//     req.flash("success","New Listing Created!");
//     res.redirect("/listings");

// }

module.exports.createListing = async (req, res, next) => {
    let response = await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1,
    }).send();

    const newListing = new Listing(req.body.listing);

    newListing.owner = req.user._id;

    // Image priority:
    // 1. Uploaded image
    // 2. Image URL
    // 3. Default image

    if (req.file) {
        newListing.image = {
            url: req.file.path,
            filename: req.file.filename
        };
    } else if (req.body.listing.image && req.body.listing.image.url) {
        newListing.image = {
            url: req.body.listing.image.url,
            filename: "image-url"
        };
    } else {
        newListing.image = {
            url: defaultImage,
            filename: "default-image"
        };
    }

    newListing.geometry = response.body.features[0].geometry;

    await newListing.save();

    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing you requested for does not exist!");
        return res.redirect("/listings");
    }
    let originalImageUrl=listing.image.url;
    originalImageUrl.replace("/upload","/upload/w_250");
    res.render("listings/edit.ejs", { listing,originalImageUrl });
}

// module.exports.updateListing = async (req, res) => {
//     let { id } = req.params;
//     let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

//     if (typeof req.file !== "undefined") {
//         let url = req.file.path;
//         let filename = req.file.filename;
//         listing.image = { url, filename };
//         await listing.save();
//     }

//     req.flash("success", "Listing Updated!");
//     res.redirect(`/listings/${id}`);
// };

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;

    let listing = await Listing.findByIdAndUpdate(
        id,
        { ...req.body.listing },
        { new: true }
    );

    // 🔥 Update coordinates according to new location
    let response = await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1,
    }).send();

    listing.geometry = response.body.features[0].geometry;

    // Image update
    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;

        listing.image = { url, filename };
    }

    await listing.save();

    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing=async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success","Listing Deleted!");
    res.redirect("/listings");
}