const uuid = require('node-uuid');
const JsData = require('js-data');
const Schemator = require('js-data-schema');
const FBAdapter = require('js-data-firebase');

let schemator = new Schemator();
let DS = new JsData.DS();

let fbAdapter = new FBAdapter({
	basePath: 'https://fb-universe.firebaseio.com'
})

DS.registerAdapter('firebase', fbAdapter, { default: true })

function formatQuery(query) {

	query = query || ''

	return {
		with: query.split(',').join(' ').split(' ')
	}
}

module.exports = {
	fbAdapter,
	DS,
	uuid,
	schemator,
	formatQuery
}