const {capitalize} = require('./utils')
const {buildAtributes} = require("./javaAtributeBuilder")
const {buildMethods}   = require("./javaMethodBuilder")

function buildClassDTOFiltro(packageName, className, atributes){
    const classNameFiltroDTO = className + "FiltroDTO"
    const classNameCapitalized = capitalize(classNameFiltroDTO)

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
public class ${classNameCapitalized} {

${buildAtributes(atributes)}

    public static synchronized ${classNameCapitalized} create() {
        return new ${classNameCapitalized}();
    }

${buildMethods(classNameCapitalized, atributes)}
}`

}

module.exports = buildClassDTOFiltro