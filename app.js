function allowDrop(ev) {
    ev.preventDefault();
}
    
function drag(ev) {
    console.log(ev.target.id + " " + ev.target.parentElement.id);
    if(ev.target.parentElement.id == 'ui-container'){
        ev.dataTransfer.effectAllowed = 'move';
        console.log(ev.dataTransfer.effectAllowed);
        console.log(ev.target.parentElement.id);
    }
    else
        ev.dataTransfer.effectAllowed = 'copy';
    ev.dataTransfer.setData("text", ev.target.id);
}
    
function drop(ev) {
    console.log(ev.target.id + 'on drop function');
    ev.preventDefault();
    var x = ev.clientX;
    var y = ev.clientY;
    if(ev.dataTransfer.effectAllowed == 'move'){
        console.log("test equal");
        var data = ev.dataTransfer.getData("text");
        var img = document.getElementById(data);
        img.style.left = x - 320 + "px";
        img.style.top = y - 50 + "px";
    }
    
    else if(ev.currentTarget.parentElement.id != 'ui-container'){
        var data = ev.dataTransfer.getData("text");
        var copyimg = document.createElement("img");
        var original = document.getElementById(data);
        console.log("unif");
        console.log(ev.target.parentElement.id);
        copyimg.setAttribute('id',original.id + 'onui');
        copyimg.src = original.src;
        copyimg.style.position = "absolute";
        copyimg.style.left = x - 320 + "px";
        copyimg.style.top = y - 50 + "px";
        copyimg.setAttribute('draggable','true');
        copyimg.setAttribute('ondragstart','drag(event)');
        ev.target.appendChild(copyimg);
    }
}

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
      /* if present, the header is where you move the DIV from:*/
      document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
      /* otherwise, move the DIV from anywhere inside the DIV:*/
      elmnt.onmousedown = dragMouseDown;
    }
  
    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }
  
    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
  
    function closeDragElement() {
      /* stop moving when mouse button is released:*/
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }

function openList(evt, title) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    if(document.getElementById(title).style.display == "block") {
        document.getElementById(title).style.display = "none";
        evt.currentTarget.className -= "active";
    }
    else {
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        document.getElementById(title).style.display = "block";
        evt.currentTarget.className += " active";
    }
}

var loadFile = function(event) {
	var evt = document.getElementById('ui-container');
	evt.style.background = "url("+URL.createObjectURL(event.target.files[0])+") no-repeat center";
};