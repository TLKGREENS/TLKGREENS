<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>POS System</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .container {
            width: 80%;
            margin: auto;
            overflow: hidden;
        }
        header {
            background: #333;
            color: #fff;
            padding: 10px 0;
            text-align: center;
        }
        button {
            padding: 10px 20px;
            margin: 10px 0;
            border: none;
            border-radius: 5px;
            color: #fff;
            background-color: #007bff;
            cursor: pointer;
        }
        button:hover {
            background-color: #0056b3;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            background-color: #fff;
        }
        table, th, td {
            border: 1px solid #ddd;
        }
        th, td {
            padding: 10px;
            text-align: left;
        }
        th {
            background-color: #f4f4f4;
        }
        form {
            margin: 20px 0;
        }
        label {
            display: block;
            margin: 5px 0;
        }
        input {
            padding: 8px;
            margin: 5px 0;
            width: 100%;
        }
        #loginError {
            color: red;
        }
        #posContainer {
            display: none;
        }
    </style>
</head>
<body>
    <!-- Login Page -->
    <div id="loginContainer">
        <header>
            <h1>Login</h1>
        </header>
        <div class="container">
            <form id="loginForm">
                <label for="username">Username:</label>
                <input type="text" id="username" required>
                
                <label for="password">Password:</label>
                <input type="password" id="password" required>
                
                <button type="button" onclick="login()">Login</button>
                <p id="loginError"></p>
            </form>
        </div>
    </div>
    
    <!-- POS System -->
    <div id="posContainer">
        <header>
            <h1>POS System</h1>
        </header>
        <div class="container">
            <button onclick="logout()">Logout</button>
            <h2>Inventory Management</h2>
            <form id="addProductForm">
                <label for="productCode">Product Code:</label>
                <input type="text" id="productCode" required>
                
                <label for="productName">Product Name:</label>
                <input type="text" id="productName" required>
                
                <label for="productPrice">Price:</label>
                <input type="number" id="productPrice" step="0.01" required>
                
                <label for="productStock">Stock:</label>
                <input type="number" id="productStock" required>
                
                <button type="button" onclick="addProduct()">Add Product</button>
            </form>
            <h2>Products</h2>
            <table id="productTable">
                <thead>
                    <tr>
                        <th>Product Code</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Stock</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
            
            <h2>Create Bill</h2>
            <form id="createBillForm">
                <label for="customerName">Customer Name:</label>
                <input type="text" id="customerName" required>
                
                <label for="productCodeForBill">Product Code:</label>
                <input type="text" id="productCodeForBill" required>
                
                <label for="productQuantity">Quantity:</label>
                <input type="number" id="productQuantity" required>
                
                <button type="button" onclick="createBill()">Add to Bill</button>
                <button type="button" onclick="printBill()">Print Bill</button>
            </form>
            <h2>Current Bill</h2>
            <table id="billTable">
                <thead>
                    <tr>
                        <th>Product Code</th>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
            <p id="totalAmount">Total Amount: $0.00</p>
            
            <h2>Sales History</h2>
            <button onclick="downloadHistory()">Download Sales History</button>
            <table id="historyTable">
                <thead>
                    <tr>
                        <th>Customer Name</th>
                        <th>Product Code</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
            
            <h2>Generate Promo Codes</h2>
            <form id="promoForm">
                <label for="promoCode">Promo Code:</label>
                <input type="text" id="promoCode" required>
                
                <label for="discountAmount">Discount Amount:</label>
                <input type="number" id="discountAmount" step="0.01" required>
                
                <button type="button" onclick="generatePromoCode()">Generate Promo Code</button>
            </form>
            <h2>Promo Codes</h2>
            <table id="promoTable">
                <thead>
                    <tr>
                        <th>Promo Code</th>
                        <th>Discount Amount</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
    </div>
    
    <script>
        // Constants
        const USERNAME = 'admin';
        const PASSWORD = 'password';
        
        // On page load
        window.onload = function() {
            checkLoginStatus();
            loadProducts();
            loadHistory();
            loadPromos();
        };

        // Login function
        function login() {
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            if (username === USERNAME && password === PASSWORD) {
                localStorage.setItem('loggedIn', 'true');
                document.getElementById('loginContainer').style.display = 'none';
                document.getElementById('posContainer').style.display = 'block';
                return false;
            } else {
                document.getElementById('loginError').innerText = 'Invalid username or password';
                return false;
            }
        }

        // Logout function
        function logout() {
            localStorage.removeItem('loggedIn');
            document.getElementById('loginContainer').style.display = 'block';
            document.getElementById('posContainer').style.display = 'none';
        }

        // Check login status
        function checkLoginStatus() {
            if (localStorage.getItem('loggedIn') === 'true') {
                document.getElementById('loginContainer').style.display = 'none';
                document.getElementById('posContainer').style.display = 'block';
            } else {
                document.getElementById('loginContainer').style.display = 'block';
                document.getElementById('posContainer').style.display = 'none';
            }
        }

        // Add product to inventory
        function addProduct() {
            const code = document.getElementById('productCode').value;
            const name = document.getElementById('productName').value;
            const price = parseFloat(document.getElementById('productPrice').value);
            const stock = parseInt(document.getElementById('productStock').value);

            const products = JSON.parse(localStorage.getItem('products')) || [];
            products.push({ code, name, price, stock });
            localStorage.setItem('products', JSON.stringify(products));

            document.getElementById('addProductForm').reset();
            loadProducts();
        }

        // Load products into table
        function loadProducts() {
            const products = JSON.parse(localStorage.getItem('products')) || [];
            const productTableBody = document.querySelector('#productTable tbody');
            productTableBody.innerHTML = '';

            products.forEach(product => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${product.code}</td>
                    <td>${product.name}</td>
                    <td>${product.price.toFixed(2)}</td>
                    <td>${product.stock}</td>
                `;
                productTableBody.appendChild(row);
            });
        }

        // Create bill and add items
        function createBill() {
            const code = document.getElementById('productCodeForBill').value;
            const quantity = parseInt(document.getElementById('productQuantity').value);
            const customerName = document.getElementById('customerName').value;

            const products = JSON.parse(localStorage.getItem('products')) || [];
            const billItems = JSON.parse(localStorage.getItem('billItems')) || [];

            const product = products.find(p => p.code === code);
            if (product) {
                const total = product.price * quantity;
                billItems.push({ code: product.code, name: product.name, quantity, price: product.price, total });
                localStorage.setItem('billItems', JSON.stringify(billItems));
                updateBillTable();
                document.getElementById('createBillForm').reset();
            } else {
                alert('Product not found!');
            }
        }

        // Print bill
        function printBill() {
            const billItems = JSON.parse(localStorage.getItem('billItems')) || [];
            const customerName = document.getElementById('customerName').value;
            const totalAmount = billItems.reduce((sum, item) => sum + item.total, 0).toFixed(2);
            const date = new Date().toLocaleString();

            let billContent = `Bill for ${customerName}\nDate: ${date}\n\n`;
            billContent += 'Product Code | Product Name | Quantity | Price | Total\n';
            billContent += '------------------------------------------------------------\n';

            billItems.forEach(item => {
                billContent += `${item.code} | ${item.name} | ${item.quantity} | ${item.price.toFixed(2)} | ${item.total.toFixed(2)}\n`;
            });
            billContent += `\nTotal Amount: $${totalAmount}\n`;
            billContent += `Accountant: ${USERNAME}\n`;

            const history = JSON.parse(localStorage.getItem('salesHistory')) || [];
            history.push({ customerName, items: billItems, totalAmount, date });
            localStorage.setItem('salesHistory', JSON.stringify(history));
            localStorage.removeItem('billItems');

            updateBillTable();
            loadHistory();
            alert(billContent);
        }

        // Update bill table
        function updateBillTable() {
            const billItems = JSON.parse(localStorage.getItem('billItems')) || [];
            const billTableBody = document.querySelector('#billTable tbody');
            billTableBody.innerHTML = '';

            let totalAmount = 0;
            billItems.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${item.code}</td>
                    <td>${item.name}</td>
                    <td>${item.quantity}</td>
                    <td>${item.price.toFixed(2)}</td>
                    <td>${item.total.toFixed(2)}</td>
                `;
                billTableBody.appendChild(row);
                totalAmount += item.total;
            });

            document.getElementById('totalAmount').innerText = `Total Amount: $${totalAmount.toFixed(2)}`;
        }

        // Load sales history
        function loadHistory() {
            const history = JSON.parse(localStorage.getItem('salesHistory')) || [];
            const historyTableBody = document.querySelector('#historyTable tbody');
            historyTableBody.innerHTML = '';

            history.forEach(entry => {
                entry.items.forEach(item => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${entry.customerName}</td>
                        <td>${item.code}</td>
                        <td>${item.quantity}</td>
                        <td>${item.price.toFixed(2)}</td>
                        <td>${item.total.toFixed(2)}</td>
                        <td>${entry.date}</td>
                    `;
                    historyTableBody.appendChild(row);
                });
            });
        }

        // Generate promo code
        function generatePromoCode() {
            const promoCode = document.getElementById('promoCode').value;
            const discountAmount = parseFloat(document.getElementById('discountAmount').value);

            const promos = JSON.parse(localStorage.getItem('promoCodes')) || [];
            promos.push({ promoCode, discountAmount });
            localStorage.setItem('promoCodes', JSON.stringify(promos));

            document.getElementById('promoForm').reset();
            loadPromos();
        }

        // Load promo codes
        function loadPromos() {
            const promos = JSON.parse(localStorage.getItem('promoCodes')) || [];
            const promoTableBody = document.querySelector('#promoTable tbody');
            promoTableBody.innerHTML = '';

            promos.forEach(promo => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${promo.promoCode}</td>
                    <td>${promo.discountAmount.toFixed(2)}</td>
                `;
                promoTableBody.appendChild(row);
            });
        }

        // Download sales history as CSV
        function downloadHistory() {
            const history = JSON.parse(localStorage.getItem('salesHistory')) || [];
            let csvContent = 'data:text/csv;charset=utf-8,Customer Name,Product Code,Quantity,Price,Total,Date\n';

            history.forEach(entry => {
                entry.items.forEach(item => {
                    csvContent += `${entry.customerName},${item.code},${item.quantity},${item.price.toFixed(2)},${item.total.toFixed(2)},${entry.date}\n`;
                });
            });

            const encodedUri = encodeURI(csvContent);
            const link = document.createElement('a');
            link.setAttribute('href', encodedUri);
            link.setAttribute('download', 'sales_history.csv');
            document.body.appendChild(link);
            link.click();
        }
    </script>
</body>
</html>

