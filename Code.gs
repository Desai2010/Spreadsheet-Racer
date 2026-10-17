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

}
function drawtrack() {
    test();
    StartingLine();
    FinishLine();
    DrawCars();
}