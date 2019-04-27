var app = angular.module('angularjsNodejsTutorial', []);
app.controller('loginController', function($scope, $http) {
  $scope.verifyLogin = function() {
    // To check in the console if the variables are correctly storing the input:
    // console.log($scope.username, $scope.password);

    var request = $http({
      url: '/login',
      method: "POST",
      data: {
        'username': $scope.username,
        'password': $scope.password
      }
    });

    request.success(function(response) {
      // success
      // console.log(response);
      if (response.result === "success") {
        // After you've written the INSERT query in routes/index.js, uncomment the following line
        window.location.href = "http://localhost:8081/dashboard"
      }
    });
    request.error(function(err) {
      // failed
      console.log("error: ", err);
    });

  };
});


// Template for adding a controller
app.controller('dashUserController', function($scope, $http) {
  // normal variables
  // var dummyVar1 = 'abc';

  // // Angular scope variables
  // $scope.dummyVar2 = 'abc';
  // $scope.userList = [ { username: 'abc'}];
  var req = $http.get('/dashboard/user');

  req.success(function(data) {
    $scope.userList = data.rs;
  });

  req.error(function(err) {
    console.log("error: ", err);
  });

  //$scope.getUserlist();

});

// Controller for homevalues page
app.controller('homeValuesController', function($scope, $http) {
  // normal variables
  // var dummyVar1 = 'abc';

  // // Angular scope variables
  // $scope.dummyVar2 = 'abc';
  // $scope.userList = [ { username: 'abc'}];

  var req = $http.get('/homevalues/metros');

  req.success(function(data) {
    console.log('success in finding all metros.');
    $scope.metroList = data.rows;
  });

  req.error(function(err) {
    console.log("error: ", err);
  });


});

app.controller('homeValuesSearchController', function($scope, $http) {
  // normal variables
  // var dummyVar1 = 'abc';

  $scope.getPrices = function(metroID1, p_type1, metroID2, p_type2) {
    console.log(metroID2);
    console.log(p_type2);

    var request = $http({
      url: '/homevalues/metroprices', //+ movieId,
      method: "POST",
      data: {
        'metroID1' : metroID1,
        'p_type1' : p_type1,
        'metroID2' : metroID2,
        'p_type2' : p_type2
      }
    });

    request.success(function(response) {
      //console.log(response.rows);
      function getFirst(e) {
        return e[0];
      };
      function getSecond(e) {
        return e[1];
      };
      var x = response.rows.map(getFirst);
      var y = response.rows.map(getSecond);
      // $scope.x = x;
      // $scope.y = y;
      p = document.getElementById('plot');
      var trace1 = {
        x, y, 
        name: 'metro1',
        type: 'scatter'
      };
      // var trace2 = {
      //   x, y
      // };
      var data = [trace1];
      var layout = { showlegend: true,
        legend: {x:1, y:1}
      };
      Plotly.newPlot(p, data, layout);
      
      // Plotly.plot( p, [{ x, y }], {
      //   margin: { t: 2 } 
      // });
      //$scope.time_stamps = response;
    });

    request.error(function(err) {
      console.log("error: ", err);
    });
  }

});

// Controller for top movies on dashboard page
app.controller('dashMovieController', function($scope, $http) {

  var req = $http.get('/dashboard/genres');

  req.success(function(data) {
    $scope.genreList = data;
  });
  req.error(function(err) {
    console.log("error: ", err);
  });

  $scope.findTopMovies = function(genre) {
    //console.log(genre);

    var request = $http({
      url: '/dashboard/top_movies',
      method: "POST",
      data: {
        'genre': genre
      }
    });

    request.success(function(response) {
      // success
      for (var i = 0; i < response.length; i++) {
        $scope.topMovieList = response;
        //console.log(response[i]); 
      }      
    });
    request.error(function(err) {
      // failed
      console.log("error: ", err);
    });

  };

});

// Controller for recommendation
app.controller('recommendationController', function($scope, $http) {

  $scope.getRecommendations = function(movieId) {
    //console.log(movieId);

    var request = $http({
      url: '/recommendation/recMovies/' + movieId,
      method: "GET",
      params: {
        'movieId' : movieId
      }
    });

    request.success(function(response) {
      $scope.recList = response;
    });

    request.error(function(err) {
      console.log("error: ", err);
    });
  }
});

app.controller('bestOfController', function($scope, $http) {
  // normal variables
  // var years = 'abc';

  // Angular scope variables
  years = [];
  for (var i = 2000; i < 2018; i++) {
    years.push(i);
  }
  $scope.years = years;

  $scope.getBestOf = function(year) {
    var request = $http({
      url: '/bestof/' + year,
      method: "GET",
      params: {
        'year' : year
      }
    });

    request.success(function(response) {
      $scope.bestList = response;
      console.log(response);
    });

    request.error(function(err) {
      console.log("error: ", err);
    });
  };
});

// Template for adding a controller
/*
app.controller('dummyController', function($scope, $http) {
  // normal variables
  var dummyVar1 = 'abc';

  // Angular scope variables
  $scope.dummyVar2 = 'abc';

  // Angular function
  $scope.dummyFunction = function() {

  };
});
*/
