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

$(function() {
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
				$("#dialog").html(html).dialog();
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
	
	//*******************************************************************
	
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
	
});

$(function() {
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
});

$(function() {
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
		