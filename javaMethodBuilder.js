const {capitalize, unCapitalize} = require("./utils")
const {getAtributeType} = require("./javaAtributeBuilder")

function buildWithMethod(className, atributeName, atributeType){
    const atributeNameCapitalized = capitalize(atributeName)
    const atributeTypeCapitalized = capitalize(atributeType)
    const atributeNameUnCapitalized = unCapitalize(atributeName)

    return `    public ${className} with${atributeNameCapitalized}(${atributeTypeCapitalized} ${atributeNameUnCapitalized}){
        this.${atributeNameUnCapitalized} = ${atributeNameUnCapitalized};
        return this;
    }
`
}

function buildSetMethod(atributeName, atributeType){
    const atributeNameCapitalized = capitalize(atributeName)
    const atributeTypeCapitalized = capitalize(atributeType)
    const atributeNameUnCapitalized = unCapitalize(atributeName)

    return `    public void set${atributeNameCapitalized}(${atributeTypeCapitalized} ${atributeNameUnCapitalized}){
        this.${atributeNameUnCapitalized} = ${atributeNameUnCapitalized};
    }
`
}

function buildGetMethod(atributeName, atributeType){
    const atributeNameCapitalized = capitalize(atributeName)
    const atributeTypeCapitalized = capitalize(atributeType)
    const atributeNameUnCapitalized = unCapitalize(atributeName)
    
    return `    public ${atributeTypeCapitalized} get${atributeNameCapitalized}(){
        return this.${atributeNameUnCapitalized};
    }
`
}

function buildMethods(className, atributes){

    return atributes.reduce( (prev,next) => {
        const atributeType = getAtributeType(next)

        return prev
        + buildGetMethod(next[0], atributeType)
        + "\n"
        + buildSetMethod(next[0], atributeType)
        + "\n"
        + buildWithMethod(className, next[0], atributeType)
        + "\n"

    }, "")
}

module.exports = buildMethods