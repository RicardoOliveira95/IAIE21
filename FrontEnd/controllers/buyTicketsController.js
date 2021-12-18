let domain = "http://localhost:8080/";

function regBilhete(){

let queryString = window.location.search; 
let urlParams = new URLSearchParams(queryString);
let idEvento = urlParams.get('id_evento');



    var nBilhetes = document.getElementById('nbilhetes').value; 

    var dados = {};
    dados.idEvento=idEvento;
    dados.nome=document.getElementById('nome').value;
    dados.email=document.getElementById('email').value;
    dados.morada=document.getElementById('morada').value;
    dados.nif=document.getElementById('nif').value;
    try{
        for(let i=0; i < nBilhetes; i++){
            fetch(domain+"ticket", {
                headers: { 'Content-Type': 'application/json' },
                method: 'POST',
                body: JSON.stringify(dados) 
            }).then(res => {
                console.log(dados);
                return res.json();
            }).then(dados => {
                console.log(dados);
            })
        }
        alert("Bilhetes comprados com sucesso")
    } catch(err){
        console.log({msg: err});
    }
}
