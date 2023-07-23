// Declaring Global Empty (Array of Objects) to store Values : [{},{},....{}]
let personArr = [];
let idForUpdate;

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
            personObj = { id: Date.now(), firstN: fName, lastN: lName };
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
    personArr.forEach((person) => {
        html += "<tr>";
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

// Static Array of Objects
let personStaticArr = [
    {
        id: 1, 
        firstN: "Monish", 
        lastN: "Soni" 
    },
    {
        id: 2, 
        firstN: "Sarthak", 
        lastN: "Modi" 
    },
    {
        id: 3, 
        firstN: "Nayan", 
        lastN: "Mali" 
    },
    {
        id: 4, 
        firstN: "Mansi", 
        lastN: "Kotkar" 
    },
    {
        id: 5, 
        firstN: "Parth", 
        lastN: "Bagariya" 
    },
    {
        id: 6, 
        firstN: "Yash", 
        lastN: "Mehta" 
    },
    {
        id: 7, 
        firstN: "Mukesh", 
        lastN: "Suthar" 
    },
    {
        id: 8, 
        firstN: "Rikesh", 
        lastN: "Suthar" 
    },
    {
        id: 9, 
        firstN: "Vandan", 
        lastN: "Shah" 
    },
    {
        id: 10, 
        firstN: "Deep", 
        lastN: "Patel" 
    }
]

function renderData(){
    // If array is empty, means nothing new is Added by add() function
    if(personArr.length==0){
        personArr = personStaticArr;
    }
    // Array is Filled with Previous values (1 or more), so push static arrays
    else{
        personStaticArr.forEach(x => personArr.push(x));
    }
    renderTable(personArr);
}
