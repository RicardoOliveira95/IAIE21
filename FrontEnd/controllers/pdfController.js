let domain = "http://localhost:8080/";

window.onload = function () {
    document.getElementById("download")
        .addEventListener("click", () => {
            const invoice = this.document.getElementById("invoice");
            console.log(invoice);
            console.log(window);
            var opt = {
                margin: 1,
                filename: 'myfile.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
            };
            html2pdf().from(invoice).set(opt).save();
        })
}

function getLink(id){
    moloni.documents('getPDFLink',{"document_id": +id},function(error,result){
        if (error)
          return console.error(error);
      
        console.log(result.url);
        alert(result.url)  //LINK DA FACTURA
      });
}