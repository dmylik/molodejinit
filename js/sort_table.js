let name_for = false;

// Сортировка по тексту
function name_sort_table(nameLevel, type){
    window["delete_oll_tr_for_new_table_"+nameLevel]();
    window["addTd"+nameLevel](window["getArray"+nameLevel]().sort((a,b) => {return (a[type].localeCompare(b[type]) * ((name_for) ? 1 : -1))}), true);
    name_for = !name_for;
}