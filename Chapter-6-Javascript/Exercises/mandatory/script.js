// Function to calculate total cost
function calculateTotalCost() {
    // Get the cost of petrol per liter and convert it to a number
    var petrolCost = parseFloat(document.getElementById('petrolCost').value);
    
    // Get the number of liters purchased and convert it to a number
    var litersPurchased = parseFloat(document.getElementById('litersPurchased').value);
    
    // Calculate the total cost
    var totalCost = petrolCost * litersPurchased;
    
    // Show the total cost by updating the text on the page
    document.getElementById('totalCost').innerText = `Total Cost: $${totalCost.toFixed(2)}`;
}

// Event listener for button click
document.getElementById('calculateButton').addEventListener('click', calculateTotalCost);