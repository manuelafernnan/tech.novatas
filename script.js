/**
 * JavaScript do aplicativo
 * Depende de "jQuery" (https://jquery.com/)
 *
 * OBS1: Este é o aplicativo principal, para que o tema (template) do site
 * opere. Posteriormente, quando necessário, cada página (conteúdo) terá seu
 * próprio JavaScript, assim, somente o JavaScript necessário será carregado.
 * 
 * OBS1: Todas as funções que iniciam com um cifrão ($) fazem parte da 
 * biblioteca jQuery, ou seja, não são do JavaScript "puro" (vanilla).
 *
 * Para saber mais:
 *   • https://www.w3schools.com/js/
 *   • https://www.w3schools.com/jsref/
 *   • https://www.w3schools.com/jquery/
 */

/**
 * runApp() → Aplicativo principal
 * Este aplicativo é executado pela última linha deste código.
 */
function runApp() {

    // Carrega a página inicial:
    loadPage('home');

    /**
     * jQuery → Quando houver click em um elemento <a>, execute o aplicativo 
     * "routerLink":
     **/
    $(document).on('click', 'a', routerLink);

    // Quando clicar em "Aceita cookies":
    $(document).on('click', '#accept', acceptCookies);

    // Detecta se o cookie "aceito cookies" já existe:
    var cookie = getCookie("acceptCookie");

    // Se o cookie existe...
    if (cookie != "") {

        // Oculta mensagem de cookie:
        $('#msgCookies').hide();

        // Se não existe...
    } else {

        // Mostra a mensagem de cookie:
        $('#msgCookies').show();
    }

}

/**
 * routerLink() → Aplicativo que processa cliques nos elementos <a>:
 */
function routerLink() {

    /**
     * jQuery → Recebe o atributo "href" do link clicado e armazena em 'href':
     * A função "$(this)" faz referência ao elemento que foi clicado e disparou 
     * este processo.
     **/
    var href = $(this).attr('href');

    /**
     * Se faz referência a link externo que começa com "http://" OU "https://",
     * ou faz referência a uma âncora que começa com "#"...
     * 
     * OBS: O código "||" (pipe pipe) significa o "OU" (OR) lógico em JavaScript.
     * 
     * Referências: 
     *    https://youtu.be/mp3g9IQ651g
     *    https://www.w3schools.com/jsref/jsref_substring.asp
     *    https://www.w3schools.com/js/js_if_else.asp
     **/
    if (
        // Se clicou em um link que começa com "http://...", OU
        href.substr(0, 7) == 'http://' ||

        // Se clicou em um link que começa com "https://...", OU
        href.substr(0, 8) == 'https://' ||

        // Se clicou em uma âncora que começa com "#"...
        href.substr(0, 1) == '#'
    ) {

        /**
         * Encerra o programa retornando "true" (verdade) para que o HTML abra o 
         * link normalmente:
         **/
        return true;
    }

    /**
     * Chama o aplicativo que carrega a página solicitada:
     */
    loadPage(href);

    /**
     * Encerra o programa retornando "false" (falso) para que a ação do HTML ao
     * clicar no link seja bloqueada:
     **/
    return false;
}

/**
 * Aplicativo que carrega os componentes da página solicitada:
 */
function loadPage(href) {

    /**
     * Gera os links para as partes da página:
     * "page" é um objeto do JavaScript.
     * Referências:
     *     • w3schools.com/js/js_objects.asp
     **/
    var page = {
        "html": `/pages/${href}/index.html`,
        "css": `/pages/${href}/style.css`,
        "js": `/pages/${href}/script.js`
    }

    // jQuery → Obtém o arquivo "index.html" da página:
    $.get(page.html, function (content) {

        // jQuery → Carrega o CSS da página no <head> de "/index.html":
        $('#pageCSS').attr('href', page.css);

        // jQuery → Mostra o HTML dentro de <main> em "/index.html":
        $('#content').html(content);

        // jQuery → Executa o JavaScript da página:
        $.getScript(page.js);

    });

    // Atualiza endereço da página no navegador:
    // window.history.pushState({}, '', href);
}

/**
 * Aplicativo que atualiza o <title> da página:
 */
function getTitle(title = '') {

    // Se a variável "title" está vazia (não que usar um título)...
    if (title == '') {

        // jQuery → O título vai ter o formato "nomeSite .:. sloganSite":
        $('title').html(`Tech.Novatas .:. Toda mulher é capaz de tudo, inclusive programar.`);

        // Se "title" tem um valor diferente de '':
    } else {

        // jQuery → O título va ter o formato "nomeSite .:. nomePagina":
        $('title').html(`Tech.Novatas .:. ${title}`);

    }
}

// Processa clique no botão de aceitar cookie:
function acceptCookies() {

    // Cria o cookie que aceita os cookies:
    setCookie('acceptCookie', 'true', 365);

    // Ocultar a mensagem de cookie:
    $('#msgCookies').hide();
}

// Função que cria cookies:
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// Função que lê um cookie específico:
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

// jQuery → Executa aplicativo "runApp" quando o documento estiver pronto:
$(document).ready(runApp);
