module.exports = function getUrlByOpcao(getOpcao, urlTema) 
{ 
    switch (getOpcao) {
    case 'Filmes':
        urlTema = "https://opentdb.com/api.php?amount=1&category=11&type=multiple";
        return urlTema;
    break;    
    case 'Games':
        urlTema = "https://opentdb.com/api.php?amount=1&category=15&type=multiple";
        return urlTema;
    break;
}
}