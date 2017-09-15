//criação dos controllers
appCliente.controller("clienteController", function ( $scope, $http ){
	
	$scope.clientes = [];
	$scope.cliente = {};
	
	
	carregarClientes = function(){
	token = localStorage.getItem("userToken");	
	//$http.defaults.headers.common.Authorization = 'Bearer '+token;
	$http({method:'GET', url:'/admin/clientes'})
	.then(function (response){
		$scope.clientes = response.data;	
	}, function (response){
		console.log(response.data);
		console.log(response.status);
	});
	};
	
	
	$scope.salvarClientes = function(){
		$http({method:'POST', url:'/admin/clientes', data:$scope.cliente})
		.then(function (response){
			//$scope.clientes.push(response.data);
			carregarClientes();
			$scope.cliente = {};
			//$scope.cancelarAlteracaoCliente();	
		}, function (response){
			console.log(response.data);
			console.log(response.status);
		});
	};

	
	$scope.excluirCliente = function(cliente){
        $http({method:'DELETE', url:'/admin/clientes/'+ cliente.id})
		.then(function (response){	
			/* pos = $scope.clientes.indexOf(cliente);
			$scope.clientes.splice(pos, 1);*/
			//funçao p buscar posicao do cliente no array	
			for(i=0;i<$scope.clientes.length;i++){
				if($scope.clientes[i].id==cliente.id){
					$scope.clientes.splice(i,1);
				}
			}
		
		}, function (response){
			console.log(response.data);
			console.log(response.status);
			
		});
	};
	
	$scope.alterarCliente = function(cli){
		$scope.cliente = angular.copy(cli);	
	};
	
	$scope.cancelarAlteracaoCliente = function(){
		$scope.cliente = {};
	};
	
	//$scope.carregarClientes();
	carregarClientes();
	
});