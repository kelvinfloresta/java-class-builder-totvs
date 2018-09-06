const classBuilder = require("./javaClassBuilder")
const buildDTOClass = require("./javaDTOBuilder")
const buildClassDTODetalhe = require("./javaDTODetalheBuilder")
const buildClassDTOFiltro = require("./javaDTOFiltroBuilder")
const {writeFile} = require("./utils")
const {classes, packageName, packageNameDTO, enconding} = require("./config")


console.log("\n\n**************************************************")
console.log("**************** INICIO PROGRAMA *****************")
console.log("**************************************************\n\n")




classes.forEach( ({className, atributes, superClassDTO, nomeSequenceTabela}) => {
    
    console.log(`***INICIANDO CLASSE ${className}*** \n`)
    /* Build Classe */
    {
        const fileContent = classBuilder(packageName, className, atributes, nomeSequenceTabela)
        const fileName = className + ".java"
        writeFile(packageName, fileName, fileContent, enconding)
    }

    /* Build Classe DTO */
    {
        const fileContent = buildDTOClass(packageNameDTO, className, atributes, superClassDTO)
        const fileName = className + "DTO" + ".java"
        writeFile(packageNameDTO, fileName, fileContent, enconding)
    }

    /* Build Classe DTODetalhe */
    {
        const fileContent = buildClassDTODetalhe(packageNameDTO, className, atributes)
        const fileName = className + "DetalheDTO" + ".java"
        writeFile(packageNameDTO, fileName, fileContent, enconding)
    }

    /* Build Classe DTOFiltro */
    {
        const fileContent = buildClassDTOFiltro(packageNameDTO, className, atributes)
        const fileName = className + "FiltroDTO" + ".java"
        writeFile(packageNameDTO, fileName, fileContent, enconding)
    }

    console.log(`***FIM CLASSE ${className}*** \n\n\n\n`)


})





console.log("**************************************************")
console.log("***************** FIM PROGRAMA *******************")
console.log("**************************************************")
