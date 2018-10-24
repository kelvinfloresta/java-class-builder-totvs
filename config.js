module.exports = {

    projectDir : "C:\\Users\\TOTVS\\workspace\\TBjGestaoInadimplenciaService\\tfs-gestaoinadimplencia-model-cadastro\\src\\main\\java",

    packageName: "com.totvs.tfs.gestaoinadimplencia.cadastro.model",
    packageNameDTO: "com.totvs.tfs.gestaoinadimplencia.cadastro.dto",
    enconding: "latin1", //Condificação do arquivo, o padrão do eclipse é latin1 e não utf-8

    classes: [

        {
            className: "Acordo",
            nomeSequenceTabela: "s_gid_acordo",
            superClassDTO: undefined, //Se não informado o valor padrão é AbstractDTO | Opções: AbstractDTO ou DefaultDTO
            atributes: [
                ["codAcordo","Long"],
                ["codCpfCnpj","String"],
                ["codCorporacao","String"],
                ["dtAcordo","LocalDate"],
                ["valPrincOri","Long"],
                ["valMultaOri","Long"],
                ["valMoraOri","Long"],
                ["valEncargosOri","Long"],
                ["valAtrasoOri","Long"],
                ["valEntrada","Long"],
                ["qtdProdutos","Long"],
                ["perDescontoPrin","Long"],
                ["perDescontoAtr ","Long"],
                ["dtVctEntrada ","LocalDate"],
                ["dtPrimVct ","LocalDate"],
                ["codPlanoPrazo ","Long"],
                ["idSitAcordo ","String"]

            ]
        },
    ]
}
