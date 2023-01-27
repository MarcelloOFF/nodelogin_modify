const User = require("../models/User");

// wyswietla strone domowa jesli uzytkownik jest zalogowany
const homeView = (req, res) => {
	
	const username = req.session.username;
	const isAdmin = req.session.isAdmin;

	// wyswietl blad jesli uzytkownik nie jest zalogowany
	if (!username || !req.session.loggedin) {
		res.send('Please login first! <a href="/" class="text signup-link">Login</a>');
	}

	// wszystko ok, wygeneruj strone
	res.render("home", {
		page: 'Home page',
		username: username,
        isAdmin: isAdmin,
	});

};

// wyswietla strone z profilem jesli uzytkownik jest zalogowany
const profileView = (req, res) => {
	
	const username = req.session.username;
	const isAdmin = req.session.isAdmin;
	
	// wyswietl blad jesli uzytkownik nie jest zalogowany
	if (!username || !req.session.loggedin) {
		res.send('Please login first! <a href="/" class="text signup-link">Login</a>');
	}

	User.findOne({ name: username }).then((user) => {
		if (user) {
			// renderuje stronke ze zmiennymi
			res.render("profile", {
				page: 'Profile page',
				username: user.name,
				password: user.password,
				email: user.email,
				date: user.date,
				isAdmin: isAdmin
			  });
		} else {
			res.send('Incorrect Username and/or Password!');
		}
	});
};

// wyswietla strone z dashboard'em jesli uzytkownik ma uprawnienia admina
const adashView = (req, res) => {
	
	const username = req.session.username;
	const isAdmin = req.session.isAdmin;

	// wyswietl blad jesli uzytkownik nie jest zalogowany jako admin
	if (!username || !req.session.loggedin || !isAdmin) {
		res.send('Please login first! <a href="/" class="text signup-link">Login</a>');
	}

	// wszystko ok, wygeneruj strone
	res.render("adash", {
		page: 'Admin dashboard',
		username: username,
        isAdmin: isAdmin,
	});

};
const usersView = (req, res) => {
	
	const username = req.session.username;
	const isAdmin = req.session.isAdmin;

	// wyswietl blad jesli uzytkownik nie jest zalogowany jako admin
	if (!username || !req.session.loggedin || !isAdmin) {
		res.send('Please login first! <a href="/" class="text signup-link">Login</a>');
	}

	// wszystko ok, wygeneruj strone
	res.render("usermanager", {
		page: 'User Manager',
		username: username,
        isAdmin: isAdmin,
	});

};



module.exports = {
	homeView,
    profileView,
	adashView,
	usersView,


};