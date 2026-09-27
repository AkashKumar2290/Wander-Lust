const User = require("../models/user.js");
const Listing = require("../models/listing.js");

module.exports.renderSignupForm =(req,res)=>{
    res.render("users/signup.ejs");
}

module.exports.profile = async (req, res) => {

    const listings = await Listing.find({
        owner: req.user._id
    });

    res.render("users/profile.ejs", {
        user: req.user,
        listings
    });
};

module.exports.signup =async(req,res)=>{
    try{
        let {username,email,password}=req.body;
        const newUser = new User({email,username});
        const registeredUser = await User.register(newUser,password);
        // console.log(registeredUser);
        req.login(registeredUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success","Welcome to WanderLust!");
            res.redirect("/listings");
        })
    } catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }   
}

module.exports.renderLoginForm = (req,res)=>{
    res.render("users/login.ejs");
}

module.exports.login = async(req,res)=>{
    req.flash("success","Welcome back to WanderLust!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}

// Render Change Password Form
module.exports.renderChangePasswordForm = (req, res) => {
    res.render("users/changePassword.ejs");
};


// Change Password
module.exports.changePassword = async (req, res) => {
    try {
        let { currentPassword, newPassword, confirmPassword } = req.body;

        if (newPassword !== confirmPassword) {
            req.flash("error", "New password and confirm password do not match!");
            return res.redirect("/change-password");
        }

        let user = await User.findById(req.user._id);

        await user.changePassword(currentPassword, newPassword);

        req.flash("success", "Password changed successfully!");
        res.redirect("/listings");

    } catch (e) {
        req.flash("error", "Current password is incorrect!");
        res.redirect("/change-password");
    }
};

module.exports.logout = (req, res) => {

    req.logout((err) => {

        if (err) {
            return next(err);
        }

        req.flash("success", "You are logged out!");
        res.redirect("/listings");

    });

};

module.exports.deleteProfile = async (req, res) => {
    try {
        const userId = req.user._id;


        const listings = await Listing.find({ owner: userId });

        const Review = require("../models/review.js");

        for (let listing of listings) {
            await Review.deleteMany({
                _id: { $in: listing.reviews }
            });
        }


        await Listing.deleteMany({ owner: userId });


        await User.findByIdAndDelete(userId);

        // Logout user
        req.logout((err) => {
            if (err) {
                return res.redirect("/listings");
            }

            req.flash("success", "Your profile and all your listings have been deleted.");
            res.redirect("/listings");
        });

    } catch (e) {
        console.log(e);
        req.flash("error", "Unable to delete your profile.");
        res.redirect("/profile");
    }
};