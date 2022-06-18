//imagens das cartas

let imagens = [];

for(let i=1; i<=8; i++) imagens.push('http://picsum.photos/id/'+i+'/100');



let fundo = 'http://picsum.photos/80?grayscale';

// Estado do Jogo
let cartas = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
let cliquesTravados = false;
let temCartaVirada = false;
let posicaoCartaVirada = -1;
let valorCartaVirada = 0;
let pontos = 0;
const timerDoJogo = new Timer ('#timer');




onload = () => {
    //carrega as imagens de fundo
let elemImagens = document.querySelectorAll('#memoria img');
elemImagens.forEach(
    (img, i) => {
        img.src = fundo;
        img.setAttribute('data-valor', i);
        img.style.opacity = 0.4;
    }
);


//cria o evento do botao inicio
document.querySelector('#btInicio').onclick = iniciaJogo;
};

//INICIA O JOGO
const iniciaJogo = () => {

 // embaralhar as cartas
 for(let i=0; i<cartas.length; i++){
    let p =Math.trunc( Math.random() * cartas.length );
    let aux = cartas[p];
    cartas[p] = cartas[i];
    cartas[i] = aux;
 }

 // associar evento as imagens

 let elemImagens = document.querySelectorAll('#memoria img');
elemImagens.forEach(
    (img, i) => {
        img.onclick = trataCliqueImagem;
        img.style.opacity = 1;
        img.src = fundo;
    });

    //reionicia o estado do jogo
cliquesTravados = false;
temCartaVirada = false;
posicaoCartaVirada = -1;
valorCartaVirada = 0;
pontos = 0;


//Ajusta a interface
document.querySelector('#btInicio').disabled = true;
document.querySelector('#timer').style.backgroundColor = '';
timerDoJogo.start();

};

//PROCESSA O CLIQUE NA IMAGEM

const trataCliqueImagem = (e) => {
    if(cliquesTravados) return;
    const p = +e.target.getAttribute('data-valor');
    const valor = cartas[p];
    e.target.src = imagens[valor - 1];
    e.target.onclick = null;

        if(!temCartaVirada){
            temCartaVirada = true;
            posicaoCartaVirada = p;
            valorCartaVirada = valor;

        } else {
            if(valor == valorCartaVirada) {
                pontos++;
            } else {
                const p0 = posicaoCartaVirada;
                cliquesTravados = true;
                setTimeout( ()=>{
                    e.target.src = fundo;
                    e.target.onclick = trataCliqueImagem;
                    let img = document.querySelector('#memoria #i'+p0);
                    img.src = fundo;
                    img.onclick = trataCliqueImagem;
                    cliquesTravados = false;
                }, 1500 );

            }
            temCartaVirada = false;
            posicaoCartaVirada = -1;
            valorCartaVirada = 0;
        }
    if(pontos == 8) {
        document.querySelector('#btInicio').disabled = false;
        timerDoJogo.stop();
    }

};

// TIMER

function Timer(e){
    this.element = e;
    this.time = 0;
    this.control = null;
    this.start = () => {
        this.time = 0;
        this.control = setInterval( ()=>{
            this.time++;
            const minutes = Math.trunc(this.time/60);
            const seconds = this.time % 60;
            document.querySelector(this.element).innerHTML =
            (minutes <10 ? '0' : '') + 
            minutes + 
            ':' +
            (seconds <10 ? '0':'') +
             seconds;

        }, 1000);
    };
    this.stop = () => {
        clearInterval(this.control);
        this.control = null;
    };

    
}




