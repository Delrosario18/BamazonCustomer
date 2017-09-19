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

connection.connect(function(err,res){
if(err)
	console.log("error while connection to database "+err);
console.log("connected");
	var list=new Arraylist;
	list.set(0,"  View Products sales by department");
    list.set(1,"  create new department");

    console.log('Please select department id below\n');
console.log('Action' +'    '+ 'Details'); 
console.log('------' +'    '+ '--------');
for(var i=0;i<2;i++){
	console.log((i+1)+ '       '+ list.get(i));
}
prompt.start();
prompt.get(['option'], function(err,res){
var option = res.option;

if(option==1){
	console.log(list.get(0));
	console.log("here");
	connection.query('SELECT department_id, department_name FROM departments', function(err, result){
  
  
  if(err) 

    console.log(err);

	console.log('Department Id   |  Department Name');
  console.log("\n");
  
  var num;
  for(num = 0;  num< result.length; num++){
    var itemID = result[num].department_id + ''; 
   
    var departmentName = result[num].department_name + ''; // convert to string
    
    console.log('    '+itemID + '          | ' + departmentName);
  } 
prompt.get(['department'], function(err,res){
	var departid=res.department;
	var depart;
	if(departid==1){
		depart="grocery";

	}if(departid==2){
		depart="soft drinks";

	}if(departid==3){
		depart="smart phone";

	}if(departid==4){
		depart="vegetables";

	}if(departid==5){
		depart="tea leaves";

	}if(departid==6){
		depart="fast moving food";

	}if(departid==7){
		depart="utensils";

	}if(departid==8){
		depart="fruits";

	}
	connection.query('SELECT over_head_cost from departments where ?',[{department_name: depart}], function(err,resl){
		var ohc;
		for(var n = 0;  n< resl.length; n++){
			ohc=resl[n].over_head_cost;

		}
connection.query('SELECT * FROM products WHERE ?',[{department_name: depart}], function(err,res){
	if(err)
			console.log(err);
console.log('Product name  |      department Name      |  over_head_cost  |product_sales  | total_profit');
  console.log("\n");
  
  var num;
  for(num = 0;  num< res.length; num++){
    var itemID = res[num].item_id + ''; 
    var productName = res[num].product_name + ''; 
    var departmentName = res[num].department_name + ''; // convert to string
    var price =res[num].over_head_cost + ''; 
    var ps = res[num].product_sales; 
    var tts=parseInt(ohc) - parseInt(ps);
    console.log( productName + '             | ' + departmentName + '             | ' + ohc +'            |' + ps  + '              | ' + (parseInt(ohc) - parseInt(ps)));
  }
  connection.end();

});
});
});
});
  //connection.end();
//});
}if(option==2){
	console.log(list.get(1));

	console.log("Enter department id");
	prompt.get(['id'], function(err,res){
	var id=res.id;
		
		console.log("Enter department name");
	prompt.get(['name'], function(err,res){
	var name=res.name;
		
		console.log("Enter over head cost");
	prompt.get(['cost'], function(err,res){
	var ohcost=res.cost;
		
var dprt = {
        department_id: id,
        department_name: name,
        over_head_cost: ohcost,
        

      };
      connection.query('INSERT INTO departments SET ?',dprt,function(err,resp){
        if(err)
          console.log(err);

        console.log("department with id "+id+" has been inserted successfully");
        connection.end();
      });

    



	});




	});
	});


}



});

});