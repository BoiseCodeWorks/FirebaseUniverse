(function () {
	
	var app = angular.module('fbUniverse');

	app.component('galaxy', {
		controller: Galaxy,
		controllerAs: 'gc',
		bindings: {},
		templateUrl: 'templates/galaxy.html'
	});

	app.controller('galaxyModalController', GalaxyModalController);

	Galaxy.$inject = ['$scope', 'dataService', '$uibModal', '$state', '$stateParams'];
	GalaxyModalController.$inject = ['$uibModalInstance'];

	function Galaxy($scope, dataService, $uibModal, $state, $stateParams) {
		
		let gc = this;
		let galaxyId = $stateParams.id;

		gc.galaxy = {
			stars: []
		};		

		gc.$onInit = function () {


			
			// dataService.getGalaxy(galaxyId)
			// 	.then((galaxy) => {
			// 		gc.galaxy = galaxy || {};
			// 		gc.galaxy.stars = gc.galaxy.stars || [];
			// 		$scope.$apply();
			// 		console.log(gc.galaxy);
			// 	})
			// 	.catch((error) => {
			// 		console.log(error);
			// 	});
		}

		gc.addStar = function () {

			var modalInstance = $uibModal.open({
				controller: 'galaxyModalController',
				controllerAs: 'gmc',
				templateUrl: 'addStarModal.html',
				size: 'md'
			});

			modalInstance.result
				.then((name) => {
					dataService.addStar(galaxyId, name)
						.then((star) => {
							gc.galaxy.stars.push(star);
							$scope.$apply();
						})
						.catch((error) => {
							console.log(error);
						});
				}, () => {
					// cancelled
				});
		}

		gc.showStar = function (id) {
			$state.go('star', { id: id });
		}
	}

	function GalaxyModalController($uibModalInstance) {

		let gmc = this;

		gmc.name = '';

		gmc.ok = function () {
			$uibModalInstance.close(gmc.name);
		};

		gmc.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
	}

})();