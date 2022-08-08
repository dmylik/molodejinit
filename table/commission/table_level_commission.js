let arrayComm = [];
let id_comm;
let idTouch;
let ratingStart;
// let btnRating = document.getElementById("button_choose_rating");

function table_level_commission(id_comm_cookie, ratingViewThis) {
    if(ratingViewThis)
    ratingStart = ratingViewThis;
    id_comm = id_comm_cookie;
    table_start_Comm(id_comm);
}

function addTdCommission(whenWork, isRewrite) {
    if (isRewrite) arrayComm = whenWork;

    sort_for_namination(true);

    let line = 0;
    let newID = 1;
    arrayComm.map(commission => {
        if (commission.nomination !== line) {
            let new_tr_oll = document.createElement('tr');
            new_tr_oll.classList.add("mi_commission_oll");
            new_tr_oll.innerHTML = '\<td style="padding-left: 3em" colspan="7">' + `${nominaz_top_list(commission.nomination)}` + '</td >';
            document.querySelector('.commission_and_bgd').appendChild(new_tr_oll);
            newID = 1;
        }

        let new_tr = document.createElement('tr');
        let id_comm = commission.id;
        let id_comm1 = "   111   ";
        new_tr.id = "mi_commission_" + id_comm + "";
        new_tr.classList.add("mi_commission");
        new_tr.innerHTML = '\
						<td style="text-align: center">' + newID++ + '</td>\
						<td>' + commission.name_org + '</td>\
						<td>' + commission.name_sluzh + '</td >\
                        <td class="txtLong"><p class="stupidText">' + commission.name + '</p></td >\
                        <td class="txtLong"><p class="stupidText">' + addbr(commission.author) + '</p></td >\
                        <td>' + commission.file + '</td >\
                        <td id="tr_rating_' + id_comm +'" class="tr_rating"></td >';
        document.querySelector('.commission_and_bgd').appendChild(new_tr);
        document.querySelector('.stupidText').style.maxWidth = "300px";

        if(!ratingStart) {
            let rating_p = document.createElement('p');
            rating_p.id = `rating_comm_${id_comm}`;
            rating_p.classList.add("rating_comm");
            rating_p.innerHTML = commission.rating;
            document.getElementById(`tr_rating_${id_comm}`).appendChild(rating_p);
            // debugger
            // document.getElementById(`select_comm_${id_comm}`).style.display = "none";
            // document.getElementById(`tr_rating_${id_comm}`).removeChild(document.getElementById(`select_comm_${id_comm}`));
        }
        else {
            let rating_select = document.createElement('select');
            rating_select.id = `select_comm_${id_comm}`;
            rating_select.classList.add("select_comm");
            rating_select.addEventListener("change", ()=> rating_update(id_comm, id_nod[2] ));
            // rating_select.addEventListener("change", {handleEvent: rating_update, val: id_comm, id: 2});
            document.getElementById(`tr_rating_${id_comm}`).appendChild(rating_select);

            for (let i = 5.0; i >= 0.0; i -= 0.1) {
                let rating_option = document.createElement('option');
                rating_option.value = `${i.toFixed(1)}`;
                rating_option.innerHTML = `${i.toFixed(1)}`;
                document.getElementById(`select_comm_${id_comm}`).appendChild(rating_option);
            }
        }
        line = commission.nomination;
    })
}

function openWindowRating(id_comm) {
    console.log(id_comm, tableSee)
    // document.getElementById(`select_comm_291`).style.visibility = 'visible';
    document.getElementById(`select_comm_291`).show = true;
}

function rating_update(val, tableSee) {
    let newRating = document.getElementById(`select_comm_${val}`).value;
    console.log(val, tableSee)
    alert(val)
}

function choose_rating1() {
    for (let j = 0; j < arrayComm.length; j++) {
        // document.getElementById(`rating_comm_${arrayComm[j].id}`).style.display = "none";
        let assessment = document.getElementById(`select_comm_${arrayComm[j].id}`).value;

        console.log(assessment);
        // btnRating.innerHTML = "Навер. Проголо"
    }

}

// удаления таблицы со старыми данными
function delete_oll_tr_for_new_table_Comm() {
    for (let i = 0; i < arrayComm.length; i++)
        document.querySelector('.commission_and_bgd').removeChild(document.getElementById("mi_commission_" + arrayComm[i].id));
    // document.querySelector('.commission_and_bgd').removeChild(document.querySelectorAll('.mi_commission_oll'));
    let mi_commission_oll = document.getElementById('commission').getElementsByClassName("mi_commission_oll");
    while (mi_commission_oll[0])
        mi_commission_oll[0].parentNode.removeChild(mi_commission_oll[0]);
}

function table_start_Comm(id_comm) {
    let this_date_year;
    if(ratingStart)
        this_date_year = document.getElementById("list_year_for").value;
    else
        this_date_year = Number(data_now().split("-")[0]);

    let data_object = [{
        year: this_date_year,
        id_slugba: 10
    }];

    let rez = JSON.stringify(data_object);
    post_ajax_Comm(rez);
}


// Запрос к Базе и Вывод данных в таблицу
function post_ajax_Comm(rez) {
    jQuery.ajax({
        type: "POST",
        url: 'table/slugba/php/table_year_SLUZHB.php',
        dataType: 'json',
        data: {arguments: rez},
        success:
            function (data) {
                let dataServer = [];
                for (let i = 0; i < data.length; i++)
                    dataServer.push({
                        id: data[i].ID,
                        name: data[i].NAME,
                        name_org: data[i].NAME_ORG,
                        name_sluzh: data[i].NAME_SLUZH,
                        author: data[i].AUTORS,
                        nomination: data[i].ID_NOMINAC,
                        file: "-",
                        rating: '4.99'
                    });
                addTdCommission(dataServer, true);
            },
    });
}

function find_com_txt() {
    let txtFind = document.getElementById("text_for_find").value;
    document.getElementById("button_reset_find").style.display = 'block';


    let arrayFindComm = arrayComm.filter(arr => {
        if (arr.name.toLowerCase().indexOf(txtFind.toLowerCase().trim()) >= 0) return true;
        if (arr.name_org.toLowerCase().indexOf(txtFind.toLowerCase().trim()) >= 0) return true;
        if (arr.name_sluzh.toLowerCase().indexOf(txtFind.toLowerCase().trim()) >= 0) return true;
        if (arr.author.toLowerCase().indexOf(txtFind.toLowerCase().trim()) >= 0) return true;
        if (arr.rating.toLowerCase().indexOf(txtFind.toLowerCase().trim()) >= 0) return true;
    });

    delete_oll_tr_for_new_table_Comm();
    addTdCommission(Array.from(new Set(arrayFindComm)), true);
}