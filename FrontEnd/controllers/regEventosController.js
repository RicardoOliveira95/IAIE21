function validateSelection(){
    console.log("VALIDATION!")
    var checkboxes=document.getElementsByName("tipo");
    console.log(checkboxes.length)
    var numOfCheckedItems=0

    for(var i=0;i<checkboxes.length;i++){
        if(checkboxes[i].checked)
            numOfCheckedItems++;
    }
    if(numOfCheckedItems>2)
        alert("Só pode seleccionar um técnico!");
    else{
        console.log("VALIDATE")
    }
}