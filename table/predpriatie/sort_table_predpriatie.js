let number_sort_data_id = true;
let date_sort_prepr = false;
let name_sort_pred_or = false;

// Сортировка по ID и номинации
function number_sort_data(type, deleteTD=true) {
    if(number_sort_data_id)
        arrayPred.sort((a,b)=> a[type] - b[type]);
    else arrayPred.sort((a, b) => b[type] - a[type]);

    number_sort_data_id = !number_sort_data_id;
    if(deleteTD)
        delete_oll_tr_for_new_table();
    addTd(arrayPred, true);
}

// Сортировк апо дате
function date_sort_predpriatie() {
    arrayPred.sort((a, b) => {
        let first_date = new Date(data_form_in(a.data));
        let second_date = new Date(data_form_in(b.data));
        if (date_sort_prepr)
            return first_date.getTime() - second_date.getTime();
        else
            return second_date.getTime() - first_date.getTime();
    });

    date_sort_prepr = !date_sort_prepr;
    delete_oll_tr_for_new_table();
    addTd(arrayPred, true);
}

// Сортировка по Названию, Автору и Значению
function name_sort_pred(type){
    if(name_sort_pred_or)
        arrayPred.sort(((a, b) => a[type].localeCompare(b[type])))
    else arrayPred.sort(((a, b) => b[type].localeCompare(a[type])))

    name_sort_pred_or = !name_sort_pred_or;
    delete_oll_tr_for_new_table();
    addTd(arrayPred, true);
}