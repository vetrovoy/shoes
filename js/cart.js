$.cookie('nameName','');
$.cookie('telTel','');
//$.cookie('cart','');
var flgOrder = 1;

	$(document).ready(function($) {

		update_top_count();
	
		$(document).on('click', '.add-to-cart', function (event) {
			var item  = $(this).closest(".product-item");
			var name = $.trim(item.find("h3").text())+" "+$.trim(item.find("h4").text());
			var image = item.find("img").attr("src");
			var price = $.trim(item.find(".price").text());
			var id = $.trim($(this).data("product_id"));
			price = $.trim(str_replace("₽", "", price));
			add_to_cart(name, image, price, id);
			update_cart();
			$(".modal-box").removeClass('fadeOutDown').addClass('fadeInUp');
			$('#popup_cart').addClass('active');
			return false;
		});
	
		$(document).on('click', '.plus', function (event) {
			var num = parseInt($(this).siblings('input').val());
			if (num < 20) {
				var item  = $(this).closest(".tovar_row");
				var name = $.trim(item.find(".tovar_name").find("p").text());
				var image = item.find(".tovar_image").find("img").attr("src");
				var price = $.trim(item.find(".tovar_price").text());
				var id = $.trim(item.data("product_id"));
				price = $.trim(str_replace("₽", "", price));
				add_to_cart(name, image, price, id);
				update_cart();
			return false;
			}
		});
		$(document).on('change', '.tovar_quantity input', function (event) {
			var num = parseInt($(this).val());
			if(num < 1) num = 1;
			var item  = $(this).closest(".tovar_row");
			var name = $.trim(item.find(".tovar_name").find("p").text());
			var image = item.find(".tovar_image").find("img").attr("src");
			var price = $.trim(item.find(".tovar_price").text());
			var id = $.trim(item.data("product_id"));
			price = $.trim(str_replace("₽", "", price));
			add_to_cart_num(name, image, price, id, num);
			update_cart();
		});
		$(document).on('click', '.minus', function (event) {
			var num = parseInt($(this).siblings('input').val());
			if (num > 1) {
				var item  = $(this).closest(".tovar_row");
				var name = $.trim(item.find(".tovar_name").find("p").text());
				var image = item.find(".tovar_image").find("img").attr("src");
				var price = $.trim(item.find(".tovar_price").text());
				var id = $.trim(item.data("product_id"));
				price = $.trim(str_replace("₽", "", price));
				add_to_cart_minus(name, image, price, id);
				update_cart();
			}
		});
		$(document).on('click', '.cart-link', function (event) {
			update_cart();
			$(".modal-box").removeClass('fadeOutDown').addClass('fadeInUp');
			$('#popup_cart').addClass('active');
	        return false;
		});


		$(document).on('click', '.checkout', function (event) {
	           
	         $(".modal-box").removeClass('fadeInUp').addClass('fadeOutDown');

			setTimeout(function(){
	            $(".modal").removeClass('active');
	            $('#order').addClass('active');
	            $('#product_val').val($.cookie('cart'));
	            $(".modal-box").addClass('fadeInUp').removeClass('fadeOutDown');

	        }, 500);

	        

	        return false;

     	});


		$(document).on('click', '.dell', function (event) {
			event.preventDefault();
			var item  = $(this).closest(".tovar_row");
			var name = $.trim(item.find(".tovar_name").find("p").text());
			var image = item.find(".tovar_image").find("img").attr("src");
			var price = $.trim(item.find(".tovar_price").text());
			var id = $.trim(item.data("product_id"));
			price = $.trim(str_replace("₽", "", price));
			delete_cart(name, image, price, id);
			update_cart();
		});
	});


function add_to_cart(name, image, price, id){
	var cart = $.cookie('cart');
	if(!cart){
		var new_cart = name+"~"+image+"~"+price+"~"+id+"~1~***";
		$.cookie('cart', new_cart, { expires: 7, path: '/' });
	}else{
		cart_arr = cart.split('***');
		var have = 0;
		for(var i=0; i<cart_arr.length; i++){
			if(cart_arr[i]){
				var cart_item_arr = cart_arr[i].split('~');
				if(cart_item_arr[0] == name && cart_item_arr[1] == image && cart_item_arr[2] == price){
					have = 1;
					var num = parseInt(cart_item_arr[4]);
					num++;
					cart_item_arr[4] = num;
				}
				cart_arr[i] = cart_item_arr.join('~');
			}
		}
		var new_cart = cart_arr.join('***');
		if(!have){
			new_cart += name+"~"+image+"~"+price+"~"+id+"~1~***";
		}
		$.cookie('cart', new_cart, { expires: 7, path: '/' });
	}
}

function add_to_cart_num(name, image, price, id, number){
	var cart = $.cookie('cart');
	cart_arr = cart.split('***');
	for(var i=0; i<cart_arr.length; i++){
		if(cart_arr[i]){
			var cart_item_arr = cart_arr[i].split('~');
			if(cart_item_arr[0] == name && cart_item_arr[1] == image && cart_item_arr[2] == price){
				cart_item_arr[4] = number;
			}
			cart_arr[i] = cart_item_arr.join('~');
		}
	}
	var new_cart = cart_arr.join('***');
	$.cookie('cart', new_cart, { expires: 7, path: '/' });
}

function add_to_cart_minus(name, image, price, id){
	var cart = $.cookie('cart');
	cart_arr = cart.split('***');
	for(var i=0; i<cart_arr.length; i++){
		if(cart_arr[i]){
			var cart_item_arr = cart_arr[i].split('~');
			if(cart_item_arr[0] == name && cart_item_arr[1] == image && cart_item_arr[2] == price){
				var num = parseInt(cart_item_arr[4]);
				num--;
				cart_item_arr[4] = num;
			}
			cart_arr[i] = cart_item_arr.join('~');
		}
	}
	var new_cart = cart_arr.join('***');
	$.cookie('cart', new_cart, { expires: 7, path: '/' });
}

function delete_cart(name, image, price, id){
	var cart = $.cookie('cart');
	cart_arr = cart.split('***');
	for(var i=0; i<cart_arr.length; i++){
		if(cart_arr[i]){
			var cart_item_arr = cart_arr[i].split('~');
			if(cart_item_arr[0] == name && cart_item_arr[1] == image && cart_item_arr[2] == price){
				cart_arr.splice(i,1);
			}
		}
	}
	var new_cart = cart_arr.join('***');
	$.cookie('cart', new_cart, { expires: 7, path: '/' });
}

function update_cart(){
	var cart = $.cookie('cart');
	if(!cart){
		$(".popup_cart h2").text("Ваша корзина пуста");
		$(".cart_body").hide();
		$(".cart-count").text("0").hide();
	}else{
		$(".popup_cart h2").text("Ваша корзина");
		$(".cart_body").show();
		
		var items = '';
		var summ = 0;
		var all_num = 0;
		cart_arr = cart.split('***');
		for(var i=0; i<cart_arr.length; i++){
			if(cart_arr[i]){
				var cart_item_arr = cart_arr[i].split('~');
				var sum_this = parseInt(cart_item_arr[2])*parseInt(cart_item_arr[4]);
				summ += sum_this;
				all_num += parseInt(cart_item_arr[4]);
				
				items += '<div class="row middle-xs between-xs tovar_row" data-product_id="'+cart_item_arr[3]+'"><div class="col-xs-4 col-sm-2 tovar_image"><img src="'+cart_item_arr[1]+'"></div><div class="col-xs-8 col-sm-3 tovar_name"><p>'+cart_item_arr[0]+'</p></div><div class="tovar_price" data-title="Цена">'+cart_item_arr[2]+' ₽</div><div class="tovar_quantity" data-title="Количество"><a class="plus qty">+</a><input type="text" name="cart-qty" value="'+cart_item_arr[4]+'"><a class="minus qty">-</a></div><div class="tovar_suma" data-title="Итого"><p>'+sum_this+' ₽</p></div><a href="#" class="remove dell" title="Удалить эту позицию">х</a></div>';
			}
		}
		$(".popup_cart .tovars").html(items);

		
		var total = 'Итого: <span>	'+summ+' ₽</span>';
		$(".popup_cart .total").html(total);
		
		$(".cart-count").text(all_num).show();
	}
}

function update_top_count(){
	var cart = $.cookie('cart');
	if(!cart){
		$(".cart-count").text("0").hide();
	}else{
		var all_num = 0;
		cart_arr = cart.split('***');
		for(var i=0; i<cart_arr.length; i++){
			if(cart_arr[i]){
				var cart_item_arr = cart_arr[i].split('~');
				all_num += parseInt(cart_item_arr[4]);
			}
		}
		$(".cart-count").text(all_num).show();
	}
}

//Функция поиска и замены в строке
	function str_replace ( search, replace, subject ) {
			if(!(replace instanceof Array)){
			replace=new Array(replace);
			if(search instanceof Array){
			while(search.length>replace.length){
			replace[replace.length]=replace[0];
			}
			}
			}
			 
			if(!(search instanceof Array))search=new Array(search);
			while(search.length>replace.length){
			replace[replace.length]='';
			}
			 
			if(subject instanceof Array){
			for(k in subject){
			subject[k]=str_replace(search,replace,subject[k]);
			}
			return subject;
			}
			 
			for(var k=0; k<search.length; k++){
			var i = subject.indexOf(search[k]);
			while(i>-1){
			subject = subject.replace(search[k], replace[k]);
			i = subject.indexOf(search[k],i);
			}
			}
			return subject;
	} 
	//Функция поиска и замены в строке - Конец
