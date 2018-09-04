module.exports = {

    projectDir : "C:\\TFS\\workspace\\Teste\\src",
    packageName: "br.com.teste",

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
