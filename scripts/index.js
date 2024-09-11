let bagItems;
onLoad();

function onLoad() {
  let bagItemStr = localStorage.getItem("bagItems");
  bagItems = bagItemStr ? JSON.parse(bagItemStr) : [];
  displayHomeItems();
  displayBagIcon();
}

function addToBag(itemId) {
  bagItems.push(itemId);
  localStorage.setItem("bagItems", JSON.stringify(bagItems));
  displayBagIcon();
}

function displayBagIcon() {
  let bagElement = document.querySelector(".bag-item-count");
  if (bagItems.length > 0) {
    bagElement.innerHTML = bagItems.length;
    bagElement.style.visibility = "visible";
  } else {
    bagElement.style.visibility = "hidden";
  }
}

function displayHomeItems() {
  let itemsContainerElement = document.querySelector(".items-container");
  if (!itemsContainerElement) {
    return;
  }
  let innerHtml = "";

  items.forEach((item) => {
    innerHtml += `
  <div class="item-container">
    <img class="item-image" src="${item.image}" alt="item image">
    <div class="body">

    <div class="rating">
        ${item.rating.stars} ⭐ | ${item.rating.count}
    </div>
    <div class="company-name">${item.company}</div>
    <div class="item-name">${item.item_name}</div>
    <div class="price">
        <span class="current-price">₹ ${item.current_price}</span>
        <span class="original-price">₹ ${item.original_price}</span>
        <span class="discount">(${item.discount_percentage}% OFF)</span>
    </div>
    </div>
    <button class="btn-add-bag" onclick="addToBag(${item.id})">
    <span> </span>Add to Bag</button>
  </div>`;
  });
  itemsContainerElement.innerHTML = innerHtml;
}
