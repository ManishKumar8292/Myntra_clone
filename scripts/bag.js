const CONVENIENCE_FEE = 99;
let bagItemObjects;

onLoad();

function onLoad() {
  loadBagItemsObject();
  displayBagItems();
  displayBagSummary();
}

function displayBagSummary() {
  let bagSummaryElement = document.querySelector(".bag-summary");
  let totalMRP = 0;
  let discount_MRP = 0;

  bagItemObjects.forEach((item) => {
    totalMRP += item.original_price;
    discount_MRP += item.original_price - item.current_price;
  });
  let totalPayment = totalMRP - discount_MRP + CONVENIENCE_FEE;
  bagSummaryElement.innerHTML = `
   <div class="bag-details-container">
          <div class="price-header">PRICE DETAILS (${bagItemObjects.length} Items) </div>
          <div class="price-item">
            <span class="price-item-tag">Total MRP</span>
            <span class="price-item-value">
             ${totalMRP}</span>
          </div>
          <div class="price-item">
            <span class="price-item-tag">Discount on MRP</span>
            <span class="price-item-value priceDetail-base-discount">-₹ ${discount_MRP}</span>
          </div>
          <div class="price-item">
            <span class="price-item-tag">Convenience Fee</span>
            <span class="price-item-value">₹ ${CONVENIENCE_FEE}</span>
          </div>
          <hr>
          <div class="price-footer">
            <span class="price-item-tag">Total Amount</span>
            <span class="price-item-value">₹ ${totalPayment}</span>
          </div>
        </div>
        <button class="btn-place-order">
          <div class="css-xjhrni">PLACE ORDER</div>
        </button>
  `;
}

function loadBagItemsObject() {
  console.log(bagItems);
  bagItemObjects = bagItems.map((itemId) => {
    for (let i = 0; i < items.length; i++) {
      if (itemId == items[i].id) {
        return items[i];
      }
    }
  });
  console.log(bagItemObjects);
}

function displayBagItems() {
  let containerElement = document.querySelector(".bag-items-container");
  let innerHTML = "";

  bagItemObjects.forEach((bagItem) => {
    innerHTML += generateItemHTML(bagItem);
  });
  containerElement.innerHTML = innerHTML;
}

function removeBagItems(itemId) {
  console.log(bagItems);
  bagItems = bagItems.filter((bagItemId) => bagItemId !== itemId);
  localStorage.setItem("bagItems", JSON.stringify(bagItems));
  loadBagItemsObject();
  displayBagIcon();
  displayBagItems();
  displayBagSummary();
}

function generateItemHTML(item) {
  return `
       <div class="bag-item-container">
          <div class="item-left-part">
            <img class="bag-item-img" src="../${item.image}">
          </div>
          <div class="item-right-part">
            <div class="company-name">${item.company}</div>
            <div class="item-name">${item.item_name}</div>
            <div class="price-container">
              <span class="current-price">₹ ${item.current_price}</span>
              <span class="original-price">₹ ${item.original_price}</span>
              <span class="discount">(${item.discount_percentage}% OFF)</span>
            </div>
            <div class="return-period">
              <span class="return-period-days">${item.return_period} days</span> return available
            </div>
            <div class="delivery-details">
              Delivery by
              <span class="delivery-details-days">${item.delivery_date}</span>
            </div>
          </div>

          <div class="remove-from-cart" onclick="removeBagItems(${item.id})">X</div>
        </div>`;
}
