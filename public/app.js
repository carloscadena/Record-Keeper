'use strict';

let i
$('button').on('click', function(){
    event.preventDefault();
    if ($('#the-checkbox').is(':checked')){
      i = {ely:1}
      console.log(i);
    } else if ($('#the-checkbox2').is(':checked')){
      i = {carlos:1}
      console.log(i)
    }
    $.post('/userchangescore', i)
});

$('input[type="checkbox"]').on('change', function() {
   $('input[type="checkbox"]').not(this).prop('checked', false);
});
