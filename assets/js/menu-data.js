/* ==========================================================================
   HILLSIDE MENU DATA  —  this is the only file you need to edit to change
   the menu. The menu page builds itself from this.

   HOW TO EDIT
   -----------
   Each group looks like:

     {
       id:   "hoags",                          // url-safe, must be unique
       name: "Smoked & Hoags",                 // heading shown on the page
       note: "Optional italic line under it",  // optional, delete if unused
       items: [
         { name: "Item name", desc: "Optional description", price: "17.75", tag: "Popular" }
       ]
     }

   - price: just the number as text. Leave as "" (empty) to show "MKT".
   - desc:  optional. Delete the line if you don't want one.
   - tag:   optional gold badge. Good values: "Popular", "New", "Spicy", "Veg".

   Prices last verified from the Toast ordering menu on 2026-09-19.
   ========================================================================== */

const HILLSIDE_MENU = [
  {
    id: "hoags",
    name: "Smoked & Hoags",
    note: "House-smoked meats and overstuffed sandwiches.",
    items: [
      { name: "Goose's Smoked Brisket", desc: "Brioche bread layered with melted gouda and coleslaw, paired with your choice of signature sauce. Served with crispy sweet fries and pickles.", price: "17.75", tag: "Popular" },
      { name: "Brian Phillips", desc: "Two chicken cutlets with ricotta, fried prosciutto and roasted long hots, drizzled with house hot honey. Served with 4 oz macaroni salad.", price: "17.00" },
      { name: "The Brian", price: "16.75" },
      { name: "Panini Chimi Steak", desc: "Thin-sliced New York strip topped with raw onions and melted pepper jack, finished with chimichurri. Served with crispy chips.", price: "16.75" },
      { name: "Burrata Bomb", desc: "Bastone bread with a crispy fried chicken cutlet tossed in vodka sauce, layered with prosciutto, parmesan and creamy burrata, finished with peanut-free pesto.", price: "16.75" },
      { name: "Chelo's Chicken Sandwich", desc: "Chicken and smoked gouda on basil bread with onion rings, coleslaw, bacon and red hot ranch. Served with fries.", price: "16.00" },
      { name: "Freeman's Porchetta", desc: "Porchetta, garlic onions and peppers, provolone and garlic spinach on a seeded roll.", price: "16.00" },
      { name: "Boom Boom Po'Boy", desc: "Shrimp tossed in boom boom sauce with lettuce and tomato, served with chips and coleslaw.", price: "15.50" },
      { name: "Meatball Parm", desc: "Meatballs smothered in marinara and melted mozzarella on a toasted roll, with creamy macaroni salad.", price: "13.75" },
      { name: "Pete's Philly Steak", desc: "Cheesesteak on semolina bread, your choice of shaved steak or chicken. Peppers, onions, extra cheese sauce, lettuce and tomato available for an additional cost.", price: "13.50" },
      { name: "Cheese Quesadilla", desc: "Flour tortilla, served with a side of rice.", price: "13.00" }
    ]
  },
  {
    id: "picnic",
    name: "Picnic Plates",
    note: "Burgers, dogs and brats, done the Hillside way.",
    items: [
      { name: "Deluxe Bacon Cheeseburger", desc: "Half-pound burger with American cheese, bacon, lettuce, tomato, onion and pickles. Served with fries.", price: "17.00", tag: "Popular" },
      { name: "Bacon Shrimp Stack", desc: "Crispy shrimp burger on a toasted onion roll with avocado, onion, lettuce, tomato, pickle and melted cheddar. Chipotle tartar and cajun fries.", price: "16.75" },
      { name: "New Haven Red Hot", desc: "Served with fries.", price: "15.00" },
      { name: "Chicago Dog", desc: "Served with crinkle fries.", price: "15.00" },
      { name: "Packer Brats", desc: "Served with tots.", price: "15.00" },
      { name: "Onion Cheddar Melt Burger", desc: "Beef burger with melted cheddar and caramelized onions on a toasted bun, with macaroni salad.", price: "14.00" },
      { name: "Hot Dog Platter", desc: "Quarter-pound Hummel hot dog, served with fries, slaw or mac salad.", price: "14.00" }
    ]
  },
  {
    id: "stuffed",
    name: "Stuffed Breads",
    note: "Baked to order. Great for the table, better for game day.",
    items: [
      { name: "Smoked Pork, Mac & Cheese", price: "19.00", tag: "Popular" },
      { name: "Smoked Brisket and Bacon", price: "18.75" },
      { name: "Pulled Chicken, Broccoli and Cheese", price: "18.00" },
      { name: "Steak and Cheese", price: "18.00" },
      { name: "Chicken Parm", price: "17.00" },
      { name: "Broccoli Rabe and Sausage", price: "16.75" },
      { name: "Buffalo Chicken and Cheese", price: "16.75" },
      { name: "Sausage and Spinach", price: "16.00" },
      { name: "Sausage and Peppers", price: "16.00" },
      { name: "Eggplant, Ricotta and Mozzarella", price: "15.75" },
      { name: "Meatball Parm", price: "14.75" },
      { name: "Pepperoni", price: "14.75" },
      { name: "Broccoli and Cheddar", price: "14.00", tag: "Veg" },
      { name: "Mushroom and Spinach", price: "13.00", tag: "Veg" }
    ]
  },
  {
    id: "munchies",
    name: "Munchies & Snacks",
    note: "Wings, pizza and everything you want with a cold one.",
    items: [
      { name: "Wings", desc: "Fried wings in your choice of sauce. $1 wings on NFL game days, ten minimum, one flavor.", price: "", tag: "Popular" },
      { name: "Pizza", desc: "Toppings available at an additional cost.", price: "11.00" },
      { name: "Jimmy's Chicken Tenders", desc: "Five house-made fried chicken tenders, served with fries.", price: "16.00" },
      { name: "Cheesesteak Empanadas", desc: "Three Philly cheesesteak stuffed empanadas.", price: "13.00" },
      { name: "Chicken Fries", desc: "Fourteen chicken fries served with wasabi sauce.", price: "12.50" },
      { name: "Mozzarella Triangles", desc: "Two crispy fried mozzarella triangles.", price: "12.00" },
      { name: "Packer Cheese Curds", desc: "Fried mozzarella nuggets.", price: "11.00" },
      { name: "Beer Pretzel", desc: "With honey hot mustard and beer cheese.", price: "10.00" },
      { name: "Broccoli Bites and Cheese", desc: "Twelve broccoli and cheese stuffed bites.", price: "10.00" },
      { name: "Sweet Potato Wedges", price: "8.00" },
      { name: "Seasoned Tater Squares", price: "7.00" },
      { name: "Grilled Cheese", price: "7.00" },
      { name: "Onion Rings", price: "5.00" },
      { name: "Alcapurria", desc: "Stuffed fritter, your choice of guineo or yuca.", price: "4.00" }
    ]
  },
  {
    id: "soups",
    name: "Soups & Salads",
    items: [
      { name: "Caesar Salad", price: "11.00" },
      { name: "Soup of the Day", desc: "Ask your bartender what's on.", price: "9.00" },
      { name: "Tomato Bisque", price: "7.00" }
    ]
  },
  {
    id: "sides",
    name: "Sides",
    items: [
      { name: "Cast Iron Mac & Cheese", desc: "8 oz.", price: "9.00", tag: "Popular" },
      { name: "Basket of Fries", price: "6.00" },
      { name: "Macaroni Salad", desc: "8 oz.", price: "5.00" },
      { name: "Yellow Rice", price: "5.00" },
      { name: "Collard Greens", price: "5.00" },
      { name: "Coleslaw", desc: "8 oz.", price: "4.00" }
    ]
  },
  {
    id: "desserts",
    name: "Daily Desserts",
    note: "Rotating, so ask what came out of the kitchen today.",
    items: [
      { name: "Cherry Cheesecake Basque", price: "9.00" },
      { name: "Chocolate Mousse", price: "9.00" },
      { name: "Piece of Cake", price: "9.00" },
      { name: "Slice of Pie", price: "9.00" },
      { name: "Tres Leches", desc: "Light, fluffy sponge cake soaked in a blend of three milks.", price: "7.00" },
      { name: "Flan", price: "6.00" }
    ]
  },
  {
    id: "drinks",
    name: "Drinks",
    note: "Rotating craft and local taps, plus signature cocktails. Ask about tonight's list.",
    items: [
      { name: "Draft Beer", desc: "Rotating local and craft selection. $4.50 drafts on NFL game days.", price: "" },
      { name: "Signature Cocktails", desc: "Made with premium spirits and fresh ingredients.", price: "" },
      { name: "Lemonade", price: "5.00" },
      { name: "Foxon Park Root Beer", price: "4.00" },
      { name: "Orange / Apple / Cranberry / Pineapple Juice", price: "4.00" },
      { name: "Espresso", price: "3.00" },
      { name: "Soda", price: "3.00" },
      { name: "Coffee", price: "2.00" }
    ]
  },
  {
    id: "zero-proof",
    name: "Zero Proof",
    note: "Full-flavor, no alcohol.",
    items: [
      { name: "Espresso Martini (Non-Alcoholic)", price: "12.00" },
      { name: "Guinness 0.0", price: "7.25" },
      { name: "Whiskey Sour (Non-Alcoholic)", price: "6.50" },
      { name: "Amalfi Spritz (Non-Alcoholic)", price: "6.00" },
      { name: "Corona Non-Alcoholic", price: "5.00" },
      { name: "Heineken 0.0", price: "5.00" },
      { name: "Red Bull", price: "4.75" },
      { name: "Road 2 Ruins Non-Alcoholic", price: "4.25" }
    ]
  }
];
