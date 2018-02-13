let values = {
  nome: '',
  email: '',
  tel: 0,
  cel: 0,
  wats: false,
  cidade: '',
  estado: '',
  mensagem: ''
};

$(document).ready(function() {
  $(document).on('keydown', '#tel, #cel', maxLength);
  $(document).on('click', '.enviar', submit);
  $(document).on('focus', 'input, textarea', removeError);
  preencherEstados();
});

// Define o max lenght para os inputs de telefone e celular
function maxLength(e) {
  let key = e.keyCode;
  let max = $(this).attr('maxlength');

  if($(this).val().length >= max || $(this).val().length + 1 > max){
    if( key == 8 || key == 46 || key == 13 || key == 37 || key == 39 || key == 9 )
        return true;
    return false;
  }
}

//Preenche o dropdown com os estados do Brasil
function preencherEstados(){
  var estados = this.estados();

  for(estado of estados){
    $('#divEstado select optgroup').append(`
      <option>${ estado }</option>
    `);
  }
}

//Valida o formulário
function validate(){
  let inputs = $('.center').find('input:not([type="radio"]), textarea, select');
  let tudoCerto = true;

  for(input of inputs){
    if($(input).prop('required')){
      if(!input.value.length){
        $(input).closest('.form-group').addClass('has-error')
          .find('.help-block').text('Esse campo é obrigatório!');
        tudoCerto = false;
      }
    }
    if(input.type == 'number' && ((input.value.length < $(input).attr('maxlength') || input.value.length > $(input).attr('maxlength'))&& input.value.length != 0)){
      $(input).closest('.form-group').addClass('has-error')
        .find('.help-block').text(`Esse campo deve ter ${$(input).attr('maxlength')} números!`);
      tudoCerto = false;
    }
  }

  return tudoCerto;
}

//Pega as informações
function submit(){
  let inputs = $('.center').find('input:not([type="radio"]), textarea, select');
  let radio = $('.center').find('input[type="radio"]:checked');

  if(!validate()) return;
  for(inp of inputs){
    values[inp.id] = $(inp).val();
    $(inp).val('');
  }

  values.wats = radio.prop('id') ? true : false;
  console.log(values);
  $('.modal').modal();
}

//Remove os erros dos inputs quando clicam neles
function removeError(){
  $(this).closest('.form-group').removeClass('has-error').find('.help-block').text('')
}

//Retorna um array com todos estados brasileiros
function estados(){
  return  [
    "São Paulo",
    "Bahia",
    "Minas Gerais",
    "Amazonas",
    "Paraná",
    "Santa Catarina",
    "Rio Grande do Sul",
    "Pará",
    "Goiás",
    "Pernambuco",
    "Rio de Janeiro",
    "Distrito Federal",
    "Espírito Santo",
    "Ceará",
    "Mato Grosso",
    "Maranhão",
    "Mato Grosso do Sul",
    "Paraíba",
    "Rio Grande do Norte",
    "Alagoas",
    "Sergipe",
    "Tocantins",
    "Piauí",
    "Rondônia",
    "Acre",
    "Roraíma",
    "Amapá"
  ];
}
