let arrayPred = [];
let idTouchTR;
let id_org;
let id_click;
let howWindow;

// элементы DOM дерева
let add_new_place = document.querySelector(".add_new_place");
let panel2 = document.querySelector(".panel2");
let contayner_panel2 = document.querySelector(".contayner_panel2");
let vvod_text_info1_insert = document.querySelector(".vvod_text_info1_insert");
let table_rez_poisk_first = document.querySelector(".table_rez_poisk_first");
let write_author_novshestva_modal = document.getElementById("write_author_novshestva_modal");
let data_new_MI = document.getElementById("data_new_MI");
let name_new_novshestva_modal =  document.getElementById("name_new_novshestva_modal");
let list_top_nomination_new_MI =  document.getElementById("list_top_nomination_new_MI");
let znach_tehnik_new_MI = document.getElementById("znach_tehnik_new_MI");
let add_author_pred =  document.getElementById("add_author_pred");
let table_level_predpriatie_dom = document.querySelector('.table_level_predpriatie');
let regH1MI = document.getElementById("regH1MI");

// Старт Таблицы "Предприятие"
function table_level_predpriatie(id_org_cookie) {
    document.getElementById("button_add_new_mi").style.display = "block";
    // document.getElementById("button_find").style.display = "block";
    add_author_pred.style.display = "none";
    data_new_MI.value = data_now();

    id_org = id_org_cookie;

    // Вывод данных из базы в таблицу при старте приложения
    table_start(id_org);
    addTd(arrayPred, false);
}

// Добавление строк в таблицу
function addTd(whenWork, isRewrite) {
    if (isRewrite) arrayPred = whenWork;

    for (let i = 0; i < arrayPred.length; i++) {
        let new_tr = document.createElement('tr');
        new_tr.id = "mi_pred_" + arrayPred[i].id + "";
        new_tr.addEventListener("click", open_modal_window, false);
        new_tr.classList.add("mi_pred_" + arrayPred[i].id + "");
        new_tr.innerHTML = '\
						<td class="new_td_center">' + arrayPred[i].num + '</td>\
						<td class="new_td_center "> ' + arrayPred[i].data + '</td>\
						<td class="txtLong"><p class="stupidText">' + arrayPred[i].name + '</p></td >\
                        <td class="txtLong"><p class="stupidText">' + addbr(arrayPred[i].author) + '</p></td >\
                        <td style="max-width: 150px">' + nominaz_top_list(arrayPred[i].nomination) + '</td >\
                        <td class="txtLong"><p class="stupidText">' + arrayPred[i].znach_tehnik + '</p> </td >\
						<td>' + arrayPred[i].file + '</td >';
        table_level_predpriatie_dom.appendChild(new_tr);
    }
}

// Раскрытие строки для Редактирование или Удаления
function open_modal_window(e) {
    regH1MI.innerHTML = "Редактирование <br> молодёжной инициативы ";
    howWindow = true;

    if(idTouchTR!= null)
        colorLineActive(false);
    idTouchTR = (e.path[1].id).split('_')[2];
    if (idTouchTR === undefined)
        idTouchTR = (e.path[2].id).split('_')[2];

    let id_click_row;
    arrayPred.find((arr, index) => {
        if (arr.id === idTouchTR) id_click_row = index;
    });

    id_click = arrayPred.find(arr => arr.id === idTouchTR).id;

    data_new_MI.value = data_form_in(arrayPred[id_click_row].data);
    name_new_novshestva_modal.value = arrayPred[id_click_row].name;
    write_author_novshestva_modal.value = arrayPred[id_click_row].author;
    list_top_nomination_new_MI.value = arrayPred[id_click_row].nomination;
    znach_tehnik_new_MI.value = arrayPred[id_click_row].znach_tehnik;

    view_button(["none", "block", "none", "block"]);
    heightModalWindow(add_new_place);
    add_new_place.style.display = "flex";

    // убрать скрол
    scrollingPred(true, pageYOffset, add_new_place);
}

// Открыть поле добавления
function Insert() {
    howWindow = false;
    // autorAdd();
    regH1MI.innerHTML = "Регистрация <br> молодёжной инициативы ";
    add_new_place.style.display = "flex";
    add_author_pred.style.display = "block";
    heightModalWindow(add_new_place);
    open_edit_window(["block", "none", "none", "none"]);
    scrollingPred(true, pageYOffset, add_new_place);
}

// Модальное окно для подтверждения удаления
function openWindowForDelete(action) {
    if (action) siteWindwDelete(true);
    // modal_delete_mi.style.display = 'block';
    else siteWindwDelete(false);
        // modal_delete_mi.style.display = 'none';
}

// Удаление выбраной строки
function deleteThisMI() {
    deleteMiID(id_click);
    closeModalWindow();
    siteWindwDelete(false);
}

// Переход к редактированию (разблакировка элементов для редавтирования)
function open_edit_window(arrOpenRemove) {
    data_new_MI.readOnly = false;
    name_new_novshestva_modal.readOnly = false;
    write_author_novshestva_modal.readOnly = false;
    list_top_nomination_new_MI.removeAttribute("disabled");
    document.getElementById("add_files_predpriatie_MI").removeAttribute("disabled");
    znach_tehnik_new_MI.readOnly = false;

    add_author_pred.style.display = "block";
    view_button(arrOpenRemove)
}

// Отображение кнопок "Добавить" "Удалить" "Редактировать" "Сохранить"
function view_button([addBtn, deleteBtn, removeBtn, saveBtn]) {
    document.getElementById("add_new_MI").style.display = `${addBtn}`;
    document.getElementById("delete_new_MI").style.display = `${deleteBtn}`;
    document.getElementById("remove_new_MI").style.display = `${removeBtn}`;
    document.getElementById("remove_open_new_MI").style.display = `${saveBtn}`;
}

// Закрытие окна
function closeModalWindow() {
    add_new_place.style.display = "none";
    data_new_MI.value = data_now();
    name_new_novshestva_modal.value = "";
    write_author_novshestva_modal.value = "";
    list_top_nomination_new_MI.value = "";
    znach_tehnik_new_MI.value = "";
    add_author_pred.style.display = "none";

    if(howWindow) colorLineActive(true);
    setTimeout( function() {colorLineActive(false);}, 3000);


    scrollingPred(false, 0, add_new_place);
    block_readonly_date();
}

// Блокировка полей для редатирования
function block_readonly_date() {
    data_new_MI.readOnly = true;
    name_new_novshestva_modal.readOnly = true;
    write_author_novshestva_modal.readOnly = true;
    list_top_nomination_new_MI.setAttribute("disabled", "disabled");
    znach_tehnik_new_MI.readOnly = true;
}

// Очистка таблицы
function delete_oll_tr_for_new_table() {
    for (let i = 0; i < arrayPred.length; i++)
        table_level_predpriatie_dom.removeChild(document.getElementById("mi_pred_" + arrayPred[i].id));
}


function black_border_text_area() {
    data_new_MI.style.border = "#2b2b2b 1px solid;";
    name_new_novshestva_modal.style.border = "#2b2b2b 1px solid";
    write_author_novshestva_modal.style.border = "#2b2b2b 1px solid";
    list_top_nomination_new_MI.style.border = "#2b2b2b 1px solid";
}

// Закрытие Модального окна (добавление/редактирование)
function Close() {
    black_border_text_area();
    closeModalWindow();
    block_readonly_date();
    add_author_pred.style.display = "none";
    siteWindwDelete(false);
    // modal_delete_mi.style.display = 'none';

    scrollingPred(false, 0, add_new_place);
    panel2.style.width = "0px";
    contayner_panel2.width = "0px";
}

// Функция поиска
function find_pred_txt() {
    let txtFind = document.getElementById("text_for_find").value;
    document.getElementById("button_reset_find").style.display = 'block';
    let arrayFind = arrayPred.filter(arr => {
        if (arr.data.toLowerCase().trim().indexOf(txtFind.toLowerCase().trim()) >= 0) return true;
        if (arr.name.toLowerCase().trim().indexOf(txtFind.toLowerCase().trim()) >= 0) return true;
        if (arr.author.toLowerCase().trim().indexOf(txtFind.toLowerCase().trim()) >= 0) return true;
        if (arr.znach_tehnik.toLowerCase().trim().indexOf(txtFind.toLowerCase().trim()) >= 0) return true;
    });

    delete_oll_tr_for_new_table();
    addTd(Array.from(new Set(arrayFind)), true);
}

// устанвить или убрать подсветку
function colorLineActive(act) {
    let mi_pred_id = document.getElementById(`mi_pred_${idTouchTR}`);
    if(mi_pred_id)
        !act
            ? mi_pred_id.classList.remove("active")
            : mi_pred_id.classList.add("active");
}

// Создание - Отображение - Скрытие окна уданления
function siteWindwDelete(doing) {
    if(doing){
        if(!document.getElementById('modal_delete_mi')) {
            let modWindowDelete = document.createElement('div');
            modWindowDelete.id = "modal_delete_mi";
            modWindowDelete.innerHTML = '\
                <h2>Удалить выбранную МИ?</h2>\
                <button class="button_add_new_MI" onclick="deleteThisMI()">Да</button>\
                <button class="button_add_new_MI" onclick="openWindowForDelete(false)">Нет</button>';
            document.getElementById("nothing_in_this_pred").appendChild(modWindowDelete)
        }
        let modal_delete_mi = document.getElementById('modal_delete_mi');
        modal_delete_mi.style.display = 'block';
        modal_delete_mi.style.width = "300px";
        modal_delete_mi.style.height = "100px";
    } else {
        let modal_delete_mi = document.getElementById('modal_delete_mi');
        if(modal_delete_mi){
            modal_delete_mi.style.display = 'none';
            modal_delete_mi.style.width = "0px";
            modal_delete_mi.style.height = "0px";}
    }

}