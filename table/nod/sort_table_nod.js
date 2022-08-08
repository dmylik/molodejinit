let name_for_sort_or = false;
let number_sort_data_id_nod = true;
let date_sort_nod = false;

// Сортировка по тексту
function name_sort_table_nod(type){
    if(name_for_sort_or)
        arrayNOD.sort((a,b) =>a[type].localeCompare(b[type]));
    else arrayNOD.sort((a,b) => b[type].localeCompare(a[type]));

    name_for_sort_or = !name_for_sort_or;
    delete_oll_tr_for_new_table_NOD();
    addTdNod(arrayNOD, true);
}

// Сортировка по ID и номинации (числа)
function number_sort_nod(type, deleteTd=true) {
    if(number_sort_data_id_nod)
        arrayNOD.sort((a,b)=> a[type] - b[type]);
    else arrayNOD.sort((a, b) => b[type] - a[type]);

    number_sort_data_id_nod = !number_sort_data_id_nod;
    if(deleteTd)
        delete_oll_tr_for_new_table_NOD();
    addTdNod(arrayNOD, true);
}

// Сортировк апо дате
function date_sort_nod_mi() {
    arrayNOD.sort((a, b) => {
        let first_date = new Date(data_form_in(a.vnedr_date));
        let second_date = new Date(data_form_in(b.vnedr_date));
        if (date_sort_nod)
            return first_date.getTime() - second_date.getTime();
        else
            return second_date.getTime() - first_date.getTime();
    });

    date_sort_nod = !date_sort_nod;
    delete_oll_tr_for_new_table_NOD();
    addTdNod(arrayNOD, true);
}