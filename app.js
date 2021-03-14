function allowDrop(ev) {
    ev.preventDefault();
}
    
function drag(ev) {
    if(ev.target.parentElement.id == 'ui-container'){
        ev.dataTransfer.effectAllowed = 'move';
    }
    else
        ev.dataTransfer.effectAllowed = 'copy';
    ev.dataTransfer.setData("text", ev.target.id);
}
    
function drop(ev) {
    ev.preventDefault();
    var x = ev.clientX;
    var y = ev.clientY;
    if(ev.dataTransfer.effectAllowed == 'move'){
        var data = ev.dataTransfer.getData("text");
        var img = document.getElementById(data);
        img.style.left = x - 320 + "px";
        img.style.top = y - 50 + "px";
    }
    else{
        var data = ev.dataTransfer.getData("text");
        var copyimg = document.createElement("img");
        var original = document.getElementById(data);
        copyimg.setAttribute('id',original.id + '-onui-0');
        while(document.getElementById(copyimg.id) != null){
            let num_order = Number(copyimg.id.slice(-1));
            num_order++;
            console.log(num_order);
            copyimg.setAttribute('id',copyimg.id.replace(/.$/,num_order));
        }
        copyimg.src = original.src;
        copyimg.style.position = "absolute";
        copyimg.style.left = x - 320 + "px";
        copyimg.style.top = y - 50 + "px";
        copyimg.setAttribute('draggable','true');
        copyimg.setAttribute('ondragstart','drag(event)');
        ev.target.appendChild(copyimg);
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