var prompt = require('prompt');
var mysql = require('mysql');
var Arraylist = require('arraylist');
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root", 
    password: "root", 
    database: "bamazon"
});

    connection.connect(function(err) {
    if (err)throw err;

var list = new Arraylist;
list.set(0,"  View Products for Sale");
list.set(1,"  View Low Inventory");
list.set(2,"  Add to Inventory");
list.set(3,"  Add New Product");
console.log('Please select an action below\n');
console.log('Action' +'    '+ 'Details'); 
console.log('------' +'    '+ '--------');
for(var i=0;i<4;i++){
	console.log((i+1)+ '       '+ list.get(i));
}
prompt.start();
prompt.get(['option'], function(err,res){
var option = res.option;
if(option==1){
	
	
		connection.query('SELECT * FROM Products', function(err, result){
  
  
  if(err) 

    console.log(err);
console.log(list.get(0));
	console.log('  Item ID  |      Product Name      |  Department Name  |   Price  | QUantity');
  console.log("\n");
  
  var num;
  for(num = 0;  num< result.length; num++){
    var itemID = result[num].item_id + ''; 
    var productName = result[num].product_name + ''; 
    var departmentName = result[num].department_name + ''; // convert to string
    var price = '$' + result[num].price.toFixed(2) + ''; 
    var quantity = result[num].stock + ''; 
    console.log(itemID + '    ' + productName + '       ' + departmentName + '     ' + price + '        ' + quantity);
  }
  connection.end();
});

}if(option==2){
	console.log(list.get(1));
	connection.query('SELECT * FROM Products where stock <5', function(err, resul){
		if(err)
			console.log(err);
console.log('Item ID  |    Product Name      |  Department Name  |   Price  | QUantity');
  console.log("\n");
  
  var num;
  for(num = 0;  num< resul.length; num++){
    var itemID = resul[num].item_id + ''; 
    var productName = resul[num].product_name + ''; 
    var departmentName = resul[num].department_name + ''; // convert to string
    var price = '$' + resul[num].price.toFixed(2) + ''; 
    var quantity = resul[num].stock + ''; 
    console.log( itemID + '        | ' + productName + '                 | ' + departmentName + '  	    |' + price + '     |' + quantity);
  }
  connection.end();


	});
}if(option==3){
	console.log(list.get(2));
	console.log("enter item id");
	prompt.get(['itemid'], function(err,res){
	var item_id = res.itemid;

	console.log("enter number of items to add");
	prompt.get(['quantity'], function(err,res){
	var quantity_to_add = res.quantity;	
	var qty;
	var values;
	console.log('quantity is  '+quantity_to_add);
	connection.query('SELECT stock FROM Products where ?', [{item_id: item_id}], function(err, rs){
  qty = rs[0].stock;
  console.log('value here is '+qty);
  var values = parseInt(qty) + parseInt(quantity_to_add);
   //values= parseInt(qty) + parseInt(quantity_to_add);
  
  if(err) 

    console.log(err);

		//console.log("xys "+values);
		//console.log('vvvvvvvg '+(parseInt(qty) + parseInt(quantity_to_add)));
	connection.query('UPDATE Products SET ? WHERE ?', [{stock: values}, {item_id: item_id}], function(err, res){
              if(err)

                console.log(err); 
            }); 
	connection.end();

});
});
	});
	}if(option==4){
	console.log(list.get(3));
	console.log("Enter item id");
	prompt.get(['itemid'], function(err,result){

		var itemid=result.itemid;
	console.log("enter product name");
	prompt.get(['productname'], function(err,res){

		var itemname = res.productname;

		console.log("enter department name");
		prompt.get(['departmentname'], function(err,res){
		var departname = res.departmentname;


		console.log("enter price");
		prompt.get(['price'], function(err,res){
		var cost= res.price;


		console.log("enter quantity");
		prompt.get(['stock'], function(err,res){
		var qty = res.stock;


			var inventory = {
				item_id: itemid,
				product_name: itemname,
				department_name: departname,
				price: cost,
				stock: qty

			};
			connection.query('INSERT INTO products SET ?',inventory,function(err,resp){
				if(err)
					console.log(err);

				console.log("item with id "+itemid+" has been inserted successfully");
			});

		connection.end();
	});
	});
	});
	});

	
	
	


	});
}if(option>4 || option<1){
	console.log('Value ' + option + ' is not correct. Enter a valid number');
}
});
});


    