const express=require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl ,isLoggedIn } = require("../middleware.js");
const userController = require("../controllers/users.js")

router
    .route("/signup")
    .get(userController.renderSignupForm)
    .post(wrapAsync(userController.signup))

router
    .route("/login")
    .get(userController.renderLoginForm)
    .post(saveRedirectUrl, passport.authenticate("local",{failureRedirect:"/login", failureFlash: true}),userController.login);

router.get(
    "/change-password",
    isLoggedIn,
    userController.renderChangePasswordForm
);

router.post(
    "/change-password",
    isLoggedIn,
    wrapAsync(userController.changePassword)
);

router.get("/profile", isLoggedIn, wrapAsync(userController.profile));

router.get("/logout",userController.logout);

router.delete("/profile", isLoggedIn, wrapAsync(userController.deleteProfile));

module.exports=router;