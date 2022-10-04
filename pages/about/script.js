// Altera o <title> da página:
getTitle('Sobre...');

toggleTabs();

$(document).on('click', '.tab-item', toggleTabs);

function toggleTabs() {

    var tab = 1;

    if ($(this).attr('href'))
        tab = $(this).attr('href').substr(-1);
    else 
        tab = location.hash.trim().substr(-1);

    if (tab == '') tab = 1;

    console.log(`${tab}`);

    $('.tab-content').hide(function () {
        $(`#tc${tab}`).show();
    });

    $('.tab-item').removeClass('border-on');

    $(`a[href="#tab${tab}"]`).addClass('border-on');

}