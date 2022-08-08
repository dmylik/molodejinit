function data_form_out(data_out) {
    let [year, month, day] = data_out.split("-");     //2022-12-21
    return day + "." + month + "." + year; //21.12.2022
}

function data_form_in(data_in) {
    let [day, month, year] = data_in.split('.');   //21.12.2022
    return year + "-" + month + "-" + day;    //2022-12-21
}

function data_now() {
    return  data_form_in(new Date().toLocaleDateString());
}