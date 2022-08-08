let arrayNOD = [];
let id_org_nod;
let element15 = document.querySelector(".element15");
let element16 = document.querySelector(".element16");
let element17 = document.querySelector(".element17");
let element18 = document.querySelector(".otdel_input");
let this_otdel_for_mesto;
let idTouchTR_table_nod;
let id_click_row_nod;

let modal_window_nod =  document.getElementById("modal_window_nod");

// старт таблицы уровня НОД
function table_level_NOD(id_org_cookie_nod) {
    // document.getElementById("button_find_nod").style.display = "block";
    document.getElementById("data_vnedr_nod_MI").value = data_now();

    id_org_nod = id_org_cookie_nod;
    table_start_NOD(id_org_nod);
    // addTdNod(arrayNOD, false);
}

// <td class="txtLong"><p class="stupidText">' + nod.vnedr_place.replaceAll('//.', '. ') + '</p></td >\

// Отрисовка таблицы с данными
function addTdNod(whenWork, isRewrite) {
    if (isRewrite) arrayNOD = whenWork;

    arrayNOD.map(nod => {
        let new_tr = document.createElement('tr');
        new_tr.id = "mi_nod_" + nod.id + "";
        new_tr.classList.add("mi_nod_" + nod.id + "");
        new_tr.addEventListener("click", open_modal_window_nod, false);
        new_tr.innerHTML = '\
						<td>' + nod.num + '</td>\
						<td>' + nod.name_org + '</td>\
						<td>' + nod.name_sluzh + '</td >\
                        <td class="txtLong"><p class="stupidText">' + nod.name + ' </p></td >\
                        <td class="txtLong"><p class="stupidText">' + addbr(nod.author) + '</p></td >\
                        <td>' + nominaz_top_list(nod.nomination) + '</td >\
                        <td class="txtLong"><p class="stupidText">' + nod.znach_tehnik + '</p></td >\
                        <td>' + nod.vnedr_date + '</td >\
                        <td class="txtLong"><p class="stupidText">' + replacePlace(nod.vnedr_place) + '</p></td >\
                        <td>' + nod.file + '</td >\
						<td id="td_vybor_'+ nod.id +'">' + (nod.vybor_nod === 1 ? `Да` : `Нет`) + '</td >';

        document.querySelector('.table_level_NOD').appendChild(new_tr);

        if(nod.vybor_nod===1)
            document.getElementById(`td_vybor_${nod.id}`).style.backgroundColor = "#94ff69";
    })
}

// удаления таблицы со старыми данными
function delete_oll_tr_for_new_table_NOD() {
    for (let i = 0; i < arrayNOD.length; i++)
        document.querySelector('.table_level_NOD').removeChild(document.getElementById("mi_nod_" + arrayNOD[i].id));
}

//
function CloseModalNOD() {
    // clean_data_form_nod();
    modal_window_nod.style.display = "none";

    colorLineActiveNod(true);
    setTimeout( function() {colorLineActiveNod(false);}, 2000);

    scrollingPred(false, 0 , modal_window_nod);

    clean_data_form_nod()
}

// Открытие окна "Редактировать" для просмотра выбранных данных
function open_modal_window_nod(e) {
    heightModalWindow(modal_window_nod);
    scrollingPred(true, pageYOffset, modal_window_nod);

    document.getElementById("data_vnedr_nod_MI").readOnly  = true;
    // document.getElementById("checkbox_for_vibor_nod").setAttribute("disabled", "disabled");
    if(idTouchTR_table_nod!==undefined) colorLineActiveNod(false);
    view_button_nod([`none`, `block`]);

    idTouchTR_table_nod = (e.path[1].id).split('_')[2];
    if(idTouchTR_table_nod===undefined)
        idTouchTR_table_nod = (e.path[2].id).split('_')[2];

    arrayNOD.find((arr, index)=>{
        if(arr.id === idTouchTR_table_nod) id_click_row_nod = index
    });

    // debugger
    // console.log(arrayNOD[id_click_row_nod])
    // console.log(arrayNOD[id_click_row_nod].vnedr_place)
    // console.log(arrayNOD[id_click_row_nod].vnedr_place.split(". "))
    //
    // console.log(arrayNOD[id_click_row_nod].id_struc);
    // console.log(arrayNOD[id_click_row_nod].vnedr_place.indexOf('//.'))

    let choose_this_mesto = [];

    if(arrayNOD[id_click_row_nod].vnedr_place.indexOf('//.') > 0 )
        choose_this_mesto = arrayNOD[id_click_row_nod].vnedr_place.split("//.");

    // console.log(choose_this_mesto.length)

     let id_struc = arrayNOD[id_click_row_nod].id_struc;

    // console.log(choose_this_mesto);

//  Заполнение селектов места внедрени
    if(id_struc !=='null')
        switch(id_struc){
            case "2": element15.options[1].selected = true;
                break;
            case "3": element15.options[2].selected = true;
                break;
            case "4": element15.options[3].selected = true;
                break;
    }

    // debugger
    console.log(choose_this_mesto);

    if(choose_this_mesto.length > 0) {

        // element16.options[0] = new Option(choose_this_mesto[0]);
        choose_this_mesto[0] !== 'null' ? element16.options[0] = new Option(choose_this_mesto[0]) : element16.options[0] ='';
        element16.options[0].value = choose_this_mesto[0];
        element16.options[0].selected = true;

        if(choose_this_mesto.length > 1) {
            // element17.options[0] = new Option(choose_this_mesto[1]);
            choose_this_mesto[1] !== 'null' ? element17.options[0] = new Option(choose_this_mesto[1]) : element17.options[0] = '';
            element17.options[0].value = choose_this_mesto[1];
            element17.options[0].selected = true;

            if(choose_this_mesto.length > 2)
                choose_this_mesto[2] !== 'null' ? element18.value = choose_this_mesto[2] : element18.value = '';
            else element18.value = '';
        }
    }


    //

//  Блокировка для редактирования селектов места внедрения

    element15.disabled = true;
    element16.disabled = true;
    element17.disabled = true;
    element18.disabled = true;

    document.getElementById("data_vnedr_nod_MI").value = (arrayNOD[id_click_row_nod].vnedr_date === " " ? data_now() : data_form_in(arrayNOD[id_click_row_nod].vnedr_date));
    document.getElementById("checkbox_for_vibor_nod").checked = (arrayNOD[id_click_row_nod].vybor_nod === 1);

    modal_window_nod.style.display = "flex";
}

element15.onclick = () => {
    let index = element15.options.selectedIndex;
    let struktura = element15.options[index].value;
    element16.innerHTML = "";
    element17.innerHTML = "";
    element16.disabled = false;
    element17.disabled = false;
    element18.disabled = false;

    ajaxGetGroup('table/nod/php/get_group.php?value=' + struktura);
};

function ajaxGetGroup(url) {
    let request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onload = function () {
        let data = JSON.parse(this.response);
        element16.options[0] = new Option("");
        for (let i = 0; i < data.length; i++) {
            element16.options[i + 1] = new Option(data[i].name_org);
            element16.options[i + 1].value = data[i].name_org;
        }
    };
    request.send();
}

element16.onclick = () => {
    let index = element16.options.selectedIndex;
    let level_for_otdel = element16.options[index].value;

    this_otdel_for_mesto = element16.options[index].text;
    if (level_for_otdel === "") element17.innerHTML = "";
    element17.innerHTML = "";

    ajaxGetGroupNode('table/nod/php/get_group_node.php?value=' + level_for_otdel);
};

function ajaxGetGroupNode(url) {
    let request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onload = function () {
        let data = JSON.parse(this.response);

        element17.options[0] = new Option("");
        for (let i = 0; i < data.length; i++) {
            element17.options[i + 1] = new Option(data[i].name_org);
            element17.options[i + 1].value = data[i].name_org;
        }
    };
    request.send();
}

// изменение состояния кнопок "Редактировать" и "Сохранить"
function view_button_nod([btnSave, btnRem]) {
    document.getElementById("remove_this_MI_nod").style.display = `${btnSave}`;
    document.getElementById("open_remove_function").style.display = `${btnRem}`;
}

// функция определения шырины модального окна
function heightModalWindowNOD() {
    add_new_place.style.height = screen.height + "px";
}

// устанвить или убрать подсветку
function colorLineActiveNod(act) {
    let mi_nod_id = document.getElementById(`mi_nod_${idTouchTR_table_nod}`);
    !act
        ? mi_nod_id.classList.remove("active")
        : mi_nod_id.classList.add("active");

    // if (!act) {
    //     mi_nod_id.classList.add("transition");
    //     // ? mi_nod_id.classList.remove("active")
    //     setTimeout( function() {
    //         mi_nod_id.classList.remove("active");
    //         mi_nod_id.classList.remove("transition");
    //         }, 4000);
    // } else mi_nod_id.classList.add("active");

    // mi_nod_id.classList.remove("active");
    // mi_nod_id.classList.remove("transition");
}

