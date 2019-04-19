const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User');

// Login Page
router.get('/login', (req, res) => {
	res.render('login');
});

// Register Page
router.get('/register', (req, res) => {
	res.render('register');
});

// Register Handle
router.post('/register', (req, res) => {
	const { name, email, password, password2 } = req.body;

	let errors = [];

	// Ceck required fields
	if ( !name || !email || !password || !password2) {
		errors.push({msg: 'Please fill in all fields'});
	}

	// Check passwords matchs
	if (password !== password2) {
		errors.push({msg: 'Passowrds do not match'});
	}

	// Check pass length
	if (password.length < 6 ) {
		errors.push({msg: 'Passowrd shoudl be at least 6 characters'});
	}

	if (errors.length > 0) {
		res.render('register', {
			errors,
			name,
			email,
			password,
			password2
		});
	}else {

		// Validation pass
		User.findOne({email: email})
			.then(user => {
				if (user) {
					errors.push({msg: 'Email already in used'});

					// User exists
					res.render('register', {
						errors,
						name,
						email,
						password,
						password2
					});
				}else {
					const NewUser = new User({
						name,
						email,
						password
					});

					// Hash Password
					bcrypt.genSalt(10, (err, salt) => bcrypt.hash(NewUser.password, salt, (err, hash) => {
						if (err) throw err;

						// Set password to hash
						NewUser.password = hash;

						// Save user
						NewUser.save()
							.then(user => {
								req.flash('success_msg', 'You are now register and can log in');
								res.redirect('/users/login');
							})
							.catch(err => console.log(err));
					}));
				}
			});
	}
});

// Login Handle
router.post('/login', (req, res, next) => {
	passport.authenticate('local', {
		successRedirect: '/dashboard',
		failureRedirect: '/users/login',
		failureFlash: true
	})(req, res, next);
});

// Logout handle
router.get('/logout', (req, res) => {
	req.logout();
	req.flash('success_msg', 'You are logged out');
	res.redirect('/users/login');
});

module.exports = router;