function localStorage_setitem(list) {
	localStorage.setItem("Product", JSON.stringify(list));
}

function localStorage_getitem() {
	if (localStorage.getItem("Product") == null) {
		var list = [];
		var id = 1;
	} else {
		var list = JSON.parse(localStorage.getItem("Product"));
		var id = list[list.length - 1].productId + 1;
	}
	return { list, id };
}

function back() {
	location.href = "../saurav_productBill.html";
}

function check(inputValue, validationId, errorType) {
	inputValue = inputValue.trim();

	if (inputValue != "") {
		document.getElementById(validationId).innerHTML = "";
	} else {
		document.getElementById(validationId).innerHTML =
			"Please Enter " + errorType + ".";
	}
}

function res() {
	document.getElementById("dataHidden").value = "";
	document.getElementById("insertBtn").value = "Add";
}

function search(val) {
	if (productData.length == 0) {
		alert("Empty Product Data !!!, Please insert a product...");
		document.getElementById("productTable").innerHTML = "";
	} else {
		var minVal = Number.MAX_VALUE;
		var maxVal = Number.MIN_VALUE;
		for (var s of productData) {
			minVal = Math.min(minVal, s.productPrice);
			maxVal = Math.max(maxVal, s.productPrice);
		}
		document.getElementById("searchData").min = minVal;
		document.getElementById("searchData").max = maxVal;
		document.getElementById("outputSearch").innerHTML = val;

		var content =
			"<tr><th>Prod Id</th><th>Product Name</th><th>Product Price[per unit]</th><th>Product Quantity</th><th>Action</th></tr>";

		for (var data in productData) {
			if (val >= productData[data].productPrice) {
				content +=
					"<tr><td>" +
					productData[data].productId +
					"</td><td>" +
					productData[data].productName +
					"</td><td>" +
					productData[data].productPrice +
					"</td><td>" +
					productData[data].productQuantity +
					"</td><td><input type='button' onclick='deleteData(" +
					data +
					")' value='Delete'/><input type='button' onclick='updateData(" +
					data +
					")' value='Update'/></td></tr>";
			}
		}

		document.getElementById("productTable").innerHTML = content;
	}
}

function deleteData(ind) {
	if (confirm("Are you sure you want to delete the data?")) {
		document.getElementById("insertBtn").value = "Add";
		document.getElementById("product").reset();
		productData.splice(ind, 1);
		localStorage_setitem(productData);
		alert("Product Data deleted Successfully !");
		view();
	}
}

function updateData(ind) {
	document.getElementById("insertBtn").value = "Update";
	document.getElementById("dataHidden").value = ind;
	document.getElementById("productName").value = productData[ind].productName;
	document.getElementById("productPrice").value = productData[ind].productPrice;
	document.getElementById("productQuantity").value =
		productData[ind].productQuantity;
}

function view() {
	if (productData.length == 0) {
		alert("Empty Product Data !!!, Please insert a product...");
		document.getElementById("productTable").innerHTML = "";
	} else {
		var content =
			"<tr><th>Prod Id</th><th>Product Name</th><th>Product Price[per unit]</th><th>Product Quantity</th><th>Action</th></tr>";

		for (var data in productData) {
			content +=
				"<tr><td>" +
				productData[data].productId +
				"</td><td>" +
				productData[data].productName +
				"</td><td>" +
				productData[data].productPrice +
				"</td><td>" +
				productData[data].productQuantity +
				"</td><td><input type='button' onclick='deleteData(" +
				data +
				")' value='Delete'/><input type='button' onclick='updateData(" +
				data +
				")' value='Update'/></td></tr>";
		}

		document.getElementById("productTable").innerHTML = content;
	}
}

function insert() {
	var prodName = document.getElementById("productName");
	var prodPrice = document.getElementById("productPrice");
	var prodQuantity = document.getElementById("productQuantity");

	if (prodName.value == "") {
		document.getElementById("validateProdName").innerHTML =
			"Please Enter Product Name";
		prodName.focus();
	} else if (prodPrice.value == "") {
		document.getElementById("validateProdPrice").innerHTML =
			"Please Enter Product Price";
		prodPrice.focus();
	} else if (prodQuantity.value == "") {
		document.getElementById("validateProdQuantity").innerHTML =
			"Please Enter Product Quantity";
		prodQuantity.focus();
	} else {
		var hid = document.getElementById("dataHidden").value;

		var dummy = {
			productId: pId++,
			productName: prodName.value,
			productPrice: prodPrice.value,
			productQuantity: prodQuantity.value,
		};

		if (hid == "") {
			productData.push(dummy);
			alert("Product Data inserted Successfully !");
		} else {
			productData[hid] = dummy;
			alert("Product Data updated Successfully !");
		}

		localStorage_setitem(productData);
		document.getElementById("product").reset();
		view();
		res();
	}
}

var productData = localStorage_getitem().list;
var pId = localStorage_getitem().id;
view();
