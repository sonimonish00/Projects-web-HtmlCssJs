function print(table) {
  const appDiv = document.getElementById('app');
  appDiv.appendChild(table)
}

const cols = {0:"H", 1:"G", 2:"F", 3:"E", 4:"D", 5:"C", 6:"B", 7:"A"}
var table = document.createElement("table");
table.setAttribute("id", "chesstable");

for (var i = 1; i < 9; i++) {
    var tr = document.createElement('tr');
    tr.dataset.line = i
    for (var j = 1; j < 9; j++) {
        var td = document.createElement('td');
        td.dataset.col = cols[j-1];
        td.dataset.line = i;
        td.className = (i%2 === j%2) ? "white" : "black";
        tr.appendChild(td);
    }
    table.appendChild(tr);
}

print(table)

document.querySelector('#chesstable')
  .addEventListener('click', (ev) => {
    console.log(ev);
    var finalCordinates = '';
    var topRightSide = null;
    if (ev.target.parentElement.dataset.line - 2 > 0 && ev.target.nextElementSibling !=null) {
        topRightSide = ev.target.nextElementSibling.dataset.col + Number(ev.target.parentElement.dataset.line - 2);
        finalCordinates += topRightSide;
    }

    var topLeftSide = null;
    if (ev.target.parentElement.dataset.line - 2 > 0 && ev.target.previousElementSibling !=null) {
        topLeftSide = ev.target.previousElementSibling.dataset.col + Number(ev.target.parentElement.dataset.line - 2);
        finalCordinates += " "+ topLeftSide;
    }
    var bottomRightSide = null;
    if (Number(ev.target.parentElement.dataset.line) + 2 < 9 && ev.target.nextElementSibling !=null){
        bottomRightSide = ev.target.nextElementSibling.dataset.col + (Number(ev.target.parentElement.dataset.line) + 2);
        finalCordinates += " "+ bottomRightSide;
    }
    var bottomLeftSide = null;
    if (Number(ev.target.parentElement.dataset.line) + 2 < 9 && ev.target.previousElementSibling !=null){
        bottomLeftSide = ev.target.previousElementSibling.dataset.col + (Number(ev.target.parentElement.dataset.line) + 2);
        finalCordinates += " "+ bottomLeftSide;
    }

    var rightSideTop = null;
    if ((ev.target.cellIndex >= 0 && ev.target.cellIndex + 2 < 8) && (ev.target.nextElementSibling.nextElementSibling.dataset.col !=null) && (Number(ev.target.parentElement.dataset.line) - 1 > 0)) {
        rightSideTop = ev.target.nextElementSibling.nextElementSibling.dataset.col + (Number(ev.target.parentElement.dataset.line) - 1);
        finalCordinates += " "+ rightSideTop;
    }

    var rightSideBottom = null;
    if ((ev.target.cellIndex >= 0 && ev.target.cellIndex + 2 < 8) && (ev.target.nextElementSibling.nextElementSibling.dataset.col !=null) && (Number(ev.target.parentElement.dataset.line) + 1 < 9)) {
        rightSideBottom = ev.target.nextElementSibling.nextElementSibling.dataset.col + (Number(ev.target.parentElement.dataset.line) + 1);
        finalCordinates += " "+ rightSideBottom;
    }

    var leftSideTop = null;
    
    if ((ev.target.cellIndex - 2 >= 0 && ev.target.cellIndex < 8 ) && (ev.target.previousElementSibling.previousElementSibling.dataset.col !=null) && (Number(ev.target.parentElement.dataset.line) - 1 > 0)) {
        leftSideTop = ev.target.previousElementSibling.previousElementSibling.dataset.col + (Number(ev.target.parentElement.dataset.line) - 1);
        finalCordinates += " "+ leftSideTop;
    }

    var leftSideBottom = null;
    if ((ev.target.cellIndex - 2 >= 0 && ev.target.cellIndex < 8 ) && (ev.target.previousElementSibling.previousElementSibling.dataset.col !=null) && (Number(ev.target.parentElement.dataset.line) + 1 < 9)) {
        leftSideBottom = ev.target.previousElementSibling.previousElementSibling.dataset.col + (Number(ev.target.parentElement.dataset.line) + 1);
        finalCordinates += " "+ leftSideBottom;
    }

    const [x, y] = [
        ev.target.dataset.col,
        ev.target.dataset.line, 
    ];
    if (x === undefined || y === undefined) {
      return;
    }
    var cordinate = x+y
    if(finalCordinates) {
        // alert("Knight Moves on : " +cordinate +" >>>>>>>>>>>>>"+finalCordinates)
        swal("Knight Moves on : ", cordinate +" ======>>> " +finalCordinates, "success");
    }
});

