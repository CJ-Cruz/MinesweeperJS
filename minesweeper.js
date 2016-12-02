

    #========================
    #  Setup
    #========================
     
    #setup global variables
    import random
    s = 0                                   #size variable
    bombs = 0                               #number of bombs
    board = []                              #board with data (data type = number)
    displayBoard = []               #board to display (data type = char/string)
    difficulty = 0                  #difficulty
    gameover = False                #boolean flag
    inactive = 0                    #inactive tiles
    savename = 'minesweeper.txt'
     
    #Notes: If tile value >= 9, it is a bomb.
    #setup board - prepare board, add bombs, set numbers
     
    #when activating an activated tile, activate the unactivated surrounding tiles. Modify activateBoard(x,y).
            #use displayBoard[x][y] to check if the surrounding tile has a flag or not
            #use activateBoard(x+xdelta,y+ydelta) to activate surrounding tiles. remember to check displayBoard[x+xdelta][y+ydelta] first before activating.
     
    def initializeBoard():
            global board, displayBoard
     
            board = []
            displayBoard = []
           
            for i in range(0, s):
                    board.append([])
                    displayBoard.append([])
                    for j in range(0, s):
                            board[i].append(0)
                            displayBoard[i].append('O')
     
    def setupBoard():
            global s, difficulty, bombs, board, displayBoard, inactive
     
            initializeBoard()
           
            # print('Boards setup!')
     
            bombs = s*difficulty
            unsetbombs = bombs
            inactive = (s*s)-bombs
           
            # print(bombs, s)
     
            while unsetbombs != 0:
                    randx = random.randint(0,s-1)
                    randy = random.randint(0,s-1)
                   
                    if(board[randx][randy] < 9):
                            board[randx][randy] = 9
                            unsetbombs -= 1
                            #Increment all tiles around (NOTE: check if i and j will exceed bounds)
                            if randx > 0:
                                    board[randx-1][randy] += 1
                                    if randy > 0:
                                            board[randx-1][randy-1] += 1
                                    if randy < s-1:
                                            board[randx-1][randy+1] += 1
                            if randx < s-1:
                                    board[randx+1][randy] += 1
                                    if randy > 0:
                                            board[randx+1][randy-1] += 1
                                    if randy < s-1:
                                            board[randx+1][randy+1] += 1
                                   
                            if randy < s-1:
                                    board[randx][randy+1] += 1
                            if randy > 0:
                                    board[randx][randy-1] += 1
                           
            # print('bombs placed!')
     
    #prints the display board
    def printDisplayBoard():
           
            #nested for loop to print values of displayBoard only
            printer = '     '
            for i in range(0, s):
                    printer += str(i)+' '
                    if i < 10:
                            printer += ' '
     
            printer += '\n    '
            for i in range(0, s):
                    printer += '___'
            printer += '\n'
            for i in range(0, s):
                    if i < 10:
                            printer += str(i)+'  | '
                    else:
                            printer += str(i)+' | '
     
                    for j in range(0, s):
                            printer += str(displayBoard[i][j])+'  '
                           
                    printer += '\n'
           
            print(printer+'\n')
     
     
    #activates the display board to match the data board
    def activateBoard(x, y):
            global inactive
     
            if not ((x >= 0 and x < s) and (y >= 0 and y < s))
                    print('Invalid coordinates.')
                    return
     
            if gameover: #for activate adjacent
                    return
     
            if displayBoard[x][y] == 'O':
                    if board[x][y] >= 9: #which is a bomb
                            gameOver()
                    elif board[x][y] == 0:
                            #activate all adjacent tiles in display board that has zero value in data board
                            activateAdjBlanks(x, y)
                    else:
                            displayBoard[x][y] = str(board[x][y]) #activate tile in display board (display value)
                            inactive -= 1
     
            elif displayBoard[x][y] != '+':
                    #check count of flags around tile
                    adjacentflags = 0
                    if x > 0:
                            if displayBoard[x-1][y] == '+':
                                    adjacentflags += 1
                            if y < s-1:
                                    if displayBoard[x-1][y+1] == '+':
                                            adjacentflags += 1
                            if y > 0:
                                    if displayBoard[x-1][y-1] == '+':
                                            adjacentflags += 1
                    if x < s-1:
                            if displayBoard[x+1][y] == '+':
                                    adjacentflags += 1
                            if y < s-1:
                                    if displayBoard[x+1][y+1] == '+':
                                            adjacentflags += 1
                            if y > 0:
                                    if displayBoard[x+1][y-1] == '+':
                                            adjacentflags += 1
                    if y > 0:
                            if displayBoard[x][y-1] == '+':
                                    adjacentflags += 1
                    if y < s-1:
                            if displayBoard[x][y+1] == '+':
                                    adjacentflags += 1
           
                    #if equal to current number of tile
                    if adjacentflags == board[x][y]:
                            #activate surrounding tiles that are unflagged
                            activateAdjacent(x,y)
           
     
    def activateAdjacent(x,y):
            if x > 0:
                    if displayBoard[x-1][y] == 'O':
                            activateBoard(x-1,y)
                    if y < s-1:
                            if displayBoard[x-1][y+1] == 'O':
                                    activateBoard(x-1,y+1)
                    if y > 0:
                            if displayBoard[x-1][y-1] == 'O':
                                    activateBoard(x-1,y-1)
            if x < s-1:
                    if displayBoard[x+1][y] == 'O':
                            activateBoard(x+1,y)
                    if y < s-1:
                            if displayBoard[x+1][y+1] == 'O':
                                    activateBoard(x+1,y+1)
                    if y > 0:
                            if displayBoard[x+1][y-1] == 'O':
                                    activateBoard(x+1,y-1)
            if y > 0:
                    if displayBoard[x][y-1] == 'O':
                            activateBoard(x,y-1)
            if y < s-1:
                    if displayBoard[x][y+1] == 'O':
                            activateBoard(x,y+1)
     
    #recursive function that checks all adjacents for activation
    def activateAdjBlanks(x, y):
            global board, displayBoard, inactive
            if displayBoard[x][y] == 'O':
                    if board[x][y] == 0:
                            displayBoard[x][y] = ' '        #also displays edges of very clear minefield (value 0)
                    else:
                            displayBoard[x][y] = str(board[x][y])
                    inactive -= 1
     
            if(board[x][y] == 0 and board[x][y] != -1): #base case
                    board[x][y] = -1        #setup base case to avoid looping recursive case
                    if x > 0:
                            activateAdjBlanks(x-1,y)
                            if y < s-1:
                                    activateAdjBlanks(x-1,y+1)
                            if y > 0:
                                    activateAdjBlanks(x-1,y-1)
                    if x < s-1:
                            activateAdjBlanks(x+1,y)
                            if y < s-1:
                                    activateAdjBlanks(x+1,y+1)
                            if y > 0:
                                    activateAdjBlanks(x+1,y-1)
                   
                    if y > 0:
                            activateAdjBlanks(x,y-1)
                    if y < s-1:
                            activateAdjBlanks(x,y+1)
     
           
    #activates all mine tiles in display
    def gameOver():
            global s, gameover
            #find all mines in board[][] and set it to its matching displayBoard[][]
            for i in range(0, s):
                    for j in range(0, s):
                            if board[i][j] >= 9:
                                    displayBoard[i][j] = 'x'
           
            gameover = True
     
     
    def setFlag(x, y):
            global bombs
     
            if (displayBoard[x][y] == 'O'):
                    if (board[x][y] >= 9):
                            bombs -= 1
                    displayBoard[x][y] = '+' #flag
            elif (displayBoard[x][y] == '+'):
                    if (board[x][y] >= 9):
                            bombs += 1
                    displayBoard[x][y] = 'O'
            else:
                    print('invalid flag placement')
     
    def playerInput():
            autoSave()
            y = int(input('x: '))
            x = int(input('y: '))
            c = int(input('activate = 1; flag = 2. c: '))
            if c == 1:
                    activateBoard(x,y)
                    printDisplayBoard()
            else:
                    setFlag(x,y)
                    printDisplayBoard()
     
    def gameCreate():
            global s, difficulty
            s = 0
            difficulty = 0
     
            while s < 8:
                    s = int(input('What is the size of the sides the board? (min = 8) s: '))
     
            while (difficulty < 1 or difficulty > 5):
                    difficulty = int(input('What is the difficulty of the game? (min = 1, max = 5) difficulty: '))
     
            setupBoard()
            gameStart()
     
    def gameStart():
            printDisplayBoard()
            while((bombs > 0 or inactive > 0) and not gameover):
                    # print('bomb: ' + str(bombs), 'inactive: ' + str(inactive)) #for debug
                    playerInput()
     
            if bombs == 0:
                    print('You defused all bombs!')
            elif gameover:
                    print("Game over!")
     
     
    #loading autosave file
    def loadGame():
            global s, bombs, inactive, board, displayBoard
     
            #split converts string into array of strings by splitting at the given delimiter
     
            loadFile = open(savename, "r")
     
            main = loadFile.readline().split(',') #delimiter is comma; see autosave at 301
            s = int(main[0])
            bombs = int(main[1])
            inactive = int(main[2])
     
            initializeBoard()
     
            for i in range(0,s):
                    row = loadFile.readline().split(',')
                    for j in range(0,s):
                            board[i][j] = int(row[j])
     
            for i in range(0,s):
                    row = loadFile.readline().split(',')
                    for j in range(0,s):
                            displayBoard[i][j] = row[j]
     
            # loadFile.close() #close load file
     
            gameStart()
     
    def autoSave():
            saveFile = open(savename, "w")
     
            saveFile.write(str(s) + ',' + str(bombs) + ',' + str(inactive) + '\n')
            saveBoard(saveFile, board)
            saveBoard(saveFile, displayBoard)
           
            saveFile.close()
            print("Game autosaved")
     
    def saveBoard(file, board):
            saver = ''
            for i in range(0, s):
                    for j in range(0, s):
                            saver += str(board[i][j])+','
                    saver += '\n'
            file.write(saver)
     
    def gameTitle():
            choice = 0
            while choice !=3:
                    print("")
                    print("---------MENU---------")
                    print("1 - New Game")
                    print("2 - Load Game")
                    print("3 - Exit")
                    print("----------------------")
     
                    choice = int(input("Enter your choice: "))
                    print("")
     
                    if choice == 1:
                            gameCreate()
     
                    elif choice == 2:
                            loadGame()
     
    gameTitle()

