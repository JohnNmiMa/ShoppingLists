$(document).ready(function() {
	function toggleCheckedItem(item) {
		var sib = $(item).siblings();
		$(sib).toggleClass('checked');
	}

	$("input[type='checkbox']").change(function() {
		var sib = $(this).siblings();
		$(sib).toggleClass('checked');

		// Test to see if the item is checked
		/*
		if ($(this).is(':checked')) {
			$(sib).addClass('checked');
		} else if ($(this).is(':checked') == false) {
			$(sib).removeClass('checked');
		}
		*/
	});

	$('#addItemButton').click(function() {
		var itemText = $('#addItemText').val();
		$('#items').prepend('<li><input type="checkbox" name="item"><p class="item">'+itemText+'</p></li>');
		$(document).on('change');
	});
});

