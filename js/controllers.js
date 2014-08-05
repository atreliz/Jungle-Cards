
 if ($.browser.webkit) {
      /* prevents default touch behaviour (including pinch-zoom) */ 
        document.addEventListener('touchmove', function(e){
          e.preventDefault();
        });
      }

  function saveranking(user,time,level){ 
      /*Guardar partida actual,para continuar*/
      
      localStorage.setItem('lastuser',user);
      localStorage.setItem('lastlevel',level);

    var partida={};
    partida.user=localStorage.getItem('lastuser');
    partida.level=localStorage.getItem('lastlevel');
  }

  var TIMERMIN,TIMERSEC;
        


/*---- FUNCION CONTROLADORA ----*/
myApp.controller('mainCtrl', ['$scope', '$http','$timeout', function($scope,$http,$timeout) {

  console.log("mainCtrl LOADED");
      //angular.element("body").append(' <audio class="welcomemusic" style="display:none;opacity:0;" loop="loop" autoplay="autoplay" controls="controls">  <source src="deepforest.mp3" /> </audio>');

        //Splash screen
        //$(".loading").hide();
        /*
        $timeout(function() {
                             //angular.element("secction.loading").hide("slow");
                             $(".loading").fadeOut("slow");
        },2000);*/

      /*Coger datos del Local storage
        if ( localStorage.lastuser  ){
          $scope.lastlevel=localStorage.getItem('lastlevel');
          $scope.lastuser=localStorage.getItem('lastuser');
        }*/


      //$scope.gamestatus="welcome";//Pantalla icial del juego

      //Inicializar Niveles
        $scope.level=0;
        $scope.newlevel=false;
        
        $scope.partidas="vacio";
        $scope.timersec="00";
        $scope.timermin="0";
        var timeforlevel=0;



        var clase="", intentos=0, valora="", valorb="";
  
        //Funcion que guarda el ranking
       
            var allranking= new Array,rankingpos=0;
        
        





      //INICIO EL JUEGO
     // $scope.restart($scope.level);

}]);

//LOGIN screen
myApp.controller('loginCtrl', ['$scope', '$location', function($scope,$location) {
  console.log("loginCtrl LOADED");

//from local storage
    if ( !!localStorage.lastuser  ){
      $scope.lastlevel=localStorage.getItem('lastlevel');
      $scope.lastuser=localStorage.getItem('lastuser');
    }

  //this will load the page with the right level as parameter
  $scope.loadLevel=function(levelId,user){
    //to storage
    localStorage.setItem('lastlevel',levelId);
    localStorage.setItem('lastuser',user);
   
    //load level page
    $location.path('/level/'+levelId);
    
  }

  //this will log out and remove local storage sesion
  $scope.logOut=function(){
    $scope.lastuser=undefined;
    localStorage.removeItem('lastlevel');
    localStorage.removeItem('lastuser');
  }

}]);


//LEVEL screen
myApp.controller('levelCtrl', ['$scope', '$http','$routeParams','$timeout','$location', function($scope,$http,$routeParams,$timeout,$location) {
  
  //FUNCION que INICIA el JUEGO
    $scope.restart=function(level){
    saveranking(localStorage.getItem('lastuser'),$scope.time,level);
    
    //angular.element(".welcomemusic").remove();
    function countdown(timeforlevel){
        //insertar musica de nivel-IRIA AKI pero la delanto un pelin xq la pista tiene delay
            /*angular.element(".musiclevel").remove();
            angular.element("body").append("  <audio class='musiclevel' src='game.mp3'  loop autoplay style='display:none'></audio>");
              */
             
        //cargo los tiempos iniciales
          $scope.timermin=timeforlevel-1;
          $scope.timersec=59;

        //inicio la cuenta atras
         TIMERSEC=self.setInterval(function(){cuentatras()},1000);

            function cuentatras(){

                      //$scope.timersec=parseInt($scope.timersec);
                        if($scope.timersec>0){
                             
                            if( $scope.timersec<11){
                                $scope.timersec=$scope.timersec-1;
                                $scope.timersec="0"+String($scope.timersec);
                            }else{
                                $scope.timersec=$scope.timersec-1;
                            }  
                        }else{
                            if($scope.timermin>0){
                              $scope.timermin=$scope.timermin-1;
                              $scope.timersec=59;
                            }
                            else{
                                //alert("GAME OVER");
                                //$scope.gamestatus="gameover";
                                $location.path('/gameover');
                                $scope.lastlevel=$scope.level;
                                $scope.level=0;
                                //$scope.endgame=true;
                                //$scope.restart($scope.level-1);
                                TIMERSEC=window.clearInterval(TIMERSEC);
                                 //angular.element(".musiclevel").remove();
                                  //angular.element("body").append("  <audio class='welcomemusic' src='deepforest.mp3' controls loop autoplay style='display:none'></audio>");
                            }

                        }
                        console.log($scope.timersec);
                        $scope.$apply();
            }
      }

          //var json="json/animals-level1.json",numCartas=4;
          var json,numCartas;
          //$scope.gamestatus="play";//Pantalla de juego principal
          $scope.newlevel=false;
          level++;
          $scope.level=level;
          $scope.lastlevel=$scope.level;
          

          $scope.time=$scope.timersec;
          saveranking(localStorage.getItem('lastuser'),$scope.time,level);
          //Iniciador de niveles y sus caracteristicas
                            //console.log("Starting level "+$scope.level);
            if (level==1){ json="json/animals-level1.json"; numCartas=4;timeforlevel=1;}
            else if (level==2){ json="json/animals-level1.json"; numCartas=12;timeforlevel=2;}
            else if (level==3){ json="json/animals-level12.json"; numCartas=8;timeforlevel=2;}

            else if (level==4){ json="json/animals-level2.json"; numCartas=4;timeforlevel=1;}
            else if (level==5){ json="json/animals-level2.json"; numCartas=12;timeforlevel=2;}
            else if (level==6){ json="json/animals-level12.json"; numCartas=8;timeforlevel=1;}

            else if (level==7){ json="json/animals-level3.json"; numCartas=4;timeforlevel=2;}
            else if (level==8){ json="json/animals-level3.json"; numCartas=12;timeforlevel=2;}
            else if (level==9){ json="json/animals-level3.json"; numCartas=12;timeforlevel=1;}
            else { 
                //$scope.gamestatus="end"; //Fin del Juego
                 $location.path('/gamefinish'); //Fin del Juego
                //angular.element(".musiclevel").remove();
                //angular.element("body").append("  <audio class='welcomemusic' src='deepforest.mp3' controls loop autoplay style='display:none'></audio>");

            }
                            //console.log("JSON"+json+"level "+$scope.level);

          //Bring the Json level
            $http.get(json).success(function(data) {    
                //Asi cargaria solo mi Json,        $scope.usuarios = data;     
                //Concatenar mas arrays a este JSON,usando las cartas del array original
                 for (var i=0; i<numCartas; i++) {    data.push(data[i]);    }
                 // random order inside the array
                 $scope.usuarios = data.sort(function() { return 0.5 - Math.random();});
                 // $scope.usuarios = data; for a normal order
                //Reorden with random array

              //Actualizando valores del nivel


               $scope.totalcards=data.length;
               $scope.totalcouples=(data.length/2);
               $scope.couples=0;

               //estadisticas TOTALES para finde partida
                /*finaltotaltries=finaltotaltries+intentos;
                finaltotalcouples=finaltotalcouples+$scope.couples;*/

                              //console.log($scope.usuarios); 

                //Mostrando las cartas al principio
                $scope.inicio=true;
                $scope.clase = "";
                $scope.sms="You have 3 sec for a quick view";

                
               //countdown(timeforlevel);//Inicia el temporizador de nivel
               //countdown clock
                        
                      

              //Mensage de 2 segundos que te deja ver las cartas
                $timeout(function() {
                       $scope.inicio=false;
                       $scope.sms="Choose your card";
                        
                      countdown(timeforlevel);//Inicia el temporizador de nivel
                      //angular.element(".musiclevel").remove();
                      //angular.element("body").append("  <audio class='musiclevel' src='game.mp3'  loop autoplay style='display:none'></audio>");

                },3000);




               //Aqui es donde monto la logica de que se igualen las cartas

               $scope.posa="ninguna";
               $scope.posb="ninguna";
               $scope.levantes=0;
                clase="";          
                intentos=0;
                valora="";
                valorb="";



            }).error(function(data) {  
                  //definir qeu hacer is no encuentra las barajas
                  $scope.level="NETWORK ERROR";

            });

        }//FUNCION RESTART 

  //COMPRUEBA QUE LAS CARTAS SON IGUALES EN DOS INTENTOS O LEVANTADAS
        $scope.igual =function(id,pos,elemento){
           var elemento = angular.element(elemento.srcElement);
               elemento=elemento.parent().parent(".carta");
       
           
          if ( !elemento.hasClass("done") &&  !elemento.hasClass("selected")){
                if(window.navigator.vibrate){
                  window.navigator.vibrate(200); //API VIBRATION for FIREFOX OS
                //window.navigator.vibrate([200, 100, 200]); con patron en medio
                }
            
            $scope.pos=pos;
              intentos++;

            console.log( angular.element("#"+id+"").hasClass("done") );
        
              if (intentos==1) { 
                    valora=id;  
                    $scope.posa=pos; 
                    $scope.sms="Choose your card"; 
                   // sacovalores();
              }
              if (intentos==2) { 
                $scope.levantes++;
                    valorb=id; 
                    $scope.posb=pos; 
                   // sacovalores();      
                      /*Necesito que espere a que lacarta se de la vuelta*/
                      $timeout(function() {
                          /*Comprueba si has acertado*/
                          if( valora==valorb )  {    
                               $scope.sms="Match!!!!"; $scope.done = true;  
                               $scope.couples++;
                                   if($scope.couples==($scope.totalcouples) ){
                                    $scope.sms="Level 1 finished."; 
                                    $scope.newlevel=true;
                                     TIMERSEC=window.clearInterval(TIMERSEC);
                                     //Muestra los botones de siguiente nivel con transicion
                                        $timeout(function() {
                                                     $scope.transition=true;
                                        },500);
                                 }
                               /*USO de JQUERY*/
                               //$(".carta[posicion="+$scope.posa+"]").addClass("done"); $(".carta[posicion="+$scope.posb+"]").addClass("done"); 

                               //Lo mismo con Angular
                                angular.element(".carta[posicion="+$scope.posa+"]").addClass("done");
                                angular.element(".carta[posicion="+$scope.posb+"]").addClass("done");


                                intentos=0; valora=""; valorb="";$scope.posb="ninguna";$scope.posa="ninguna"; 

                           }
                          /*Limpia la partida despues de dos intentos y si no son iguales*/
                          else{                            
                            intentos=0; valora=""; valorb="";$scope.posb="ninguna";$scope.posa="ninguna";  console.log('------ REINICIO');
                            $scope.sms="Doesn´t match, choose again your first card";
                          }
                       },1000); 
              }
              else{console.log('seguimos');}
          }
            function sacovalores(){
                 /*Funcion de comprobadores para DEBUG*/
                     console.log('---------- Clikado ---------- ');
                      console.log('intentos= '+intentos);
                      console.log('id= '+id);
                      console.log('valor1= '+valora);
                      console.log('valor2= '+valorb);
                      //console.log('clase= '+clase);
            }
                 
        }//FUNCION Igualar   

  //INICIAR PARTIDA
  console.log("levelCtrl LOADED");
  console.log("LEVEL: "+$routeParams.levelId);
 
  $scope.restart( $routeParams.levelId);



}]);


//GAMEOVER screen
myApp.controller('gameoverCtrl', ['$scope', '$http','$timeout', function($scope,$http,$timeout) {
  console.log("gameoverCtrl LOADED");
}]);


//GAMEFINISH screen
myApp.controller('gamefinishCtrl', ['$scope', '$http','$timeout', function($scope,$http,$timeout) {
  console.log("gamefinishCtrl LOADED");
}]);







