let name_for_sort_ors = false;
let number_sort_data_id_Slugba = true;
let date_sort_Slugba = false;

// Сортировка по тексту
function name_sort_table_Slugba(type){
    if(name_for_sort_ors)
        arraySlugba.sort((a,b) =>a[type].localeCompare(b[type]));
    else arraySlugba.sort((a,b) => b[type].localeCompare(a[type]));

    name_for_sort_ors = !name_for_sort_ors;
    delete_oll_tr_for_new_table_Slugba();
    addTdSlugba(arraySlugba, true);
}

// Сортировка по ID и номинации (числа)
function number_sort_Slugba(type, deleteTd = true) {
    if(number_sort_data_id_Slugba)
        arraySlugba.sort((a,b)=> a[type] - b[type]);
    else arraySlugba.sort((a, b) => b[type] - a[type]);

    number_sort_data_id_Slugba = !number_sort_data_id_Slugba;
    if(deleteTd)
        delete_oll_tr_for_new_table_Slugba();
    addTdSlugba(arraySlugba, true);
}

// Сортировк апо дате
function date_sort_Slugba_mi() {
    arraySlugba.sort((a, b) => {
        let first_date = new Date(data_form_in(a.vnedr_date));
        let second_date = new Date(data_form_in(b.vnedr_date));
        if (date_sort_Slugba)
            return first_date.getTime() - second_date.getTime();
        else
            return second_date.getTime() - first_date.getTime();
    });

    date_sort_Slugba = !date_sort_Slugba;
    delete_oll_tr_for_new_table_Slugba();
    addTdSlugba(arraySlugba, true);
}