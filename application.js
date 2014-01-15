function validateName(name) {
	if (name === null || name == "") return false;
	var str = name.split(" ").join("");
	if(str.length == 0)
		return false;
	return true;
}

function Shopper() {
	var shoppingLists = [];

	this.validate = function(listName) {
		return validateName(listName);
	}

	this.addShoppingList = function(list) {
		shoppingLists.push(list);
	}

	this.getShoppingList = function(list) {
		for (var i in shoppingLists) {
			if (list == shoppingLists[i].getListName()) {
				return shoppingLists[i];
			}
		}
	}
}

function ShoppingList(name) {
	var listName = name;
	var items = [];

	this.getListName = function() {
		return listName;
	}

	this.validate = function(itemName) {
		return validateName(itemName);
	}

	this.addItem = function(item) {
		items.push(item);
	}

	this.getShoppingListItems = function() {
		return items;
	}

	this.listItems = function() {
		for (i=0; i<items.length; i++) {
			console.log(items[i]);
		}
	}
}

$(document).ready(function() {
	var shopper = new Shopper();
	var currentList = "";

	// jQuery UI code for tooltips
	$(document).tooltip();

	function displayList(listText) {
		$('<li class="list">'+listText+'</li>').prependTo("#lists");
	}

	function displayItem(itemText) {
		$('<li><label><input type="checkbox" name="item">'+itemText+'</label></li>').prependTo("#items");
		//$('#items').prepend('<li><label><input type="checkbox" name="item">'+itemText+'</label></li>'); // same thin
	}

	$('#listSidebar img').click(function() {
		var newList = prompt("Please enter a shopping list name");
		if (shopper.validate(newList)) {
			var sl = shopper.getShoppingList(newList);
			$('#items').empty();
			if (sl == undefined) {
				var sl = new ShoppingList(newList);
				shopper.addShoppingList(sl);
				displayList(newList);
				$('#currentList').html(newList);	
			} else {
				var itemsInList = sl.getShoppingListItems();
				for (var item in itemsInList) {
					displayItem(itemsInList[item]);
				}
				// $('li.selected').toggleClass('selected');
			}
			currentList = newList;
		}
	});

	$('#lists').on("click", "li.list", function() {
		var listName = $(this).html();
		if (shopper.validate(listName)) {
			var sl = shopper.getShoppingList(listName);
			if (sl != undefined) {
				if(currentList != sl.getListName()) {
					$('#currentList').html(listName);	
					$('#items').empty();
					var itemsInList = sl.getShoppingListItems();
					for (var item in itemsInList) {
						displayItem(itemsInList[item]);
					}
					currentList = listName;
				}
			}
		}
	});

	// This is an event handler that works for all future elements
	// $(selector).on(event,"childSelector",function)
	// This says, that when a checkbox is added to the DOM,
	// a 'change' event handler is added to the checkbox.
	$('#items').on("change","input[type='checkbox']", function() {
		// The 'this' is the childSelector, not the primary selector
		var parent = $(this).parent(); // The parent is the 'label' element
		$(parent).toggleClass('checked');
	});

	function addItem(itemText) {
		try {
			var sl = shopper.getShoppingList(currentList);
			if (sl == undefined) throw Error(currentList + " does not exist!")
			if (sl.validate(itemText) == false)
				throw {name:"Note", message:"Empty item string"};
			sl.addItem(itemText);
			displayItem(itemText);
		} catch(e) {
		} finally {
			resetForm(event);
			event.preventDefault();
		}
	}

	$('#addItemButton').click(function(event) {
		var itemText = $('#addItemText').val();
		addItem(itemText);
		return true;
	});

	$('form').submit(function(event) {
		var itemText = $('#addItemText').val();
		addItem(itemText);
		return true;
	});

	function resetForm(event) {
		$('#addItemText').val("");
	}
});
