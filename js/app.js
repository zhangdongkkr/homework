/**
 * Created by zhangdong on 2/5/15.
 */
angular.module('homework', [])

.controller("homeworkController", function($scope, $timeout, $interval){
        //could have use a service to declare this, but wut the heck.
        $scope.colorArray = [
            {color : 'red'},
            {color : 'blue'},
            {color : 'yellow'},
            {color : 'green'}
        ];

        $scope.compArray = [];
        $scope.usrArray = [];
        $scope.whoseTurn = 0; // 0 mean computer's turn and 1 mean user's turn
        $scope.turnMsg = ""
        $scope.gameStatus = "Not Started.";

        $scope.startGame = function(){
            $scope.gameStatus = "Started";
            $scope.compArray = [];
            $scope.whoseTurn = 0;
            $scope.turnMsg = "Computer";
            $scope.usrArray = [];
            $scope.pickColor();
        }

        $scope.pickColor = function(){
            var colorPicked = Math.round(Math.random() * 100) % 4;
            $scope.compArray.push($scope.colorArray[colorPicked]);
            console.log($scope.colorArray[colorPicked]);
            $scope.showComputerSelection();
        }

        $scope.showComputerSelection = function(){
            for(var i = 0; i < $scope.compArray.length; i++){
                showColor(i);
            }
            $timeout(setUserTurn, (1300 * $scope.compArray.length) + 500)
        }

        function setUserTurn(){
            $scope.whoseTurn = 1;
            $scope.turnMsg = "User";
        }


        function showColor(i){
            $timeout(function(){
                highlight($scope.compArray[i]);
            }, 1300 * (i+1));
        }

        function highlight(colorSelected){
            colorSelected.color = colorSelected.color + ' active';
            $timeout(function() {
                console.log(colorSelected);
                colorSelected.color = colorSelected.color.replace(" active", '');
            }, 750);
            console.log(colorSelected.color);
        }

        $scope.registerClick = function(color) {

            if($scope.gameStatus != "Started"){
                $scope.gameStatus = "Please click on start to play.";
                return;
            }

            if($scope.whoseTurn == 0){
                console.log("we are still in computer's turn");
                return;
            }
            $scope.usrArray.push(color);
            highlight(color);

            var hasMatched = true;
            //we are going to check if user pick the right color
            for(var i = 0; i < $scope.compArray.length; i++){
                if(i > $scope.usrArray.length-1){
                    break;
                }
                if($scope.compArray[i] != $scope.usrArray[i]){
                    hasMatched = false;
                    break;
                }
            }

            if(!hasMatched){
                $scope.gameStatus = "You pick the wrong color.  Game Over!!!";
                return;
            }

            if($scope.compArray.length == $scope.usrArray.length){
                $scope.whoseTurn = 0; //computer's turn
                $scope.turnMsg = "Computer";
                $scope.usrArray = [];
                $scope.pickColor();
            }
        }
    })