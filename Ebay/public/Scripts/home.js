/**
 * New node file
 */
function showRecievedMessage(data) {
	if (data.errorCode == 101) {
		$("#error-span").text(data.message);
		$("#errorMessage").fadeIn("slow", function() {
			// Animation complete
			setTimeout(function() {
				$("#errorMessage").fadeOut("slow");
			}, 4000);
		});

	} else {
		$("#success-span").text(data.message);
		$("#successMessage").fadeIn("slow", function() {
			// Animation complete
			setTimeout(function() {
				$("#successMessage").fadeOut("slow");
			}, 4000);
		});

	}

}
function getSubcategories(categoryId) {

	var serverURL = "http://localhost:3000/getSubCategory?cid=" + categoryId;
	$.ajax({
		dataType : "HTML",
		url : serverURL,
		success : function(data) {
			$("#dashboard-body").html(data);
		},
		error : function(data) {
			showRecievedMessage(data.responseText);
		}
	});

}

function getProductsForSubcategories(categoryId) {

	var serverURL = "http://localhost:3000/getProductsForSubCategory?cid="
			+ categoryId;
	$.ajax({
		dataType : "HTML",
		url : serverURL,
		success : function(data) {
			$("#dashboard-body").html(data);
		},
		error : function(data) {
			
		}
	});

}


function showUserDetails(data)
{
	$("#success-span").html(data);
	$("#successMessage").fadeIn("slow", function() {
		// Animation complete
		setTimeout(function() {
			$("#successMessage").fadeOut("slow");
		}, 4000);
	});

}

$(function() {
	//****************************************USER SEARCH***************************
	$(".search").keyup(function() {
		var inputSearch = $(this).val();
		var dataString = 'searchword=' + inputSearch;
		if (inputSearch != '') {
			$.ajax({
				type : "POST",
				url : "http://localhost:3000/getUser",
				data : dataString,
				cache : false,
				success : function(html) {
					$("#divResult").html(html).show();
				}
			});
		}
		return false;
	});

	jQuery("#divResult").on("click", function(e) {
		var $clicked = $(e.target);
		var t= $(e.target)[0];
		var $name = t.innerHTML;
		var decoded = $("<div/>").html($name).text();
		$('#inputSearch').val(decoded);
		var dataString="userId="+ $("#user-selected").val();
		$.ajax({
			type : "POST",
			url : "http://localhost:3000/getUserProfileDetails",
			data : dataString,
			cache : false,
			success : function(html) {
				showUserDetails(html);
				//$("#dialog").html(html).dialog();
			}
		});
	});
	jQuery(document).on("click", function(e) {
		var $clicked = $(e.target);
		if (!$clicked.hasClass("search")) {
			jQuery("#divResult").fadeOut();
		}
	});
	$('#inputSearch').click(function() {
		jQuery("#divResult").fadeIn();
	});
	
	//****************************************PRODUCT SEARCH***************************
	
	$(".product-search").keyup(function() {
		var inputSearch = $(this).val();
		var dataString = 'searchword=' + inputSearch;
		if (inputSearch != '') {
			$.ajax({
				type : "POST",
				url : "http://localhost:3000/getProduct",
				data : dataString,
				cache : false,
				success : function(html) {
					$("#product_divResult").html(html).show();
				}
			});
		}
		return false;
	});

	jQuery("#product_divResult").on("click", function(e) {
		var $clicked = $(e.target);
		var t= $(e.target)[0];
		var $name = t.innerHTML;
		var decoded = $("<div/>").html($name).text();
		$('#product_inputSearch').val(decoded);
		var dataString="product="+ $("#product-name").text();
		window.location="http://localhost:3000/getProductDetails?"+dataString;
		
		
	});
	jQuery(document).on("click", function(e) {
		var $clicked = $(e.target);
		if (!$clicked.hasClass("product-search")) {
			jQuery("#product_divResult").fadeOut();
		}
	});
	$('#product_inputSearch').click(function() {
		jQuery("#product_divResult").fadeIn();
	});
	
	//****************************************CATEGORY ONCHANGE***************************
	 $("#category").change(function() {
	        //alert( $('option:selected', this).text() );
			var id=$('option:selected', this).val();
			// ajax request using id
			var serverURL = "http://localhost:3000/getSubCategoryInJson?cid=" + id;
			
			$.ajax({
				dataType : "JSON",
				url : serverURL,
				success : function(data) {
					 $('#sub-category').find('option').remove();

	                 // next iterate thru your object adding each option to the drop down\    
	                 $(data).each(function (index, item) { // GETTING ERROR HERE
	                     $('#sub-category').append($('<option></option>').val(item.subCategoryId).html(item.name));
	                 });
				},
				error : function(data) {
					
				}
			});
	    });
		//****************************************SUB-CATEGORY ONCHANGE***************************
	 
	 $("#sub-category").change(function() {
	        //alert( $('option:selected', this).text() );
			var id=$('option:selected', this).val();
			// ajax request using id
			var serverURL = "http://localhost:3000/getProductsInJson?cid=" + id;
			
			$.ajax({
				dataType : "JSON",
				url : serverURL,
				success : function(data) {
					 $('#product').find('option').remove();

	                 // next iterate thru your object adding each option to the drop down\    
	                 $(data).each(function (index, item) { // GETTING ERROR HERE
	                     $('#product').append($('<option></option>').val(item.productId).html(item.name));
	                 });
				},
				error : function(data) {
					
				}
			});
	    });
	
});

	

function placeBidOrBuyProduct(type,productId)
{
	var id="#txtqty_"+productId;
	var qty=$(id).val();
	if(type==1)
		{
			//ad to cart
		var serverURL = "http://localhost:3000/addToShoppingCart?pid=" + productId+"&quantity="+qty;
		
			$.ajax({
				dataType : "JSON",
				url : serverURL,
				success : function(data) {
					showRecievedMessage(data);
				},
				error : function(data) {
					
				}
			});
		
		}
	
	else
		{
			var bid=$("#txtqty").val();
			$("#highest-bid").text(bid);
			//place a bid
		
		}
}