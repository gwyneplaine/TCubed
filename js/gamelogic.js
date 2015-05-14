$(document).ready(function(){
	$('#player').on('click',function(event){
		event.preventDefault();
		tictactoe.playGame("player");
	});
	$('#CPU').on('click',function(event){
		event.preventDefault();
		tictactoe.playGame("computer");
	});
	var miniMax= {
		// Check if the game is over 
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
				player: "O",
				computer:"X",

				findPossibleMoves: function(){
					var pMoves = [];
					$('.grid').each(function(){
						pMoves.push
					});
					
				},
				makeMove: function(gamestate, move, player){
					var newState = this.copyState(gamestate);
					console.log(newState);
					console.log(newState[move]);
					if(newState[move]=="_"){
						newState[move]=player;
						return newState;
					} else {
						return null;
					}
				},
				copyState: function(gamestate){
					var newGameState = gamestate;
					return newGameState;
				},
				checkWin: function(player, gamestate){
					var board = gamestate;
					console.log("It is now " + player + "'s turn");
					 if((board[0]===player&&board[1]===player&&board[2]===player)||
						(board[3]===player&&board[4]===player&&board[5]===player)||
						(board[6]===player&&board[7]===player&&board[8]===player)|| 
						(board[0]===player&&board[3]===player&&board[6]===player)||
						(board[1]===player&&board[4]===player&&board[7]===player)||
						(board[2]===player&&board[5]===player&&board[8]===player)||
						(board[0]===player&&board[4]===player&&board[8]===player)||
						(board[2]===player&&board[4]===player&&board[6]===player)
						){
					 		console.log("This is a win");
					 		player = this.player;
					 		gameEnd = true;
					 		return gameEnd;
					 }
					else{
					 	gameEnd = false;
					 }
					 return gameEnd;
					// console.log(gridState);
				},
				checkDraw: function(gamestate){
					console.log(gamestate);
					if(gamestate.indexOf("_") === -1){
						return true;
					}else{
						return false;
					}
				},
				convertGrid: function(){
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
					console.log(board);
					return board;
				},
				miniMax: function(){
					var gamestate = this.convertGrid();
					console.log(gamestate);
					var bestMVal = -5;
					var move = 0;
					for(var i=0; i < gamestate.length; i++){
						//for every empty cell in this state, make a move; 
						var newState = this.makeMove(gamestate,i,this.computer);
						console.log(newState);

						if(newState){
							var pMVal = this.minV(newState);
							if(pMVal > bestMVal){
								bestMVal = pMVal;
								move = i;
							}
						}
					}
					return move;
				},
				minV: function(gamestate){
					if(this.checkWin(this.computer, gamestate)){
						return 1;
					}
					else if(this.checkWin(this.player, gamestate)){
						return -1;
					}
					else if(this.checkDraw(gamestate)){
						return 0;
					} else {
						var bMVal = 5;
						var move = 0;
						for(var i=0; i<gamestate.length;i++){
							var newState = this.makeMove(gamestate,i,this.player);

							if(newState){
								var pMVal = this.maxV(newState);
								if(pMVal < bMVal){
									bMVal = pMVal;
									move = i;
									console.log("The minValue of this move is: " + bMVal);
								}
							}
						}
						return bMVal;
					}
				},
				maxV: function(gamestate){
					if(this.checkWin(this.computer, gamestate)){
						return 1;
					} 
					else if(this.checkWin(this.player,gamestate)){
						return -1;
					} 
					else if(this.checkDraw(gamestate)){
						return 0;
					}
					else {
						var bMVal=-5;
						var move=0;
						for(var i =0; i < gamestate.length; i++){
							var newState = this.makeMove(gamestate,i,this.computer);
							if(newState){
								var pMVal = this.minV(newState);
								if(pMVal > bMVal){
									bMVal = pMVal;
									console.log("The maxValue of this move is: "+bMVal)
									move = i
								}
							}
						}
						return bMVal;
					}

				}
		};	
	var tictactoe = {
		moveCounter: 2,
		gameEnd: false,
		gridArray: [],
		mode:"",
		gridSize: 9,
		message:"",
		playerAcount:0,
		playerBcount:0,
		createGrid: function (){
			$('body').empty();
			var counterG = 0;
			var tcubedCanvas = $('body').append('<div id="tcubed"></div><div class="counter"></div>');
			$('.counter').append('<ul><li class="pAcount"></li><li class="pBcount"></li></ul>');

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
			});
			$('.pAcount').text("Player A: " + this.playerAcount);
			if(this.mode === "computer"){
				$('.pBcount').text("Computer: " + this.playerBcount);
				$('.grid').addClass("hal9000");
			}else{
				$('.pBcount').text("Player B: " + this.playerBcount);
			}
			
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
			var availableTiles =[];
			var move; 
			var sMove = miniMax.miniMax(this.gridArray);
			$grids.each(function(){
				if(!$(this).hasClass('occupied')){
					availableTiles.push(this);
					console.log(availableTiles);
				}
			});
			move = availableTiles[Math.floor(Math.random()*availableTiles.length)];
			console.log("The best Move is " + sMove);
			$move = "#" + move.id;
			console.log($move);
			$($move).addClass('hal').addClass("occupied").data('gridValue',4);
			tictactoe.moveCounter++;
			tictactoe.makeMove();
		},
		refreshGrid: function(){
			var newGameState =[];
			$('.grid').each(function(){
				newGameState.push(this);
			});
			tictactoe.gridArray = newGameState;
			console.log(newGameState);
		},
		playerA: function (){
			$('.grid').addClass("potentialA").removeClass('potentialB');
			$('#tcubed').one('click','.grid',function(){
				if($(this).hasClass('occupied')){
					tictactoe.makeMove();
				} else {
					$(this).addClass('A').addClass("occupied").data('gridValue', 3);
					tictactoe.moveCounter++;
					tictactoe.makeMove();
				}
			});
		},
		playerB: function (){
			$('.grid').addClass('potentialB').removeClass('potentialA');
			$('#tcubed').one('click','.grid',function(){
				if($(this).hasClass('occupied')){
					tictactoe.makeMove();
				}else{
					$(this).addClass("B").addClass("occupied").data('gridValue', 4);
					tictactoe.moveCounter++;
					tictactoe.makeMove();
				}
			});			
		},

		makeMove: function (str){
			this.checkWin();
			if(!this.gameEnd){
				this.refreshGrid();
				console.log(this.gridArray);
				console.log("switch");
				if(this.mode === "computer"){
					console.log("play against computer");
					tictactoe.playCPU();
				}else if(this.mode ==="player"){
					console.log("play against someone else");
					tictactoe.switchTurn();
				}
			}else if(this.gameEnd){
				console.log("endgame");
				$('body').append('<div class="message-container"></div>');
				$('.message-container').append("<div class='message-box'></div>");
				$('.message-box').append('<p class="message"></p><button class="player">vs player</button><button class="computer">vs CPU</button>');
				$('.message').text(this.message);
				$('.player').on('click',function(){
					tictactoe.resetBoard("player");
				});
				$('.computer').on('click',function(){
					tictactoe.resetBoard('computer');
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
		playCPU: function(){
				if(this.checkTurn()){
					console.log(this.checkTurn());
					tictactoe.playerA();
				} else {
					console.log("computers turn");
					tictactoe.computer();
				}				
		},
		switchTurn: function(str){
			console.log("did this once");
				if(this.checkTurn()){
					console.log(this.checkTurn());
					tictactoe.playerA();
				} else {
					tictactoe.playerB();
				}	
		},

		resetBoard: function (str){
			this.mode = str;
			this.gameEnd = false;
			tictactoe.playGame(this.mode);
		},


		checkWin: function (){
			var	playerAwin = "player A has won";
			var	playerBwin = "player B has won";
			var computerWin = "The computer has won";
			if(this.mode === "computer"){
				playerBwin = computerWin;
			}
			
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
							if(check === 9){
								this.message = playerAwin; 
								this.playerAcount++
								console.log(this.playerAcount);
							}
							else{
								this.message = playerBwin; 
								this.playerBcount++
								console.log(this.playerBcount);
							}
							gameEnd = true;
							this.gameEnd = gameEnd;
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
							this.gameEnd = gameEnd;
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
						this.message=playerAwin; 
						this.playerAcount++;
					} 
					else {
						this.message=playerBwin; 
						this.playerBcount++;
					}
					this.gameEnd = gameEnd;
					return gameEnd;
				}else if($('.occupied').length === 9){
					this.message = "No more squares, stalemate";
					gameEnd = true;
					this.gameEnd = gameEnd;
					return gameEnd;
				} 
				else{
					gameEnd = false;
				}
			}			
			
			return gameEnd;
		},

		playGame: function(str){
			this.mode = str;
			this.createGrid();
			this.makeMove(str);
		}
	}

});