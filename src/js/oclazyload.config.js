/**
 * Created by Administrator on 2017/6/8.
 */
app.config(['$ocLazyLoadProvider', function ($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config(
        {
            modules: [{
                name:'testModule',
                files:['js/testModule.js','js/testModuleA.js']
            }]
        });
}]);