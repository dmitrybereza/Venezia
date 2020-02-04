var card ={
};
var count = 0;

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
	var eNUM = $('#phone').val();
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


function openInNewTab(url){
	var win = window.open(url,'_self');
	win.focus();
}

function onload(){
    $(".js-open-modal").css("display","none")
    loadCount();
	loadCard();
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
            $(".js-open-modal").css("display","none")
	}
}

function showCard()
{
	var out = '';
	if(Object.keys(card).length == 0){
		out+='<div class="emptyCard">';
            out+='<div>'
            out+='<p>Кошик порожнiй</p>';
            out+='<a href="shopPage.html">Перейти в магазин</a>'
            out+='</div>';
			out+='</div>';
        $('.cardList').html(out);
        $(".js-open-modal").css("display","none")

	}
	else{
    var sum = 0;
	$.getJSON('limestone.json',function(data1){
        var out = '';
        var fabricator = localStorage.getItem('Fabricator')
        out+='<div class="fullCard">'
        for(var id in card){
            out+=`<div class ="cardItem">`;
            out+='<div class="itemImgCard">';
            out+=`<img src="Assets/Images/Fabricators/`+ fabricator +`/${data1[id].img}">`;
            out+='</div>';
            out+='<div class ="ItemAmountName">';
            out+='<p>'+data1[id].name+'</p>';
            out+='</div>'
            out+='<div class ="ItemAmountCost">';
            out+='<p>'+card[id]*data1[id].cost+' Грн</p>';
            out+='</div>'
            out+='<div class ="ItemButtons">';
            out+=`<button onclick="incrShopCard()" data-id ="${id}" class="add-to-card"><i class="fas fa-plus"></i></button>`;
            out+=`<p>${card[id]}</p>`;
            out+=`<button onclick="decrShopCard()" data-id ="${id}" class ="delete-one-from-card"><i class="fas fa-minus"></i></button>`;
            sum+=card[id]*data1[id].cost;
            out+=`<button data-id ="${id}" class ="delete-from-card"><i class="fas fa-trash"></i></button>`;
            out+='</div>';
            out+='<hr>'
            out+='</div>';
        }
        out+='<div class="sum">';
			out+='<p>Итого: '
			out+='<div class ="sumNum">'
			out+='<p>'+ sum +' ГРН</p>';
			out+='</div>';
            out+='</div>';
            out+='</div>';
			$('.cardList').html(out);
			$('.add-to-card').on('click', addToCardFromCard);
			$('.delete-one-from-card').on('click', deleteOneFromCard);
            $('.delete-from-card').on('click', deleteFromCard);
            $(".js-open-modal").css("display","block")
	})

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

function addToCardFromCard(){
	var id =$(this).attr('data-id');
	card[id]++;
	saveCard();
	showCard();
}

function saveCard(){
	localStorage.setItem('card',JSON.stringify(card));
}

function incrShopCard(){
	count++;
	localStorage.setItem('counter',count);
	document.getElementById("lblCartCount").textContent = count;
}

function decrShopCard(){
	if(count ==0){}
	else{
		count--;
		localStorage.setItem('counter',count);
		document.getElementById("lblCartCount").textContent = count;
	}
}


function deleteOneFromCard(){
	var id =$(this).attr('data-id');
		card[id]--;
		if(card[id]==0)
		{
			delete card[id];
		}
	saveCard();	
	showCard();
}

function deleteFromCard(){
	var id =$(this).attr('data-id');
	do {
		card[id]--;
        count--;
        localStorage.setItem('counter',count);
		document.getElementById("lblCartCount").textContent = count;
    } while (card[id] != 0);
    delete card[id];
	saveCard();
	showCard();
}

