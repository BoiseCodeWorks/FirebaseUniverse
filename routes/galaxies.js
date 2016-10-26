const router = require('express').Router();
const Galaxy = require('../models/galaxy');

module.exports.mountPath = '/galaxies'
module.exports.router = router;

router.route('/:id?')
	.get(getGalaxies)
	.post(createGalaxy)
	.put(updateGalaxy)
	.delete(deleteGalaxy);

function getGalaxies(req, res, next) {

	if (req.params.id) {

		Galaxy.getById(req.params.id, req.query.include, function (galaxy) {

			if (galaxy.stack) { return next(galaxy) }

			res.json({
				success: true,
				data: galaxy
			});
		})
	}
	else {
		Galaxy.getAll(req.query.include, function (galaxies) {

			if (galaxies.stack) { return next(galaxies) }

			res.json({
				success: true,
				data: galaxies
			});
		});
	}
}

function createGalaxy(req, res, next) {

	Galaxy.create(req.body.name, function (galaxy) {

		if (galaxy.stack) { return next(galaxy) }

		res.json({
			success: true,
			data: galaxy
		});
	});
}

function updateGalaxy(req, res, next) {

	res.json({
		success: false,
		error: 'Not implemented.'
	});
}


function deleteGalaxy(req, res, next) {

	res.json({
		success: false,
		error: 'Not implemented.'
	});
}