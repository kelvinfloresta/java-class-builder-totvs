const {unCapitalize, capitalize} = require('./utils')
const {buildMethods} = require('./javaMethodBuilder')
const {getAtributeType} = require('./javaAtributeBuilder')

//ID
// @NotNull(groups = { DeleteCheck.class, UpdateCheck.class },
//     message = "Atributo 'identificadorRotinaMovimento' é obrigatório!")
// @Mapping("idRotinaMov")
// private Long identificadorRotinaMovimento;


function getStringAtribute(atributeNameUnCapitalized, {size:{max}} = {size:{max:0}}){

    const todoMsg = max ? "" : "//TODO: Ajustar anotação Size"
    
    return `${todoMsg}
    @Size(max = ${max}, message = "Atributo '${atributeNameUnCapitalized}' pode conter no máximo ${max} caracteres!")
    @Mapping("${atributeNameUnCapitalized}")
    private String ${atributeNameUnCapitalized};`
}

function getCommonAtribute(atributeNameUnCapitalized, atributeType){

    return `@Mapping("${atributeNameUnCapitalized}")
    private ${atributeType} ${atributeNameUnCapitalized};`
}

function getLocalDateAtribute(atributeNameUnCapitalized){

    return `@Mapping("${atributeNameUnCapitalized}")
    @XmlSchemaType(name = "date")
    private LocalDate ${atributeNameUnCapitalized};`
}

function getNumericAtribute(atributeNameUnCapitalized, atributeType, {digits: {integer, fraction}} = {digits: {integer:0, fraction:0}}){

    const todoMsg = !integer || !fraction  ? "//TODO: Ajustar anotação Digits" : ""

    return `${todoMsg}
    @Digits(integer = ${integer}, fraction = ${fraction}, message = "Atributo '${atributeNameUnCapitalized}' pode conter no máximo ${integer} inteiros e ${fraction} decimais!")
    @Mapping("${atributeNameUnCapitalized}")
    private ${atributeType} ${atributeNameUnCapitalized};`
}


function buildDTOAtributes(atributes) {
    return atributes.reduce( (prev,atribute) => {

        const atributeType = getAtributeType(atribute)
        const atributeTypeCapitalized = capitalize(atributeType)
        const atributeNameUnCapitalized = unCapitalize(atribute[0])
        const annotationConfig = atribute[2]
        
        if ( atributeType.toLowerCase() === "string")
        {
            var atribute = getStringAtribute(atributeNameUnCapitalized, annotationConfig)
        }
        else if (atributeType.toLowerCase() === "long" || atributeType.toLowerCase() === "bigdecimal")
        {
            var atribute = getNumericAtribute(atributeNameUnCapitalized, atributeTypeCapitalized, annotationConfig)
        }
        else if(atributeType.toLowerCase() === "localdate")
        {
            var atribute = getLocalDateAtribute(atributeNameUnCapitalized)
        }
        else {
            var atribute = getCommonAtribute(atributeNameUnCapitalized, atributeType)
        }

        return prev + atribute + "\n\n    "
    }, "")
}

function buildDTOClass(packageName, className, atributes, superClass = "AbstractDTO"){
    const classNameDTO = className + "DTO"
    const classNameCapitalized = capitalize(classNameDTO)
    
    return `package ${packageName};
import javax.validation.constraints.Size;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.totvs.tfs.framework.domain.AbstractDTO;

import org.codehaus.jackson.map.annotate.JsonSerialize;
import org.dozer.Mapping;



@XmlAccessorType(XmlAccessType.FIELD)
@JsonInclude(value = JsonInclude.Include.NON_NULL)
@JsonSerialize(include = JsonSerialize.Inclusion.NON_NULL)
public class ${classNameCapitalized} extends ${superClass} {

    ${buildDTOAtributes(atributes)}
    public static synchronized ${classNameCapitalized} create() {
        return new ${classNameCapitalized}();
    }

${buildMethods(className, atributes)}
}`

}

module.exports = buildDTOClass