// Array of products, each product is an object with different fieldset
// A set of ingredients should be added to products

var products = [
  {
    name: "Broccoli",
    vegetarian: true,
    glutenFree: true,
    organic: true,
    image: "images/broccoli.jpg",
    price: 1.99,
  },
  {
    name: "Bread",
    vegetarian: true,
    glutenFree: false,
    organic: false,
    image: "images/bread.jpg",
    price: 2.35,
  },
  {
    name: "Salmon",
    vegetarian: false,
    glutenFree: true,
    organic: true,
    image: "images/salmon.png",
    price: 9.99,
  },
  {
    name: "Cucumber",
    vegetarian: true,
    glutenFree: true,
    organic: false,
    image: "images/cucumber.jpg",
    price: 3.69,
  },
  {
    name: "Cheese",
    vegetarian: true,
    glutenFree: true,
    organic: false,
    image: "images/cheese.jpg",
    price: 9.99,
  },
  {
    name: "Beef",
    vegetarian: false,
    glutenFree: true,
    organic: true,
    image: "images/beef.jpg",
    price: 5.99,
  },
  {
    name: "Milk",
    vegetarian: true,
    glutenFree: true,
    organic: true,
    image: "images/milk.png",
    price: 5.69,
  },
  {
    name: "Sausages",
    vegetarian: false,
    glutenFree: false,
    organic: true,
    image: "images/sausages.png",
    price: 7.99,
  },
  {
    name: "Cereal",
    vegetarian: true,
    glutenFree: false,
    organic: true,
    image: "images/cereal.png",
    price: 4.88,
  },
  {
    name: "Pancake Mix",
    vegetarian: true,
    glutenFree: false,
    organic: true,
    image: "images/pancake_mix.jpg",
    price: 2.49,
  },
];

// sorting the products by price using quicksort
function quickSort(products, left, right) {
  let index;
  if (left < right) {
    index = partition(products, left, right);
    quickSort(products, left, index - 1);

    quickSort(products, index, right);
  }
  return products;
}

function partition(products, left, right) {
  let pivot = products[left].price;
  let i = left;
  let j = right;
  while (i <= j) {
    while (products[i].price < pivot) {
      i++;
    }
    while (products[j].price > pivot) {
      j--;
    }
    /*

        while (products[i].price < pivot) {
            i++;
        }
        while (products[j].price > pivot) {
            j--;
        }
       
        
        while (products[i].price > pivot) {
            i++;
        }
        while (products[j].price < pivot) {
            j--;
        }
        */

    if (i <= j) {
      swap(products, i, j);
      i++;
      j--;
    }
  }
  return i;
}

function swap(products, i, j) {
  let temp = products[i];
  products[i] = products[j];
  products[j] = temp;
}

// given restrictions provided, make a reduced list of products
// prices should be included in this list, as well as a sort based on price

function restrictListProducts(prods, restriction) {
  var cboxes = document.getElementsByName(restriction);
  var len = cboxes.length;
  let categories = ["vegetarian", "glutenfree", "organic", "nonorganic"];
  var flag = true;
  // checking if the categories name correct
  for (var i = 0; i < len; i++) {
    if (categories[i] !== cboxes[i].id) {
      flag = false;
    }
  }
  let product_names = [];
  if (flag == true) {
    for (let i = 0; i < prods.length; i += 1) {
      //There cant be items that are both organic and non organic so the list of products will be empty
      if (cboxes[2].checked && cboxes[3].checked) {
        break;
      }
      //add vegetarian products to the product list
      if (
        cboxes[0].checked &&
        cboxes[1].checked &&
        prods[i].vegetarian == true &&
        prods[i].glutenFree == true
      ) {
        // add organic products
        if (cboxes[2].checked && prods[i].organic == true) {
          product_names.push(prods[i]);
        }
        // add non organic products
        else if (cboxes[3].checked && prods[i].organic == false) {
          product_names.push(prods[i]);
        }
        // add both if both checkbox are unchecked
        else if (!cboxes[2].checked && !cboxes[3].checked) {
          product_names.push(prods[i]);
        }
      } else if (
        cboxes[0].checked &&
        !cboxes[1].checked &&
        prods[i].vegetarian == true
      ) {
        // add organic products
        if (cboxes[2].checked && prods[i].organic == true) {
          product_names.push(prods[i]);
        }
        // add non organic products
        else if (cboxes[3].checked && prods[i].organic == false) {
          product_names.push(prods[i]);
        }
        // add both if both checkbox are unchecked
        else if (!cboxes[2].checked && !cboxes[3].checked) {
          product_names.push(prods[i]);
        }
      }
      //add gluten free products to the product list
      else if (
        !cboxes[0].checked &&
        cboxes[1].checked &&
        prods[i].glutenFree == true
      ) {
        if (cboxes[2].checked && prods[i].organic == true) {
          product_names.push(prods[i]);
        } else if (cboxes[3].checked && prods[i].organic == false) {
          product_names.push(prods[i]);
        } else if (!cboxes[2].checked && !cboxes[3].checked) {
          product_names.push(prods[i]);
        }
      }
      //add both vegetarian products and gluten free products to the product list if both checkbox are unchecked or checked
      else if (!cboxes[0].checked && !cboxes[1].checked) {
        if (cboxes[2].checked && prods[i].organic == true) {
          product_names.push(prods[i]);
        } else if (cboxes[3].checked && prods[i].organic == false) {
          product_names.push(prods[i]);
        } else if (!cboxes[2].checked && !cboxes[3].checked) {
          product_names.push(prods[i]);
        }
      }
    }
  }

  let sortedProducts = quickSort(product_names, 0, product_names.length - 1);
  return sortedProducts;
}

// Calculate the total price of items, with received parameter being a list of products
function getTotalPrice(chosenProducts) {
  totalPrice = 0;
  for (let i = 0; i < products.length; i += 1) {
    if (chosenProducts.indexOf(products[i].name) > -1) {
      totalPrice += products[i].price;
    }
  }
  return totalPrice.toFixed(2);
}
