angular.module('bq', [ 'ngResource' ]).
  factory('Concursos', function (BqResource) {
    return BqResource('/concursos/:id');
  }).
  factory('Orgaos', function (BqResource) {
    return BqResource('/orgaos/:id');
  }).
  factory('Cargos', function (BqResource) {
    return BqResource('/cargos/:id');
  }).
  factory('Bancas', function (BqResource) {
    return BqResource('/bancas/:id');
  }).
  factory('Disciplinas', function (BqResource) {
    return BqResource('/disciplinas/:id');
  }).
  factory('Professores', function (BqResource) {
    return BqResource('/professores/:id');
  }).
  factory('AreasAtuacao', function (BqResource) {
    return BqResource('/areas-atuacao/:id');
  }).
  factory('AreasFormacao', function (BqResource) {
    return BqResource('/areas-formacao/:id');
  }).
  config(function($routeProvider) {
    $routeProvider.

      when('/questoes', 
      	{ controller: QuestoesCtrl, templateUrl: 'questoes.html' }).
      
      when('/concursos', 
      	{ controller: ConcursosCtrl, templateUrl: 'concursos.html' }).
      when('/concursos/new', 
        { controller: ConcursosCtrl, templateUrl: 'concurso-edit.html' }).
      when('/concursos/:id/edit', 
        { controller: ConcursosCtrl, templateUrl: 'concurso-edit.html' }).

      when('/orgaos', 
        { controller: OrgaosCtrl, templateUrl: 'orgaos.html' }).
      when('/orgaos/new', 
        { controller: OrgaosCtrl, templateUrl: 'orgao-edit.html' }).
      when('/orgaos/:id/edit', 
        { controller: OrgaosCtrl, templateUrl: 'orgao-edit.html' }).

      when('/cargos', 
        { controller: CargosCtrl, templateUrl: 'cargos.html' }).
      when('/cargos/new', 
        { controller: CargosCtrl, templateUrl: 'cargo-edit.html' }).
      when('/cargos/:id/edit', 
        { controller: CargosCtrl, templateUrl: 'cargo-edit.html' }).

      when('/bancas', 
        { controller: BancasCtrl, templateUrl: 'bancas.html' }).
      when('/bancas/new', 
        { controller: BancasCtrl, templateUrl: 'banca-edit.html' }).
      when('/bancas/:id/edit', 
        { controller: BancasCtrl, templateUrl: 'banca-edit.html' }).

      when('/disciplinas', 
        { controller: DisciplinasCtrl, templateUrl: 'disciplinas.html' }).
      when('/disciplinas/new', 
        { controller: DisciplinasCtrl, templateUrl: 'disciplina-edit.html' }).
      when('/disciplinas/:id/edit', 
        { controller: DisciplinasCtrl, templateUrl: 'disciplina-edit.html' }).

      when('/professores', 
        { controller: ProfessoresCtrl, templateUrl: 'professores.html' }).
      when('/professores/new', 
        { controller: ProfessoresCtrl, templateUrl: 'professor-edit.html' }).
      when('/professores/:id/edit', 
        { controller: ProfessoresCtrl, templateUrl: 'professor-edit.html' }).

      when('/areas-atuacao', 
        { controller: AreasAtuacaoCtrl, templateUrl: 'areas-atuacao.html' }).
      when('/areas-atuacao/new', 
        { controller: AreasAtuacaoCtrl, 
          templateUrl: 'area-atuacao-edit.html' }).
      when('/areas-atuacao/:id/edit', 
        { controller: AreasAtuacaoCtrl, 
          templateUrl: 'area-atuacao-edit.html' }).

      when('/areas-formacao', 
        { controller: AreasFormacaoCtrl, templateUrl: 'areas-formacao.html' }).
      when('/areas-formacao/new', 
        { controller: AreasFormacaoCtrl, 
          templateUrl: 'area-formacao-edit.html' }).
      when('/areas-formacao/:id/edit', 
        { controller: AreasFormacaoCtrl, 
          templateUrl: 'area-formacao-edit.html' }).

      otherwise({ redirectTo:'/' });
  }).
  factory('ServerUrl', function (path) {
    return 'http://localhost\\:8080';
  }).
  factory('BqResource', function ($resource, $location) {
    return function (path) {
      var url = 'http://localhost\\:8080';
      var r = $resource(url + path, {}, { update: { method: 'PUT' } });
      var root = path.split('/')[1];
      r.saveOrUpdate = function (id, $scope) {
        var method;
        var params = {};
        if (typeof id === 'undefined') {
          method = 'save';
        } else {
          method = 'update';
          params.id = id;
        }
        r[method](params, $scope.entidade,
          function () {
            $location.path('/' + root);
          },
          function (err) {
            $scope.erro = err.data.split('\n')[0];
          }
        );        
      };
      r.bind = function (id, $scope) {
        $scope.salvar = function () {
          r.saveOrUpdate(id, $scope);
        }
        if (typeof id === 'undefined') {
          $scope.entidade = {};
          $scope[root.replace('-', '_')] = r.query();
        } else {
          r.query({ id: id }, function (results) {
            $scope.original_id = id;
            $scope.entidade = results[0];
            $scope.excluir = function () {
              r.delete({ id: id }, 
                function () {
                  $location.path('/' + root);
                },
                function (err) {
                  $scope.erro = err.data.split('\n')[0];
                }          
              );
            }
          });  
        }
      }
      return r;
    }
  });

function convertToUTC (dt) {
    var localDate = new Date(dt);
    var localTime = localDate.getTime();
    var localOffset = localDate.getTimezoneOffset() * 60000;
    return new Date(localTime + localOffset);
}

function BqCtrl ($scope, $location) {
	$scope.activeClass = function (path) {
    if (!angular.isArray(path)) { path = [ path ]; }
    for (var i = 0; i < path.length; i++) {
  		if ($location.path().indexOf(path[i]) > -1) {
  			return "active";
  		}
    }
		return "";
	}
}

function QuestoesCtrl ($scope) {
}

function ConcursosCtrl ($scope, $routeParams, Concursos) {
  Concursos.bind($routeParams.id, $scope);
  $scope.convertToUTC = convertToUTC;
}

function OrgaosCtrl ($scope, $routeParams, Orgaos) {
  Orgaos.bind($routeParams.id, $scope);
}

function CargosCtrl ($scope, $routeParams, Cargos, AreasFormacao, AreasAtuacao) {
  Cargos.bind($routeParams.id, $scope);
  $scope.areas_formacao = AreasFormacao.query();
  $scope.areas_atuacao = AreasAtuacao.query();
  if (typeof $routeParams.id === 'undefined') {
    $scope.entidade.area_formacao = {};
    $scope.entidade.area_atuacao = {};
  }
}

function BancasCtrl ($scope, $routeParams, Bancas) {
  Bancas.bind($routeParams.id, $scope);
}

function DisciplinasCtrl ($scope, $routeParams, Disciplinas) {
  Disciplinas.bind($routeParams.id, $scope);
}

function ProfessoresCtrl ($scope, $routeParams, Professores) {
  Professores.bind($routeParams.id, $scope);
}

function AreasAtuacaoCtrl ($scope, $routeParams, AreasAtuacao) {
  AreasAtuacao.bind($routeParams.id, $scope);
}

function AreasFormacaoCtrl ($scope, $routeParams, AreasFormacao) {
  AreasFormacao.bind($routeParams.id, $scope);
}