
var D = new Date();

function toDay() {
  let Day = D.getDate();
  let Month = D.getMonth() + 1;
  let Year = D.getFullYear();
  let ToDay = Year + '-' + Month + '-' + Day;
  return ToDay;
}
function pr1() {
  // alert($('.my_opts').css('display'));
  /* $('.my_opts').css('display','inline-block');*/

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

//Подводим итог
function button_func() {
  if (check_select() && check_cal() && check_kol()) {
    StrRegion = $('#myselect').text();
    document.location = 'seat.html?' + send_kod(StrRegion);
  }
}
function send_kod(z) {
  if (z == "Алтайский край") return 0;
  else return 1;

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

