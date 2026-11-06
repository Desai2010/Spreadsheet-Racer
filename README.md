# Spreadsheet Racer

![Spreadsheet Racer](screenshot.png)
A racing game built entirely in Google Sheets with Apps Script. Every cell is a pixel, and you race your car against four computer cars, Pinky, Sunny, Grape and Blaze, from the green start line to the red finish line.

## How to play
1. Click Reset (the blue button under the track) so all five cars line up at the start. A 3-2-1-GO! countdown plays.
2. Open the Racer menu at the top of the sheet and choose Open controls to show the sidebar.
3. Press Go! (or the right arrow key) to move your car, the top lane, forward one cell. Every time you move, the opponents move a random number of cells.
4. Land on a cyan boost tile to jump 2 extra cells. Land on a black oil slick and you lose that turn's move.
5. The first car across the finish line wins, and the winner is announced above the track in its car's color.
6. Press R (or Reset) to start a new race.
## Features
5 lane race against 4 cpu cars
sidebar controls, opened from the racer menu
Right Arrow key to drive, R to reset
3-2-1-GO! countdown
Easy, Normal, Hard, difficulty
Boost tiles and oil slicks
car color picker
Win/Loss counter, move counter, and best record
Live stats in the sidebar
Winner announced in the car's color
So, the race has five lannes: your the one at the top lane, the rest are computer opporated cars. When you click Go! your car will move forward one cell. Your opponents will move a random 1-2 spaces each turn or each time you press Go!. The first car to get from the green start line to the red finish line first wins! The winner is announced in big text above the track, in the winners color a.k.a. the color of their car. The Reset button redraws the track and starts a 3-2-1-GO! countdown. The Go! button is blocked off from use until the countdown ends and after the race ends.
## How it works
- Cells are pixels. A car is one colored cell. To move it, the old cell is painted grey and the new cell is painted the car's color.
- The sheet is the game's memory. Apps Script functions forget everything when they finish, so each car's position is saved as a number in cells A8 to A12. A13 says "over" when Go! should do nothing (during the countdown and after a win), and A14 stores the difficulty.
- One loop moves all four opponents. In MoveOpponents, a for loop runs rows 3 to 6. Each time it reads that car's position, greys the old cell, picks a random number of steps with Math.random, paints the new cell and saves the position. That way I didn't have to write the moving code four times.
- Countdown. SpreadsheetApp.flush() and Utilities.sleep(1000) show each number one second apart.
## What I learned
Before this, I had only used Apps Script for small things, like making my spreadsheets show stats for my school assignments. This was my first time building a full program, my first time using GitHub on my own, and my first time using VS Code. I learned the difference between getValue (reads what's in a cell) and setValue (puts a value into a cell), how for loops save you from repeating code, and how to track down a bug by testing one piece at a time.
## How to run it
Option 1: copy my sheet

1. Open my Google Sheet.
2. Click File → Make a copy.
3. The first time you click a button, Google asks for permission. Click Advanced, then Go to (your copy's name), then Allow.

Option 2: build it yourself

1. Create a new Google Sheet.
2. Go to Extensions → Apps Script.
3. Paste in Code.gs and add Sidebar.html from this repo.
4. Back in the sheet, insert two drawings: a Go button and a Reset button.
5. Assign MovePlayer to the Go button and drawtrack to the Reset button.
6. Optional: resize the columns and rows to 25 pixels so the cells look square.
7. Click Reset to start.

## Use of AI
I wrote the game logic myself. This was my first real coding project, and I used AI to help me learn how the code works.before)
