var api_key = 'sk_test_elBFGTMlRPSAeNgpwWTjnZmz';  // secret stripe API key
var stripe = require('stripe')(api_key);

stripe.customers.create(
   { email: 'foobar@example.org' },
   function(err, customer) {
      if (err) {
         console.log(err.message);
         return;
      }
      console.log("customer id", customer.id);
   }
 );

exports.createCustomerPayment=function(){

}