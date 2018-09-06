const {projectDir} = require("./config")
const path = require("path")
const fs = require("fs")

function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

function unCapitalize(word) {
    return word.charAt(0).toLowerCase() + word.slice(1);
}

function buildPathToSaveFile(packageName, fileName){
    const dirPackage = packageName.replace(/\./g,"/")
    return path.join(projectDir, dirPackage, fileName)
}

function writeFile(packageName, fileName, fileContent, condification = "latin1"){
    const completePath = buildPathToSaveFile(packageName, fileName)

    fs.writeFileSync(completePath, fileContent, condification); 
    console.log("Caminho:", completePath,"\n");
    
}
module.exports = {capitalize, unCapitalize, writeFile}