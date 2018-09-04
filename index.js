const classBuilder = require("./javaClassBuilder")
const fs = require("fs")
const path = require("path")

const {classes, projectDir, packageName} = require("./config")

const dirPackage = packageName.replace(/\./g,"/")
const directoryToSave = path.join(projectDir, dirPackage)

classes.forEach( ({className, atributes}) => {
    const fileName = className + ".java"
    const content = classBuilder(packageName, className, atributes)

    fs.writeFile(path.join(directoryToSave, fileName), content, 'latin1', function(err) {
        if(err) {
            console.error("Falha ao salvar o arquivo", fileName);
            return console.log(err);
        }
    
        console.log("Arquivo", fileName, "salvo com sucesso!");
    }); 
})