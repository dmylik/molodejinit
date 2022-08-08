let arraySlugba = [];
let id_slugba;

function getArraySlugba() {
    return arraySlugba;
}

function table_level_slugba(id_slugba_cookie) {
    // document.getElementById("button_find_slugba").style.display = "block";

    id_slugba = id_slugba_cookie;

    table_start_Slugba(id_slugba);
    // addTdSlugba(arraySlugba, false);
}

function addTdSlugba(whenWork, isRewrite ) {
    if (isRewrite) arraySlugba = whenWork;

    arraySlugba.map(slugba => {
        let new_tr = document.createElement('tr');
        new_tr.id = "mi_slugba_" + slugba.id + "";
        new_tr.classList.add("mi_slugba_" + slugba.id + "");
        new_tr.innerHTML = '\
						<td>' + slugba.num + '</td>\
						<td>' + slugba.name_org + '</td>\
						<td>' + slugba.name_sluzh + '</td >\
                        <td class="txtLong"><p class="stupidText">' + slugba.name + '</p></td >\
                        <td class="txtLong"><p class="stupidText">' + addbr(slugba.author) + '</p></td >\
                        <td>' + nominaz_top_list(slugba.nomination) + '</td >\
                        <td class="txtLong"><p class="stupidText">' + replacePlace(slugba.znach_tehnik) + '</p></td >\
                        <td>' + slugba.vnedr_date + '</td >\
                        <td>' + slugba.vnedr_place + '</td >\
                        <td>' + slugba.file + '</td >';
        document.querySelector('.table_level_slugba').appendChild(new_tr);

        // console.log(slugba.vybor_nod)

        if(slugba.vybor_nod==1)
            document.getElementById(`mi_slugba_${slugba.id}`).style.background = "rgba(144,255,109,0.14)";
        else
            document.getElementById(`mi_slugba_${slugba.id}`).style.background = "rgba(0,91,255,0)";
    })
}

// удаления таблицы со старыми данными
function delete_oll_tr_for_new_table_Slugba() {
    for (let i = 0; i < arraySlugba.length; i++)
        document.querySelector('.table_level_slugba').removeChild(document.getElementById("mi_slugba_" + arraySlugba[i].id));
}

// Функция Вызова вывода данных
function table_start_Slugba(id_slugba) {
    let this_date_year = document.getElementById("list_year_for").value;


    let data_object = [{
        year: this_date_year,
        id_slugba: id_slugba
    }];

    let rez = JSON.stringify(data_object);
    post_ajax_Slugba(rez, this_date_year);
}

// Запрос к Базе и Вывод данных в таблицу
function post_ajax_Slugba(rez, this_date_year) {
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
                arraySlugba = dataServer;
                number_sort_data_id_Slugba = true;
                number_sort_Slugba('num', false);
                // addTdSlugba(dataServer, true);

            },
    });
}

function find_slugba_txt() {
    let txtFind = document.getElementById("text_for_find").value;
    document.getElementById("button_reset_find").style.display = 'block';

    let arrayFindS = arraySlugba.filter(arr => {
        if(arr.name.toLowerCase().indexOf(txtFind.toLowerCase().trim()) >= 0) return true;
        if(arr.name_org.toLowerCase().indexOf(txtFind.toLowerCase().trim()) >= 0) return true;
        if(arr.name_sluzh.toLowerCase().indexOf(txtFind.toLowerCase().trim()) >= 0) return true;
        if(arr.author.toLowerCase().indexOf(txtFind.toLowerCase().trim()) >= 0) return true;
        if(arr.znach_tehnik.toLowerCase().indexOf(txtFind.toLowerCase().trim()) >= 0) return true;
        if(arr.vnedr_date.toLowerCase().indexOf(txtFind.toLowerCase().trim()) >= 0) return true;
        if(arr.vnedr_place.toLowerCase().indexOf(txtFind.toLowerCase().trim()) >= 0) return true;
    });

    delete_oll_tr_for_new_table_Slugba();
    addTdSlugba(Array.from(new Set(arrayFindS)), true);
}

