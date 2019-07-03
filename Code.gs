
//Do not run myMain More than once as it tends to create new triggers each time, and it may cause data inconsistencies in deletion

function myMain() {
  var form = FormApp.openById("1GVFVwXQIfu4V4LGz-IjHPlpG7Ef2xFCb0ZAk2c7kjxk");
  var ss = SpreadsheetApp.openById("1_yaZ7pqFVTANKw9uN3mKYvoXqQ3QnyH3x6ue81-YbGc");
  var sheet = ss.getSheetByName("StudentsNotYetFilled");
  
  var rollList = sheet.getRange(2, 1, sheet.getLastRow() - 1).getValues();
  
//  form.addListItem()
//      .setTitle('Roll Number')
//      .setChoiceValues(rollList);
//  
  
  Logger.log("Creating new script");
  ScriptApp.newTrigger('onFormSubmit').forSpreadsheet(ss).onFormSubmit().create();
  Logger.log("new script created");
  
  
  form.getItemById(534361636)
      .asListItem()
      .setChoiceValues(rollList);
  
}


function onFormSubmit(e) {
  Logger.log("Form Submit Working");
  var rollNumber = e.namedValues['Register Number'][0];
  Logger.log(rollNumber);
  
  var ss = SpreadsheetApp.openById("1_yaZ7pqFVTANKw9uN3mKYvoXqQ3QnyH3x6ue81-YbGc");
  var sheet = ss.getSheetByName("StudentsNotYetFilled");
  
  // 2 To remove the header
  var rollList = sheet.getRange(2, 1, sheet.getLastRow() - 1).getValues();
  Logger.log("Delete initalised");
  
  
  // Indexing from reverse to avoid complications in row numbers after delete row
  for ( var i = rollList.length - 1 ; i >= 0; i -- ) {
    if (rollList[i][0] == rollNumber) { 
      var lock = LockService.getScriptLock();
      lock.waitLock(1500);
      sheet.deleteRow(parseInt(i) + 2);
      Logger.log(parseInt(i) + 2);
      lock.releaseLock();
    }
  }
  
  Logger.log("Element deleted");
  updateForm();
}



function updateForm() {
  Logger.log("Updating form");
  var form = FormApp.openById("1GVFVwXQIfu4V4LGz-IjHPlpG7Ef2xFCb0ZAk2c7kjxk");
  var ss = SpreadsheetApp.openById("1_yaZ7pqFVTANKw9uN3mKYvoXqQ3QnyH3x6ue81-YbGc");
  var sheet = ss.getSheetByName("StudentsNotYetFilled");
  
  var rollList = sheet.getRange(2, 1, sheet.getLastRow() - 1).getValues();
  
  form.getItemById(534361636).asListItem().setChoiceValues(rollList);

}

// Temporary Function created for debugging
function clear() {
  var form = FormApp.openById("1GVFVwXQIfu4V4LGz-IjHPlpG7Ef2xFCb0ZAk2c7kjxk");
  form.deleteItem(0);
}