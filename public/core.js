var scotchTodo = angular.module('scotchTodo', []);

scotchTodo.controller('mainController',[ '$scope', '$http', function ($scope, $http){
        $scope.formData = {};

        // when landing on the page, get all todos and show them
        $http.get('/api/todos')
            .success(function(data) {
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });

        //what to do when deleting a todo
        $scope.deleteTodo = function(id){
            $http.delete('/api/todos'+ id)
                .success(function(data){
                    $scope.todos = data;
                    console.log(data);
                })
                .error(function(data){
                    $scope.todos = data;
                    console.log(data);
                }
                )
        }


      $scope.createTodo = function(){
          $http.post('/api/todos', $scope.formData).
              success(function(data) {
                  $scope.todos = data;
                  console.log(data);
              }).
              error(function(data) {
                  $scope.todos = data;
                  console.log(data);
              });
      }

}]);