const dadosSalvos = localStorage.getItem("entrada")

const produtos = dadosSalvos ? JSON.parse(dadosSalvos) : [
    {id: 1, tipo: "Viés", cor: "Pink", qtcaixa: 12, total: 0, historico: []},
    {id: 2, tipo: "Viés", cor:"Maleta", qtcaixa: 12, total: 0, historico: []},
    {id: 3, tipo: "Viés", cor:"Preto", qtcaixa: 12, total: 0, historico: []},
    {id: 4, tipo: "Viés", cor:"Teos", qtcaixa: 12, total: 0, historico: []},
    {id: 5, tipo: "Viés", cor:"Branco", qtcaixa: 12, total: 0, historico: []},
    {id: 6, tipo: "Viés", cor:"Mousse", qtcaixa: 12, total: 0, historico: []},
    {id: 7, tipo: "Viés", cor:"Base", qtcaixa: 12, total: 0, historico: []},
    {id: 8, tipo: "Viés", cor:"Rubro", qtcaixa: 12, total: 0, historico: []},
    
    {id: 9, tipo: "Tecido", cor: "Pink", qtcaixa: 1, total: 0, historico: []},
    {id: 10, tipo: "Tecido", cor:"Maleta", qtcaixa: 1, total: 0, historico: []},
    {id: 11, tipo: "Tecido", cor:"Preto", qtcaixa: 1, total: 0, historico: []},
    {id: 12, tipo: "Tecido", cor:"Teos", qtcaixa: 1, total: 0, historico: []},
    {id: 13, tipo: "Tecido", cor:"Branco", qtcaixa: 1, total: 0, historico: []},
    {id: 14, tipo: "Tecido", cor:"Mousse", qtcaixa: 1, total: 0, historico: []},
    {id: 15, tipo: "Tecido", cor:"Base", qtcaixa: 1, total: 0, historico: []},
    {id: 16, tipo: "Tecido", cor:"Rubro", qtcaixa: 1, total: 0, historico: []}
]

let elementoCor = document.getElementById("cores")
const atualizacoes = [];

produtos.forEach( (produto) => {
    const paragrafo = document.createElement("p");
    const botao1 = document.createElement("button");
    const botao3 = document.createElement("button");
    const botaodesfazer = document.createElement("button");
    const div = document.createElement("div");

    atualizarTexto()

    botao1.textContent = "+1";
    botao3.textContent = "+3";
    botaodesfazer.textContent = "Desfazer"

    elementoCor.appendChild(paragrafo);
    elementoCor.appendChild(botao1);
    elementoCor.appendChild(botao3);
    elementoCor.appendChild(botaodesfazer);

    botao1.addEventListener ("click", () => {
        somar(1)
    });

    botao3.addEventListener("click", () => {
        somar(3)
    })

    botaodesfazer.addEventListener ("click", () => {
        desfazerToque()

        atualizarTexto()
    })

    function atualizarTexto() { 
        let historico = produto.historico.join(" + ")
        paragrafo.textContent = produto.tipo + " - " + produto.cor + " - Total: " + produto.total + " - Contagem: " + historico
    }

    atualizacoes.push(atualizarTexto);

    function desfazerToque() {
        if(!produto.historico.length){
            return
        }

        let historico = produto.historico
        let desfazer = historico.pop()    
        
        produto.total -= desfazer

        salvarProdutos()        
    }

    function somar(quantidade) {
        produto.total += quantidade
        produto.historico.push(quantidade)

        atualizarTexto()
        salvarProdutos()
    }
});


function salvarProdutos () {
    const texto = JSON.stringify(produtos)
    localStorage.setItem("entrada", texto);

    localStorage.getItem("entrada")
}

resetar()

function resetar() {
    const botao = document.createElement("button");
    const divReset = document.getElementById("reset")

    botao.textContent = "Resetar tudo";

    divReset.appendChild(botao)

    botao.addEventListener("click", () => {
        produtos.forEach((produto) => {
            produto.total = 0;
            produto.historico = [];
            localStorage.removeItem("produtos");
        });
        
        atualizacoes.forEach((atualizar) => {
            atualizar();
        });
        
        salvarProdutos();
    })
}