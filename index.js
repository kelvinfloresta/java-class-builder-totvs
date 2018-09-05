const classBuilder = require("./javaClassBuilder")
const classDTOBuilder = require("./javaDTOBuilder")
const {writeFile} = require("./utils")
const {classes, packageName, packageNameDTO, enconding} = require("./config")

classes.forEach( ({className, atributes}) => {
    const fileContent = classBuilder(packageName, className, atributes)
    const fileName = className + ".java"
    writeFile(packageName, fileName, fileContent, enconding)
})

classes.forEach( ({className, atributes, superClassDTO}) => {
    const classNameDTO = className + "DTO"
    const fileContent = classDTOBuilder(packageNameDTO, classNameDTO, atributes, superClassDTO)
    const fileName = classNameDTO + ".java"
    writeFile(packageNameDTO, fileName, fileContent, enconding)
})