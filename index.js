//Person Obj.

var members = [];

var whichPerson = 0;

var personAge = 0;

var personRel = '';

var personSmoke = false;

//Add Id's

var age = document.querySelector('form').elements[0];

var rel = document.querySelector('form').elements[1];

var smoker = document.querySelector('form').elements[2];

smoker.id = 'smoke'

var add = document.querySelector('form').elements[3];

var submit = document.querySelector('form').elements[4];

var house = document.getElementsByClassName('household');

house[0].id = 'house';

// Check functions

function checkAge() {
    
    var ageLog = parseFloat(age.value);
    
    if (isNaN(ageLog) || ageLog <= 0) {
    
        alert('Please enter Age!');
        
        return false;
    
    } else {
        
        personAge = ageLog; 
        
    }
}

function relStat() {
    
    var stat = rel.value;
    
    if (stat == "") {
    
        alert('Please enter Relationship!');
        
        return false;
        
    } else {
        
        personRel = stat;
        
    }
    
}

function smokeStat() {
    
    var smokeStat = document.getElementById('smoke').checked;
    
    if (smokeStat == true) {
        
        personSmoke = 'Yes';
    
    } else {
        
        personSmoke = 'No';
        
    }
    
    
    
}

//Create list function

function makeList() {
    
    var person = {
        member: whichPerson,
        age: personAge,
        rel: personRel,
        smoker: personSmoke
    }
    
    members.push(person);
    
    var ol = document.getElementById('house');
    
    //Create list
    
    var list = document.createElement("li");
    
    //Create Remove button
    
    var remove = document.createElement("button");
    
    remove.type = 'button';
    remove.value = 'Remove';
    remove.id = whichPerson;
    
    remove.addEventListener('click', function(e){
        
        var indexNum = e.target.id;
        
        //Remove from list
        ol.removeChild(list);
        
        //Remove from members array
        members.splice(indexNum,1);
        
        console.log(members);
        
    })
    
    remove.appendChild(document.createTextNode('X'));
    
    //Add info to list
    
    list.appendChild(document.createTextNode('Member('+whichPerson+ ') ' + 'Age: ' +person.age+ ';' + ' Relationship: ' +person.rel+ ';' +  ' Smoker: ' + person.smoker +' '));
    
    list.appendChild(remove);
    
    ol.appendChild(list);
    
}

//Add Info to List

add.addEventListener('click', addInfo);

function addInfo(e) {
    
    e.preventDefault();
    
    if ( checkAge()==false || relStat()==false) {return false;}
    
    if (members.length==0) {whichPerson = 0;}

    checkAge();
        
    relStat();
    
    smokeStat();
    
    makeList();
    
    console.log(members);
    
    whichPerson++;
    
}

//Submit Info to Server

submit.addEventListener('click', submitInfo);

function submitInfo(e) {
    e.preventDefault();
    
    if (members.length==0) {return false;}
    
    var xhr = new XMLHttpRequest();
    
    var info = JSON.stringify(members);
    
    xhr.open('POST','/',true);
    
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded"); 
    
    xhr.send(info);
    
    document.querySelector('.debug').createTextNode(info);
}