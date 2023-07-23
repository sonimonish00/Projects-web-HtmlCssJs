/**
 * @author Monish Soni <sonimonish00@gmail.com>
 */

'use strict'
// Global Scope Variables declaration
var tasklist;
var text ;
var todoobj ;

// On Refresh Page Loading the Tasklists
window.onload = populatetask;

// For Today's Date
let n =  new Date();
let y = n.getFullYear();
let m = n.getMonth() + 1;
let d = n.getDate();
let day = n.getDay();
var weekday = ['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.'];
document.getElementById('date-time').innerHTML= d + "/" + m + "/" + y + " (" + weekday[day] +")";

// Enter Key Code
var enterkey = document.getElementById("task");
enterkey.addEventListener("keyup", function(e) {
  if (e.key === 'Enter') {
   e.preventDefault();
   document.getElementById("add").click();
  }
});

/**
 * @name populatetask
 * @description Populates or Display the Tasklist from Localstorage into HTML
 * @param {object} optional
 * 
 */
function populatetask(){
  if (localStorage.getItem('taskitems') == null) {
    tasklist = [];
  }
  else {
    tasklist =  JSON.parse(localStorage.getItem('taskitems'));
  }
  const ulist = document.querySelector('.js-todo-list');
  tasklist.forEach(function(todoobj){
    const linode = document.createElement("li");
    const isChecked = todoobj.checked ? 'checked': '';
    linode.setAttribute('data-key', todoobj.id);
    linode.innerHTML = `
    <input id="${todoobj.id}" type="checkbox" onclick="checkclick(this)"/>
    <label class="strikethrough">${todoobj.text}</label>
    <button id="${todoobj.id}" onclick="deltask(this)" class="btn btn-del">Delete</button>`;
    linode.firstElementChild.checked = isChecked;
    ulist.append(linode);
  });
}

/**
 * @name addtask
 * @description Add Tasks into Localstorage & display into HTML
 * 
 */
function addtask() {
  text = document.getElementById('task').value.trim();
  todoobj = {
    text,
    checked : false,
    id : Date.now(),
  };
    if (text == "") {
      alert("Task Could not be empty");
      return false;
    }
    else {
      tasklist.push(todoobj);
      localStorage.setItem('taskitems', JSON.stringify(tasklist));
      const list = document.querySelector('.js-todo-list'); 
      const node = document.createElement("li"); 
      const isChecked = todoobj.checked ? 'checked': '';
      node.setAttribute('data-key', todoobj.id); 
      node.innerHTML = `
      <input id="${todoobj.id}" type="checkbox" onclick="checkclick(this)"/>
      <label class="strikethrough">${todoobj.text}</label>
      <button id="${todoobj.id}" onclick="deltask(this)" class="btn btn-del">Delete</button>`;
      node.firstElementChild.checked = isChecked;
      list.append(node);
      document.getElementById('task').value = '';
    }
}

/**
 * @name resetask
 * @description delete all tasks in localstorage and Refresh page
 * 
 */
function resetask() {
  localStorage.clear();
  window.location.reload();
}

/**
 * @name checkclick
 * @description Strikes the Text of Checkbox Clicked for marking Task Done.
 * @param {*} cb
 */
function checkclick(cb){
  const index = tasklist.findIndex(item => item.id === Number(cb.id));
  tasklist[index].checked = !tasklist[index].checked;
  localStorage.setItem('taskitems', JSON.stringify(tasklist));
}

/**
 * @name deltask
 * @description delete Individual tasks in localstorage and Refresh page
 * @param {*} dc
 * 
 */
function deltask(dc){
  const index = tasklist.findIndex(item => item.id === Number(dc.id));
  tasklist.splice(index, 1); //Use tasklist[index+1] or something else if got Error
  localStorage.setItem('taskitems', JSON.stringify(tasklist));
  window.location.reload();
}
