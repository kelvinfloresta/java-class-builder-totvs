const {unCapitalize} = require("./utils")


function buildHashCode(atributes){

    
    return `    /*
     * ############################################################
     * ATENÇÃO!!!!!!!!
     * HASHCODE NÃO PODE SER ALTERADO!!!
     * NÃO PODE ADICIONAR PROPRIEDADES TRANSIENTES
     * NÃO PODE ADICIONAR ONE-TO-MANY
     * NÃO PODE ADICIONAR MANY-TO-MANY
     * NAS PROPRIEDADES ONE-TO-ONE DEVE SER A QUE DETEM COLUMN
     * ############################################################
    */
    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;

        ${atributes.reduce( (prev, atribute) => {
            const atributeType = atribute[1]
            const atributeNameUnCapitalized = unCapitalize(atribute[0])

            if ( typeof atributeType === "string")
            {
                var hashCode = getHashCode(atributeNameUnCapitalized)
            }
            else if (atributeType.type === "entity")
            {
                var hashCode =  getHashCodeEntity(atributeNameUnCapitalized, atributeType.getKey)
            }
            else if(atributeType.type === "enum")
            {
                var hashCode = getHashCodeEnum(atributeNameUnCapitalized)
            }

            return prev + hashCode + "\n        "
        }, "")}
        
        return result;
    }
`
        
// Exemplo de como fazer o HASCODE para o relacionamento de Entity:


// Exemplo de como deve ser o HASHCODE para Enum's:


//        return result;
//    }
}

function getHashCode(atributeNameUnCapitalized){
    return `result = prime * result + (this.${atributeNameUnCapitalized} == null ? 0 : this.${atributeNameUnCapitalized}.hashCode());`
}

function getHashCodeEntity(atributeNameUnCapitalized, methodGetKey){
    return `result = prime * result + (this.${atributeNameUnCapitalized} == null || this.${atributeNameUnCapitalized}.${methodGetKey}() == null ? 0 : this.${atributeNameUnCapitalized}.${methodGetKey}().hashCode());`
}

function getHashCodeEnum(atributeNameUnCapitalized){
    return `result = prime * result + (this.${atributeNameUnCapitalized} == null ? 0 : this.${atributeNameUnCapitalized}.name().hashCode());`
}

module.exports = buildHashCode