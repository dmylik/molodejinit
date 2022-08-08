// окно для поиска автора
function autorAdd() {
    let h = screen.height;
    panel2.style.width = "400px";
    panel2.style.height = h + "px";
    contayner_panel2.height = h + "px";
    panel2.style.backgroundColor = "white";
    panel2.style.borderLeft = "1px solid rgb(1,127,189)";
}

// обработчик нажатия
vvod_text_info1_insert.onclick = function () {
    window.addEventListener('keyup', searchFIO);
};


vvod_text_info1_insert.onblur = function () {
    setTimeout(myFunction12, 350);
};

function myFunction12() {
    window.removeEventListener('keyup', searchFIO);
}

// обработчик нажатия на "Пробел"
function searchFIO(e) {
    if (e.keyCode === 32) {
        let mass_rez_vvod_text_info1 = ["", "", ""];
        let value_vvod_text_info1_insert = vvod_text_info1_insert.value;
        mass_rez_vvod_text_info1 = value_vvod_text_info1_insert.split(" ");
        if (mass_rez_vvod_text_info1.length < 3) {
            mass_rez_vvod_text_info1[2] = "1";
        }
        let fam = "1";
        fam = mass_rez_vvod_text_info1[0];
        fam = fam.toLowerCase();
        let name = "1";
        let otch = "1";
        if (mass_rez_vvod_text_info1[1] === "" || mass_rez_vvod_text_info1[1] === "undefined") {
            name = "1";
        } else {
            name = "" + mass_rez_vvod_text_info1[1] + "";
            name = name.toLowerCase();
        }
        if (mass_rez_vvod_text_info1[2] === "" || mass_rez_vvod_text_info1[2] === "undefined") {
            otch = "1";
            fio_POST('table/predpriatie/php/autor_insert.php?fam=' + fam + '&name=' + name + '&otch=' + otch + '');
        } else {
            otch = "" + mass_rez_vvod_text_info1[2] + "";
            otch = otch.toLowerCase();
            fio_POST('table/predpriatie/php/autor_insert.php?fam=' + fam + '&name=' + name + '&otch=' + otch + '');
        }
    }
}

let data_fio;
let arrRR= [];

// обработка запроса после нажатия на "Пробол"
function fio_POST(url) {
    let newtable = document.querySelector('.table_rez_poisk_first');
    let newstr = document.querySelectorAll('.table_rez_poisk_first .kn');
    let c = newtable.childElementCount;
    for (let i = 0; i < c - 1; i++) {
        newtable.removeChild(newstr[i]);
    }

    let l = 0;
    let request3 = new XMLHttpRequest();
    request3.open('POST', url, true);
    request3.onload = function () {
        arrRR.length = 0;
        data_fio = JSON.parse(this.response);
        if (l < 1) {

            data_fio.map((val, index, arr)=> {
                let test = false;
                    arrRR.find((arr, ind)=>{
                        if(arr.tab_num === val.tab_num) test =  true;});
                if(!test) arrRR.push(val);
            });

            for (let i = 0; i < arrRR.length; i++) {

                let fam = arrRR[i].fam;
                let name = arrRR[i].name;
                let otch = arrRR[i].otch;
                let tab_num = arrRR[i].tab_num;
                let work_place = arrRR[i].work_place;
                let line_fio = "" + fam + " " + name + " " + otch + "";
                let new_tr = document.createElement('tr');
                new_tr.id = "o20" + i + "";
                new_tr.classList.add("kn");
                new_tr.innerHTML = '\
                    <td class="number_public1 td"  >' + line_fio + '</td>\
                    <td class="name_piple1 td"  >' + work_place + '</td >';
                document.querySelector('.table_rez_poisk_first').appendChild(new_tr);
            }
            l++;
        }
    };
    request3.send();
}


let stroka_name_rez;
let write_author_mi;
table_rez_poisk_first.onmouseover = function () {
    let mass_kh_table_predloj = document.querySelectorAll(".kn");
    for (let i = 0; i < mass_kh_table_predloj.length; i++) {
        id_stroka_name = mass_kh_table_predloj[i].id;
        let str = "#" + id_stroka_name;
        stroka_name_rez = document.querySelector(str);

        stroka_name_rez.onclick = function (event) {
            for (let i = 0; i < mass_kh_table_predloj.length; i++) {
                id_stroka_name = mass_kh_table_predloj[i].id;
                let str = "#" + id_stroka_name;
                stroka_name_rez = document.querySelector(str);
                stroka_name_rez.style.backgroundColor = "white";
            }

            element_strok1 = event.currentTarget;
            element_strok = element_strok1.id;

            let number_elem_table;
            let legth_number = element_strok.length;

            number_elem_table = element_strok.substr(3, legth_number);
            str = "#" + element_strok + "";
            id_stroka = document.querySelector(str).innerHTML;
            id_stroka = +id_stroka;
            element_strok1.style.backgroundColor = "rgb(190,190,190)";

            let fio = `${arrRR[number_elem_table].fam} ${arrRR[number_elem_table].name} ${arrRR[number_elem_table].otch}`;
            write_author_mi = write_author_novshestva_modal.value;
            if (write_author_mi === "") {
                write_author_novshestva_modal.value = `${fio}, ${arrRR[number_elem_table].birthday}, ${arrRR[number_elem_table].dolzhn}, ${arrRR[number_elem_table].work_place}.`;
            } else {
                write_author_novshestva_modal.value = `${write_author_mi}${fio}, ${arrRR[number_elem_table].birthday}, ${arrRR[number_elem_table].dolzhn}, ${arrRR[number_elem_table].work_place}.`;
                // write_author_novshestva_modal.value = `${write_author_mi}; ${fio}, ${data_fio[number_elem_table].birthday}, ${data_fio[number_elem_table].dolzhn}, ${data_fio[number_elem_table].work_place}.`;
            }
            vvod_text_info1_insert.value = "";
            panel2.style.width = "0px";
            let newtable = document.querySelector('.table_rez_poisk_first');
            let newstr = document.querySelectorAll('.table_rez_poisk_first .kn');
            let c = newtable.childElementCount;
            for (let i = 0; i < c - 1; i++) {
                newtable.removeChild(newstr[i]);
            }
            arrRR.length = 0;
        }
    }
};

function closeWindowFindAuthor() {
    vvod_text_info1_insert.value = "";
    panel2.style.width = "0px";
    let newtable = document.querySelector('.table_rez_poisk_first');
    let newstr = document.querySelectorAll('.table_rez_poisk_first .kn');
    let c = newtable.childElementCount;
    for (let i = 0; i < c - 1; i++) {
        newtable.removeChild(newstr[i]);
    }
}
