angular.module('bq', [ 'ngResource' ]).
  factory('Concursos', function ($resource) {
    return $resource('http://localhost\\:8080/concursos', {}, {
      query: { method: 'GET', params: {}, isArray: true }
    });
  }).
  factory('Orgaos', function ($resource) {
    return $resource('http://localhost\\:8080/orgaos/:id', {}, {
      create: { method: 'POST', params: {}, isArray: true },
      read: { method: 'GET', params: {}, isArray: true },
      update: { method: 'PUT', params: {}, isArray: true },
      "delete": { method: 'DELETE', params: {}, isArray: true }
    });
  }).
  factory('Cargos', function ($resource) {
    return $resource('http://localhost\\:8080/cargos', {}, {
      query: { method: 'GET', params: {}, isArray: true }
    });
  }).
  factory('Bancas', function ($resource) {
    return $resource('http://localhost\\:8080/bancas', {}, {
      query: { method: 'GET', params: {}, isArray: true }
    });
  }).
  factory('Disciplinas', function ($resource) {
    return $resource('http://localhost\\:8080/disciplinas', {}, {
      query: { method: 'GET', params: {}, isArray: true }
    });
  }).
  factory('Professores', function ($resource) {
    return $resource('http://localhost\\:8080/professores', {}, {
      query: { method: 'GET', params: {}, isArray: true }
    });
  }).
  factory('AreasAtuacao', function ($resource) {
    return $resource('http://localhost\\:8080/areas-atuacao', {}, {
      query: { method: 'GET', params: {}, isArray: true }
    });
  }).
  factory('AreasFormacao', function ($resource) {
    return $resource('http://localhost\\:8080/areas-formacao', {}, {
      query: { method: 'GET', params: {}, isArray: true }
    });
  }).
  config(function($routeProvider) {
    $routeProvider.
      when('/questoes', 
      	{ controller: QuestoesCtrl, templateUrl: 'questoes.html' }).
      when('/concursos', 
      	{ controller: ConcursosCtrl, templateUrl: 'concursos.html' }).
      when('/orgaos', 
        { controller: OrgaosCtrl, templateUrl: 'orgaos.html' }).
      when('/orgaos/new', 
        { controller: OrgaosCtrl, templateUrl: 'orgao-edit.html' }).
      when('/orgaos/:id/edit', 
        { controller: OrgaosCtrl, templateUrl: 'orgao-edit.html' }).
      when('/cargos', 
        { controller: CargosCtrl, templateUrl: 'cargos.html' }).
      when('/bancas', 
        { controller: BancasCtrl, templateUrl: 'bancas.html' }).
      when('/disciplinas', 
        { controller: DisciplinasCtrl, templateUrl: 'disciplinas.html' }).
      when('/professores', 
        { controller: ProfessoresCtrl, templateUrl: 'professores.html' }).
      when('/areas-atuacao', 
        { controller: AreasAtuacaoCtrl, templateUrl: 'areas-atuacao.html' }).
      when('/areas-formacao', 
        { controller: AreasFormacaoCtrl, templateUrl: 'areas-formacao.html' }).
      otherwise({ redirectTo:'/' });
  });

function convertToUTC (dt) {
    var localDate = new Date(dt);
    var localTime = localDate.getTime();
    var localOffset = localDate.getTimezoneOffset() * 60000;
    return new Date(localTime + localOffset);
}

function BqCtrl ($scope, $location) {
	$scope.activeClass = function (path) {
		if ($location.path().indexOf(path) > -1) {
			return "active";
		}
		return "";
	}
}

function QuestoesCtrl ($scope) {
}

function ConcursosCtrl ($scope, Concursos) {
  $scope.concursos = Concursos.query();
  $scope.convertToUTC = convertToUTC;
}

function OrgaosCtrl ($scope, $location, $routeParams, Orgaos) {
  $scope.salvar = function () {
    var method;
    var params = {};
    if (typeof $routeParams.id === 'undefined') {
      method = 'create';
    } else {
      method = 'update';
      params.id = $routeParams.id;
    }
    Orgaos[method](params, 
      { Cod_orgao: $scope.codigo, Nome_orgao: $scope.nome },
      function () {
        $location.path('/orgaos');
      },
      function (err) {
        $scope.erro = err.data.split('\n')[0];
      }
    );
  }
  if (typeof $routeParams.id === 'undefined') {
    $scope.orgaos = Orgaos.read();
  } else {
    Orgaos.read({ id: $routeParams.id }, function (orgaos) {
      $scope.codigo_original = $routeParams.id;
      $scope.codigo = orgaos[0].Cod_orgao;
      $scope.nome = orgaos[0].Nome_orgao;
      $scope.excluir = function () {
        Orgaos.delete({ id: $scope.codigo }, 
          function () {
            $location.path('/orgaos');
          },
          function (err) {
            $scope.erro = err.data.split('\n')[0];
          }          
        );
      }
    });  
  }
}

function CargosCtrl ($scope, Cargos) {
  $scope.cargos = Cargos.query();
}

function BancasCtrl ($scope, Bancas) {
  $scope.bancas = Bancas.query();
}

function DisciplinasCtrl ($scope, Disciplinas) {
  $scope.disciplinas = Disciplinas.query();
}

function ProfessoresCtrl ($scope, Professores) {
  $scope.professores = Professores.query();
}

function AreasAtuacaoCtrl ($scope, AreasAtuacao) {
  $scope.areas_atuacao = AreasAtuacao.query();
}

function AreasFormacaoCtrl ($scope, AreasFormacao) {
  $scope.areas_formacao = AreasFormacao.query();
}