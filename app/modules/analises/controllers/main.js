ford.controller('mainAnalises', function ($scope, $http, settings) {

  //pega as configurações de arquivo
  $scope.config = {
    filter: settings.get('analises.filters')
  };

  $scope.status = ['Terminado','Em andamento','Parado','Pausado'];
  $scope.ordem = ['Nome','Tipo','Tamanho crescente','Tamanho decrescente','Mais recente'];

  $scope.filter = {
    status: undefined,
    ordem: 'Nome',
    name: undefined
  };

  // Watch assiste a todos os filtros presentes na página esperando alguma alteração.
  $scope.$watch('filter', function (newFilter, oldFilter) {

    $(".analises").scrollTop("slow");
    $scope.countpage = 0;

    if ($scope.startPage == 1) {
      //carregar itens da primeira página
      $scope.startPage = 0;
    } else {

      if ((newFilter.status != oldFilter.status) || (newFilter.ordem != oldFilter.ordem)) {
        $scope.loadItems(newFilter.status, newFilter.ordem, undefined);
      }
      if (newFilter.name != oldFilter.name) {
        $scope.loadItems(newFilter.status, newFilter.ordem, newFilter.name);
      }
    }
  }, true);

  /*************** Funções de tratamento ***************/

  $scope.loading = function (divId, divResult) {
    $("#loading" + divId).show();
    $("#error" + divId).hide();
    $("#empty" + divId).hide();
    $("#" + divResult).hide();
  }

  $scope.sucess = function (divId, divResult) {
    $("#loading" + divId).hide();
    $("#" + divResult).show();
  }

  $scope.empty = function (divId) {
    $("#loading" + divId).hide();
    $("#empty" + divId).show();
  }

  $scope.error = function (divId) {
    $("#loading" + divId).hide();
    $("#error" + divId).show();
  }
});
