(function () {

	var app = angular.module('fbUniverse');

	app.factory('dataService', DataService);

	DataService.$inject = ['$http'];

	function DataService($http) {

		function getGalaxy(id) {

			return new Promise((resolve, reject) => {
				
				$http.get('/api/galaxies/' + id + '?include=stars')
					.then((response) => {
						if (response.data.success) {
							resolve(response.data.data);
						}
						else {
							reject(response.data.error);
						}
					})
					.catch((error) => {
						reject(error);
					});
			});
		}

		function getGalaxies() {

			return new Promise((resolve, reject) => {
				
				$http.get('/api/galaxies?include=star')
					.then((response) => {
						if (response.data.success) {
							resolve(response.data.data);
						}
						else {
							reject(response.data.error);
						}
					})
					.catch((error) => {
						reject(error);
					});
			});
		}

		function addGalaxy(name) {

			return new Promise((resolve, reject) => {

				$http.post('/api/galaxies', { name: name })
					.then((response) => {
						if (response.data.success) {
							resolve(response.data.data);
						}
						else {
							reject(response.data.error);
						}
					})
					.catch((error) => {
						reject(error);
					});
			});
		}

		function getStars() {

			return new Promise((resolve, reject) => {
				
				$http.get('/api/stars')
					.then((response) => {
						if (response.data.success) {
							resolve(response.data.data);
						}
						else {
							reject(response.data.error);
						}
					})
					.catch((error) => {
						reject(error);
					});
			});
		}

		function addStar(galaxyId, name) {

			return new Promise((resolve, reject) => {

				$http.post('/api/stars', { galaxyId: galaxyId, name: name })
					.then((response) => {
						if (response.data.success) {
							resolve(response.data.data);
						}
						else {
							reject(response.data.error);
						}
					})
					.catch((error) => {
						reject(error);
					});
			});
		}

		return {
			getGalaxy: getGalaxy,
			getGalaxies: getGalaxies,
			addGalaxy: addGalaxy,
			getStars: getStars,
			addStar: addStar
		};
	}
})();