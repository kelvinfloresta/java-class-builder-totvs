const buildHashCode = require("./javaHashCodeBuilder")
const buildEquals = require("./javaEqualsBuilder")
const {capitalize, unCapitalize} = require("./utils")


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

function buildAtribute(atributeName, atributeType){

    const atributeTypeCapitalized = capitalize(atributeType)
    const atributeNameUnCapitalized = unCapitalize(atributeName)


    return `    private ${atributeTypeCapitalized} ${atributeNameUnCapitalized};
`
}

function buildClass(packageName, className, atributes){
    const classNameCapitalized = capitalize(className)
    return `package ${packageName};

public class ${className} {

${buildAtributes(atributes)}

    public static synchronized ${classNameCapitalized} create() {
        return new ${classNameCapitalized}();
    }

${buildMethods(className, atributes)}
${buildHashCode(atributes)}
${buildEquals(className, atributes)}
}`
}

function buildAtributes(atributes) {
    return atributes.reduce( (prev,next) => prev + buildAtribute(next[0], getAtributeType(next)), "")
}

function getAtributeType(classConfig){
    return typeof classConfig[1] == "string"
    ? classConfig[1]
    : classConfig[0]
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


module.exports = buildClass