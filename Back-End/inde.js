const express = require("express");
const app = express();
app.use('/css', express.static('css'))
//app.use('/assets', express.static('assets'))
const dirname='C:/Users/Utilizador/Desktop/UM/PW/m_temp'

app.get('/', (req, res) => {
	console.log("Here")
	res.sendFile(__dirname+'/inde.html')
});

app.listen(8080);
