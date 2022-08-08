// определение роли пользователя
function find_cookie() {
    const cookie = document.cookie;
    let mass = [id_user_GLOBAL, user_fio, id_org, id_NOD, user_org] = cookie.split(";").map((x) => x.split("=")[1]);
    console.log(mass)


    // изменение текста по id
    document.getElementById("name_fio").innerHTML = mass[1] + ", " + mass[4];
    // document.getElementById("organization").innerHTML = mass[4];
    document.getElementById("name_header_text").innerHTML = "Молодёжная инициатива";

    return mass;
}