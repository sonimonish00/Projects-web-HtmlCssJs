// Declaring Global Empty (Array of Objects) to store Values : [{},{},....{}]
let personArr = [];
let idForUpdate;

// Enter Key Code (First Name & Last Name Input Field)
var firstNameEnterKey = document.getElementById("fName");
var lastNameEnterKey = document.getElementById("lName");
firstNameEnterKey.addEventListener("keyup", function(e) {
  if (e.key === 'Enter') {
   e.preventDefault();
   document.getElementById("add").click();
  }
});
lastNameEnterKey.addEventListener("keyup", function(e) {
    if (e.key === 'Enter') {
     e.preventDefault();
     document.getElementById("add").click();
    }
});
  
// Function to Check for selected no. of rows : returns No. of rows checked in personArr on each call
let selectedNumberOfRows;
function selectedRows(){
    selectedNumberOfRows = 0;
    personArr.forEach(person => {
        if(person.checked){
            selectedNumberOfRows ++;
        }
    })
    document.getElementById('selectedRows').innerText = `Total ${selectedNumberOfRows} selected row(s)`;
    return selectedNumberOfRows;
}

// Function to Add/Insert Data into Array of Objects
function addData() {
    // Checking if the call is for updatedata()
    if (document.getElementById("add").innerText == "Update") {
        let toBeUpdatedfName = document.getElementById("fName").value;
        let toBeUpdatedlName = document.getElementById("lName").value;
        const indexForUpdate = personArr.findIndex((item) => item.id === idForUpdate);
        let conditionCheckForUpdate = Boolean(toBeUpdatedfName != "" && toBeUpdatedlName != "" && toBeUpdatedfName.trim() != "" && toBeUpdatedlName.trim() != "");

        // If Above Condition Satisfies (i.e. No empty string in update section..then only update else alert)
        if (conditionCheckForUpdate) {
            personArr[indexForUpdate].firstN = toBeUpdatedfName;
            personArr[indexForUpdate].lastN = toBeUpdatedlName;

            // Clearing Input Field for new input
            document.getElementById("fName").value = null;
            document.getElementById("lName").value = null;

            // Changing Update to Add Button
            document.querySelector("#add").innerHTML = '<i class="fas fa-plus-circle"></i>' + "Add";

            // remove Global idForUpdate value (Not Required), but just for safety in future.
            idForUpdate = null;
        } else {
            alert("Both Field : First Name & Last Name Are required");
        }
    } else {
        // First Time Creation into object - adding new data & getting First Name & Last Name values
        let fName = document.getElementById("fName").value;
        let lName = document.getElementById("lName").value;
        let conditionCheckForAdd = Boolean(fName == "" || lName == "" || fName.trim() == "" || lName.trim() == "");

        if (conditionCheckForAdd) {
            alert("Both Field : First Name & Last Name Are required");
        } else {
            // Creating an Object of First Name & Last Name Values & Pushing it into personArr (Array of Objects)
            personObj = { id: Date.now(), firstN: fName, lastN: lName, checked : false };
            personArr.push(personObj);

            // Clearing Input Field for new input
            document.getElementById("fName").value = null;
            document.getElementById("lName").value = null;
        }
    }
    // Calling renderTable Function to Render HTMLTable : For Both Update & Delete
    renderTable(personArr);
}

// RenderTable Function : For Rendering Table
function renderTable(personArr) {
    let html = "<table>";
        html += "<tr>";
        html += `<th><input type="checkbox" onclick="selectAllCheck(this)" id="selectall-check" name="selectall"></input></th>`;
        html += "<th>Select All</th>";
        html += `<th id="selectedRows">Total ${selectedNumberOfRows || 0} selected row(s)</th>`;
        html += `<th><button type="button" class="btn btn-danger" onclick="selectedDel(this)" id ="main-delete" disabled>Delete</button></th>`;
        html += "</tr>";
    personArr.forEach((person) => {
        html += "<tr>";
        html += `<td><input type="checkbox" id=${person.id} name="rowCheck" onclick="rowCheck(this)" ${person.checked?'checked':''}></input></td>`;
        html += "<td>" + person.firstN + "</td>";
        html += "<td>" + person.lastN + "</td>";
        html += `<td><button type="button" class="btn btn-success" id=${person.id} onclick="editData(this)">Edit</button></td>`;
        html += `<td><button type="button" class="btn btn-danger" id=${person.id} onclick="deleteData(this)">Delete</button></td>`;
        html += "</tr>";
    });
    html += "</table>";
    document.getElementById("renderTable").innerHTML = html;
}

// Delete Data Function
function deleteData(currentButton) {
    const index = personArr.findIndex((item) => item.id === Number(currentButton.id));
    personArr.splice(index, 1);
    renderTable(personArr);
}

// Edit Data Function
function editData(currentButton) {
    // Getting index of current button element
    const index = personArr.findIndex((item) => item.id === Number(currentButton.id));

    // Change value of first,last name and add button to update.
    document.getElementById("fName").value = personArr[index].firstN;
    document.getElementById("lName").value = personArr[index].lastN;
    document.querySelector("#add").innerHTML = "Update";

    // Storing ID Globally for future use (Update)
    idForUpdate = Number(currentButton.id);
}

// Each Row Checkbox is Clicked
function rowCheck(currentCheckBox){
    const index = personArr.findIndex((item) => item.id === Number(currentCheckBox.id));
    personArr[index].checked = currentCheckBox.checked;
    let rowCheckFlag = false;
    let selectAllCheckBox = document.getElementById('selectall-check');
    let selectAllFlagbyUnselectRowCheck;

    // Even if one of the checked flag is true, store it in rowcheckflag to enable/disable delete button later.
    personArr.forEach(person => {
        if(person.checked){
            rowCheckFlag = true;
        }
    });
    if(rowCheckFlag){
        document.getElementById("main-delete").disabled = false;
    }
    // else means : none of the row checkbox is checked, so here we will also modify unselect all checkbox status
    else{
        selectAllCheckBox.checked = rowCheckFlag;
        document.getElementById("main-delete").disabled = true;
    }
    // if All checkbox are unclicked (true) one by one, set select all to checked
    selectAllFlagbyUnselectRowCheck = personArr.every(({checked}) => !checked);
    if(selectAllFlagbyUnselectRowCheck){
        selectAllCheckBox.checked = false;
    }
    // if All checkbox are clicked (false) one by one, set select all to checked 
    selectAllFlagbyUnselectRowCheck = personArr.some(({checked}) => !checked);
    if(selectAllFlagbyUnselectRowCheck){
        selectAllCheckBox.checked = false;
    }
    else{
        selectAllCheckBox.checked = true;
    }
    //No. of SelectedRows to be Updated at Each Click/Unclick of checkbox click event
    selectedRows();
}

// Select All Checkbox Clicked (Will work for Unselect too)
function selectAllCheck(SelectAllCheckBox){
    let rowcheckboxes = document.getElementsByName("rowCheck");
    // If unchecked, i.e. clicked for first time
    if(SelectAllCheckBox.checked){
        personArr.forEach(person => {
            person.checked = true
        })
        document.getElementById("main-delete").disabled = false;
        for (let rowcheckbox of rowcheckboxes){
            rowcheckbox.checked = SelectAllCheckBox.checked;
        }
    }
    // Else, Clicked Again to uncheck/unselect all
    else{
        personArr.forEach(person => {
            person.checked = false
        })
        document.getElementById("main-delete").disabled = true;
        for (let rowcheckbox of rowcheckboxes){
            rowcheckbox.checked = SelectAllCheckBox.checked;
        }
    }
    //No. of SelectedRows to be Updated at Each Click/Unclick of checkbox click event
    selectedRows();
}

// Selected Rows delete Function
function selectedDel(currSelectedDelButton){
    // store all the Selected/Checked/true object's ID into temporary array of numbers.
    let arrOfSelectedRows = [];
    personArr.forEach(person => {
        if(person.checked){
            arrOfSelectedRows.push(person.id)
        }
    });
    // For each ID in arrays, find correspondin index and delete that corresponding indx from personArr
    let idxOfSelectedID = [];
    arrOfSelectedRows.forEach(id => {
        const index = personArr.findIndex((person) => person.id === Number(id));
        idxOfSelectedID.push(index);
    });
    // Using delete instead of splice for index to remain unchanged
    idxOfSelectedID.forEach(item => delete personArr[item]);
    // Removing undefined and reallocating to main personarr after that
    let personArr2 = personArr.filter(x => x!== undefined);
    personArr = personArr2;
    
    // Rendering table and updating selected no. of rows
    renderTable(personArr);
    selectedRows();
}