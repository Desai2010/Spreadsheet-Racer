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
function DrawCars() {
    const sheet = SpreadsheetApp.getActiveSheet();
    sheet.getRange ("B2").setBackground("Blue")
    sheet.getRange ("B3").setBackground("pink")
    sheet.getRange ("B4").setBackground ("yellow")
    sheet.getRange ("B5").setBackground ("purple")
    sheet.getRange ("B6").setBackground ("orange")
    sheet.getRange("A8").setValue(2);
    sheet.getRange("A9:A12").setValue(2);
}
function MovePlayer() {
    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    
    const sheet = SpreadsheetApp.getActiveSheet();
  let col = sheet.getRange ("A8").getValue()
  sheet.getRange (2, col).setBackground("Grey")
  col= col + 1
  sheet.getRange (2, col).setBackground("Blue")
  sheet.getRange("A8").setValue(col)
  MoveOpponents();
  lock.releaseLock();
}
function MoveOpponents() {
    const sheet = SpreadsheetApp.getActiveSheet();
    const colors  = ["pink" , "yellow" , "purple" , "orange"];

for (let row = 3; row <= 6; row++) {
    let col = sheet.getRange(row + 6, 1).getValue();
    let color = colors[row - 3];
    sheet.getRange (row, col).setBackground("Grey")
    let steps = Math.floor(Math.random() * 3);
    col = col +steps;
    sheet.getRange(row, col).setBackground(color)
    sheet.getRange(row + 6, 1).setValue(col);
    }
}
function drawtrack() {
    test();
    StartingLine();
    FinishLine();
    DrawCars();
}