getOpcao = JSON.parse(sessionStorage.getItem('opcao'));
document.getElementById("opcaoSelecionada").innerHTML = getOpcao;
urlTema = "";

switch (getOpcao) {
    case 'Filmes':
        urlTema = "https://opentdb.com/api.php?amount=1&category=11&type=multiple";
    break;    
    case 'Games':
        urlTema = "https://opentdb.com/api.php?amount=1&category=15&type=multiple";
    break;
    case 'Desenhos':
        urlTema = "https://opentdb.com/api.php?amount=1&category=32&type=multiple";
    break;    
    case 'Animais':
        urlTema = "https://opentdb.com/api.php?amount=1&category=27&type=multiple";
    break;
    case 'Ciência/Natureza':
        urlTema = "https://opentdb.com/api.php?amount=1&category=17&type=multiple";
    break;    
    case 'Geografia':
        urlTema = "https://opentdb.com/api.php?amount=1&category=22&type=multiple";
    break;
    case 'História':
        urlTema = "https://opentdb.com/api.php?amount=1&category=23&type=multiple";
    break;    
    case 'Esportes':
        urlTema = "https://opentdb.com/api.php?amount=1&category=21&type=multiple";
    break;    
    case 'Livros':
        urlTema = "https://opentdb.com/api.php?amount=1&category=10&type=multiple";
    break;
}

filmAPIResponse = [];
questionQuiz = "";
form = document.querySelector('#form');
botao = document.querySelector('#btn-salvar');
respostaCorreta = "";
numeroPergunta = 1;
questoesCertas = 0;
questoesErradas = 0;

document.getElementById("numeroPergunta").innerHTML = numeroPergunta;
// document.getElementById("questoesCertas").innerHTML = questoesCertas;
// document.getElementById("questoesErradas").innerHTML = questoesErradas;

$('#alert-green').css({display: "none"});
$('#alert-red').css({display: "none"});
$('#alert-gray').css({display: "none"});
// https://opentdb.com/api.php?amount=1&category=11&type=multiple filmes
// https://opentdb.com/api.php?amount=1&category=15&type=multiple games
// https://opentdb.com/api.php?amount=1&category=21&type=multiple sports
// https://opentdb.com/api.php?amount=1&category=10&type=multiple livros
// https://opentdb.com/api.php?amount=1&category=32&type=multiple desenhos animados
// https://opentdb.com/api.php?amount=1&category=17&type=multiple ciencia e natureza
// https://opentdb.com/api.php?amount=1&category=23&type=multiple historia
// https://opentdb.com/api.php?amount=1&category=27&type=multiple animais 
// https://opentdb.com/api.php?amount=1&category=22&type=multiple geografia
function getQuestions() {
    $.ajax({
        url : urlTema,
        type: "GET",
        dataType: "json",
        success: function(data){
            textTranslate(data.results[0].question);
            inserirQuestao(data);
        },
        error: function(){
            console.log("Erro na requisição");
        }  
    });
}

function textTranslate(text) {
    $.ajax({
        url : `https://api.mymemory.translated.net/get?q=${text}&langpair=en|pt`,
        type: "GET",
        dataType: "json",
        success: function(data){
            $("#question").html(data.responseData.translatedText);
        },
        error: function(){
            console.log("Erro na requisição");
        }  
    });
}
// função para traduzir a pergunta
textTranslate();

// função para pegar a pergunta
getQuestions();

function inserirQuestao(filmResponse) {
    filmAPIResponse = [];
    questionTranslate = "";

    filmAPIResponse.push(filmResponse.results[0].correct_answer);
    respostaCorreta = filmResponse.results[0].correct_answer;
    for (let x = 0; x < filmResponse.results[0].incorrect_answers.length; x++) {
        filmAPIResponse.push(filmResponse.results[0].incorrect_answers[x]);
    }

    filmAPIResponse = shuffleArray(filmAPIResponse);
    
    $("#alt1").val(filmAPIResponse[0]);
    $("#alt2").val(filmAPIResponse[1]);
    $("#alt3").val(filmAPIResponse[2]);
    $("#alt4").val(filmAPIResponse[3]);

    $("#lab1").html(filmAPIResponse[0]);
    $("#lab2").html(filmAPIResponse[1]);
    $("#lab3").html(filmAPIResponse[2]);
    $("#lab4").html(filmAPIResponse[3]);
}

// Função para randomizar array
function shuffleArray(arr) {
    // Loop em todos os elementos
    for (let i = arr.length - 1; i > 0; i--) {
            // Escolhendo elemento aleatório
        const j = Math.floor(Math.random() * (i + 1));
        // Reposicionando elemlento
        [arr[i], arr[j]] = [arr[j], arr[i]];
}
// Retornando array com aleatoriedade
return arr;
}

// clicando no radio button
botao.addEventListener('click', function (event) {
    let radioSelecionado;
    $('#alert-gray').css({display: "block"});
    event.preventDefault();
    radioSelecionado = document.querySelector('input[name="alternative"]:checked').value; 
    
    
    if (respostaCorreta === radioSelecionado) {
        $('#alert-red').css({display: "none"});
        $('#alert-gray').css({display: "none"});
        $('#alert-green').css({display: "block"});
        numeroPergunta += numeroPergunta;
        document.getElementById("numeroPergunta").innerHTML = numeroPergunta;
        getQuestions();
    } else if (respostaCorreta != radioSelecionado){
        $('#alert-green').css({display: "none"});
        $('#alert-red').css({display: "block"});
        $('#alert-gray').css({display: "none"});
    } 

});

function atualizaResultados() {
    document.getElementById("numeroPergunta").innerHTML = numeroPergunta;
    document.getElementById("questoesCertas").innerHTML = questoesCertas;
    document.getElementById("questoesErradas").innerHTML = questoesErradas;
}