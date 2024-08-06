// price list of diffrent selling items
const prices = {
    'Apple':450,
    'Banana':500,
    'Orange':600,
    'Grapes':800,
    'Mango':500,
    'Pineapple':543,
    'Carrot': 640,
    'Beans':440,
    'beet-root':540,
    'Potato': 210,
    'Tomato':350,
    'Onion':400,
    'milk-powder':1200,
    'Cheese': 2000,
    'Yogurt':60,
    'Butter':2300,
    'Cream': 2500,
    'Eggs': 55,
    'Chicken':1500,
    'Salmon':1200,
    'Beef':3200,
    'Shrimp':1000,
    'Pork':2000,
    'Lamb':1100,
    'Flour':1200,
    'Sugar':700,
    'Baking Powder':900,
    'salt':320,
    'vanilla':522,
    'chocolate-powder':400,
};


// function to add item to the order table
function addItem(name, category) {
// get the quantity input for the selling item
    const quantityInput = document.getElementById(`${name.toLowerCase().replace(' ', '-')}-quantity`);
// parse the quantity value from the input 
    const quantity = parseFloat(quantityInput.value);
// check enterted quantity is greater than 0
    if (quantity > 0) {
// calculate the full total price for given quantity of the selling item
        const price = prices[name] * quantity;
// get thefull table body of the order tabele
        const tableBody = document.getElementById('order-table').getElementsByTagName('tbody')[0];
// get the all rows in the table body
        const rows = tableBody.getElementsByTagName('tr');
        let itemExists = false;
// loop through the rows if the ordered item already in the ordertable      
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
// if the item already in the ordertable update the price and quantity
            if (row.cells[0].textContent === name) {
                const existingQuantity = parseFloat(row.cells[2].textContent);
                row.cells[2].textContent = (existingQuantity + quantity).toFixed(1);
                row.cells[3].textContent = (parseFloat(row.cells[3].textContent) + price).toFixed(2);
                itemExists = true;
                break;
            }
        }
// if the item does not in the ordertable,add a new row for it in the order table
        if (!itemExists) {
            const row = tableBody.insertRow();
            row.insertCell(0).textContent = name;
            row.insertCell(1).textContent = category;
            row.insertCell(2).textContent = quantity.toFixed(1);
            row.insertCell(3).textContent = price.toFixed(2);
            row.insertCell(4).innerHTML = '<button onclick="removeItem(this)">Remove</button>';
        }

// update the total price of the order table
        updateTotalPrice();
// display page alert selling item added to the ordertable
        alert(`Added ${quantity.toFixed(1)} kg or quantity of ${name} to your order.`);
    } else {
// display alert enterted quantity is not greater than 0
        alert(`Please enter  quantity or kg  greater than 0 for ${name}.`);
    }
}
// function to remove selling item from the ordertable
function removeItem(button) {
    const row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
    alert(`Selling item removed sucessfully from the ordertable`)
// update the total price of the ordertable after the removing the selling item
    updateTotalPrice();
}

// Function to update total price
function updateTotalPrice() {
    let totalPrice = 0;
// get all rows in the order table body
    const rows = document.querySelectorAll('#order-table tbody tr');
// loop through the every row to sum up the prices of all items in the ordertable
    rows.forEach(row => {
        const price = parseFloat(row.children[3].textContent);
        totalPrice += price;
    });
// update the total price and diplay 
    document.getElementById('total-price').textContent = `Rs.${totalPrice.toFixed(2)}`;
}

// functions add selling items in the ordertable to favourites section
function addToFavourites() {
    const rows = document.querySelectorAll('#order-table tbody tr');
    const favourites = JSON.parse(localStorage.getItem('favourites')) || [];
// Loop through each row to add selling  item to favourites section if not already present
    rows.forEach(row => {
        const itemName = row.children[0].textContent;
        const category = row.children[1].textContent;
        const quantity = row.children[2].textContent;
        const price = row.children[3].textContent;
// check the selling item already in the favorurite section      
        if (!favourites.some(fav => fav.itemName === itemName)) {
            favourites.push({ itemName, category, quantity, price });
        }
    });
// store the updated favourites in the local storage
    localStorage.setItem('favourites', JSON.stringify(favourites));
// display alert message selling item added to the favourites section
    alert('selling items added to the favourites sucessfully');
}

//function to apply items from the favourites to the ordertable
function applyFavourites() {
// get favourite items from the local storage
    const favourites = JSON.parse(localStorage.getItem('favourites')) || [];
// get the table body of the order table
    const tableBody = document.getElementById('order-table').getElementsByTagName('tbody')[0];

// Loop through each favourite selling item to add it to the order table
    favourites.forEach(fav => {
        const rows = tableBody.getElementsByTagName('tr');
        let itemExists = false;
 // Check if the item already  in the order table
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
// If the item already in the order table, update the quantity and price
            if (row.cells[0].textContent === fav.itemName) {
                const existingQuantity = parseFloat(row.cells[2].textContent);
                const quantityToAdd = parseFloat(fav.quantity);
                row.cells[2].textContent = (existingQuantity + quantityToAdd).toFixed(1);
                row.cells[3].textContent = (parseFloat(row.cells[3].textContent) + (prices[fav.itemName] * quantityToAdd)).toFixed(2);
                itemExists = true;
                break;
            }
        }
// if the item does not in the ordertable,add a new row for it in the order table
        if (!itemExists) {
            const row = tableBody.insertRow();
            row.insertCell(0).textContent = fav.itemName;
            row.insertCell(1).textContent = fav.category;
            row.insertCell(2).textContent = fav.quantity;
            row.insertCell(3).textContent = fav.price;
            row.insertCell(4).innerHTML = '<button onclick="removeItem(this)">Remove</button>';
        }
    });
// update the total price of the ordertable
    updateTotalPrice();
// showing an alert
    alert('Favourites applied.');
}

// function to clear all the selling items from the favourites section
function clearLocalStorage() {
// remove from the local storage
    localStorage.removeItem('favourites');
// display message all the selling items are cleared
    alert('All the favoruite selling items are fully Cleared');
}
//function to navigate to the payment page
function navigateToCheckout() {
// get all rows in the ordertable body
    const rows = document.querySelectorAll('#order-table tbody tr');
    const orderDetails = [];
// loop through every row to collect order details in the orderpage table
    rows.forEach(row => {
        const itemName = row.children[0].textContent;
        const category = row.children[1].textContent;
        const quantity = row.children[2].textContent;
        const price = row.children[3].textContent;
        orderDetails.push({ itemName, category, quantity, price });
    });
// store the orderdeatils in the local storage
    localStorage.setItem('orderDetails', JSON.stringify(orderDetails));
// redirect to the paymentpage
    window.location.href = 'pay.html'; 
}
