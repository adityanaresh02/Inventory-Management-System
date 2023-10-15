// Sample item data (you would replace this with actual data from your database)
const inventory = [
  { id: 1, name: "Product A", quantity: 10, cost: 5.0 },
  { id: 2, name: "Product B", quantity: 5, cost: 10.0 }
  // Add more items as needed
];

let purchasedItems = [];
let totalItems = 0;
let totalCost = 0.0; // Initialize the total cost as a float

function displayInventory() {
  const itemList = document.getElementById("item-list");
  itemList.innerHTML = "";
  inventory.forEach((item) => {
    const li = document.createElement("li");
    li.classList.add("inventory-item"); // Apply the CSS class for styling

    // Create a "Remove Item" button (small "X") for each item on the right side
    const removeButton = document.createElement("button");
    removeButton.textContent = "X";
    removeButton.classList.add("remove-button");
    removeButton.addEventListener("click", () => removeItem(item.id));

    // Display the item's details on the left side
    const itemDetails = document.createElement("div");
    itemDetails.textContent = `${item.name} - Quantity: ${
      item.quantity
    } - Cost: ₹${item.cost.toFixed(2)}`;

    li.appendChild(itemDetails);
    li.appendChild(removeButton);

    itemList.appendChild(li);
  });
}

function updateTotalPurchased() {
  const totalItemsElement = document.getElementById("totalItems");
  const totalCostElement = document.getElementById("totalCost");

  totalItems = purchasedItems.reduce((total, item) => total + item.quantity, 0);
  totalCost = purchasedItems.reduce(
    (total, item) => total + item.quantity * item.cost,
    0
  );

  // Format the total cost as INR
  totalCostElement.textContent = `₹${totalCost.toFixed(2)}`;
  totalItemsElement.textContent = totalItems;
}

function addItem() {
  const itemName = document.getElementById("itemName").value;
  const itemQuantity = parseInt(document.getElementById("itemQuantity").value);
  const itemCost = parseFloat(document.getElementById("itemCost").value);

  // Add the new item to the inventory (you would also update the database)
  inventory.push({
    id: inventory.length + 1,
    name: itemName,
    quantity: itemQuantity,
    cost: itemCost
  });

  // Update the displayed inventory
  displayInventory();

  // Add the purchased item to the list
  purchasedItems.push({
    id: inventory.length,
    name: itemName,
    quantity: itemQuantity,
    cost: itemCost
  });

  // Update the total purchased section
  updateTotalPurchased();
}

function removeItem(itemId) {
  // Remove the item from the inventory and update the displayed inventory
  inventory.splice(
    inventory.findIndex((item) => item.id === itemId),
    1
  );
  displayInventory();

  // Remove the item from the purchased items list and update the total purchased section
  const removedItem = purchasedItems.find((item) => item.id === itemId);
  if (removedItem) {
    purchasedItems.splice(purchasedItems.indexOf(removedItem), 1);
    updateTotalPurchased();
  }
}

// Initial display of the inventory
displayInventory();
