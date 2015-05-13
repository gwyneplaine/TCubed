$(document).ready(function(){
	var tictactoe = {
		counter: 2,
		gridSize: 9,
		message:"",
		playerAcount:0,
		playerBcount:0,
		createGrid: function (){
			var counterG = 0;
			var tcubedCanvas = $('body').append('<div id="tcubed"></div>');
			for(var i = 0; i < this.gridSize; i++){
				$('#tcubed').append('<div></div>')
				var $grid = $('#tcubed').find('div');
				$grid.addClass('grid');
				$grid.data('gridValue', 0);
			}
			$('.grid').each(function(){			
				counterG++;
				$(this).attr('id',"g" + counterG);	
			})
		},
		miniMax: function(gameState){
			/* 
				First check if the game is over 
				If it is, return the score from the current players perspective. 
					
				If the game is not over, iterate over all the possible moves available to the current player 
				and push them into an array. 

				If the move creates an end state, add a positive score to the scores array. 
				If the move doesn't create an end state, 
				iterate over all the remaining possible moves 
				available to the current player

				Keep doing this until there are no more possible moves. 

				Return all choices that result in a positive number. 
			*/
		},
		computer: function(){
			if(this.checkWin()){
				return this.score;
			} else {
				//generate all possible game states 
			}
		},
		playerA: function (){
			$('#tcubed').one('click','.grid',function(){
				if($(this).hasClass('occupied')){
					tictactoe.makeMove("playerA");
				} else {
					$(this).addClass('A');
					$(this).addClass("occupied");
					$(this).data('gridValue', 3);
					tictactoe.counter++;
					tictactoe.makeMove("playerB");
					
				}
			});
		},

		playerB: function (){
			$('#tcubed').one('click','.grid',function(){
				if($(this).hasClass('occupied')){
					tictactoe.makeMove('playerA');
				}else{
					$(this).addClass("B");
					$(this).addClass("occupied");
					$(this).data('gridValue', 4);
					tictactoe.counter++;
					tictactoe.makeMove("playerA");
				}
			});			
		},

		makeMove: function (str){
			this.checkWin();
			if(!tictactoe.checkWin()){
				console.log("switch");
				tictactoe.switchTurn();
			}else{
				console.log("endgame");
	;			$('body').append('<div class="message-container"></div>');
				$('.message-container').append("<div class='message-box'></div>");
				$('.message-box').append('<p class="message"></p><button class="resetbutt">Play another</button>');
				$('.message').text(this.message);
				$('.resetbutt').on('click',function(){
					tictactoe.resetBoard();
				});
				return;
			}
		},

		resetBoard: function resetBoard(){
			$('body').empty();
			tictactoe.playGame();
		},
		switchTurn: function switchTurn(){
			console.log("did this once");
			if(tictactoe.counter % 2 === 0){
				tictactoe.playerA();
			} else {
				tictactoe.playerB();
			}	
		},

		checkWin: function (){
			var	playerAwin = "player A has won";
			var	playerBwin = "player B has won";
			if($('.occupied').length === 9){
				this.message = "No more squares, stalemate";
				gameEnd = true;
				return gameEnd;
			}
			else{
				var rowA = parseInt($("#g1").data('gridValue')) + parseInt($("#g2").data('gridValue'));
			
				//ROWCHECK
				for(var i=1; i<=7; i+=3){
					var check = 0;
					var gameEnd = false;
					for(var j=i; j<=i+2; j++){
						check += parseInt($('#g'+j).data('gridValue'));
						if(check == 9 || check == 12){
							console.log("Game is over");

							if(check == 9){this.message = playerBwin; this.playerAcount++}
							else{this.message = playerAwin; this.playerBcount++}
							
							gameEnd = true;
							return gameEnd;

						} else{
							gameEnd = false;
						}
					}
				}	
			

				// //COLUMN CHECK
				for(var i=1; i<=3; i++){
					var check = 0;
					for(var j=i; j<=i+6; j+=3){
						check += parseInt($('#g'+j).data('gridValue'));
						if(check == 9 || check == 12){
							console.log("Game is over");
							gameEnd = true;
							if(check == 9){ 
								this.message = playerAwin; 
								this.playerAcount++
							}
							else{
								this.message = playerBwin;
								this.playerBcount++;
							}
							console.log(gameEnd);
							return gameEnd;
						} else {
							gameEnd = false;
						}
					}
				}

				//DIAG CHECK
				var diaga = parseInt($('#g1').data('gridValue')) + parseInt($('#g5').data('gridValue')) + parseInt($('#g9').data('gridValue'));
				var diagb = parseInt($('#g3').data('gridValue')) + parseInt($('#g5').data('gridValue')) + parseInt($('#g7').data('gridValue'));
				if(diaga == 9 || diaga == 12 || diagb == 9 || diagb == 12){
					gameEnd = true;
					if(diaga == 9 || diagb == 9){this.message=playerAwin; this.playerAcount++;} 
					else {this.message=playerBwin; this.playerBcount++;}
					return gameEnd;
					console.log("Game is over");
				} else {
					gameEnd = false;
				}
			}
			return gameEnd;
		},

		playGame: function playGame(){
			this.createGrid();
			this.makeMove();
		}
	}
	tictactoe.playGame();
});