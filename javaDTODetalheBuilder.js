const {getAtributeType} = require('./javaAtributeBuilder')
const {unCapitalize, capitalize} = require('./utils')

function buildDTODetalheWithMethod(className, atributeName, atributeType){
    const atributeNameCapitalized = capitalize(atributeName)
    const atributeTypeCapitalized = capitalize(atributeType)
    const atributeNameUnCapitalized = unCapitalize(atributeName)

    return `    public ${className} with${atributeNameCapitalized}(${atributeTypeCapitalized} ${atributeNameUnCapitalized}){
        super.with${atributeNameCapitalized}(${atributeNameUnCapitalized});
        return this;
    }
`
}

function buildMethodsDTODetalhe(className, atributes){

    return atributes.reduce( (prev,next) => {
        const atributeType = getAtributeType(next)

        return prev
        + "    @Override\n"
        + buildDTODetalheWithMethod(className, next[0], atributeType)
        + "\n"

    }, "")
}

function buildClassDTODetalhe(packageName, className, atributes){
    const superClass = className + "DTO"
    const classNameDetalheDTO = className + "DetalheDTO"
    const classNameCapitalized = capitalize(classNameDetalheDTO)

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

    public static synchronized ${classNameCapitalized} create() {
        return new ${classNameCapitalized}();
    }

${buildMethodsDTODetalhe(classNameCapitalized, atributes)}
}`

}

module.exports = buildClassDTODetalhe