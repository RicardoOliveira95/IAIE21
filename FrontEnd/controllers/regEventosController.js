let domain = "http://localhost:8080/";
/*
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
*/
function regEvento(){
    var dados = {};
    dados.data_inicio = document.getElementById('start').value;
    dados.tipo = document.getElementById('tipo').value;
    dados.descricao = document.getElementById('descricao').value;
    console.log(domain+"evento");
    try{
        fetch(domain+"evento", {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify(dados) 
        }).then(res => {
            console.log(dados);
            return res.json();
        }).then(dados => {
            console.log(dados);
        })
        alert("Evento criado com sucesso")
    } catch(err){
        console.log({msg: err});
    }
}

