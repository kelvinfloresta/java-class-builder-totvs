const {capitalize, unCapitalize} = require("./utils")

function buildAtribute(atributeName, atributeType){

    const atributeTypeCapitalized = capitalize(atributeType)
    const atributeNameUnCapitalized = unCapitalize(atributeName)

    return `    private ${atributeTypeCapitalized} ${atributeNameUnCapitalized};
`
}

function getAtributeType(configClassAtribute){
    return typeof configClassAtribute[1] == "string"
    ? capitalize(configClassAtribute[1])
    : capitalize(configClassAtribute[0])
}

function buildAtributes(atributes) {
    return atributes.reduce( (prev,atribute) => {

        const atributeType = getAtributeType(atribute)
        return prev + buildAtribute(atribute[0], atributeType)
    }, "")
}

module.exports = {buildAtributes, getAtributeType}