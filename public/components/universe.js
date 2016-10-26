(function () {

	var app = angular.module('fbUniverse');

	app.component('universe', {
		controller: Universe,
		controllerAs: 'uc',
		bindings: {},
		templateUrl: 'templates/universe.html'
	});

	app.controller('universeModalController', UniverseModalController);

	Universe.$inject = ['$scope', 'dataService', '$uibModal', '$state'];
	UniverseModalController.$inject = ['$uibModalInstance'];

	function Universe($scope, dataService, $uibModal, $state) {

		let uc = this;

		uc.galaxies = [];

		uc.$onInit = function () {

			var socket = io();

			socket.on('NewGalaxy', function(data){
				uc.galaxies.push(data);
				$scope.$apply();
			});

			alert('test')
			
			// dataService.getGalaxies()
			// 	.then((galaxies) => {
			// 		uc.galaxies = galaxies || [];
			// 		$scope.$apply();
			// 		console.log(uc.galaxies);
			// 	})
			// 	.catch((error) => {
			// 		console.log(error);
			// 	});
		}

		uc.addGalaxy = function () {

			var modalInstance = $uibModal.open({
				controller: 'universeModalController',
				controllerAs: 'umc',
				templateUrl: 'addGalaxyModal.html',
				size: 'md'
			});

			modalInstance.result
				.then((name) => {
					dataService.addGalaxy(name)
						.then((galaxy) => {
							uc.galaxies.push(galaxy);
							$scope.$apply();
						})
						.catch((error) => {
							console.log(error);
						});
				}, () => {
					// cancelled
				});
		}

		uc.showGalaxy = function (id) {
			$state.go('galaxy', { id: id });
		}
	}

	function UniverseModalController($uibModalInstance) {

		let umc = this;

		umc.name = '';

		umc.ok = function () {
			$uibModalInstance.close(umc.name);
		};

		umc.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
	}

})();