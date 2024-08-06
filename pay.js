// Add an event listener to ensure the DOM is fully loaded before executing javascripts
document.addEventListener("DOMContentLoaded", function () {
// Add an event listener to the details form for control the sumbmit
    document.getElementById("checkout-form").addEventListener("submit", submitOrder);
// populate the order details table on the payment page
    populateOrderDetails();
});

// function to handle the sudmission of the order form
function submitOrder(event) {
// Prevent the form from submitting normay  way (which would cause a page reload)
    event.preventDefault(); 
// Retrieve user input values from the checkout form fields
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;
    const town = document.getElementById("town").value;
  // payment information detalails  
    const paymentType = document.getElementById("paymentType").value;
    const cardName = document.getElementById("cardName").value;
    const expiryDate = document.getElementById("expiryDate").value;
    const cvv = document.getElementById("cvv").value;

 // Validate the for the all  the input fiels are filled
    if (name && email && phone && address && town  && paymentType && cardName && expiryDate && cvv) {
        const deliveryDate = new Date();
// Calculate the delivery date, assuming it takes week from today
        deliveryDate.setDate(deliveryDate.getDate() + 7); 

    // Format the delivery date in a readable format
        const formattedDate = deliveryDate.toLocaleDateString("en-US", {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
        });
// show an page alert with delivery details and confirmation message
        alert(`Thank you very much for your purchasing in our online platform , ${name}, Your order will be delivered to ${address}, ${town},  by ${formattedDate}.`);
    } else {
// show an page alert to fill the all the items in the form
        alert("Please fill the all the field in the details form");
    }
}

// Function to populate order details on the payment page
function populateOrderDetails() {
 // Retrieve order details from local storage, or use  empty array if nothing are found
    const orderDetails = JSON.parse(localStorage.getItem('orderDetails')) || [];
    const tableBody = document.querySelector('#checkout-order-table tbody');
// intialize total price to zero
    let totalPrice = 0;

// Loop through each item in the order details
    orderDetails.forEach(detail => {
 // create a new table row element
        const row = document.createElement('tr');
// Set the inner HTML of the row to include the item details
        row.innerHTML = `
            <td>${detail.itemName}</td>
            <td>${detail.category}</td>
            <td>${detail.quantity}</td>
            <td>${detail.price}</td>
        `;
        tableBody.appendChild(row);

// Extract price from the string, remove 'Rs' and convert to number
        const priceValue = parseFloat(detail.price.replace('Rs', ''));
        totalPrice += priceValue;
    });
// Update the total price display
    document.getElementById('total-price').textContent = `Rs.${totalPrice.toFixed(2)}`;
}
