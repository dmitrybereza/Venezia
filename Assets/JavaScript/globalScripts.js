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