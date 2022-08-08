let exit_button = document.querySelector(".exit_program");
let tableSee;
let id_nod;


window.onload = function(){
    id_nod = find_cookie();
    let year = Number(data_now().split("-")[0])-1;
    oll_table_none();

    year_start(year);

    document_cukes(year);
};

function document_cukes(year) {
    id_nod[3] > 6 ? tableSee = "10" : tableSee = id_nod[3];
    switch (tableSee) {
        case "1": {
            table_level_BGD( id_nod[2]);
            table_level_commission(id_nod[2], false);
            seeButtonBGD(["block", "none"]);
            document.getElementById("table_level_bgd").style.display = "block";
            break;}
        case "2": {
            document.getElementById("table_level_slugba").style.display = "block";
            table_level_slugba(id_nod[2]);
            break;}
        case "3": {
            document.getElementById("table_level_NOD").style.display = "block";
            table_level_NOD(id_nod[2]);
            break;}
        case "6": {
            document.getElementById("year_selected").style.display = "none";
            document.getElementById("table_level_commission_and_bgd").style.display = "block";
            table_level_commission(id_nod[2], true);
            break;}
        case "10": {
            document.getElementById("table_level_predpriatie").style.display = "block";
            table_level_predpriatie(id_nod[2]);
            break;}

        default:
            {alert("error cookie")}
    }
}

// скрытие всех таблиц
function oll_table_none() {
    document.getElementById("table_level_predpriatie").style.display = "none";
    document.getElementById("table_level_NOD").style.display = "none";
    document.getElementById("table_level_slugba").style.display = "none";
    document.getElementById("table_level_bgd").style.display = "none";
    document.getElementById("table_level_commission_and_bgd").style.display = "none";


    document.querySelector(".add_new_place").style.display = "none";
    document.getElementById("button_add_new_mi").style.display = "none";
    // document.getElementById('modal_delete_mi').style.display = 'none';
    // document.getElementById("add_new_author").style.display = "none";

    // siteWindwDelete(false);
    // document.getElementById("button_choose_rating").style.display = "none";
    seeButtonBGD(["none", "none"]);



    document.getElementById("modal_window_nod").style.display = "none";


    // скрыти все кнопки "Найти"
    // document.getElementById("button_find").style.display = "none";
    // document.getElementById("button_find_nod").style.display = "none";
    // document.getElementById("button_find_slugba").style.display = "none";
    // document.getElementById("button_find_bgd").style.display = "none";
    // document.getElementById("button_find_comm").style.display = "none";

    document.getElementById("button_reset_find").style.display = 'none';

}

function year_start (yearNow) {
    for(let i = yearNow; i > 2017; i--) {
        let add_year = document.createElement('option');
        add_year.value = i+1 + '';
        add_year.innerHTML = i + '';
        add_year.addEventListener('onclick', restart_table, false);
        document.getElementById("list_year_for").appendChild(add_year);
    }

    let add_oll_year = document.createElement('option');
    add_oll_year.value = "Все";
    add_oll_year.innerHTML = "Все";
    add_oll_year.addEventListener('onclick', restart_table, false);
    document.getElementById("list_year_for").appendChild(add_oll_year);
}

function restart_table(){
    document.getElementById("text_for_find").value = '';
    document.getElementById("button_reset_find").style.display = 'none';
    idTouchTR_table_nod = undefined;
    switch (tableSee) {
        case "1": {
            delete_oll_tr_for_new_table_BGD();
            delete_oll_tr_for_new_table_Comm();
            table_level_commission(id_org_nod, false);
            table_start_BGD(id_BGD);
            break;}
        case "2": {
            delete_oll_tr_for_new_table_Slugba();
            table_start_Slugba(id_slugba);
            break;}
        case "3": {
            delete_oll_tr_for_new_table_NOD();
            table_start_NOD(id_org_nod);
            break;}
        case "6": {
            delete_oll_tr_for_new_table_Comm();
            table_level_commission(id_org_nod, true);
            break;}
        case "10": {
            idTouchTR = null;
            howWindow = false;
            table_start(id_org);
            break;}
        default: {alert("error cookie")}
    }
}

function reset_find(){
    document.getElementById("text_for_find").value = '';
    document.getElementById("button_reset_find").style.display = 'none';
    restart_table();
}


// Выход на главную страницу
exit_button.onclick = function(){
    //checkout_POST('checkout.php');
    document.location.href='../index.html';
};

