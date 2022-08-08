let name_for_sort_BGD = false;
let number_sort_data_id_BGD = true;
let date_sort_BGD_id = false;

// Сортировка по тексту
function name_sort_table_BGD(type){
    if(name_for_sort_BGD)
        arrayBGD.sort((a,b) =>a[type].localeCompare(b[type]));
    else arrayBGD.sort((a,b) => b[type].localeCompare(a[type]));

    name_for_sort_BGD = !name_for_sort_BGD;
    delete_oll_tr_for_new_table_BGD();
    addTdBGD(arrayBGD, true);
}

// Сортировка по ID и номинации (числа)
function number_sort_BGD(type, deleteTD = true) {
    if(number_sort_data_id_BGD)
        arrayBGD.sort((a,b)=> a[type] - b[type]);
    else arrayBGD.sort((a, b) => b[type] - a[type]);

    number_sort_data_id_BGD = !number_sort_data_id_BGD;
    if(deleteTD)
        delete_oll_tr_for_new_table_BGD();
    addTdBGD(arrayBGD, true);
}

// Сортировк апо дате
function date_sort_BGD() {
    arrayBGD.sort((a, b) => {
        let first_date = new Date(data_form_in(a.vnedr_date));
        let second_date = new Date(data_form_in(b.vnedr_date));
        if (date_sort_BGD_id)
            return first_date.getTime() - second_date.getTime();
        else
            return second_date.getTime() - first_date.getTime();
    });

    date_sort_BGD_id = !date_sort_BGD_id;
    delete_oll_tr_for_new_table_BGD();
    addTdBGD(arrayBGD, true);
}


function transition_table_bgd() {
    seeButtonBGD(["block", "none"]);
    document.getElementById("table_level_commission_and_bgd").style.display = "none";
    document.getElementById("table_level_bgd").style.display = "block";

    document.getElementById("year_selected").style.display = "block";

    document.getElementById("button_find_bgd").style.display = "block";
    document.getElementById("button_find_comm").style.display = "none";
}

function transition_table_comm() {
    seeButtonBGD(["none", "block"]);
    document.getElementById("table_level_bgd").style.display = "none";
    document.getElementById("table_level_commission_and_bgd").style.display = "block";

    document.getElementById("year_selected").style.display = "none";

    document.getElementById("button_find_bgd").style.display = "none";
    document.getElementById("button_find_comm").style.display = "block";
}

function seeButtonBGD ([comm, bgd]){
    document.getElementById("button_transition_comm").style.display = `${comm}`;
    document.getElementById("button_transition_bgd").style.display = `${bgd}`;

}