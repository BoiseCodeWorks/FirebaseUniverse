(function () {
	
	let app = angular.module('fbUniverse', ['ui.router', 'ui.bootstrap']);

	app.config(AppConfiguration);
	app.controller('appController', AppController);

	AppConfiguration.$inject = ['$stateProvider', '$urlRouterProvider'];
	AppController.$inject = ['$state', 'dataService'];

	function AppConfiguration($stateProvider, $urlRouterProvider) {

		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('universe', {
				url: '/',
				component: 'universe'
			})
			.state('galaxy', {
				url: '/galaxy/:id',
				component: 'galaxy'
			});
	}

	function AppController($state, dataService) {

		var ac = this;
		
		ac.query = '';
		
		ac.search = function() {

			if (ac.query) {
				$state.go('search', { query: ac.query });
			}			
		}
	}
})();