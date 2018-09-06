module.exports = {

    projectDir : "C:\\Users\\TOTVS\\workspace\\TBjGestaoInadimplenciaService\\tfs-gestaoinadimplencia-model-cadastro\\src\\main\\java",
    packageName: "com.totvs.tfs.gestaoinadimplencia.cadastro.model",
    packageNameDTO: "com.totvs.tfs.gestaoinadimplencia.cadastro.dto",
    enconding: "latin1",

    classes: [

        {
            className: "Teste2",
            nomeSequenceTabela: "s_gid_teste2",
            superClassDTO: undefined, //Valor padrão = AbstractDTO | Opções: AbstractDTO ou DefaultDTO
            atributes: [
                ["nome", "String", {
                    size: { max: 10},
                    digit: { integer: 4, fraction: 2}
                }],
                ["categoria", { type: "entity", getKey: "getCategoriaId"}],
                ["tipoStatus", { type: "enum"}]
            ]
        },
        {
            className: "Teste",
            nomeSequenceTabela: "s_gid_teste",
            superClassDTO: undefined,
            atributes: [
                ["nome", "Long"],
                ["descricao", "string"],
                ["valor", "BigDecimal"],
            ]
        }
    ]
}
