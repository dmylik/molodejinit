// Функция Вызова вывода данных
function table_start_NOD(id_nod) {
    let this_date_year = document.getElementById("list_year_for").value;

    let data_object = [{
        year: this_date_year,
        id_nod: id_nod
    }];

    console.log(data_object);

    let rez = JSON.stringify(data_object);
    post_ajax_NOD(rez,this_date_year );
}

// Запрос к Базе и Вывод данных в таблицу
function post_ajax_NOD(rez, this_date_year) {
    let URL;
    if(this_date_year==="Все")
        URL = 'table/nod/php/table_start_NOD.php';
    else
        URL = 'table/nod/php/table_year_NOD.php';
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
                        num: i+1,
                        id: data[i].ID,
                        name: data[i].NAME,
                        name_org: data[i].NAME_ORG,
                        name_sluzh: data[i].NAME_SLUZH,
                        author: data[i].AUTORS,
                        nomination: data[i].ID_NOMINAC,
                        id_struc: data[i].ID_STRUC,
                        znach_tehnik: data[i].ZNACHIM === null ? "" : data[i].ZNACHIM,
                        vnedr_date: data[i].VNEDR_D,
                        vnedr_place: data[i].VNEDR_M === null ? "" : data[i].VNEDR_M,
                        vybor_nod: data[i].VYBOR_NOD === null ? 0 :  Number(data[i].VYBOR_NOD),
                        file: "-"
                    });
                arrayNOD = dataServer;
                number_sort_data_id_nod = true;
                number_sort_nod('num', false);
                // addTdNod(dataServer, true);
            },
    });
}

// Переход окна "Редактировать" в режим редактирования
function editThisMINOD() {
    view_button_nod([`block`, `none`]);
    document.getElementById("data_vnedr_nod_MI").readOnly  = false;
    // document.getElementById("checkbox_for_vibor_nod").removeAttribute("disabled");

    element15.disabled = false;
    // element16.disabled = false;
    // element17.disabled = false;
    element18.disabled = false;
}

// Функция сохранения
function saveThisMINOD() {
    let data_vnedr_nod_MI = document.getElementById("data_vnedr_nod_MI").value;
    let struct_podr_bgd_nod = document.getElementById("struct_podr_bgd_nod").value;
///   
    let level_otdel_bgd_nod = document.getElementById("level_otdel_bgd_nod").value;
///
    let organiz_bgd_nod = document.getElementById("organiz_bgd_nod").value;
    let this_place_nod = document.getElementById("add_text_for_this_place_nod").value;
    let vnedr_m  = '';



    if(level_otdel_bgd_nod !== undefined && level_otdel_bgd_nod!=='') {
        vnedr_m = level_otdel_bgd_nod + "//.";}
    if(organiz_bgd_nod !== undefined && organiz_bgd_nod!== '') {
        vnedr_m += organiz_bgd_nod + "//.";}
    if(this_place_nod !== undefined && this_place_nod!== '')  {
        vnedr_m += this_place_nod ;
    }

    console.log(vnedr_m)

    let data_object_nod = [{
        ID: idTouchTR_table_nod,
        ID_STRUC: struct_podr_bgd_nod,
        VNEDR_M: vnedr_m,
        VNEDR_D: data_form_out(data_vnedr_nod_MI)
    }];

    // console.log(data_object_nod);

    let rez_nod = JSON.stringify(data_object_nod);

    clean_data_form_nod();
    NOD_MI_update_POST(rez_nod);
    CloseModalNOD();
}

// Обнеовление данных введенных
function NOD_MI_update_POST(rez) {
    jQuery.ajax({
        type: "POST",
        url: 'table/nod/php/updateNODMI.php',
        dataType: 'json',
        data: {arguments: rez},
        success: function(xmlHttp) {
            table_start_NOD(id_org_nod);
            delete_oll_tr_for_new_table_NOD();
        },
        // error: console.log('error'),
        // success:
    });
}

// Формирования запроса для "Выбор на конкурс"
function updateVybor() {
    let checkbox_for_vibor_nod = document.getElementById("checkbox_for_vibor_nod").checked ;

    let vybor_object_nod = [{
        ID: idTouchTR_table_nod,
        VYBOR_NOD: checkbox_for_vibor_nod ? 1 : 0
    }];

    let rez_nod = JSON.stringify(vybor_object_nod);
    NOD_MI_update_Vybor(rez_nod, checkbox_for_vibor_nod);

    CloseModalNOD();
}

// Обновление только "Выбор на конкурс"
function NOD_MI_update_Vybor(rez, checkbox) {
    let tdOne =  document.getElementById(`td_vybor_${idTouchTR_table_nod}`);
    jQuery.ajax({
        type: "POST",
        url: 'table/nod/php/update_vybor_nod.php',
        dataType: 'json',
        data: {arguments: rez},
        success: function(xmlHttp) {
            if(checkbox){
                tdOne.style.backgroundColor = "#94ff69";
                tdOne.innerHTML = "Да";
                arrayNOD[id_click_row_nod].vybor_nod = 1;
            } else {
                tdOne.removeAttribute("style");
                tdOne.innerHTML = "Нет";
                arrayNOD[id_click_row_nod].vybor_nod = 0;
            }

        },
        // error: console.log('error'),
        // success:
    });
}

// Очистка после сохранения и закрытия окна
function clean_data_form_nod() {
    this_otdel_for_mesto = "";
    element15.value = "";
    element16.value = "";
    element17.value = "";
    document.getElementById("add_text_for_this_place_nod").value = "";
}

// поиск по NOD (по полям)
function find_nod_txt() {
    let txtFind = document.getElementById("text_for_find").value;
    document.getElementById("button_reset_find").style.display = 'block';


    let arrayFind = arrayNOD.filter(arr => {
        if(arr.name.toLowerCase().indexOf(txtFind.toLowerCase().trim()) >= 0) return true;
        if(arr.name_org.toLowerCase().indexOf(txtFind.toLowerCase().trim()) >= 0) return true;
        if(arr.name_sluzh.toLowerCase().indexOf(txtFind.toLowerCase().trim()) >= 0) return true;
        if(arr.author.toLowerCase().indexOf(txtFind.toLowerCase().trim()) >= 0) return true;
        if(arr.znach_tehnik.toLowerCase().indexOf(txtFind.toLowerCase().trim()) >= 0) return true;
        if(arr.vnedr_date.toLowerCase().indexOf(txtFind.toLowerCase().trim()) >= 0) return true;
        if(arr.vnedr_place.toLowerCase().indexOf(txtFind.toLowerCase().trim()) >= 0) return true;
    });

    delete_oll_tr_for_new_table_NOD();
    addTdNod(Array.from(new Set(arrayFind)), true)
}



