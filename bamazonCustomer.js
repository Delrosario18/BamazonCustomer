var prompt = require('prompt');
var mysql = require('mysql');






var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root", 
    password: "root", 
    database: "bamazon"
});


connection.connect(function(err) {
    if (err)
    console.log("connected error " );
});

connection.query('SELECT * FROM Products', function(err, result){
  
  
  if(err) 
    console.log(err);

  
  console.log('  Item ID  |      Product Name      |  Department Name  |   Price  | QUantity');
  console.log("\n");
  
  var num;
  for(num = 0;  num< result.length; num++){

    
    var itemID = result[num].item_id + ''; 
    //itemID = padText("  ID  ", itemID);

    var productName = result[num].product_name + ''; 
    //productName = padText("      Product Name      ", productName);

    var departmentName = result[num].department_name + ''; // convert to string
    //departmentName = padText("  Department Name  ", departmentName);

    var price = '$' + result[num].price.toFixed(2) + ''; 
    //price = padText("   Price  ", price);

    var quantity = result[num].stock + ''; 
    

    
    console.log(itemID + '    ' + productName + '       ' + departmentName + '     ' + price + '        ' + quantity);
  }

 
  prompt.start();

  
  console.log('\nselect an  item you want to purchase');
  prompt.get(['selectID'], function (err, result) {
    
    
    var selectedID = result.selectID;
    console.log('You selected Item with ID ' + selectedID + '.');

    
    console.log('\nenter number of items to purchase')
    prompt.get(['noOfItems'], function (err, result) {

      
      var itemsBought = result.noOfItems;
      console.log('quantity ' + itemsBought );

            connection.query('SELECT stock FROM products WHERE ?', [{item_id: selectedID}], function(err, result){
        if(err) throw err; // Error Handler
        
        if(result[0] == undefined){
          console.log('ID"' +  selectedID + '" is not valid. Please enter a valid one');
          connection.end();         }
         
        else{
          var Quantity = result[0].stock;
          
          if(Quantity >= itemsBought){

            
            var number = parseInt(Quantity) - parseInt(itemsBought); 

              console.log('hghggfff '+number);
            // ensure we have integers for subtraction & database
            connection.query('UPDATE Products SET ? WHERE ?', [{stock: number}, {item_id: selectedID}], function(err, res){
              if(err)

                console.log(err); 
            }); 


                        
            connection.query('SELECT price FROM Products WHERE ?', [{item_id: selectedID}], function(err, value){
              
              var cost = value[0].price;

             var totalCost = itemsBought*cost;

              console.log('\nYour total is $' + (itemsBought*cost) + '.');
              connection.query('UPDATE products SET ? where ?',[{product_sales: (itemsBought*cost)}, {item_id: selectedID}], function(err,res){
                if(err)
                  console.log("Error while updating sales");


                console.log("saved successful");
              });
             
              connection.query('SELECT department_name FROM Products WHERE ?', [{item_id: selectedID}], function(err, res){
               
                  
                  var totalSales = parseFloat(totalSales) + parseFloat(totalCost);

                                      if(err) 
                                        console.log('An error occurred ' + err); 
                    console.log('\tThank you for shopping with us\n\t\tWelcome again')
                    connection.end(); 

                  }); 
      
                }); 

                
          }
          
          else{
            console.log('Insufficient quantity ');
            console.log("adjust your stock");
                                 
            connection.end(); 
          }
        }

      }); 

    }); 

  }); 

}); 