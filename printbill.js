// Print Bill
function printBill() {
    // Create a new window for printing
    const printWindow = window.open('', '', 'height=600,width=800');

    // Define HTML content for the bill
    let billHTML = `
        <html>
        <head>
            <title>Print Bill</title>
            <style>
                body { font-family: Arial, sans-serif; }
                table { width: 100%; border-collapse: collapse; }
                th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
                th { background-color: #4CAF50; color: white; }
            </style>
        </head>
        <body>
            <h1>Receipt</h1>
            <p><strong>Customer Name:</strong> ${document.getElementById('customerName').value}</p>
            <p><strong>Phone Number:</strong> ${document.getElementById('customerPhone').value}</p>
            <p><strong>Email:</strong> ${document.getElementById('customerEmail').value}</p>
            <table>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price (INR)</th>
                        <th>Promo Code</th>
                        <th>Discount</th>
                    </tr>
                </thead>
                <tbody>
                    ${cart.map(item => `
                        <tr>
                            <td>${item.product}</td>
                            <td>₹${item.price}</td>
                            <td>${item.promoCode || 'N/A'}</td>
                            <td>₹${item.discount.toFixed(2)}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            <p><strong>Total:</strong> ₹${total.toFixed(2)}</p>
        </body>
        </html>`;

    // Open the document in the new window
    printWindow.document.open();
    printWindow.document.write(billHTML);
    printWindow.document.close();

    // Print the document
    printWindow.print();

    // After printing, reset the POS system and redirect to the homepage
    printWindow.onafterprint = () => {
        saveBill();
    };
}
