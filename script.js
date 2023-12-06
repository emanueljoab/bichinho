let bichinho = localStorage.getItem("bichinho")
let nivelFome = localStorage.getItem("nivelfome") || 3;
let nivelCarinho = localStorage.getItem("nivelcarinho") || 3;
let nivelBrincar = localStorage.getItem("nivelbrincar") || 3;
let intervalo = 10 * 60 * 1000; // minutos, segundos, milissegundos
let ultimaExecucao = 0;

document.addEventListener("DOMContentLoaded", function () {
    if (bichinho === null) {
        adotarBichinho();
    }
    setInterval(diminuirNivel, intervalo); // Diminui os níveis após certo tempo
    setInterval(salvarTimestamp, 10000);
    exibirNivel();
    // Verifica se bichinho não é null antes de chamar atualizarImagem
    if (bichinho !== null) {
        atualizarImagem();
    }
});

calcularUltimoTimestamp();

function calcularUltimoTimestamp() {
    const agora = Date.now();
    const horaAgora = new Date(parseInt(agora)).toLocaleString();
    let timestampSalvo = localStorage.getItem('timestamp');
    let horaSalva = new Date(parseInt(timestampSalvo)).toLocaleString();
    console.log(`Hora agora: ${horaAgora}`);
    console.log(`Hora do timestamp: ${horaSalva}`);

    if (timestampSalvo) {
        const tempoDecorrido = agora - timestampSalvo;
        console.log(`O intervalo é de ${tempoDecorrido / 1000}s`);
        if (tempoDecorrido > 10 * 60 * 1000) { // minutos, segundos, milissegundos
            console.log(`O intervalo é maior que 10 segundos`);
            const niveisADiminuir = Math.floor(tempoDecorrido / (10 * 60 * 1000)); // minutos, segundos, milissegundos
            console.log(`Níveis à diminuir: ${niveisADiminuir}`);

            nivelFome = Math.max(0, nivelFome - niveisADiminuir);
            localStorage.setItem("nivelfome", nivelFome);
            nivelCarinho = Math.max(0, nivelCarinho - niveisADiminuir);
            localStorage.setItem("nivelcarinho", nivelCarinho);
            nivelBrincar = Math.max(0, nivelBrincar - niveisADiminuir);
            localStorage.setItem("Nivelbrincar", nivelBrincar);
        }
    }
}

function salvarTimestamp() {
    const agora = Date.now();
    localStorage.setItem("timestamp", agora);
    const timestampSalvo = localStorage.getItem('timestamp')
    let ultimoTimestamp = new Date(parseInt(timestampSalvo)).toLocaleString();
    console.log(`Timestamp salvo às ${ultimoTimestamp}`);
}

function adotarBichinho() {
    localStorage.removeItem("bichinho");
    bicho.classList.remove('pulando');
    let popup = document.getElementById('popup');
    let atividades = document.getElementById('atividades');
    popup.style.display = 'block';
    atividades.style.display = 'none';
    estatisticas.style.display = 'none';

    // Redefine as estatísticas do bichinho para o valor 5
    nivelFome = 3;
    localStorage.setItem("nivelfome", nivelFome);
    nivelCarinho = 3;
    localStorage.setItem("nivelcarinho", nivelCarinho);
    nivelBrincar = 3;
    localStorage.setItem("nivelbrincar", nivelBrincar)
    exibirNivel();

    // Seleciona todos os elementos com a classe 'bichinho-opcao'
    var bichinhosOpcao = document.querySelectorAll('.bichinho-opcao');
    
    // Adiciona um ouvinte de evento de clique a cada elemento
    bichinhosOpcao.forEach(function(bichinhoOpcao) {
        bichinhoOpcao.addEventListener('click', function() {
        bichinho = this.id; // Obtém o texto da div clicada
        localStorage.setItem("bichinho", bichinho);
        popup.style.display = 'none';

        // Não sei porquê mas adicionar essas 3 linhas se faz necessário para carregar o PNG na 1ª vez que o bichinho é adotado
        const imagemSrc = bichinho + "-neutro.png";
        bicho.src = imagemSrc;
        atualizarImagem();
        atividades.style.display = 'block';
        estatisticas.style.display = 'block';
        });
    });
}

function alimentar() {
    const agora = Date.now();
    let comer = document.getElementById('comer');
    let divPPT = document.getElementById('pedra-papel-tesoura');

    if (agora - ultimaExecucao > 2500 && divPPT.style.display !== 'block') {
        if (nivelFome < 10) {
            comer.src = 'comer.gif';
            bicho.style.transition = 'filter 0.1s ease-in-out';
            bicho.style.filter = 'brightness(0.5)';
            nivelFome++
            localStorage.setItem("nivelfome", nivelFome);

            setTimeout(function () {
                comer.src = '';
                bicho.style.filter = 'none';
                exibirNivel();
                atualizarImagem();
            }, 2500);
        }
        ultimaExecucao = agora; // Atualiza o timestamp da última execução
    } else {
        console.log("Aguardando tempo mínimo de 2,5 segundos.");
    }
}

function fazerCarinho() {
    const agora = Date.now();
    let carinho = document.getElementById('carinho');
    let divPPT = document.getElementById('pedra-papel-tesoura');

    if (agora - ultimaExecucao > 2500 && divPPT.style.display !== 'block') {
        if (nivelCarinho < 10) {
            carinho.src = 'carinho.gif';
            nivelCarinho++;
            localStorage.setItem("nivelcarinho", nivelCarinho);

            setTimeout(function () {
                carinho.src = ''; 
                exibirNivel();
                atualizarImagem();
            }, 2500); 
        }
        ultimaExecucao = agora; // Atualiza o timestamp da última execução
    } else {
        console.log("Aguardando tempo mínimo de 2,5 segundos.");
    }
}

function brincar() {
    let agora = Date.now();
    let divPPT = document.getElementById('pedra-papel-tesoura');

    if (agora - ultimaExecucao > 2500 && divPPT.style.display !== 'block') {
        if (nivelBrincar < 10) {
            let imagensPPT = document.querySelectorAll('#pedra, #papel, #tesoura');

            divPPT.style.display = 'block';
            bicho.style.transition = 'filter 0.1s ease-in-out';
            bicho.style.filter = 'brightness(0.5)';

            // Escolha aleatória da máquina
            let escolhaMaquina = imagensPPT[Math.floor(Math.random() * imagensPPT.length)].id;

            function cliqueImagem() {
                agora = Date.now();
                nivelBrincar++;
                localStorage.setItem("nivelbrincar", nivelBrincar);
                escolhaPPT = this.id;
                divPPT.style.display = 'none';
                bicho.style.filter = 'none';

                console.log('Escolha do Usuário: ', escolhaPPT);
                console.log('Escolha da Máquina: ', escolhaMaquina);

                let resultado = determinarVencedor(escolhaPPT, escolhaMaquina);
                console.log(resultado);

                // Remova os listeners de clique após o clique
                imagensPPT.forEach(function (imagem) {
                    imagem.removeEventListener('click', cliqueImagem);
                });

                // Cria a imagem de uma mão para representar o usuário
                let maoUsuario = document.getElementById(escolhaPPT);
                let maoUsuarioSrc = maoUsuario.getAttribute('src');
                let imagemMaoUsuario = document.createElement('img');
                imagemMaoUsuario.src = maoUsuarioSrc;
                imagemMaoUsuario.id = "imagem-mao-usuario";
                imagemMaoUsuario.style.position = 'absolute'
                if (escolhaPPT == 'pedra') {
                    imagemMaoUsuario.style.top = '73%';
                } else if (escolhaPPT == 'papel') {
                    imagemMaoUsuario.style.top = '65%';
                } else if (escolhaPPT == 'tesoura') {
                    imagemMaoUsuario.style.top = '60%';
                }
                imagemMaoUsuario.style.left = '50%';
                imagemMaoUsuario.style.transform = 'translate(-50%)';
                document.getElementById('PPT-usuario').appendChild(imagemMaoUsuario);

                // Cria a imagem de uma mão para representar o bichinho
                let maoMaquina = document.getElementById(escolhaMaquina);
                let maoMaquinaSrc = maoMaquina.getAttribute('src');
                let imagemMaoMaquina = document.createElement('img');
                imagemMaoMaquina.src = maoMaquinaSrc;
                imagemMaoMaquina.id = 'imagem-mao-maquina';
                imagemMaoMaquina.style.transform = 'scaleY(-1)';
                document.getElementById('PPT-maquina').appendChild(imagemMaoMaquina);

                if (resultado === "Usuário venceu!") {
                    imagemMaoUsuario.classList.add('balanco-usuario');
                } else if (resultado === "Máquina venceu!") {
                    imagemMaoMaquina.classList.add('balanco-maquina');
                }

                setTimeout(function () {
                    imagemMaoUsuario.src = '';
                    imagemMaoMaquina.src = '';
                    exibirNivel();
                    atualizarImagem();
                }, 2500);

                ultimaExecucao = agora;
            }

            function determinarVencedor(escolhaUsuario, escolhaMaquina) {
                if (escolhaUsuario === escolhaMaquina) {
                    return "Empate";
                } else if (
                    (escolhaUsuario === "pedra" && escolhaMaquina === "tesoura") ||
                    (escolhaUsuario === "papel" && escolhaMaquina === "pedra") ||
                    (escolhaUsuario === "tesoura" && escolhaMaquina === "papel")
                ) {
                    return "Usuário venceu!";
                } else {
                    return "Máquina venceu!";
                }
            }

            imagensPPT.forEach(function (imagem) {
                // Remova os listeners de clique existentes antes de adicionar novos
                imagem.removeEventListener('click', cliqueImagem);
                // Adicione um novo listener de clique
                imagem.addEventListener('click', cliqueImagem);

            });
        }
        ultimaExecucao = agora; // Atualiza o timestamp da última execução
    } else {
        console.log("Aguardando tempo mínimo de 2,5 segundos.");
    }
}

function abandonar(botao) {
    let agora = Date.now();
    let divPPT = document.getElementById('pedra-papel-tesoura');

    if (agora - ultimaExecucao > 2500 && divPPT.style.display !== 'block') {
        if (botao.innerText === 'Abandonar') {
            botao.innerText = 'Tem certeza?'

            setTimeout(function() {
                botao.innerText = 'Abandonar';
            }, 10000);
        } else {
            adotarBichinho();
            botao.innerHTML = 'Abandonar';
        }
    }

}

function diminuirNivel() { 
    if (nivelFome > 0) {
        nivelFome--;
        localStorage.setItem("nivelfome", nivelFome);
        exibirNivel();
        atualizarImagem();
    }
    if (nivelCarinho > 0) {
        nivelCarinho--;
        localStorage.setItem("nivelcarinho", nivelCarinho);
        exibirNivel();
        atualizarImagem();
    }
    if (nivelBrincar > 0) {
        nivelBrincar--;
        localStorage.setItem("nivelbrincar", nivelBrincar);
        exibirNivel();
        atualizarImagem();
    }
}

function exibirNivel() {
    const coxinha = '&#x1F357;'.repeat(nivelFome);
    const coracao = '&#129505;'.repeat(nivelCarinho);
    const estrela = '&#11088;'.repeat(nivelBrincar);
    document.getElementById("nivelfome").innerHTML = coxinha;
    document.getElementById("nivelcarinho").innerHTML = coracao;
    document.getElementById("nivelbrincar").innerHTML = estrela;
}

function atualizarImagem() {
    const bicho = document.getElementById('bicho');
    if (nivelFome < 3 || nivelCarinho < 3 || nivelBrincar < 3) {
        bicho.src = bichinho + "-triste.png";
    } else if (nivelFome > 6 && nivelCarinho > 6 && nivelBrincar > 6) {
        bicho.src = bichinho + "-feliz.png";
        bicho.classList.add('pulando');
    } else {
        bicho.src = bichinho + "-neutro.png";
    }
}