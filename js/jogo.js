// Declaração das variáveis globais
let desempenho = 0;
let tentativas = 0;
let acertos = 0;
let jogar = true;

const btnReiniciar = document.getElementById('reiniciar');
const btnJogarNovamente = document.getElementById('joganovamente');

// Função que zera os valores das variáveis controladoras
function reiniciar() {
  desempenho = 0;
  tentativas = 0;
  acertos = 0;
  jogar = true;
  jogarNovamente();
  atualizaPlacar(0, 0);
  btnJogarNovamente.className = 'visivel';
  btnReiniciar.className = 'invisivel';
}

// Função jogar novamente
function jogarNovamente() {
  jogar = true;

  const divis = document.querySelectorAll("div[id]");
  divis.forEach(div => {
    if (["0", "1", "2", "3", "4"].includes(div.id)) {
      div.className = "inicial";
    }
  });

  const imagem = document.getElementById("imagem");
  if (imagem) imagem.remove();

  const imagemErro = document.getElementById("ImagemErro");
  if (imagemErro) imagemErro.remove();
}

// Atualiza o placar
function atualizaPlacar(acertos, tentativas) {
  desempenho = (acertos / tentativas) * 100;
  document.getElementById("resposta").innerHTML =
    `Placar - Acertos: ${acertos} Tentativas: ${tentativas} Desempenho: ${Math.round(desempenho)}%`;
}

// Mostra imagem com base no acerto
function mostrarImagem(obj, id, src) {
  const img = new Image(100);
  img.id = id;
  img.src = src;
  obj.appendChild(img);
}

// Função para mostrar acerto com efeitos
function mostrarAcerto(obj) {
  obj.className = "acertou";
  mostrarImagem(obj, "imagem", "https://i.pinimg.com/736x/71/c0/31/71c031b63d6a9380258c4bd815fd285c.jpg");
  obj.classList.add("efeito-acerto", "giro");

  setTimeout(() => obj.classList.remove("efeito-acerto"), 3000);
  setTimeout(() => obj.classList.remove("giro"), 600);

  const som = document.getElementById("somAcerto");
  if (som) {
    som.pause();
    som.currentTime = 0;
    som.volume = 1.0;
    som.play().catch(err => console.warn("Erro ao tocar som:", err));
  }

  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });
}

// Função que sorteia um número aleatório entre 0 e 4 e verifica se o jogador acertou
function verifica(obj) {
  if (!jogar) {
    alert('Clique em "Jogar novamente" AGORA');
    return;
  }

  jogar = false;
  tentativas++;

  if (tentativas === 5) {
    btnJogarNovamente.className = 'invisivel';
    btnReiniciar.className = 'visivel';
  }

  const sorteado = Math.floor(Math.random() * 5);

  if (obj.id == sorteado) {
    mostrarAcerto(obj);
    acertos++;
  } else {
    obj.className = "errou";

    const somErro = document.getElementById("somErro");
    if (somErro) {
      somErro.pause();
      somErro.currentTime = 0;
      somErro.volume = 0.7;
      somErro.play().catch(err => console.warn("Erro ao tocar som de erro:", err));
    }

    const objSorteado = document.getElementById(sorteado);
    objSorteado.className = "acertou";
    mostrarImagem(objSorteado, "imagem", "https://i.pinimg.com/736x/71/c0/31/71c031b63d6a9380258c4bd815fd285c.jpg");

    mostrarImagem(obj, "ImagemErro", "https://i.pinimg.com/736x/a1/9c/b9/a19cb9604c82eb85b51fca32315433d7.jpg");
    obj.classList.add("efeito-erro", "sacudir");

    setTimeout(() => {
      obj.classList.remove("efeito-erro", "sacudir");
    }, 1000);
  }

  atualizaPlacar(acertos, tentativas);
}

// Adiciona eventos aos botões
btnJogarNovamente.addEventListener('click', jogarNovamente);
btnReiniciar.addEventListener('click', reiniciar);
