const router = require('express').Router();
const Star = require('../models/star');

module.exports.mountPath = '/stars'
module.exports.router = router;

router.route('/:id?')
	.get(getStars)
	.post(createStar)
	.put(updateStar)
	.delete(deleteStar);

function getStars(req, res, next) {

	if (req.params.id) {

		Star.getById(req.params.id, req.query.include, function (star) {

			if (star.stack) { return next(star) }

			res.json({
				success: true,
				data: star
			});
		})
	}
	else {
		Star.getAll(req.query.include, function (stars) {

			if (stars.stack) { return next(stars) }

			res.json({
				success: true,
				data: stars
			});
		});
	}
}

function createStar(req, res, next) {

	Star.create(req.body.galaxyId, req.body.name, function (star) {

		if (star.stack) { return next(star) }

		res.json({
			success: true,
			data: star
		});
	});
}

function updateStar(req, res, next) {

	res.json({
		success: false,
		error: 'Not implemented.'
	});
}


function deleteStar(req, res, next) {

	res.json({
		success: false,
		error: 'Not implemented.'
	});
}