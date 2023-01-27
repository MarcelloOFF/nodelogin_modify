const path = require('path');
const config = require('config');
const User = require("../models/User");
const mail = require("./mailController.js")

// wyswietla strone logowania
const loginView = (req, res) => {
	res.sendFile(path.join(__dirname + '/../views/login.html'));
};

// obsluguje logike logowania
const loginUser = (req, res) => {
	const {username, password} = req.body;

	// Ensure the input fields exists and are not empty
	if (!username || !password) {
		res.send('Please enter username and password! Try to <a href="/" class="text signup-link">Login</a> again');
	}

	User.findOne({ name: username }).then((user) => {
		if (user && user.password === password) {
			// send OTP
			const otp = generateOTP();
			req.session.username = username;
			req.session.isAdmin = user.isAdmin();
			req.session.otp = otp;
			const msg = `<h3>Dear <b>${username}</b>, here's your one time password: </h3><p><h1>${otp}</h1></p>`;
			mail.sendEmail(user.email, "otp code", msg);
			// Redirect to otp page
			res.redirect('/otp');
			//req.session.loggedin = true;
		    //res.redirect('/home');
		} else {
			res.send('Incorrect Username and/or Password! Try to <a href="/" class="text signup-link">Login</a> again');
		}
	});
};

// wyswietla strone do rejestracji
const signUpView = (req, res) => {
	res.sendFile(path.join(__dirname + '/../views/signup.html'));
};

// obsluguje logike rejestracji
const signUpUser = (req, res) => {
	
	const {username, email, password, confirm} = req.body;

	// Ensure the input fields exists and are not empty
	if (!username || !email || !password || !confirm) {
		res.send('Please enter username, email and password!');
	}

	if(password !== confirm) {
		res.send(`Passwords don't match!`);
	}
	else {
		User.findOne({ email: email }).then((user) => {
			if (user) {
				res.send(`Username already exists! Try to <a href="/" class="text signup-link">Login</a>`);
			} else {
			    const newUser = new User({
				    name: username,
				    email: email,
				    password: password,
			    });
			
				newUser
					.save()
					.then(res.send(`Usear has been succesfully created. Try to <a href="/" class="text signup-link">Login</a>`))
					.catch((err) => console.log(err));
			}
		});			
	}
};

// wyswietla strone do przypomnienia hasla
const passwordReminderView = (req, res) => {
	res.sendFile(path.join(__dirname + '/../views/password.html'));
};

// obsluguje logike przypomnienia hasla
const passwordReminder = (req, res) => {
	const {username, email } = req.body;

	// Ensure the input fields exists and are not empty
	if (!username || !email ) {
		res.send('Please enter username, email!');
	}
	
	User.findOne({ email: email }).then((user) => {
		if (user && user.name === username) {
			let password = user.password;
            const msg = `<h3>Dear <b>${username}</b>, here's your current password: </h3><p><h1>${password}</h1></p>`;
            mail.sendEmail(email, "password reminder", msg)
			res.send(`Check your email and try to <a href="/" class="text signup-link">Login</a> again`);
		} else {
			res.send('Incorrect Username and/or email!');
		}
	});
};

// obsluguje logike wylogowania uzytkownika
const logoutUser = (req, res, next) => {
    if (req.session.loggedin) {
          req.session.loggedin = false;
    }
    res.redirect('/');
};

// wyswietla strone logowania otp
const otpView = (req, res) => {
	res.sendFile(path.join(__dirname + '/../views/otp.html'));
};

// obsluguje logike przypomnienia hasla
const otpVerify = (req, res) => {
	const {number1, number2, number3, number4 } = req.body;

	// Ensure the input fields exists and are not empty
	if (!number1 || !number2 || !number3 || !number4 ) {
		res.send('Please enter valid OTP!');
	}
	
	const otp = number1+number2+number3+number4;
	if (otp === req.session.otp) {
		// Authenticate the user
		req.session.loggedin = true;
		res.redirect('/home');
	} else {
		res.sendFile(path.join(__dirname + '/../views/otp.html'));
	}
};

function generateOTP(len=4) {
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < len; i++ ) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}

module.exports = {
    signUpView,
    loginView,
    passwordReminderView,
	otpView,
    signUpUser,
    loginUser,
    logoutUser,
    passwordReminder,
	otpVerify
};