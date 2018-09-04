const {capitalize, unCapitalize} = require("./utils")

function buildEquals(className, atributes){

    return `
    
    /*
     * ############################################################
     * ATENÇÃO!!!!!!!!
     * EQUALS NÃO PODE SER ALTERADO!!!
     * NÃO PODE ADICIONAR PROPRIEDADES TRANSIENTES
     * NÃO PODE ADICIONAR ONE-TO-MANY
     * NÃO PODE ADICIONAR MANY-TO-MANY
     * NAS PROPRIEDADES ONE-TO-ONE DEVE SER A QUE DETEM COLUMN
     * ############################################################
    */
    @Override
    public boolean equals(Object obj) {
       if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (this.getClass() != obj.getClass()) {
            return false;
        }

        ${className} other = (${className}) obj;

        ${atributes.reduce( (prev, atribute) => {
            const atributeType = atribute[1]
            const atributeNameUnCapitalized = unCapitalize(atribute[0])

            if ( typeof atributeType === "string")
            {
                var hashCode = getEquals(atributeNameUnCapitalized)
            }
            else if (atributeType.type === "entity")
            {
                var hashCode =  getEqualsEntity(atributeNameUnCapitalized, atributeType.getKey)
            }
            else if(atributeType.type === "enum")
            {
                var hashCode = getEqualsEnum(atributeNameUnCapitalized)
            }

            return prev + hashCode + "\n        "

        }, "")}

        return true;
    }
`
}

function getEquals(atributeNameUnCapitalized){

    return `if (this.${atributeNameUnCapitalized} == null) {

            if (other.${atributeNameUnCapitalized} != null) {
                return false;
            }
        }
        else if (!this.${atributeNameUnCapitalized}.equals(other.${atributeNameUnCapitalized})) {
            return false;
        }
        
`
}

function getEqualsEntity(atributeNameUnCapitalized, methodGetKey){
    
    // Exemplo de como fazer o EQUALS para o relacionamento de Entity Entradalote:
    return `if (this.${atributeNameUnCapitalized} == null) {
            if (other.${atributeNameUnCapitalized} != null) {
                return false;
            }
        }
        else if (this.${atributeNameUnCapitalized}.${methodGetKey}() == null) {
            if (other.${atributeNameUnCapitalized} != null && other.${atributeNameUnCapitalized}.${methodGetKey}() != null) {
                return false;
            }
        }
        else if (!this.${atributeNameUnCapitalized}.${methodGetKey}().equals(null == other.${atributeNameUnCapitalized} ? null : other.${atributeNameUnCapitalized}.${methodGetKey}())) {
            return false;
        }
`
}

function getEqualsEnum(atributeNameUnCapitalized){

    // Exemplo de como fazer o EQUALS para o relacionamento de Enum's:
    return `
        if (this.${atributeNameUnCapitalized} != other.${atributeNameUnCapitalized}) {
            return false;
        }`
}

module.exports = buildEquals