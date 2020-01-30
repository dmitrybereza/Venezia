var card ={
};
var count = 0;

function openInNewTab(url){
	var win = window.open(url,'_self');
	win.focus();
}

function onload(){
	loadCard();
	loadCount();
}

function loadCard(){
	if(localStorage.getItem('card')){
		card = JSON.parse(localStorage.getItem('card'));
		showCard();
	}
	else{
		out='';
            out+='<div class="emptyCard">';
            out+='<div>'
            out+='<p>Кошик порожнiй</p>';
            out+='<a href="shopPage.html">Перейти в магазин</a>'
            out+='</div>';
			out+='</div>';
			$('.cardList').html(out);
	}
}

function loadCount(){
	if(localStorage.getItem('counter')){
		count = localStorage.getItem('counter');
		document.getElementById("lblCartCount").textContent = count;
	}
	else {
		document.getElementById("lblCartCount").textContent = 0;
	}
}

!function(e){"function"!=typeof e.matches&&(e.matches=e.msMatchesSelector||e.mozMatchesSelector||e.webkitMatchesSelector||function(e){for(var t=this,o=(t.document||t.ownerDocument).querySelectorAll(e),n=0;o[n]&&o[n]!==t;)++n;return Boolean(o[n])}),"function"!=typeof e.closest&&(e.closest=function(e){for(var t=this;t&&1===t.nodeType;){if(t.matches(e))return t;t=t.parentNode}return null})}(window.Element.prototype);
document.addEventListener('DOMContentLoaded', function() {
   var modalButtons = document.querySelectorAll('.js-open-modal'),
       overlay      = document.querySelector('.js-overlay-modal'),
       closeButtons = document.querySelectorAll('.js-modal-close');
   modalButtons.forEach(function(item){
      item.addEventListener('click', function(e) {
         e.preventDefault();
         var modalId = this.getAttribute('data-modal'),
             modalElem = document.querySelector('.modal[data-modal="' + modalId + '"]');
         modalElem.classList.add('active');
         overlay.classList.add('active');
      }); 
   }); 
   closeButtons.forEach(function(item){
      item.addEventListener('click', function(e) {
         var parentModal = this.closest('.modal');

         parentModal.classList.remove('active');
         overlay.classList.remove('active');
      });
   });
    document.body.addEventListener('keyup', function (e) {
        var key = e.keyCode;
        if (key == 27) {

            document.querySelector('.modal.active').classList.remove('active');
            document.querySelector('.overlay').classList.remove('active');
        };
    }, false);
    overlay.addEventListener('click', function() {
        document.querySelector('.modal.active').classList.remove('active');
        this.classList.remove('active');
    });
});

function confirmOrder(){
    var email = $('#eMail').val();
	var eFIO = $('#eFIO').val();
	var eNUM = $('#ePhone').val();
	var eCity = $('#eCity').val();
	var ePost = $('#ePost').val();

	if(email != '' && eFIO != '' && eNUM != '' && eCity != '' && ePost != ''){
		$.post(
			"core/mail.php",
			{
				"eFIO" : eFIO,
				"email" : email,
				"eNUM" : eNUM,
				"eCity" : eCity,
				"ePost" : ePost,
				"card" : card
			},
			function(data){
				if(data == 1){
					var win = window.open('index.html','_self');
					win.focus();
					localStorage.clear();
                    Swal.fire({
                        icon: 'success',
                        title: 'Замовлення прийнято',
                        text: 'Ваше замовлення оброблюється. Очiкуйте дзвiнка!',
                        timer: 2000,
                        width: '31rem',
                        showConfirmButton: false
                      })   
				}
				else{
					Swal.fire({
                        icon: 'error',
                        title: 'Повторiть замовлення',
                        timer: 2000,
                        width: '31rem',
                        showConfirmButton: false
                      }) 
				}
			}
		);
	}
	else{
		Swal.fire({
            icon: 'error',
            title: 'Заповнiть всi поля',
            timer: 2000,
            width: '31rem',
            showConfirmButton: false
          }) 
	}
}


$(document).ready(function() {
    $("#phone").mask("+38 (099) 99-99-999");
  });   
