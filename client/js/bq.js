angular.module('bq', [ 'ngResource' ]).
  factory('Concursos', function ($resource) {
    return $resource('http://localhost\\:8080/concursos', {}, {
      query: { method: 'GET', params: {}, isArray: true }
    });
  }).
  factory('Orgaos', function ($resource) {
    return $resource('http://localhost\\:8080/orgaos', {}, {
      query: { method: 'GET', params: {}, isArray: true }
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
      //when('/edit/:projectId', 
      //	{controller:EditCtrl, templateUrl:'detail.html'}).
      //when('/new', {controller:CreateCtrl, templateUrl:'detail.html'}).
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

function OrgaosCtrl ($scope, Orgaos) {
  $scope.orgaos = Orgaos.query();
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