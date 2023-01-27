const express = require("express");

const {
    signUpView,
    loginView,
    passwordReminderView,
    otpView,
    signUpUser,
    loginUser,
    logoutUser,
    passwordReminder,
    otpVerify
} = require("../controllers/loginController");
const { 
    homeView, 
    profileView,
    adashView,
    usersView,


} = require("../controllers/dashboardController");

const router = express.Router();

router.get("/", loginView);

router.get("/signup", signUpView);
router.get("/passwd", passwordReminderView);
router.get("/logout", logoutUser);
router.get("/otp", otpView);

router.post("/signup", signUpUser);
router.post("/passwd", passwordReminder);
router.post("/auth", loginUser);
router.post("/otp", otpVerify);

router.get("/home", homeView);
router.get("/profile", profileView);
router.get("/adash", adashView);
router.get("/umanager", usersView);



module.exports = router;