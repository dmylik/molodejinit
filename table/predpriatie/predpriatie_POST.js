// Добавление нового элемента
function AddNewMI() {
    let red_border = false;
    let data_new_MI = document.getElementById("data_new_MI").value;
    let name_new_MI = document.getElementById("name_new_novshestva_modal").value;
    let author_new_MI = document.getElementById("write_author_novshestva_modal").value;
    let take_top_new_MI = document.getElementById("list_top_nomination_new_MI").value;
    let znach_tehnik_new_MI = document.querySelector(".znach_tehnik_new_MI").value;

    // проверка на наличия текста в полях
    let test_data_add = [data_new_MI, name_new_MI, author_new_MI, take_top_new_MI];
    test_data_add.map(arr => {
        if(!red_border)
            red_border = arr === "";
    });

    if(!red_border) {
        let data_object = [{
            ID_ORG: id_org,
            NUM_PP: 5,
            DATE_REG: data_form_out(data_new_MI),
            NAME: name_new_MI,
            AUTORS: author_new_MI,
            ID_NOMINAC: take_top_new_MI,
            ZNACHIM: znach_tehnik_new_MI,
//		ID_FILE: 1,
//		VNEDR_M: 5,
//		VYBOR_NOD: 2,
//		OCENKA_S: 5,
//		MESTO_PRIZ: 2,
        }];

        let rez = JSON.stringify(data_object);

        black_border_text_area();
        MI_insert_POST(rez);
        closeModalWindow();
    }
    else {
        // Если Отсутствуют текст для воода в полях
        black_border_text_area();

        !data_new_MI ? document.getElementById("data_new_MI").style.border = "#ff2f34 1px solid;" : 1;
        !name_new_MI ? document.getElementById("name_new_novshestva_modal").style.border = "#ff0000 1px solid" : 1;
        !author_new_MI ? document.getElementById("write_author_novshestva_modal").style.border = "#ff0000 1px solid" : 1;
        !take_top_new_MI ? document.getElementById("list_top_nomination_new_MI").style.border = "#ff0000 1px solid" : 1;
    }
}

// Добавление в таблицу
function MI_insert_POST(rez) {
    jQuery.ajax({
        type: "POST",
        url: 'table/predpriatie/php/AddNewMI.php',
        dataType: 'json',
        data: {arguments: rez},
        success: function(xmlHttp) {
            // delete_oll_tr_for_new_table();
            table_start(id_org);
        },
        // error: console.log('error'),
        // success:
    });

}

// Функция Вызова вывода данных
function table_start(id_org) {
    delete_oll_tr_for_new_table();

    let this_date_year = document.getElementById("list_year_for").value;
    let data_object = [{
        year: this_date_year,
        id_org: id_org
    }];

    let rez = JSON.stringify(data_object);
    post_ajax(rez, this_date_year);
}

// Запрос к Базе и Вывод данных в таблицу
function post_ajax(rez, this_date_year) {
    let URL;
    if(this_date_year === "Все")
        URL = 'table/predpriatie/php/table_start.php';
    else
        URL = 'table/predpriatie/php/table_yaer_sort.php';


    jQuery.ajax({
        type: "POST",
        url: URL,
        dataType: 'json',
        data: {arguments: rez},
        success:
            function (data) {
                let dataServer = [];
                for (let i = 0; i < data.length; i++)
                    dataServer.push({
                        id: data[i].ID,
                        num: i+1,
                        data: data[i].DATE_REG,
                        name: data[i].NAME,
                        author: data[i].AUTORS,
                        nomination: data[i].ID_NOMINAC,
                        znach_tehnik: data[i].ZNACHIM == null ? "" : data[i].ZNACHIM,
                        file: "-"
                    });

                // сортировка полученного массива сразу
                arrayPred = dataServer;
                number_sort_data_id = true;
                number_sort_data('num', false);
            },
    });
}

// Удаление выбраного элемента
function deleteMiID(id_click) {
    // console.log(id_click)
    let data_object = [{
        ID_ORG: id_org,
        ID: id_click
    }];

    let rez = JSON.stringify(data_object);
    MI_delete_POST(rez);
    closeModalWindow();
}

// Удаление из таблицы (запрос)
function MI_delete_POST(rez) {
    // console.log(rez)
    jQuery.ajax({
        type: "POST",
        url: 'table/predpriatie/php/DellMI.php',
        dataType: 'json',
        data: {arguments: rez},
        success: function(xmlHttp) {
            table_start(id_org);
        },
        // error: console.log('error'),
        // success:
    });
}

// функция редактироваия
function editThisMI() {
    let red_border_rem = false;
    let data_new_MI = document.getElementById("data_new_MI").value;
    let name_new_MI = document.getElementById("name_new_novshestva_modal").value;
    let author_new_MI = document.getElementById("write_author_novshestva_modal").value;
    let take_top_new_MI = Number(document.getElementById("list_top_nomination_new_MI").value);
    let znach_tehnik_new_MI = document.querySelector(".znach_tehnik_new_MI").value;

    // Проверка на наличие пустных полей (отсутствуют данные)
    let test_data_remove = [data_new_MI, name_new_MI, author_new_MI, take_top_new_MI];
    test_data_remove.map(arr => {
        if(!red_border_rem)
            red_border_rem = arr === "";
    });

    // если пустных полей нет
    if(!red_border_rem) {
        let data_object = [{
            ID: id_click,
            ID_ORG: id_org,
            NUM_PP: 5,
            DATE_REG: data_form_out(data_new_MI),
            NAME: name_new_MI,
            AUTORS: author_new_MI,
            ID_NOMINAC: take_top_new_MI,
            ZNACHIM: znach_tehnik_new_MI,
//		ID_FILE: 1,
//		VNEDR_M: 5,
//		VYBOR_NOD: 2,
//		OCENKA_S: 5,
//		MESTO_PRIZ: 2,
        }];

        let rez = JSON.stringify(data_object);

        black_border_text_area();
        MI_update_POST(rez);
        closeModalWindow();
    }
    else {
        // Если пустые поля есть, то выделяем те, что пустые
        black_border_text_area();
        !data_new_MI ? document.getElementById("data_new_MI").style.border = "#ff2f34 1px solid;" : 1;
        !name_new_MI ? document.getElementById("name_new_novshestva_modal").style.border = "#ff0000 1px solid" : 1;
        !author_new_MI ? document.getElementById("write_author_novshestva_modal").style.border = "#ff0000 1px solid" : 1;
        !take_top_new_MI ? document.getElementById("list_top_nomination_new_MI").style.border = "#ff0000 1px solid" : 1;
    }
}

// Обновление Данных ()
function MI_update_POST(rez) {
    jQuery.ajax({
        type: "POST",
        url: 'table/predpriatie/php/updatePredMI.php',
        dataType: 'json',
        data: {arguments: rez},
        success: function(xmlHttp) {
            table_start(id_org);
        },
        // error: console.log('error'),
        // success:
    });
}




