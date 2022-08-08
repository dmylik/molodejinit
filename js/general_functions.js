// Список Лучших МИ
function nominaz_top_list(idTop) {
    let arrTop = ["Лучшая МИ, направленная на повышение безопасности движения поездов",
        "Лучшая МИ, направленная на улучшение условий перевозки грузов и пассажиров",
        "Лучшая МИ, направленная на повышение производительности труда и рациональное использование трудовых ресурсов",
        "Лучшая МИ, направленная на экономию топливно-энергетических и материальных ресурсов",
        "Лучшая МИ, направленная на обеспечение охраны окружающей среды",
        "Лучшая МИ, направленная на улучшение условий и охраны труда на производстве",
        "Лучшая МИ, направленная на автоматизацию и механизацию производственных процессов",
        "Лучшая МИ, направленная на цифровую трансформацию производственных процессов"];
    return arrTop[idTop - 1];
}

// Замена "\n" на </br>
function addbr(txt) {
    // console.log(txt.split('\n').length);
    // не работает на Chrome нижк 86 версии ((((
    // return `- ${txt}`.replaceAll('\n\n', '\n').replaceAll('\n', "</br>- ");


    // для всех версй
    let str = '';
    let str2 ='';
    txt.split('\n\n').map(a=>{str += a + "\n"});

    let secondArr = str.split('\n');
    secondArr.pop();
    secondArr.map(b=>{str2 += `- ${b}` + "</br>"});
    return str2
}

// Функция для замены "//." для места внедрения
function replacePlace(txt) {
    // debugger;
    let str = '';
    if(txt!=='')
        txt.split('//.').map(a=>{str += a + ".</br>"});
    // console.log(str);
    return str;
}

// функция определения шырины модального окна
function heightModalWindow(window) {
    window.style.height = screen.height + "px";
}

// Функция блокировки скрола и выравниваня окна
function scrollingPred(status, margin, window) {
    if(status)
        document.body.classList.add("stop-scrolling");
    else
        document.body.classList.remove("stop-scrolling");
    window.style.marginTop = `${margin}px`;
}

// общая функция для определения нужного поиска
function findFunctionButton(id) {
    switch (id) {
        case '1' : {
            find_bgd_txt();
            break;
        }
        case '2' : {
            find_slugba_txt();
            break;
        }
        case '3' : {
            find_nod_txt();
            break;
        }
        case '6' : {
            find_com_txt();
            break;
        }
        case '10' : {
            find_pred_txt();
            break;
        }

    }
}