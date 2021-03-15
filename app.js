var del_element_id = "";
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
    var x = ev.pageX;
    var y = ev.pageY;
    if(ev.dataTransfer.effectAllowed == 'move'){
        var data = ev.dataTransfer.getData("text");
        var img = document.getElementById(data);
        var shiftX = ev.clientX - ev.target.getBoundingClientRect().left;
        var shiftY = ev.clientY - ev.target.getBoundingClientRect().top;
        img.style.left = x - 320 - img.offsetWidth/2 + "px";
        img.style.top = y - 50 - img.offsetHeight/2 + "px";
    }
    else{
        console.log(ev.dataTransfer.getData("text"))
        var data = ev.dataTransfer.getData("text");
        var copyimg = document.createElement("img");
        var original = document.getElementById(data);
        copyimg.setAttribute('id',original.id + '-onui-0');
        while(document.getElementById(copyimg.id) != null){
            let num_order = Number(copyimg.id.slice(-1));
            num_order++;
            copyimg.setAttribute('id',copyimg.id.replace(/.$/,num_order));
        }
        copyimg.src = original.src;
        copyimg.style.position = "absolute";
        copyimg.style.left = x - 320 - original.offsetWidth/2 + "px";
        copyimg.style.top = y - 50 - original.offsetHeight/2 + "px";
        copyimg.setAttribute('draggable','true');
        copyimg.setAttribute('ondragstart','drag(event)');
        copyimg.setAttribute('cursor','pointer');
        copyimg.setAttribute('onclick','showMiniMenu(this.id)');
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

function showMiniMenu(element_id) {
    var foo = document.getElementById('mini-menu');
    var opponent = document.getElementById(element_id);
    if(foo.style.display == '' || foo.style.display == 'none' || element_id != del_element_id){
            foo.style.display = 'block';
    }
    else {
            foo.style.display = 'none';
    }
    foo.style.left = opponent.offsetLeft + opponent.offsetWidth + "px";
    foo.style.top = opponent.offsetTop + "px";
    del_element_id = element_id;
}

function deleteElement() {
    console.log(del_element_id);
    var element = document.getElementById(del_element_id);
	element.parentNode.removeChild(element);
    document.getElementById('mini-menu').style.display = 'none';
}