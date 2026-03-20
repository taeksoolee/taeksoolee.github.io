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
  .run(function($rootScope, $http, $window) {
    $http({
      url: './poke.json'
    }).then(
      function(res) {
        $rootScope.pokenames = res.data;
      }
    );

    $rootScope.back = function () {
      $window.history.back();
    };
  })
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
        <div ng-if="!loading" class="m-4">
          <h1 class="text-4xl mb-4">Pokemons</h1>
          <div>
            <p class="text-gray-500"> Total : {{ state.total }} </p>
          </div>
          <nav class="mb-4">
            <span class="inline-block w-10 h-10 content-middle">
              <span ng-if="pager.first === pager.cur" class="flex justify-center items-center  bg-blue-200 text-blue-500 w-full h-full">{{ pager.first }}</span>
              <a ng-if="pager.first !== pager.cur" ng-href="#!/?cur={{ pager.first }}&limit={{ pager.limit }}" class="flex justify-center items-center w-full h-full bg-gray-200 text-gray-400 hover:text-blue-500">
                {{ pager.first }}
              </a>
            </span>
            <span ng-repeat="page in pager.pages" class="inline-block w-10 h-10 mx-1 content-middle">
              <span ng-if="page === pager.cur" class="flex justify-center items-center  bg-blue-200 text-blue-500 w-full h-full">{{ page }}</span>
              <a ng-if="page !== pager.cur" ng-href="#!/?cur={{ page }}&limit={{ pager.limit }}" class="flex justify-center items-center w-full h-full bg-gray-200 text-gray-400 hover:text-blue-500">
                {{ page }}
              </a>
            </span>
            <span class="inline-block w-10 h-10 content-middle">
              <span ng-if="pager.last === pager.cur" class="flex justify-center items-center  bg-blue-200 text-blue-500 w-full h-full">{{ pager.last }}</span>
              <a ng-if="pager.last !== pager.cur" ng-href="#!/?cur={{ pager.last }}&limit={{ pager.limit }}" class="flex justify-center items-center w-full h-full bg-gray-200 text-gray-400 hover:text-blue-500">
                {{ pager.last }}
              </a>
            </span>
          </nav>
          <ul>
            <li ng-repeat="pokemon in state.pokemons" class="mb-1">
              
              <a ng-href="#!/detail?number={{ pokemon.number }}" class="group inline-block w-full hover:text-blue-500 hover:border-b hover:border-blue-400">
                <span class="inline-block w-14">[{{ pokemon.number | number }}]</span>
                <span class="inline-block font-bold">{{ pokemon.number | pokename }} </span>
                <span class="text-xs text-gray-400 group-hover:text-inherit">{{ pokemon.name }}</span>
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
        <div ng-if="!loading" class="m-4">
          <button ng-click="back()" class="text-gray-400 hover:text-blue-500">
            <i class="fa-solid fa-arrow-left"></i>
          </button>
          <div class="border w-fit">
            <img ng-src="{{ state.pokemon.img }}" alt="{{ state.pokemon.name }}" class="w-80 h-80"/>
            <div class="p-4">
              <span class="inline-block font-bold">{{ state.pokemon.number | pokename }} </span>
              <span class="text-xs text-gray-400 group-hover:text-inherit">{{ state.pokemon.name }}</span>
            </div>
          </div>
          <!--
          <div ng-repeat="sprite in state.pokemon.sprites">
            <img ng-src="{{ sprite[1] }}" ng-alt="{{ sprite[0] }}" />
            <hr />
          </div>
          -->
        </div>
        `,
        controller: 'DetailCtrl',
      })
  })
  .filter('number', function() {
    return (input) => `${input}`.padStart(4, '0');
  })
  .filter('encodeUrl', function() {
    return (input) => encodeURIComponent(input);
  })
  .filter('pokename', function($rootScope) {
    return (input) => $rootScope.pokenames?.[input]?.[0] ?? '';
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
            pokemons: res.data.results.map((e, i) => ({
              ...e,
              number: i+1,
            })).slice(start, end),
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

          const first = allPages.shift();
          const last = allPages.pop();

          if (pages[0] === first) {
            pages.shift();
            if (pages[pages.length-1]+1 <= last) {
              pages.push(pages[pages.length-1]+1);
            }
          } else if (pages[pages.length-1] === last) {
            pages.pop();
            if (pages[0]-1 >= 0) {
              pages.unshift(pages[0]-1);
            }
          }

          $scope.pager = {
            cur,
            limit,
            pages,
            first,
            last,
          }
          $scope.loading = false;
        })
      });
  })
  .controller('DetailCtrl', function($scope, $log, $routeParams, api) {
    $scope.loading = true;

    const { number } = $routeParams;

    $scope.state = null;

    // api.call(url)
    api.call(`https://pokeapi.co/api/v2/pokemon/${number}/`)
      .then(function(res) {
        $log.debug(res.data);
        $scope.state = {
          pokemon: {
            name: res.data.name,
            number,
            sprites: recursive(res.data.sprites),
            img: res.data.sprites.other.home.front_default
          }
        };

        $scope.loading = false;
      });

  });