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
          </div>
          <nav>
            <span ng-repeat="page in pager.pages">
              <span ng-if="page === pager.cur">{{ page }}</span>
              <a ng-if="page !== pager.cur" ng-href="#!/?cur={{ page }}&limit={{ pager.limit }}">{{ page }}</a>
              &nbsp;&nbsp;
            </span>
          </nav>
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
        <div ng-if="loading">
          Loading...
        </div>
        <div ng-if="!loading">
          <h1>{{ state.pokemon.name }}</h1>
          <span>order: {{ state.pokemon.order }}</span>
          <div ng-repeat="sprite in state.pokemon.sprites">
            <img ng-src="{{ sprite[1] }}" ng-alt="{{ sprite[0] }}" />
            <hr />
          </div>
        </div>
        `,
        controller: 'DetailCtrl',
      })
  })
  .filter('encodeUrl', function() {
    return (input) => encodeURIComponent(input);
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
  .controller('HomeCtrl', function($scope, $routeParams, $log, api) {
    const cur = parseInt($routeParams.cur ?? '1');
    const limit = parseInt($routeParams.limit ?? '20');

    const start = (cur-1)*limit; // offset
    const end = start+limit;

    $scope.loading = true;

    api.call(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=1`)
      .then(function(res) {
        api.call(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=${res.data.count}`)
        .then(function(res) {
          $scope.state = {
            pokemons: res.data.results.slice(start, end),
            total: res.data.count,
          }

          const allPages = Array.from({ length: Math.ceil(res.data.count / limit) })
            .map((_, i) => i+1);

          const pages = [cur];
          const MAX_PAGE = 5;
          let i=1;
          const idx = cur-1;
          let next = null;
          let prev = null;
          while(true) {
            if (pages.length >= MAX_PAGE) break;
            next = allPages[idx+i] ?? null;
            next !== null && pages.push(next);

            if (pages.length >= MAX_PAGE) break;
            prev = allPages[idx+(i*-1)] ?? null;
            prev !== null && pages.unshift(prev);

            if (next === null && prev === null) break;
            i++;
          }

          $scope.pager = {
            cur,
            limit,
            pages,
          }
          $scope.loading = false;
        })
      });
  })
  .controller('DetailCtrl', function($scope, $log, $routeParams, api) {
    $scope.loading = true;

    const { data: url } = $routeParams;

    $scope.state = null;

    api.call(url)
      .then(function(res) {
        $log.debug(res.data);
        $scope.state = {
          pokemon: {
            name: res.data.name,
            order: res.data.order,
            sprites: recursive(res.data.sprites),
          }
        };

        $scope.loading = false;
      });

  });