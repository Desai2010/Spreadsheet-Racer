function test() {
const sheet = SpreadsheetApp.getActiveSheet();
sheet.getRange("B2:Y6").setBackground("Grey")    
}
function StartingLine() {
    const sheet = SpreadsheetApp.getActiveSheet();
    sheet.getRange("A2:A6").setBackground("Green")
}
function FinishLine() {
    const sheet = SpreadsheetApp.getActiveSheet();
    sheet.getRange("Z2:Z6").setBackground("Red")
}
function ClearPastFinish() {
    const sheet  = SpreadsheetApp.getActiveSheet();
    sheet.getRange("AA2:AB6").setBackground(null)
}
function DrawCars() {
    const sheet = SpreadsheetApp.getActiveSheet();
    const carColor = sheet.getRange("B19").getValue() || "Blue";
    sheet.getRange ("B2").setBackground(carColor)
    sheet.getRange ("B3").setBackground("pink")
    sheet.getRange ("B4").setBackground ("yellow")
    sheet.getRange ("B5").setBackground ("purple")
    sheet.getRange ("B6").setBackground ("orange")
    sheet.getRange("A8").setValue(2);
    sheet.getRange("A9:A12").setValue(2);
    sheet.getRange("A13").setValue("");
    sheet.getRange("B1").setValue("");
    sheet.getRange("B17").setValue(0);

    if (sheet.getRange("A14").getValue() === ""){
        sheet.getRange("A14").setValue(3);
    }
}
function MovePlayer() {
    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    
    const sheet = SpreadsheetApp.getActiveSheet();
    if (sheet.getRange("A13").getValue() === "over") {
    lock.releaseLock();
    return;
    }

    const carColor = sheet.getRange("B19").getValue() || "Blue";

    let moves = Number(sheet.getRange("B17").getValue());
    moves = moves + 1;
    sheet.getRange("B17").setValue(moves);

  let col = sheet.getRange ("A8").getValue()
  sheet.getRange (2, col).setBackground("Grey")
  col= col + 1

let tile = sheet.getRange(2, col).getBackground();
if (tile === "#00ffff") {
    col = col + 2;
}
if (tile === "#000000") {
    sheet.getRange(2, col).setBackground("Grey");
    col = col - 1;
}
  sheet.getRange (2, col).setBackground(carColor);
  sheet.getRange("A8").setValue(col);
   
    if (col >= 26) {
        sheet.getRange("A13").setValue("over")
        let wins = Number(sheet.getRange("B15").getValue());
        wins = wins + 1;
            sheet.getRange("B15").setValue(wins);

            let best = sheet.getRange("B18").getValue();
            if (best === "" || moves < best ) {
                sheet.getRange("B18").setValue(moves);
            }

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
function MoveOpponents() {
    const sheet = SpreadsheetApp.getActiveSheet();
    const colors  = ["pink" , "yellow" , "purple" , "orange"];
    const speed = sheet.getRange("A14").getValue();

for (let row = 3; row <= 6; row++) {
    let col = sheet.getRange(row + 6, 1).getValue();
    let color = colors[row - 3];
    sheet.getRange (row, col).setBackground("Grey")
    let steps = Math.floor(Math.random() * speed);
    col = col +steps;
    sheet.getRange(row, col).setBackground(color)
    sheet.getRange(row + 6, 1).setValue(col);
    
    if (col >=26) {
        sheet.getRange("A13").setValue("over");
        let losses = Number(sheet.getRange("B16").getValue());
        losses = losses + 1;
        sheet.getRange("B16").setValue(losses);
        sheet.getRange("B1").setValue(color.toUpperCase() + " Wins!");
        sheet.getRange("B1").setFontSize(18);
        sheet.getRange("B1").setFontWeight("bold");
        sheet.getRange("B1").setFontColor(color);
        SpreadsheetApp.getUi().alert("You lose");
        return;
    }
}
}
function countdown(){
    const sheet = SpreadsheetApp.getActiveSheet();
    sheet.getRange("A13").setValue("over");
    sheet.getRange("B1").setFontColor("black");
    sheet.getRange("B1").setValue("3");
    SpreadsheetApp.flush();
    Utilities.sleep(1000);
    sheet.getRange("B1").setValue("2");
    SpreadsheetApp.flush();
    Utilities.sleep(1000)
    sheet.getRange("B1").setValue("1");
    SpreadsheetApp.flush();
    Utilities.sleep(1000)
    sheet.getRange("B1").setValue("Go!");
    SpreadsheetApp.flush();
    sheet.getRange("A13").setValue("");
}
function ShowSidebar(){
    const html = HtmlService.createHtmlOutputFromFile("Sidebar");
    SpreadsheetApp.getUi().showSidebar(html);
}
function onOpen(){
    SpreadsheetApp.getUi()
    .createMenu("Racer")
    .addItem("Open controls", "ShowSidebar")
    .addToUi();
}
function setDifficulty(level) {
    const sheet = SpreadsheetApp.getActiveSheet();
    sheet.getRange("A14").setValue(level);
}
function setCarColor(color) {
    const sheet = SpreadsheetApp.getActiveSheet();
    sheet.getRange("B19").setValue(color);
}
function ResetStats() {
    const sheet = SpreadsheetApp.getActiveSheet();
    sheet.getRange("B15:B16").setValue(0);
    sheet.getRange("B18").setValue("");
}
function getStats(){
    const sheet = SpreadsheetApp.getActiveSheet();
    return {
        wins: sheet.getRange("B15").getValue(),
        losses: sheet.getRange("B16").getValue(),
        best: sheet.getRange("B18").getValue()
    };
}
function placeTiles() {
    const sheet = SpreadsheetApp.getActiveSheet();

    for (let i = 0; i < 2; i++) {
        let boostCol = Math.floor(Math.random() * 20) + 5;
        sheet.getRange(2, boostCol).setBackground("#00ffff");
    let oilCol = Math.floor(Math.random() * 20) + 5;
    sheet.getRange(2, oilCol).setBackground("#000000");

    }
}
function drawtrack() {
    test();
    placeTiles();
    StartingLine();
    FinishLine();
    ClearPastFinish();
    DrawCars();
    countdown();
} 