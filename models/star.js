const dataAdapter = require('./dataAdapter');
const uuid = dataAdapter.uuid;
const schemator = dataAdapter.schemator;
const DS = dataAdapter.DS;
const formatQuery = dataAdapter.formatQuery;

schemator.defineSchema('Star', {
	id: {
		type: 'string',
		nullable: false
	},
	galaxyId: {
		type: 'string',
		nullable: false
	},
	name: {
		type: 'string',
		nullable: false
	}
})

let Star = DS.defineResource({
	name: 'star',
	endpoint: 'stars',
	relations: {
		belongsTo: {
			galaxy: {
				localField: 'galaxy',
				localKey: 'galaxyId'
			}
		},
		hasMany: {
			planet: {
				localField: 'planets',
				foreignKey: 'starId'
			}
		}
	}
})

function create(galaxyId, name, cb) {

	// Use the Resource Model to create a new star
	let star = { id: uuid.v4(), galaxyId: galaxyId, name: name };

	let error = schemator.validateSync('Star', star);

	if (error) {
		return cb(error);
	}

	Star.create(star).then(cb).catch(cb);
}

function getAll(query, cb) {

	//Use the Resource Model to get all stars
	Star.findAll({}).then(cb).catch(cb);
}

function getById(id, query, cb) {

	// use the Resource Model to get a single galaxy by its id
	Star.find(id, formatQuery(query)).then(cb).catch(cb);
}

module.exports = {
	create,
	getAll,
	getById
}