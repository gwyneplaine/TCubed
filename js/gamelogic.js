$(document).ready(function(){
	var miniMax= {
		// First check if the game is over 
		// If it is, return the score from the current players perspective. 
			
		// If the game is not over, iterate over all the possible moves available to the current player 
		// and push them into an array. 

		// If the move creates an end state, add a positive score to the scores array. 
		// If the move doesn't create an end state, 
		// iterate over all the remaining possible moves 
		// available to the current player

		// Keep doing this until there are no more possible moves. 

		// Return all choices that result in a positive number.
				boardState: {
					rowA:[],
					rowB:[],
					rowC:[],
				},
				gridState:[],
				min: function(){

				},
				max: function(){
					//Find all possible moves on the Board. 

				},
				findPossibleMoves: function(){
					var pMoves = [];
					$('.grid').each(function(){

						pMoves.push
					});
					
				},
				boardStates: function(){
					var board = [];
					$('.grid').each(function(){
						
						if($(this).hasClass('A')){
							console.log("has playerA");
							board.push("O");
						} else if($(this).hasClass('B')){
							console.log("has playerB");
							board.push('X');
						} else{
							console.log("has no player");
							board.push('_');
						}
					});
					gridState = board;
					for(var i = 0; i < 3; i++){
						this.boardState.rowA.push(board[i])
					}
					for(var i = 3; i< 6; i++){
						this.boardState.rowB.push(board[i])
					}
					for(var i = 6; i<8;i++){
						this.boardState.rowC.push(board[i])
					}
					console.log(gridState);
				},


		};	
	var tictactoe = {
		moveCounter: 2,
		gridArray: [],
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
				tictactoe.gridArray.push(this);	
			})
		},
		gameState: function(){
		},

		checkMove: function(){
			var $grids= $('#tcubed').find('.grid');
			$grids.each(function(){

			});
		},
		computer: function(){
			var $grids= $('#tcubed').find('.grid');
			var availableTiles = [];
			var move;
			$grids.each(function(){
				if(!$(this).hasClass('occupied')){
					availableTiles.push(this);
					console.log(availableTiles);
				}
			});
			move = availableTiles[Math.floor(Math.random()*availableTiles.length)];
			console.log(move);
			$move = "#" + move.id;
			$($move).addClass('B');
			$($move).addClass("occupied");
			$($move).data('gridValue',4);
			tictactoe.counter++;
			tictactoe.makeMove('playerA');
		},
		playerA: function (){
			$('#tcubed').one('click','.grid',function(){
				if($(this).hasClass('occupied')){
					tictactoe.makeMove("playerA");
				} else {
					$(this).addClass('A').addClass("occupied").data('gridValue', 3);
					tictactoe.moveCounter++;
					tictactoe.makeMove("playerB");
					
				}
			});
		},
		refreshGrid: function(){
			var newGameState =[];
			$('.grid').each(function(){
				newGameState.push(this);
			});
			tictactoe.gridArray = newGameState;
		},
		playerB: function (){
			$('#tcubed').one('click','.grid',function(){
				if($(this).hasClass('occupied')){
					tictactoe.makeMove('playerA');
				}else{
					$(this).addClass("B").addClass("occupied").data('gridValue', 4);
					tictactoe.moveCounter++;
					tictactoe.makeMove("playerA");
				}
			});			
		},

		makeMove: function (str){
			this.checkWin();
			if(!tictactoe.checkWin()){
				this.refreshGrid();
				console.log(this.gridArray);
				console.log("switch");
				tictactoe.switchTurn();
			}else{
				console.log("endgame");
				$('body').append('<div class="message-container"></div>');
				$('.message-container').append("<div class='message-box'></div>");
				$('.message-box').append('<p class="message"></p><button class="resetbutt">Play another</button>');
				$('.message').text(this.message);
				$('.resetbutt').on('click',function(){
					tictactoe.resetBoard();
				});
				return;
			}
		},
		checkTurn: function(){
			if(this.moveCounter % 2 === 0){
				return true;
			}
			else{
				return false;
			}
		},

		switchTurn: function (){
			console.log("did this once");
			if(this.checkTurn()){
				console.log(this.checkTurn());
				tictactoe.playerA();
			} else {

				tictactoe.playerB();
			}	
		},

		resetBoard: function (){
			$('body').empty();
			tictactoe.playGame();
		},


		checkWin: function (){
			var	playerAwin = "player A has won";
			var	playerBwin = "player B has won";
			if(gameEnd !== true){
				var $grid;
				var $gridValue;
				var diagACheck = 0;
				var diagBCheck = 0;
				//ROWCHECK
				for(var i=0; i<7; i+=3){
					var check = 0;
					var gameEnd = false;
					for(var j=i; j<i+3; j++){
						$grid = tictactoe.gridArray[j].id;
						$gridValue = $("#" + $grid).data('gridValue');
						check += parseInt($gridValue);
						if(check == 9 || check == 12){
							console.log("Game is over");
							if(check == 9){
								this.message = playerBwin; this.playerAcount++
							}
							else{
								this.message = playerAwin; this.playerBcount++
							}
							gameEnd = true;
							return gameEnd;
						} else{
							gameEnd = false;
						}
					}
				}	

				//COLUMN CHECK
				for(var i=0; i<3; i++){
					var check = 0;
					for(var j=i; j<=i+6; j+=3){
						$grid = tictactoe.gridArray[j].id;
						$gridValue = $("#" + $grid).data('gridValue');
						check += parseInt($gridValue);
						if(check == 9 || check == 12){
							gameEnd = true;
							if(check == 9){ 
								this.message = playerAwin; 
								this.playerAcount++
							}
							else{
								this.message = playerBwin;
								this.playerBcount++;
							}
							return gameEnd;
						} else {
							gameEnd = false;
						}
					}
				}

				//DIAG CHECK
				for(var i = 0; i<=this.gridArray.length; i+=4){
					$grid =  this.gridArray[i].id;
					$gridValue = $('#'+$grid).data('gridValue');
					diagACheck  += parseInt($gridValue);
				}

				for(var i = 2; i<=this.gridArray.length-2; i+=2){
					$grid = this.gridArray[i].id;
					$gridValue = $('#'+$grid).data('gridValue');
					diagBCheck += parseInt($gridValue);

				}

				if(diagACheck === 9 || diagBCheck === 9 || diagACheck === 12 || diagBCheck === 12){
					gameEnd = true;
					if(diagACheck === 9 || diagBCheck === 9){
						this.message=playerAwin; this.playerAcount++;
					} 
					else {
						this.message=playerBwin; this.playerBcount++;
					}
					return gameEnd;
				}else if($('.occupied').length === 9){
					this.message = "No more squares, stalemate";
					gameEnd = true;
					return gameEnd;
				} 
				else{
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
	miniMax.boardStates();
});