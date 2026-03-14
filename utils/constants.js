export const API_BASE_URL = "http://localhost:8000/api";

export const ORDER_STATUSES = {
  PENDING: "Pending",
  COOKING: "Cooking",
  READY: "Ready",
  COMPLETED: "Completed",
};

export const LOYALTY_POINTS = {
  POSITIVE: 10,
  NEUTRAL: 3,
  NEGATIVE: 0,
};

export const CATEGORIES = [
  "All",
  "Starters",
  "Main Course",
  "Drinks",
  "Desserts",
];

export const MENU_ITEMS = [
  {
    id: 1,
    name: "Margherita Pizza",
    description: "Classic pizza with tomato sauce, mozzarella, and basil",
    price: 12.99,
    category: "Main Course",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400",
    ingredients: "Tomato sauce, mozzarella cheese, fresh basil, olive oil",
    available: true,
  },
  {
    id: 2,
    name: "Caesar Salad",
    description: "Crisp romaine lettuce with Caesar dressing and croutons",
    price: 8.99,
    category: "Starters",
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400",
    ingredients: "Romaine lettuce, Caesar dressing, croutons, parmesan cheese",
    available: true,
  },
  {
    id: 3,
    name: "Grilled Salmon",
    description: "Fresh salmon fillet grilled to perfection",
    price: 18.99,
    category: "Main Course",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400",
    ingredients: "Salmon fillet, herbs, lemon, olive oil",
    available: true,
  },
  {
    id: 4,
    name: "Chocolate Brownie",
    description: "Rich chocolate brownie with vanilla ice cream",
    price: 6.99,
    category: "Desserts",
    image: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=400",
    ingredients: "Chocolate, flour, sugar, eggs, vanilla ice cream",
    available: true,
  },
  {
    id: 5,
    name: "Mojito",
    description: "Refreshing cocktail with mint, lime, and soda",
    price: 7.99,
    category: "Drinks",
    image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400",
    ingredients: "White rum, mint, lime, sugar, soda water",
    available: true,
  },
];
