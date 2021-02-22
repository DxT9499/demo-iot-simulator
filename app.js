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
    copyimg.style.left = ev.clientX - ev.target.offsetLeft - copyimg.style.width/2 + "px";
    copyimg.style.top = ev.clientY - ev.target.offsetTop - copyimg.style.height/2 + "px";
    ev.target.appendChild(copyimg);
}