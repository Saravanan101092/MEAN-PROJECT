var fileSystem = require('fs');

var dataInFile = fileSystem.readFile('./debateServer.js','utf-8',function(data,err){
if(err){
console.log(err);
}
dataInFile = data;
});

console.log(dataInFile);