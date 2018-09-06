const buildHashCode    = require("./javaHashCodeBuilder")
const buildEquals      = require("./javaEqualsBuilder")
const {buildMethods}   = require("./javaMethodBuilder")
const {buildAtributes} = require("./javaAtributeBuilder")
const {capitalize}     = require("./utils")

function buildClass(packageName, className, atributes, nomeSequenceTabela){
    const classNameCapitalized = capitalize(className)
    return `package ${packageName};

public class ${className} {

    @Id
    @GeneratedValue( strategy = GenerationType.TABLE
                    , generator = "${nomeSequenceTabela}_id.seq")
    @TableGenerator( name = "${nomeSequenceTabela}_id.seq"
                    , initialValue = 1
                    , allocationSize = 1
                    , table = "t900seqs"
                    , pkColumnName = "nm_seq"
                    , pkColumnValue = "${nomeSequenceTabela}_id.seq"
                    , valueColumnName = "cd_seq")
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