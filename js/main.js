
	$(document).ready(function() {
		

	$( "form" ).on( "submit", function() {
		$(this).find('button').text('Отправляем');
		
	});
	$( ".scroll_link" ).on( "click", function() {
		var href = $(this).attr("href");
		    $('html, body').animate({
		      scrollTop: $(href).offset().top
		    }, 500);
		    $('#navigation').removeClass('active');
		    $('.humburger').removeClass('active');
		    return false;
	});

	$('.field input').each(function() {
	  if ($(this).val().length>0 ) {
			$(this).parents('.field').addClass('focused');
	  }
	});  
	
	$('input').focus(function(){
		  $(this).parents('.field').addClass('focused');
	});

	$('input').blur(function(){
	  var inputValue = $(this).val();
	  if ( inputValue == "" ) {
	    $(this).removeClass('filled');
	    $(this).parents('.field').removeClass('focused');  
	  } else {
	    $(this).addClass('filled');
	  }
	});
	  $(".open_modal").on('click', function() {
			var target = $(this).data('target'),
			products_item ='',
			products = $(".s-catalog-list li");
			for(i=0; i<products.length; i++) {
				if ($(products[i]).find(".s-catalog-item").hasClass('active')){
				  products_item += $(products[i]).find(".active").attr('data-number')+', ';
			 	 }
			  }
            $("#"+target).addClass('active');
            $("#input_products").val(products_item);
            $(".modal-box").addClass('fadeInUp').removeClass('fadeOutDown');
       		return false;
        }
    );

	$(".modal .close, .close-popup").on('click', function() { 
            $(".modal-box").removeClass('fadeInUp').addClass('fadeOutDown');

		setTimeout(function(){
            $(".modal").removeClass('active');

        }, 500);
      });
	$(".offer-fix .close").on('click', function() { 
		$(".offer-fix").hide();
      });

    });