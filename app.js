function allowDrop(ev) {
    ev.preventDefault();
}
    
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    ev.dataTransfer.effectAllowed = "copy";
}
    
function drop(ev) {
    ev.preventDefault();
    var x = ev.clientX;
    var y = ev.clientY;
    var data = ev.dataTransfer.getData("text");
    var copyimg = document.createElement("img");
    var original = document.getElementById(data);
    copyimg.src = original.src;
    copyimg.style.position = "absolute";
    copyimg.style.left = ev.clientX - ev.target.offsetLeft - (copyimg.style.width/2) + "px";
    copyimg.style.top = ev.clientY - ev.target.offsetTop - (copyimg.style.height/2) + "px";
    ev.target.appendChild(copyimg);
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