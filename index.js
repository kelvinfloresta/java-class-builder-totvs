const classBuilder = require("./javaClassBuilder")
const {writeFile} = require("./utils")
const {classes, packageName, condification} = require("./config")

classes.forEach( ({className, atributes}) => {
    const fileContent = classBuilder(packageName, className, atributes)
    const fileName = className + ".java"
    writeFile(fileName, fileContent, condification)
})