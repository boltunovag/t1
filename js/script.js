
var D = new Date();

function toDay() {
  let Day = D.getDate();
  let Month = D.getMonth() + 1;
  let Year = D.getFullYear();
  let ToDay = Year + '-' + Month + '-' + Day;
  return ToDay;
}
function pr1() {

  if ($('.my_opts').css('display') !== 'none') {
    $('.my_opts').css('display', 'none');
    $('#myselect').text('Выберите регион ▼');
    $('#myselect').css('color', 'rgb(240, 79, 4)');

  }
  else {
    $('.my_opts').css('display', 'inline-block');
  }
}
function viborreg(x) {

  $('#myselect').text(x);
  $('#myselect').css('color', '#3669d8');
  $('.my_opts').css('display', 'none');
}

function check_select() {//Проверим регион
  if ($('#myselect').text() == "Выберите регион ▼") {
    alert('Выберите регион');
    return false;
  }
  else return true;
}
/***********************Проверяем дату*****/
function check_cal() {
  if ($('#inp_cal').val() == '') {
    alert('Укажите дату');
    return false;
  }
  inD = new Date($('#inp_cal').val());
  let Day = toDay();
  inDay = $('#inp_cal').val();

  if ((inD <= D) || (Day == inDay)) {
    alert('Проверьте дату');
    $('#inp_cal').val(toDay);
    return false;
  }
  else return true;


}
function check_kol() {
  if (Number($('#inp_kol').val()) < 1) {
    alert('Проверьте количество гостей');
    return false;
  }
  else return true;
}

//Кнопка отправки данных
function button_func() {
  if (check_select() && check_cal() && check_kol()) {
    StrRegion = $('#myselect').text();

    document.location = 'seat.html?' + 'loc=' + send_kod(StrRegion) + '&kol=' + $('#inp_kol').val() + '&cal=' + $('#inp_cal').val();
  }
}
function send_kod(z) {
  if (z == "Алтайский край") return 0;
  else return 1;
  /*******************//////////////************************************************/
}
//на странице seat узнаём какой регион выбран
function receive_kod(y) {
  let Reg = ["Алтайский край", "Красноярский край"];
  let Adr = ['Туристическая база "Озеро Красилово", Косихинский район, с. Озеро-Красилово, ул. Пушкина д.1',
    'Наименование и адрес локации: Парк-отель "Чайка", Ачинский район, с. Ключи, Пионерская долина, 5'];
  let Regh2 = Reg[y];
  let Adrp = Adr[y];

  return { Regh2, Adrp }
}
$(document).ready(function () {

  if (location.pathname == '/seat.html') {
    var paramsString = document.location.search;
    var searchParams = new URLSearchParams(paramsString);
    let kod_loc = searchParams.get("loc");//Получили код региона
    let kol_chel = searchParams.get("kol");//получили количество человек
    let cal_inp = searchParams.get("cal");
    let imya_regiona = receive_kod(kod_loc).Regh2;//получили имя выбранного региона
    $('#NRegion').text(imya_regiona);
    $('#myselect').text(imya_regiona);//Вставили имя региона в инпут
    $('#adres_loc').text(receive_kod(kod_loc).Adrp);

    document.querySelector("#plan_loc").src = "images/plan/" + kod_loc + ".jpg";
    //заполняем количество  делаем доступными зоны
    if (Number(kol_chel) != NaN) {
      $('#inp_kol').val(kol_chel);
      dostup_zon(kol_chel);
    }
    if (Number(kod_loc != NaN)) {
      /* $('.tab_zones article').css('display', 'none');*/

      $('#loc_' + kod_loc).show();
      /* $('#loc_NaN').hide();*/
    }
    //заполняем календарь
    if (cal_inp != null) {
      $('#inp_cal').val(cal_inp);
    }
  }
});
//перебираем ячейки таблицы сверяем значение с количеством людей
function dostup_zon(k) {
  let kol = Number(k);
  if ((kol != NaN) && (kol > 0)) {
    $(".nedostupen").each(function (index) {
      if (Number($(this).attr('alt')) >= kol) {
        $('#Al_' + index).addClass("dostupen").removeClass("nedostupen").text('Заказать');
      }
    });
  }
}
//Кнопка со ссылкой для страницы booking

function k_broni(i) {
  if ($('#Al_' + i).hasClass('dostupen') && (check_select() && check_cal() && check_kol())) {
    document.location = 'booking.html?' + 'loc=' + send_kod($('#myselect').text()) + '&kol=' + $('#inp_kol').val() + '&cal=' + $('#inp_cal').val() + '&zona=' + i;
  }

}
