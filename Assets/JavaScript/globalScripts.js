var card ={
};
var count = 0;
var fabricator ="";

function openInNewTab(url){
	var win = window.open(url,'_self');
	win.focus();
}

$("document").ready(function(){
	$(".arrowDown").on('click',function(e){
		e.preventDefault();
		var top = $('#startmenu').offset().top;
		$('html, body').animate({scrollTop:top}, 800)
	  }) 
});

function onload(){
	init();
	loadCard();
	loadCount();
}

function feedbackFun(){
	var email = $('#eMail').val();
	var eFIO = $('#eFIO').val();
	var eText = $('#eText').val();


	if(email != '' && eFIO != '' && eText != ''){
		$.post(
			"core/question.php",
			{
				"eFIO" : eFIO,
				"email" : email,
				"eText": eText
			},
			function(data){
				if(data == 1){
                    Swal.fire({
                        icon: 'success',
                        title: 'Запит прийнято',
                        text: 'Ваше запит оброблюється. Очiкуйте вiдповiдi!',
                        timer: 3000,
                        width: '31rem',
                        showConfirmButton: false
					  })   
					var win = window.open('contactsPage.html','_self');
					win.focus();
					localStorage.clear();
				}
				else{
					Swal.fire({
                        icon: 'error',
                        title: 'Щось пiшло не так!',
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

function init() {
	var fabricator = localStorage.getItem('Fabricator')
	switch (fabricator) {
		case 'Limestone':
				$.getJSON("limestone.json", showMenu);
			break;
			
	}
}

function showMenu(data){
	var out =''
	var fabricator = localStorage.getItem('Fabricator')
	for(var key in data){
	out+=' <div class="itemShop">';
	out+='<div class="itemName"><p>' + data[key].name + '</p></div>';
	out+='<div class="itemImj">';
	out+='<img src="Assets/Images/Fabricators/'+fabricator+'/' + data[key].img + '" alt="" class="shopImg">';
	out+='</div>';
	out+='<div class="itemDesc">';
	out+='<p>'+ data[key].description +'</p><div class="volume">';
	out+='<p>'+data[key].value +'</p></div>';
	out+='</div>';
	out+='<div class="itemInfo">';
	out+='<div class="itemPrice">'+data[key].cost +' Грн</div>';
	out+=`<button onclick="incrShopCard()" data-id ="${key}" class="add-to-card"type="button" name="button">В кошик</button>`;
	out+='</div>';
	out+='</div>';
	}
	document.getElementsByClassName("itemsList")[0].innerHTML=out;
	$('.add-to-card').on('click', addToCard);
}


function addToCard(){
	var id =$(this).attr('data-id');
	if(card[id] == undefined){
		card[id] = 1;
	}
	else {
		card[id]++;
	}
	saveCard();
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

function saveCard(){
	localStorage.setItem('card',JSON.stringify(card));
}

function incrShopCard(){
	count++;
	localStorage.setItem('counter',count);
	document.getElementById("lblCartCount").textContent = count;
}

function loadCard(){
	if(localStorage.getItem('card')){
		card = JSON.parse(localStorage.getItem('card'));
	}
}

function selectLimestone(){
	fabricator = "Limestone"
	localStorage.setItem('Fabricator',fabricator);
}