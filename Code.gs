// Makes the road grey in all of the lanes
function test() {
const sheet = SpreadsheetApp.getActiveSheet();
sheet.getRange("B2:Y6").setBackground("Grey")    
}
//Paints the green starting line in a column A
function StartingLine() {
    const sheet = SpreadsheetApp.getActiveSheet();
    sheet.getRange("A2:A6").setBackground("Green")
}
//Paints the red finish line in Column Z
function FinishLine() {
    const sheet = SpreadsheetApp.getActiveSheet();
    sheet.getRange("Z2:Z6").setBackground("Red")
}
//Clears leftover cars that drove past the finish line
function ClearPastFinish() {
    const sheet  = SpreadsheetApp.getActiveSheet();
    sheet.getRange("AA2:AB6").setBackground(null)
}
// Puts every car at the start and resets the race memory cells
function DrawCars() {
    const sheet = SpreadsheetApp.getActiveSheet();
    const carColor = sheet.getRange("B19").getValue() || "Blue";
    sheet.getRange ("B2").setBackground(carColor)
    sheet.getRange ("B3").setBackground("pink")
    sheet.getRange ("B4").setBackground ("yellow")
    sheet.getRange ("B5").setBackground ("purple")
    sheet.getRange ("B6").setBackground ("orange")
    sheet.getRange("A8").setValue(2);   //player starts in column 2
    sheet.getRange("A9:A12").setValue(2);   //opponent start in column 2
    sheet.getRange("A13").setValue("");     //race is not over
    sheet.getRange("B1").setValue("");      //clear winner message
    sheet.getRange("B17").setValue(0);      // reset move counter

    // Default to Normal difficulty if none has been picked
    if (sheet.getRange("A14").getValue() === ""){
        sheet.getRange("A14").setValue(3);
    }
}

// Moves the player one space, handles tiles, checks for a win, then moves opponents
function MovePlayer() {
    // Lock so fast double clicks wait their turn instead of overalpping
    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    
    const sheet = SpreadsheetApp.getActiveSheet();
    
    // Do nothing if the race is over or the countdown is running
    if (sheet.getRange("A13").getValue() === "over") {
    lock.releaseLock();
    return;
    }

    const carColor = sheet.getRange("B19").getValue() || "Blue";

    // Count this move
    let moves = Number(sheet.getRange("B17").getValue());
    moves = moves + 1;
    sheet.getRange("B17").setValue(moves);

    // Erase the car from its old spot and move forward one
  let col = sheet.getRange ("A8").getValue()
  sheet.getRange (2, col).setBackground("Grey")
  col= col + 1

// Check the new cell for a title before painting the car over it
let tile = sheet.getRange(2, col).getBackground();
if (tile === "#00ffff") {
    col = col + 2;
}
if (tile === "#000000") {       // oil: wipe it and slide back 1
    sheet.getRange(2, col).setBackground("Grey");
    col = col - 1;
}

// Paint the car in its new spot and save its postion
  sheet.getRange (2, col).setBackground(carColor);
  sheet.getRange("A8").setValue(col);
   
   // Player reached the finish line
    if (col >= 26) {
        sheet.getRange("A13").setValue("over")
        
        // Add a win
        let wins = Number(sheet.getRange("B15").getValue());
        wins = wins + 1;
            sheet.getRange("B15").setValue(wins);

// Save a new best record if this was the fewest moves
            let best = sheet.getRange("B18").getValue();
            if (best === "" || moves < best ) {
                sheet.getRange("B18").setValue(moves);
            }

       // Show the winner message
       sheet.getRange("B1").setValue("YOU WIN");
       sheet.getRange("B1").setFontSize(18); 
       sheet.getRange("B1").setFontWeight("bold");
       sheet.getRange("B1").setFontColor(carColor);
        SpreadsheetApp.getUi().alert("You win in " + moves + " moves!");
        lock.releaseLock();
        return;
    }
  MoveOpponents();
  lock.releaseLock();
}

// Moves each opponent a random number of spaces and checks if one won
function MoveOpponents() {
    const sheet = SpreadsheetApp.getActiveSheet();
    const colors  = ["pink" , "yellow" , "purple" , "orange"];
    const names = ["Pinky", "Sunny", "Grape", "Blaze"];
    const speed = sheet.getRange("A14").getValue();     //difficulty decides max steps

// Rows 3 to 6 are the four oppoenents lanes
for (let row = 3; row <= 6; row++) {
    let col = sheet.getRange(row + 6, 1).getValue();    // memory cell is row + 6 in column A
    let color = colors[row - 3];
    let name = names[row - 3];
    
    // Erase, move a random amount, repaint, and save
    sheet.getRange (row, col).setBackground("Grey")
    let steps = Math.floor(Math.random() * speed);
    col = col +steps;
    sheet.getRange(row, col).setBackground(color)
    sheet.getRange(row + 6, 1).setValue(col);

   // This opponent reached the finish line 
    if (col >=26) {
        sheet.getRange("A13").setValue("over");
       
       // Add a loss
        let losses = Number(sheet.getRange("B16").getValue());
        losses = losses + 1;
        sheet.getRange("B16").setValue(losses);
        
        // Show who won
        sheet.getRange("B1").setValue(name.toUpperCase() + " Wins!");
        sheet.getRange("B1").setFontSize(18);
        sheet.getRange("B1").setFontWeight("bold");
        sheet.getRange("B1").setFontColor(color);
        SpreadsheetApp.getUi().alert(name + " beat you!");
        return;
    }
}
}

// Shows a 3-2-1-Go!  countdown and blocks Go! until it finishes 
function countdown(){
    const sheet = SpreadsheetApp.getActiveSheet();
    sheet.getRange("A13").setValue("over");     //block Go! during countdown
    sheet.getRange("B1").setFontColor("black");
    sheet.getRange("B1").setValue("3");
    SpreadsheetApp.flush();     // show it on screen now 
    Utilities.sleep(1000);      // wait 1 second
    sheet.getRange("B1").setValue("2");
    SpreadsheetApp.flush();
    Utilities.sleep(1000)
    sheet.getRange("B1").setValue("1");
    SpreadsheetApp.flush();
    Utilities.sleep(1000)
    sheet.getRange("B1").setValue("Go!");
    SpreadsheetApp.flush();
    sheet.getRange("A13").setValue("");     // allow Go! again
}

// Opens the sidebar controls panel
function ShowSidebar(){
    const html = HtmlService.createHtmlOutputFromFile("Sidebar");
    SpreadsheetApp.getUi().showSidebar(html);
}

// Runs automatically when the sheet opens and adds the Racer menu
function onOpen(){
    SpreadsheetApp.getUi()
    .createMenu("Racer")
    .addItem("Open controls", "ShowSidebar")
    .addToUi();
}

// Saves the difficulty (2 = Easy, 3= Normal, 4 = Hard)
function setDifficulty(level) {
    const sheet = SpreadsheetApp.getActiveSheet();
    sheet.getRange("A14").setValue(level);
}

// Saves the player's chosen car color
function setCarColor(color) {
    const sheet = SpreadsheetApp.getActiveSheet();
    sheet.getRange("B19").setValue(color);
}

// Resets wins and losses to 0 and clears the best record
function ResetStats() {
    const sheet = SpreadsheetApp.getActiveSheet();
    sheet.getRange("B15:B16").setValue(0);
    sheet.getRange("B18").setValue("");
}

// Sends the stats back to the sidebar
function getStats(){
    const sheet = SpreadsheetApp.getActiveSheet();
    return {
        wins: sheet.getRange("B15").getValue(),
        losses: sheet.getRange("B16").getValue(),
        best: sheet.getRange("B18").getValue()
    };
}

// Places 2 boost tiles and 2 oil slicks at random spots in the player's lane
function placeTiles() {
    const sheet = SpreadsheetApp.getActiveSheet();

    for (let i = 0; i < 2; i++) {
        let boostCol = Math.floor(Math.random() * 20) + 5;
        sheet.getRange(2, boostCol).setBackground("#00ffff");
    let oilCol = Math.floor(Math.random() * 20) + 5;
    sheet.getRange(2, oilCol).setBackground("#000000");

    }
}

// Starts a new race: draws the track, and cars, then counts down
function drawtrack() {
    test();
    placeTiles();
    StartingLine();
    FinishLine();
    ClearPastFinish();
    DrawCars();
    countdown();
} 