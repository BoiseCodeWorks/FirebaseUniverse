const dataAdapter = require('./dataAdapter');
const uuid = dataAdapter.uuid;
const schemator = dataAdapter.schemator;
const DS = dataAdapter.DS;
const formatQuery = dataAdapter.formatQuery;

schemator.defineSchema('Galaxy', {
	id: {
		type: 'string',
		nullable: false
	},
	name: {
		type: 'string',
		nullable: false
	}
})

let Galaxy = DS.defineResource({
	name: 'galaxy',
	endpoint: 'galaxies',
	relations: {
		hasMany: {
			star: {
				localField: 'stars',
				foreignKey: 'galaxyId'
			},
			planet: {
				localField: 'planets',
				foreignKey: 'galaxyId'
			}
		}
	}
})

function create(name, cb) {

	// Use the Resource Model to create a new galaxy
	let galaxy = { id: uuid.v4(), name: name };

	let error = schemator.validateSync('Galaxy', galaxy);

	if (error) {
		return cb(error);
	}

	Galaxy.create(galaxy).then(cb).catch(cb);
}

function getAll(query, cb) {

	//Use the Resource Model to get all Galaxies
	Galaxy.findAll({}, formatQuery(query)).then(cb).catch(cb);
}

function getById(id, query, cb) {

	// use the Resource Model to get a single galaxy by its id
	Galaxy.find(id, formatQuery(query)).then(cb).catch(cb);
}

module.exports = {
	create,
	getAll,
	getById
}