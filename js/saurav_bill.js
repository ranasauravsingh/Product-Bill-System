function localStorage_setitem(list) {
	localStorage.setItem("Bill", JSON.stringify(list));
}

function localStorage_getitem() {
	if (localStorage.getItem("Bill") == null) {
		var list = [];
		var id = 1;
	} else {
		var list = JSON.parse(localStorage.getItem("Bill"));
		var id = list[list.length - 1].billId + 1;
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
	document.getElementById("insertBtn").value = "Add";
}

function search(val) {
	if (billData == null) {
		alert("Empty Bill Data !!!, Please insert a bill...");
		document.getElementById("billTable").innerHTML = "";
	} else {
		var minVal = Number.MAX_VALUE;
		var maxVal = Number.MIN_VALUE;
		for (var s of billData) {
			minVal = Math.min(minVal, s.subTotal);
			maxVal = Math.max(maxVal, s.subTotal);
		}
		document.getElementById("searchData").min = minVal;
		document.getElementById("searchData").max = maxVal;
		document.getElementById("outputSearch").innerHTML = val;

		var content =
			"<tr><th>Bill Id</th><th>Bill Number</th><th>Customer Name</th><th>Sub Total</th></tr>";

		for (var data in billData) {
			if (val >= billData[data].subTotal) {
				content +=
					"<tr><td>" +
					billData[data].billId +
					"</td><td>" +
					billData[data].billNumber +
					"</td><td>" +
					billData[data].customerName +
					"</td><td>" +
					billData[data].subTotal +
					"</td></tr>";
			}
		}

		document.getElementById("billTable").innerHTML = content;
	}
}

function view() {
	if (productData == null) {
		alert(
			"Empty Product Data !!!, Please go back and insert a product first..."
		);
		document.getElementById("productTable").innerHTML = "";
	} else {
		var content =
			"<tr><th>Prod Id</th><th>Product Name</th><th>Product Price[per unit]</th><th>Product Quantity</th><th>Select</th></tr>";

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
				"</td><td><input type='checkbox' id='product" +
				data +
				"' name='check' value='" +
				data +
				"' /></td></tr>";
		}

		document.getElementById("productTable").innerHTML = content;
	}
}

function viewBill() {
	if (billData == null) {
		alert("Empty Bill Data !!!, Please insert a Bill...");
		document.getElementById("billTable").innerHTML = "";
	} else {
		var content =
			"<tr><th>Bill Id</th><th>Bill Number</th><th>Customer Name</th><th>Sub Total</th></tr>";

		for (var data in billData) {
			content +=
				"<tr><td>" +
				billData[data].billId +
				"</td><td>" +
				billData[data].billNumber +
				"</td><td>" +
				billData[data].customerName +
				"</td><td>" +
				billData[data].subTotal +
				"</td></tr>";
		}

		document.getElementById("billTable").innerHTML = content;
	}
}

function insert() {
	var billNum = document.getElementById("billNumber");
	var custName = document.getElementById("customerName");

	var subTotal = 0;
	var cboxes = document.getElementsByName("check");
	for (var c in cboxes) {
		if (cboxes[c].checked) {
			subTotal = parseInt(
				subTotal + parseInt(productData[cboxes[c].value].productPrice)
			);
			cboxes[c].checked = false;
		}
	}

	if (billNum.value == "") {
		document.getElementById("validateBillNum").innerHTML =
			"Please Enter Bill Number";
		billNum.focus();
	} else if (custName.value == "") {
		document.getElementById("validateCustName").innerHTML =
			"Please Enter Customer Name";
		custName.focus();
	} else {
		var dummy = {
			billId: bId++,
			billNumber: billNum.value,
			customerName: custName.value,
			subTotal: subTotal,
		};

		billData.push(dummy);
		alert("Bill Data inserted Successfully !");

		localStorage_setitem(billData);
		document.getElementById("bill").reset();
		viewBill();
		res();
	}
}

var productData = JSON.parse(localStorage.getItem("Product"));

var billData = localStorage_getitem().list;
var bId = localStorage_getitem().id;
view();
viewBill();
