const buildHashCode    = require("./javaHashCodeBuilder")
const buildEquals      = require("./javaEqualsBuilder")
const buildMethods     = require("./javaMethodBuilder")
const {buildAtributes} = require("./javaAtributeBuilder")
const {capitalize}     = require("./utils")

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


module.exports = buildClass