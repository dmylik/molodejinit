let arrayBGD = [];
let id_BGD;
let seeBGD = true;
// let addBtnComm = document.createElement('button');


// функция старта таблицы
function table_level_BGD(id_BGD_cookie) {
    // addBtnComm.id = "button_comm_bgd";
    // addBtnComm.addEventListener("click", transition_table_bgd, false);
    // seeBGD ? addBtnComm.innerHTML = 'Голосовать' : addBtnComm.innerHTML = 'Просмотр';
    //
    // document.getElementById("button_find_bgd").style.display = "block";
    id_BGD = id_BGD_cookie;
    table_start_BGD(id_BGD);
}

// функция отрисовки таблицы
function addTdBGD(whenWork, isRewrite) {
    if (isRewrite) arrayBGD = whenWork;

    arrayBGD.map(BGD => {
        let new_tr = document.createElement('tr');
        new_tr.id = "mi_BGD_" + BGD.id + "";
        new_tr.classList.add("mi_BGD_" + BGD.id + "");
        new_tr.innerHTML = '\
						<td>' + BGD.num + '</td>\
						<td>' + BGD.name_org + '</td>\
						<td>' + BGD.name_sluzh + '</td >\
                        <td class="txtLong"><p class="stupidText">' + BGD.name + '</p></td >\
                        <td class="txtLong"><p class="stupidText">' + addbr(BGD.author) + '</p></td >\
                        <td class="txtLong">' + nominaz_top_list(BGD.nomination) + '</td >\
                        <td class="txtLong"><p class="stupidText">' + BGD.znach_tehnik + '</p></td >\
                        <td>' + BGD.vnedr_date + '</td >\
                        <td class="txtLong"><p class="stupidText">' + replacePlace(BGD.vnedr_place) + '</p></td >\
                        <td>' + BGD.file + '</td >\
                        <td>' + BGD.file + '</td >\
                        <td>' + BGD.file + '</td >';
        document.querySelector('.table_level_bgd').appendChild(new_tr);

        // заливка МИ которые отправленны на конкурс
        if(BGD.vybor_nod==1)
            document.getElementById(`mi_BGD_${BGD.id}`).style.background = "rgba(144,255,109,0.14)";
        else
            document.getElementById(`mi_BGD_${BGD.id}`).style.background = "rgba(0,91,255,0)";
    })
}

// удаления таблицы со старыми данными
function delete_oll_tr_for_new_table_BGD() {
    for (let i = 0; i < arrayBGD.length; i++)
        document.querySelector('.table_level_bgd').removeChild(document.getElementById("mi_BGD_" + arrayBGD[i].id));
}

// функция формирования запроса к базе
function table_start_BGD(id_BGD) {
    let this_date_year = document.getElementById("list_year_for").value;

    let data_object = [{
        year: this_date_year,
        id_slugba: 10
    }];

    let rez = JSON.stringify(data_object);
    post_ajax_BGD(rez, this_date_year);
}


// Запрос к Базе и Вывод данных в таблицу
function post_ajax_BGD(rez, this_date_year) {
    let URL;
    if(this_date_year==='Все')
        URL = 'table_start_SLUZHB';
    else
        URL = 'table_year_SLUZHB';

    jQuery.ajax({
        type: "POST",
        url: `table/slugba/php/${URL}.php`,
        dataType: 'json',
        data: {arguments: rez},
        success:
            function (data) {
                let dataServer = [];
                for (let i = 0; i < data.length; i++)
                    dataServer.push({
                        id: data[i].ID,
                        num: i+1,
                        name: data[i].NAME,
                        name_org: data[i].NAME_ORG,
                        name_sluzh: data[i].NAME_SLUZH,
                        author: data[i].AUTORS,
                        nomination: data[i].ID_NOMINAC,
                        id_struc: data[i].ID_STRUC,
                        znach_tehnik: data[i].ZNACHIM === null ? " " : data[i].ZNACHIM,
                        vnedr_date: data[i].VNEDR_D,
                        vnedr_place: data[i].VNEDR_M === null ? " " : data[i].VNEDR_M,
                        vybor_nod: data[i].VYBOR_NOD,
                        file: "-"
                    });
                // сортировка по нум и перерисовка через метод Sort
                arrayBGD = dataServer;
                number_sort_data_id_BGD = true;
                number_sort_BGD('num', false);
                // addTdBGD(dataServer, true);
            },
    });
}

// функция поиска по таблице (по списку)
function find_bgd_txt() {
    let txtFind = document.getElementById("text_for_find").value;
    document.getElementById("button_reset_find").style.display = 'block';

    let arrayFindS = arrayBGD.filter(arr => {
        if(arr.name.toLowerCase().indexOf(txtFind.toLowerCase().trim()) >= 0) return true;
        if(arr.name_org.toLowerCase().indexOf(txtFind.toLowerCase().trim()) >= 0) return true;
        if(arr.name_sluzh.toLowerCase().indexOf(txtFind.toLowerCase().trim()) >= 0) return true;
        if(arr.author.toLowerCase().indexOf(txtFind.toLowerCase().trim()) >= 0) return true;
        if(arr.znach_tehnik.toLowerCase().indexOf(txtFind.toLowerCase().trim()) >= 0) return true;
        if(arr.vnedr_date.toLowerCase().indexOf(txtFind.toLowerCase().trim()) >= 0) return true;
        if(arr.vnedr_place.toLowerCase().indexOf(txtFind.toLowerCase().trim()) >= 0) return true;
    });

    delete_oll_tr_for_new_table_BGD();
    addTdBGD(Array.from(new Set(arrayFindS)), true);
}
