app.config(['$stateProvider', '$ocLazyLoadProvider', function ($stateProvider, $ocLazyLoadProvider) {

    $ocLazyLoadProvider.config({
            debug: true,
            events: true
        }
    );
    var helloState = {
        name: 'hello',
        url: '/hello',
        template: '<h3>hello world!</h3>'
    };
    var aboutState = {
        name: 'about',
        url: '/about',
        template: '<h3>Its the UI-Router hello world app!</h3>'
    };
    $stateProvider.state(helloState)
        .state(aboutState)
        .state(
            {
                name: 'home',
                url: '/home',
                templateUrl: 'tpls/home.html',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        $ocLazyLoad.load(['testModule'],
                            {
                                cache: false
                            });
                    }]
                }
            }
        ).state(
        {
            name: 'homeA',
            url: '/homeA',
            templateUrl: 'tpls/home.html',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    $ocLazyLoad.load('testModule');
                }]
            }
        }
    )
}]);