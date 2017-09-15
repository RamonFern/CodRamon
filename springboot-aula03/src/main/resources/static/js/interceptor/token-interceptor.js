appCliente.factory("tokenInterceptor", function($q, $location){
	
	return{
		
		'request': function(config){
			config.headers.Authorization = 'Bearer '+ localStorage.getItem("userToken");
			
			return config;
		},
		'responseError': function(rejection){
			
			if(rejection.status == 500){//8888
			   $location.path("/login");
			}
			return $q.reject(rejection);
		}
	}
});