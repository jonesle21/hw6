var aBody = document.body;
//add form 
function createForm(){
    var aForm = document.createElement('form');
    var aLegend = document.createElement('legend');
    var aFieldSet = document.createElement('fieldset');
    var legendText = document.createTextNode('Add Workout');
    var labels = ["Name", "Reps", "Weight", "Date", "Unit", 'lbs', 'kg'];
    aForm.setAttribute('id', 'theForm');
    aForm.style.width = '1000px';
    aBody.appendChild(aForm);
    aForm.appendChild(aFieldSet);
    aFieldSet.appendChild(aLegend);
    aLegend.appendChild(legendText)
    //creates input and labels
    for(var i = 0; i < 5; i++){
      var aLabel = document.createElement('label');
      aFieldSet.appendChild(aLabel);
      // pulls the label text from labels array and adds it to the add form
      var labelText = document.createTextNode(labels[i]);
      var aInput = document.createElement('input');
      aLabel.appendChild(labelText);
      aLabel.appendChild(aInput)
      aInput.setAttribute('type', 'text');
      aInput.setAttribute('id', labels[i]);
    }
    //add button
    var button = document.createElement('input');
    button.setAttribute('type', 'submit');
    button.setAttribute('id', 'submit_data');
    aFieldSet.appendChild(button);
    //add button click event
    button.onclick = function(){
      createRow();
    }
}

function createTable(){
  //table is created
    var aTable = document.createElement('table');
    var headers = ["Name","Reps","Weight"," Date", "Unit", "Edit", "Delete"]
    aTable.setAttribute('id','theTable');
    aTable.style.width = '400px';
    aTable.style.border = '4px solid black';
    aBody.appendChild(aTable);
    //header row created for table with proper headers
    var headerRow = aTable.insertRow();
    for(var column = 0; column < 7; column++){
        var header = document.createElement('th');
        var headerText = document.createTextNode(headers[column]);
        header.appendChild(headerText);
        header.style.border = '2px solid black';
        headerRow.appendChild(header);   
    }
   
}
var rowNumber = 1
//creates a row for the table
function createRow(){
  var aTable = document.getElementById('theTable');
  var row = aTable.insertRow();
  var rowInfo = ["Name","Reps","Weight"," Date", "Unit"]
  row.setAttribute('id', rowNumber);
    row.style.border = '2px solid black';
    for(var column = 0; column < 7; column++){
        var data = row.insertCell();
        var info = document.createElement('p');
        if (column === 5){
          var buttonUpdate = document.createElement('button');
          buttonUpdate.innerHTML = 'Update';
          buttonUpdate.setAttribute("onclick", "document.addEventListener('DOMContentLoaded', bindButtons);")
          data.appendChild(buttonUpdate);
        } else if(column === 6){
          var buttonDelete = document.createElement('button');
          buttonDelete.innerHTML = 'Delete';
          data.appendChild(buttonDelete);
          buttonDelete.setAttribute("onclick", "deleteRow('theTable','this')");
          buttonDelete.setAttribute('id', rowNumber)
        } else{
          data.appendChild(info);
          info.setAttribute('id', rowInfo[column]);
        }
        data.style.border = '2px solid black';
        data.style.textAlign = 'center';
    }
    rowNumber++;

}

//deleting row
function deleteRow( table, row){
  //pulls the row that needs to be deleted
  document.getElementById(table);
}


//GET form for adding and updates
document.addEventListener('DOMContentLoaded', bindButtons); 
function bindButtons() {
   document.getElementById('submit_data').addEventListener('click', function(event) {
   // generate AJAX request
   var request = new XMLHttpRequest();
  //putting together the data for the ajax request from form
   var aURL = "flip2.engr.oregonstate.edu:12193/" ;
   var name = document.getElementById('Name').value;
   var queryJoin = '?q=';
   var reps = document.getElementById('Reps').value;
   var equalSign = '='
   var andSign = '&'
   var weight = document.getElementById('Weight').value;
   var date = document.getElementById('Date').value;
   var unit = document.getElementById('Unit').value;
  
   var payload = aURL + queryJoin + 'name=' + name + andSign + 'reps=' + reps + andSign + 'weight=' + weight + andSign + 'date=' + date + andSign + 'unit=' + unit;

   // open and send async. request in required format
   request.open('GET', payload, true);
       // displaying the data
   request.addEventListener('load',    function () {
  
   if(request.status >= 200 && request.status < 400) {
   response = JSON.parse(request.responseText);
   }
    else {
   console.log("Error in network: " + result.status);
   }
   document.getElementById("Name").textContent = response.name;
   document.getElementById("Reps").textContent = response.reps;
   document.getElementById("Weight").textContent = response.weight;
   document.getElementById('Date').textContent = response.date;
   document.getElementById('Unit').textContent = response.unit


   });
   request.send(null);
   event.preventDefault();
   })
 }
  


window.onload = createForm();
window.onload = createTable();
