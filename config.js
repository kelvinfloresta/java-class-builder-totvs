module.exports = {

    projectDir : "C:\\TFS\\workspace\\Teste\\src",
    packageName: "br.com.teste",
    codification: "latin1",

    classes: [

        {
            className: "Main",
            atributes: [
                ["nome", "String"],
                ["categoria", { type: "entity", getKey: "getCategoriaId"}],
                ["tipoStatus", { type: "enum"}]
            ]
        },
        {
            className: "Teste",
            atributes: [
                ["nome", "String"],
                ["descricao", "string"],
                ["valor", "BigDecimal"],
            ]
        }
    ]
}
