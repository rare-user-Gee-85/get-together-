export const FOOD_STRUCTURE = {
  Meat: {
    proteins: ["Chicken","Ribs","Brisket","Pork","Sausage / Hot Links","Fish","Shrimp","Turkey","Lamb","Oxtail","Crab","Burgers"],
    cookMethods: ["Grilled","Fried","Smoked","Baked","Boiled","Stewed","Jerk","Blackened","Roasted","Steamed"],
  },
  Sides: {
    items: ["Mac & Cheese","Potato Salad","Baked Beans","Collard Greens","Coleslaw","Corn on the Cob","Candied Yams","Rice","Black-Eyed Peas","Pasta Salad","Cabbage","Fried Okra"],
    styles: ["Baked","Fried","Boiled","Sauteed","Raw / Fresh","Slow Cooked","Creamy","Spicy","Classic","Vegan"],
  },
  Desserts: {
    items: ["Banana Pudding","Peach Cobbler","Pound Cake","Red Velvet Cake","Sweet Potato Pie","Chess Pie","Bread Pudding","Brownies","Fruit Salad","Funnel Cake"],
  },
  Bread: {
    items: ["Cornbread","Dinner Rolls","Biscuits","Garlic Bread","Hamburger Buns","Hot Dog Buns"],
  },
  Condiments: {
    items: ["Ketchup","Mustard","Mayo","Pickles","Onions","Lettuce","BBQ Sauce","Salad Dressing","Hot Sauce","Relish","Sour Cream","Butter"],
  },
  Drinks: {
    items: ["Sweet Tea","Lemonade","Red Kool-Aid","Fruit Punch","Watermelon Water","Iced Coffee","Soda (Assorted)","Water / Ice","Sparkling Water"],
    styles: ["Sweetened","Unsweetened","With Alcohol","Virgin","Frozen / Slushie"],
  },
  Supplies: {
    items: ["Paper Plates","Plastic Cups","Napkins","Aluminum Foil","Charcoal","Lighter Fluid","Ice Bags","Trash Bags","Serving Utensils","Zip-Lock Bags","Paper Towels","Toothpicks"],
  },
};

export const NON_FOOD = {
  Games: {
    color: "#2E9E6B",
    items: ["Spades","Dominoes","Bid Whist","Cornhole","Volleyball","Black Card Revoked","#CultureTags","Water Balloons","Horseshoes","UNO","Taboo","Jenga"],
  },
  Music: {
    color: "#A47BFF",
    items: ["Old School R&B Playlist","90s Hip Hop Mix","Gospel Brunch Set","Line Dance Songs","Neo-Soul Vibes","Trap BBQ Mix","Afrobeats Mix","Smooth Jazz","Go-Go Mix"],
  },
  Activities: {
    color: "#C9A23A",
    items: ["Line Dancing","Karaoke","Slideshow / Photo Wall","Best Dish Contest","Family Trivia","Kids Relay Races","Step Show","DJ Set","Spoken Word"],
  },
  Setup: {
    color: "#5A8A9F",
    items: ["Tables","Chairs","Canopy / Tent","Tablecloths","Extension Cord","Fans","Coolers","Folding Tables","Pop-Up Tent","String Lights","Generator","Tarp"],
  },
  Cleanup: {
    color: "#C2AC5A",
    items: ["Trash Bags","Paper Towels","Dish Soap","Sponges","Broom & Dustpan","Recycling Bags","Spray Cleaner","Wet Wipes","Gloves","Compost Bags"],
  },
  Ice: {
    color: "#3A8AB0",
    items: ["Bag Ice (10lb)","Bag Ice (20lb)","Block Ice","Dry Ice","Ice for Drinks","Ice for Cooler","Ice for Raw Meat","Crushed Ice"],
  },
};

export const VIBES = [
  "Backyard Chill","Juneteenth Celebration","Family Reunion",
  "Block Party","Sunday Cookout","Summer Sendoff","Birthday Cookout","Homecoming"
];

export const CAT_COLORS = {
  Meat: "#DC2840", Sides: "#D4813A", Desserts: "#C25B9E",
  Bread: "#B8860B", Condiments: "#7A9E3A", Drinks: "#3A7DC9",
  Supplies: "#5A7A6A", Games: "#2E9E6B", Music: "#A47BFF",
  Activities: "#C9A23A", Setup: "#5A8A9F", Cleanup: "#C2AC5A", Ice: "#3A8AB0",
};

export const uid = () => Math.random().toString(36).slice(2, 9);

// Generate a shareable RSVP link for a guest
export const buildRSVPLink = (eventData, guestId) => {
  const payload = {
    guestId,
    event: eventData.event,
    guests: eventData.guests,
    items: eventData.items || [],
    hosts: eventData.hosts || [],
  };
  const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
  return `${window.location.origin}?rsvp=${encoded}`;
};

export const CAT_COLORS_LIGHT = {
  Meat: "#DC2840", Sides: "#F5A623", Desserts: "#5FA8BF",
  Bread: "#C98B52", Condiments: "#8DB653", Drinks: "#2A9D8F",
  Supplies: "#9B8AD1", Games: "#2A9D8F", Music: "#A47BFF",
  Activities: "#C9A23A", Setup: "#6BA6CC", Cleanup: "#C2AC5A", Ice: "#3A8AB0",
};

export const CAT_SYMBOLS = {
  Meat: "M", Sides: "S", Desserts: "D", Bread: "B", Condiments: "C",
  Drinks: "Dr", Supplies: "Su", Games: "G", Music: "Mu", Activities: "A",
  Setup: "Se", Cleanup: "Cl", Ice: "I",
};
