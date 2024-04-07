function recursive(obj, prefix='') {
  const result = [];
  for (let key in obj) {
    const val = obj[key];
    if (val instanceof Object) {
      prefix += `${key}.`;
      recursive(val, prefix).forEach((e) => result.push(e));
    } else if (typeof val === 'string' && /\.(jp[e]?g|svg|png)$/.test(val)) {
      result.push([`${prefix}${key}`, val])
    }
  }
  return result;
};

angular.module('app', ['ngRoute'])
  .config(function($routeProvider) {
    console.log();

    $routeProvider
      .when('/', {
        redirectTo: '/list',
      })
      .when('/list', {
        template: `
        <div ng-if="loading">
          Loading...
        </div>
        <div ng-if="!loading">
          <h1>Pokemons</h1>
          <div>
            <p> Total : {{ state.total }} </p>
            <a ng-if="state.previous" ng-href="#!/?data={{ state.previous | encodeUrl }}">Previous</a>
            <span ng-if="!state.previous">Previous</span>

            <a ng-if="state.next" ng-href="#!/?data={{ state.next | encodeUrl }}">Next</a>
            <span ng-if="!state.next">Next</span>

            <div>{{ pager | json }}</div>
          </div>
          <ul>
            <li ng-repeat="pokemon in state.pokemons">
              <a ng-href="#!/detail?data={{ pokemon.url | encodeUrl }}">
                {{ pokemon.name }}
              </a>
            </li>
          </ul>
        </div>
        `,
        controller: 'HomeCtrl',
      })
      .when('/detail', {
        template: `
          <h1>{{ state.pokemon.name }}</h1>
          <div ng-repeat="sprite in state.pokemon.sprites">
            <img ng-src="{{ sprite[1] }}" ng-alt="{{ sprite[0] }}" />
            <hr />
          </div>
        `,
        controller: 'DetailCtrl',
      })
  })
  .filter('encodeUrl', function() {
    return (input) => encodeURIComponent(input);
  })
  .filter('decodeUrl', function() {
    return (input) => decodeURIComponent(input)
  })
  .service('api', function($http, $q) {
    this.call = function(url) {
      const deffered = $q.defer();

      $http({
        url,
        cache: true,
      })
        .then(
          function(res) {
            deffered.resolve(res);
          },
          function(res) {
            deffered.reject(res);
          }
        );

      return deffered.promise;
    }
  })
  .controller('HomeCtrl', function($scope, $log, $routeParams, api) {
    $scope.loading = true;
    $scope.pager = {
      cur: 1,
      limit: 20,
    };

    let { data: url } = $routeParams;
    if (!url) {
      url = `https://pokeapi.co/api/v2/pokemon?offset=${($scope.pager.cur-1)*$scope.pager.limit}&limit=${$scope.pager.limit}`;
    }

    api.call(url)
      .then(function(res) {
        $log.debug(res.data);
        const searchEntriy = Object.fromEntries(new URLSearchParams(new URL(url).search).entries());

        const offset = parseInt(searchEntriy.offset);
        const limit = parseInt(searchEntriy.limit);
        
        $scope.pager = {
          cur: (offset/limit)+1,
          limit,
        };

        $scope.state = {
          pokemons: res.data.results,
          previous: res.data.previous,
          next: res.data.next,
          total: res.data.count,
        }
        $scope.loading = false;
      });
  })
  .controller('DetailCtrl', function($scope, $log, $routeParams, api) {
    const { data: url } = $routeParams;

    $scope.state = {
      pokemon: {
        name: '',
        sprites: [],
      },
    }

    api.call(url)
      .then(function(res) {
        $log.debug(res.data);
        $scope.state.pokemon.name = res.data.name;
        $scope.state.pokemon.sprites = recursive(res.data.sprites);
      });

  });