/**
 * New node file
 */
$(document).ready(function() {
	
	$("body").delegate("#category-list", "onchange", function(ev) {
		// get the id of the selected category
		var id=$("#category-list").val();
		// ajax request using id
		//
		var serverURL = "http://localhost:3000/getSubCategory?cid=" + id;
		$.ajax({
			dataType : "HTML",
			url : serverURL,
			success : function(data) {
				 $('#subcategory-list').find('option').remove();

                 // next iterate thru your object adding each option to the drop down\    
                 $(data).each(function (index, item) { // GETTING ERROR HERE
                     debugger;

                     $('#subcategory-list').append($('<option></option>').val(item.subCategoryId).html(item.subName));
                 });
			},
			error : function(data) {
				
			}
		});

		
	});


});


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
		var inputSearch = $(this).val().trim();
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
		var usserID=t.children[2];
		var yu=usserID.value;
		var dataString="userId="+ parseInt(yu);
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
		var yu
		if($(t).hasClass("product-search-wrap"))
			{
				var usserID=t.children[0];
				yu=usserID.innerText;
			}
		if($(t).hasClass("name"))
			{
				yu=$(t).text();
			}
		
		var dataString="product="+ yu;
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
					 $("#sub-category").prop("disabled", false);
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
					 $("#product").prop("disabled", false);
					 $('#product').append($('<option></option>').val(0).html("Select a product"));
	                 // next iterate thru your object adding each option to the drop down\    
	                 $(data).each(function (index, item) { // GETTING ERROR HERE
	                     $('#product').append($('<option></option>').val(item.productId).html(item.name));
	                 });
	                 
	                
				},
				error : function(data) {
					
				}
			});
	    });
	 
	 
	 $("#product").change(function() {
	        //alert( $('option:selected', this).text() );
			var id=$('option:selected', this).val();
			// ajax request using id
			var serverURL = "http://localhost:3000/getProductsById?cid=" + id;
			
			$.ajax({
				dataType : "JSON",
				url : serverURL,
				success : function(data) {
	                 
	             //  alert(data.name);
                  $('#productName').val(data.name);
                  $('#productPrice').val(data.basePrice);
                  $('#productDesc').val(data.description);
                  $('#quantity').val(data.quantity);
				},
				error : function(data) {
					
				}
			});
	    });
	
});

	

function placeBidOrBuyProduct(type,productId)
{
	var selectedTab=$("#tabs li.active");
	var select=selectedTab[0].id;
	var id;
	if(select=="all")
		{
		id="#s_txtqty_"+productId;
		}
	if(select=="bnow")
		{
		id="#all_txtqty_"+productId;
		}
	if(select=="auc")
		{
		id="#a_txtqty_"+productId;
		}
	 
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
			var bid=$(id).val();
			if(select=="all")
			{
			id="#s_highest_price_"+productId;
			}
			if(select=="auc")
			{
			id="#a_highest_price_"+productId;
			}
			$(id).text(bid);
			var serverURL = "http://localhost:3000/bidForProduct?pid=" + productId+"&bid="+bid;
			
			$.ajax({
				dataType : "JSON",
				url : serverURL,
				success : function(data) {
					showRecievedMessage(data);
				},
				error : function(data) {
					
				}
			});
			//start timer to chek the 
		
		}
}



function placeBid (type,productId)
{
	var id;
	if(type==1)
		{
		id="#all_txtqty_"+productId;
		
		}
	else
		{
		id="#a_txtqty_"+productId;
		}
		 
	
	
	if(type==1)
		{
			//ad to cart
		var qty=$(id).val();
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
			var bid=$(id).val();
			var targetID="#a_highest_price_"+productId;
			$(id).text(bid);
			var serverURL = "http://localhost:3000/bidForProduct?pid=" + productId+"&bid="+bid;
			
			$.ajax({
				dataType : "JSON",
				url : serverURL,
				success : function(data) {
					showRecievedMessage(data);
				},
				error : function(data) {
					
				}
			});
			//start timer to chek the 
		
		}
}


function endBidding(productID)
{
	var serverURL = "http://localhost:3000/endBidding?productId=" + productID;
	
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