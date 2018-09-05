const {unCapitalize, capitalize} = require('./utils')
const buildMethods = require('./javaMethodBuilder')
const {getAtributeType} = require('./javaAtributeBuilder')

// package com.totvs.tfs.gestaoinadimplencia.cadastro.dto;

// import java.time.LocalDateTime;

// import javax.validation.Valid;
// import javax.validation.constraints.Digits;
// import javax.validation.constraints.NotNull;
// import javax.validation.constraints.Size;
// import javax.xml.bind.annotation.XmlAccessType;
// import javax.xml.bind.annotation.XmlAccessorType;
// import javax.xml.bind.annotation.XmlSchemaType;

// import com.fasterxml.jackson.annotation.JsonInclude;
// import com.totvs.tfs.framework.domain.AbstractDTO;
// import com.totvs.tfs.framework.validator.DeleteCheck;
// import com.totvs.tfs.framework.validator.UpdateCheck;
// import com.totvs.tfs.gestaoinadimplencia.cadastro.model.domain.TipoSituacaoProcessamento;

// import org.apache.commons.lang3.StringUtils;
// import org.codehaus.jackson.map.annotate.JsonSerialize;
// 

//ID
// @NotNull(groups = { DeleteCheck.class, UpdateCheck.class },
//     message = "Atributo 'identificadorRotinaMovimento' é obrigatório!")
// @Mapping("idRotinaMov")
// private Long identificadorRotinaMovimento;


function getStringAtribute(atributeNameUnCapitalized, atributeType, {size:{max}} = {size:{max:0}}){

    return `//TODO: Ajustar anotação Size
    @Size(max = ${max}, message = "Atributo '${atributeNameUnCapitalized}' pode conter no máximo ${max} caracteres!")
    @Mapping("${atributeNameUnCapitalized}")
    private String ${atributeNameUnCapitalized};`
}

function getObjectAtribute(atributeNameUnCapitalized, atributeType){

    return `@Mapping("${atributeNameUnCapitalized}")
    private ${atributeType} ${atributeNameUnCapitalized};`
}

function getLocalDateAtribute(atributeNameUnCapitalized){

    return `@Mapping("${atributeNameUnCapitalized}")
    @XmlSchemaType(name = "date")
    private LocalDateTime ${atributeNameUnCapitalized};`
}

function getNumericAtribute(atributeNameUnCapitalized, atributeType, {digits: {integer, fraction}} = {digits: {integer:0, fraction:0}}){
    console.log("integer")
    return `//TODO: Ajustar anotação Digits
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
            var atribute = getStringAtribute(atributeNameUnCapitalized, atributeTypeCapitalized, annotationConfig)
        }
        else if (atributeType.toLowerCase() === "long" || atributeType.toLowerCase() === "bigdecimal")
        {
            var atribute = getNumericAtribute(atributeNameUnCapitalized, atributeTypeCapitalized, annotationConfig)
        }
        else if(atributeType.toLowerCase() === "localdate")
        {
            var atribute = getLocalDateAtribute(atributeNameUnCapitalized, )
        }
        else if( typeof atribute[1] === "object"){
            var atribute = getObjectAtribute(atributeNameUnCapitalized, atributeType)
        }

        return prev + atribute + "\n\n    "
    }, "")
}

function buildDTOClass(packageName, className, atributes, superClass = "AbstractDTO"){
    const classNameCapitalized = capitalize(className)
    
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