const categorySide = document.getElementById("category");
const categoryCenterSide = document.getElementById("greenTreeAllData");
const rightSide = document.getElementById("rightSide");

let cart = [];

// =================== Fetch All Categories ===================
const allCategory = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/categories"
  );
  const data = await res.json();
  categoryLeftSide(data.categories);
};

// =================== Render Categories ===================
const categoryLeftSide = (categories) => {
  let html = "";
  categories.forEach((item) => {
    html += `
      <li data-id="${item.id}" class="category-item text-xl font-semibold hover:text-white py-2 w-full hover:bg-green-600 rounded-md pl-4 cursor-pointer">
        ${item.category_name}
      </li>
    `;
  });
  categorySide.innerHTML = html;

  const allLi = document.querySelectorAll(".category-item");

  allLi.forEach((li, index) => {
    li.addEventListener("click", function () {
      allLi.forEach((el) => el.classList.remove("bg-green-600", "text-white"));

      this.classList.add("bg-green-600", "text-white");

      const categoryId = this.getAttribute("data-id");
      categoryId === "all" ? greenAllData() : leftSideCategory(categoryId);
    });

    greenAllData();
  });
};

// =================== Category Wise Data ===================
const leftSideCategory = async (categoryId) => {
  loadingSpnninerLoad(true);
  const res = await fetch(
    `https://openapi.programming-hero.com/api/category/${categoryId}`
  );
  const data = await res.json();
  centerGreenData(data.plants);
};

// =================== All Plants Data ===================
const greenAllData = async () => {
  loadingSpnninerLoad(true);
  const res = await fetch("https://openapi.programming-hero.com/api/plants");
  const data = await res.json();
  centerGreenData(data.plants);
};

// =================== Render Plants ===================
const centerGreenData = (plants) => {
  let html = "";
  plants.forEach((item) => {
    const { category, name, price, id, description, image } = item;

    html += `
      <div class='bg-white p-4 rounded-md shadow-md space-y-4'>
        <img class='h-44 w-full rounded bg-gray-500 object-cover' src="${image}" alt="${name}">
        <h2 class='text-2xl font-semibold cursor-pointer' onclick="openModal('${name}', ${price}, '${category}', '${image}', '${description}')">
          ${category}
        </h2>
        <p>${description.slice(0, 113)} .......</p>
        <div class='flex justify-between items-center'>
          <p class='text-green-600 rounded-full py-2 px-4 bg-green-100 font-medium'>${name}</p>
          <p class='text-sm font-semibold'><i class="fa-solid fa-bangladeshi-taka-sign"></i>${price}</p>
        </div>
        <button onclick="rightSideBtn('${id}', '${category}', ${price})" class='py-2 hover:bg-transparent hover:text-green-600 hover:border transition-all duration-200 hover:border-green-600 cursor-pointer font-medium bg-green-600 text-white w-full rounded-full'>Add To Cart</button>
      </div>
    `;
  });

  categoryCenterSide.innerHTML = html;
  loadingSpnninerLoad(false);
};

// =================== Loading Spinner ===================
const loadingSpnninerLoad = (status) => {
  const spinner = document.getElementById("loadingSpnniner");
  status ? spinner.classList.remove("hidden") : spinner.classList.add("hidden");
};

// =================== Add To Cart ===================
const rightSideBtn = (id, category, price) => {
  alert(`${category} Add to cart 🛒`);
  const existingItem = cart.find((item) => item.id === id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ id, category, price, quantity: 1 });
  }
  renderCart();
};

// =================== Remove From Cart ===================
const removeFromCart = (id) => {
  cart = cart.filter((item) => item.id !== id);
  renderCart();
};

// =================== Render Cart ===================
const renderCart = () => {
  rightSide.innerHTML = "<h2 class='text-2xl font-bold mb-2'>Cart</h2>";
  let total = 0;

  cart.forEach((item) => {
    total += item.price * item.quantity;
    rightSide.innerHTML += `
      <div class='flex justify-between items-center p-4 bg-[#f0fdf4] rounded-md mb-3'>
        <div>
          <p class='text-xl font-medium mb-2'>${item.category}</p>
          <p class='text-sm font-medium'><i class="fa-solid fa-bangladeshi-taka-sign"></i>${
            item.price
          } * ${item.quantity} = ${item.price * item.quantity}</p>
        </div>
        <button onclick="removeFromCart('${
          item.id
        }')" class='text-xl font-bold cursor-pointer text-red-500'><i class="fa-solid fa-xmark"></i></button>
      </div>
    `;
  });

  rightSide.innerHTML += `
    <hr class='bg-gray-300 mt-1'/>
    <div class='flex justify-end items-center mt-2 gap-2'>
      <span class='text-xl font-medium'>Total:</span>
      <span class='text-xl font-medium'><i class="fa-solid fa-bangladeshi-taka-sign"></i>${total}</span>
    </div>
  `;
};

// =================== Modal ===================
const openModal = (name, price, categoryItem, image, description) => {
  const modalContainer = document.getElementById("modal_container");
  modalContainer.innerHTML = `
    <div class="space-y-3">
      <h4 class="text-xl font-bold">${name}</h4>
      <img class="w-full rounded-lg h-50 object-cover" src="${image}" alt="${name}">
      <p class="font-bold">Category: <span class="font-normal">${categoryItem}</span></p>
      <p class="font-bold">Price: <span class="font-normal"><i class="fa-solid fa-bangladeshi-taka-sign"></i>${price}</span></p>
      <p class="font-bold">Description: <span class="font-normal">${description}</span></p>
    </div>
  `;

  const modal = document.getElementById("my_modal_5");
  modal.showModal();
  document.getElementById("closeModalBtn").onclick = () => modal.close();
};

greenAllData();
allCategory();
