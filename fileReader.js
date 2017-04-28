var fileSystem = require('fs');

if(process.argv[2]){
console.log(process.argv[2]);
}else{
	console.log("prod");
}
var dataInFile = fileSystem.readFile('./debateServer.js','utf-8',function(data,err){
if(err){
console.log(err);
}
dataInFile = data;
});

console.log(dataInFile);