const express = require('express');
const router = express.Router();
const multer = require('multer');
const sharp = require('sharp');
const db = require('../conf/database');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/img/uploads');
  },
  filename: function (req, file, cb) {
    let fileExt = file.mimetype.split('/')[1];
    cb(null, `${file.fieldname}-${Date.now()}-${Math.round(Math.random() * 1E9)}.${fileExt}`);
  }
});

const upload = multer({ storage: storage });

router.post('/create', upload.single('upload'), function(req, res, next) {
	let uploadedFile = req.file.path;
	let thumbnailName = `thumbnail-${req.file.filename}`;
	let destinationOfThumbnail = `${req.file.destination}/${thumbnailName}`;
	const {title, description} = req.body;
	const userId = req.session.userId;

	sharp(uploadedFile)
		.resize(200)
		.toFile(destinationOfThumbnail)
		.then(function() {
			let baseSQL = `
				INSERT INTO posts (title, description, image, thumbnail, fk_authorId) VALUE (?, ?, ?, ?, ?)
			`;
			return db.query(baseSQL, [title, description, uploadedFile, destinationOfThumbnail, userId]);
		})
		.then(function([results, fields]) {
			if (results && results.affectedRows) {
				req.flash('success', "Your post has been created!");
				req.session.save(function(saveErr) {
					res.redirect('/');
				})
			}
		})
		.catch(err => next(err));
});

router.get('/search', function(req, res, next) {
	function doTheThing(results, status, message) {
			res.locals.results = results;
			res.locals.searchValue = originalSearchTerm;
			req.flash(status, message);
			req.session.save(function(saveErr) {
				res.render('index', {title: 'Home Page', js: ['photos']});
			});
	}

	let searchTerm = `%${req.query.searchTerm}%`;
	let originalSearchTerm = req.query.searchTerm;
	let baseSQL = `
		SELECT id, title, description, thumbnail, concat_ws(" ", title, description) AS haystack
		FROM posts
		HAVING haystack like ?
		ORDER BY createdAt DESC;
	`;

	db.execute(baseSQL, [searchTerm])
		.then(function([results, fields]) {
			if (results && results.length) {
				doTheThing(results, 'success', `${results.length} result(s) found`);
				throw new Error('we done here');
			} else {
				return db.execute(baseSQL, ['%']);
			}
		})
		.then(function([results, fields]) {
			doTheThing(results, 'error', 'No results found. Showing all results.');
		})
		.catch((err) => {});
});

module.exports = router;