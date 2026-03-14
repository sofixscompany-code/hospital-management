from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Optional
from datetime import datetime
from sentiment_analysis import analyze_sentiment
from loyalty_system import calculate_loyalty_points

app = FastAPI()

# In-memory database for demonstration
db = {
    "orders": [],
    "reviews": [],
    "users": [
        {
            "id": 1,
            "name": "Demo User",
            "email": "demo@example.com",
            "password": "password",
            "role": "customer",
            "loyaltyPoints": 0,
        }
    ],
    "menu_items": [
        {
            "id": 1,
            "name": "Margherita Pizza",
            "description": "Classic pizza with tomato sauce, mozzarella, and basil",
            "price": 12.99,
            "category": "Main Course",
            "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400",
            "ingredients": "Tomato sauce, mozzarella cheese, fresh basil, olive oil",
            "available": True,
        },
        {
            "id": 2,
            "name": "Caesar Salad",
            "description": "Crisp romaine lettuce with Caesar dressing and croutons",
            "price": 8.99,
            "category": "Starters",
            "image": "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400",
            "ingredients": "Romaine lettuce, Caesar dressing, croutons, parmesan cheese",
            "available": True,
        },
        {
            "id": 3,
            "name": "Grilled Salmon",
            "description": "Fresh salmon fillet grilled to perfection",
            "price": 18.99,
            "category": "Main Course",
            "image": "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400",
            "ingredients": "Salmon fillet, herbs, lemon, olive oil",
            "available": True,
        },
        {
            "id": 4,
            "name": "Chocolate Brownie",
            "description": "Rich chocolate brownie with vanilla ice cream",
            "price": 6.99,
            "category": "Desserts",
            "image": "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=400",
            "ingredients": "Chocolate, flour, sugar, eggs, vanilla ice cream",
            "available": True,
        },
        {
            "id": 5,
            "name": "Mojito",
            "description": "Refreshing cocktail with mint, lime, and soda",
            "price": 7.99,
            "category": "Drinks",
            "image": "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400",
            "ingredients": "White rum, mint, lime, sugar, soda water",
            "available": True,
        },
    ],
    "loyalty_rewards": [],
}

class MenuItem(BaseModel):
    id: int
    name: str
    category: str
    price: float
    image: str
    description: str
    available: bool
    ingredients: Optional[str]

class Order(BaseModel):
    id: Optional[int]
    tableNumber: int
    items: List[Dict]
    status: Optional[str] = "Pending"
    total: float
    timestamp: Optional[str]

class Review(BaseModel):
    id: Optional[int]
    userId: int
    orderId: int
    reviewText: str
    sentiment: Optional[str]

class User(BaseModel):
    id: Optional[int]
    name: str
    email: str
    password: str
    role: Optional[str] = "customer"
    loyaltyPoints: Optional[int] = 0

class LoyaltyReward(BaseModel):
    id: Optional[int]
    userId: int
    points: int
    rewardType: str
    timestamp: str

class LoginRequest(BaseModel):
    email: str
    password: str

class RegisterRequest(BaseModel):
    name: str
    email: str
    password: str

# Auth endpoints
@app.post("/api/auth/login")
def login(request: LoginRequest):
    for user in db["users"]:
        if user["email"] == request.email and user["password"] == request.password:
            return {"token": f"fake_token_{user['id']}", "user": user}
    raise HTTPException(status_code=401, detail="Invalid credentials")

@app.post("/api/auth/register")
def register(request: RegisterRequest):
    # Check if user already exists
    for user in db["users"]:
        if user["email"] == request.email:
            raise HTTPException(status_code=400, detail="User already exists")

    new_user = {
        "id": len(db["users"]) + 1,
        "name": request.name,
        "email": request.email,
        "password": request.password,
        "role": "customer",
        "loyaltyPoints": 0,
    }
    db["users"].append(new_user)
    return {"message": "User registered successfully"}

# Menu endpoints
@app.get("/api/menu")
def get_menu():
    return db["menu_items"]

@app.get("/api/menu/{item_id}")
def get_menu_item(item_id: int):
    for item in db["menu_items"]:
        if item["id"] == item_id:
            return item
    raise HTTPException(status_code=404, detail="Menu item not found")

# Order endpoints
@app.post("/api/orders")
def create_order(order: Order):
    new_order = order.dict()
    new_order["id"] = len(db["orders"]) + 1
    new_order["status"] = "Pending"
    new_order["timestamp"] = datetime.now().isoformat()
    db["orders"].append(new_order)
    return {"message": "Order created successfully", "order": new_order}

@app.get("/api/orders")
def get_orders():
    return db["orders"]

@app.get("/api/orders/{order_id}")
def get_order(order_id: int):
    for order in db["orders"]:
        if order["id"] == order_id:
            return order
    raise HTTPException(status_code=404, detail="Order not found")

# Review endpoints
@app.post("/api/reviews")
def submit_review(review: Review):
    sentiment = analyze_sentiment(review.reviewText)
    new_review = review.dict()
    new_review["id"] = len(db["reviews"]) + 1
    new_review["sentiment"] = sentiment
    db["reviews"].append(new_review)

    # Award loyalty points
    points = calculate_loyalty_points(sentiment)
    for user in db["users"]:
        if user["id"] == review.userId:
            user["loyaltyPoints"] += points
            reward = {
                "id": len(db["loyalty_rewards"]) + 1,
                "userId": review.userId,
                "points": points,
                "rewardType": "review_feedback",
                "timestamp": datetime.now().isoformat(),
            }
            db["loyalty_rewards"].append(reward)
            break

    return {"sentiment": sentiment, "awarded_points": points}

# Loyalty endpoints
@app.get("/api/loyalty")
def get_loyalty_points():
    # For demo, return data for user 1
    user_rewards = [r for r in db["loyalty_rewards"] if r["userId"] == 1]
    total_points = sum(r["points"] for r in user_rewards)
    return {"points": total_points, "rewards": user_rewards}

# Analytics
@app.get("/api/analytics/sales")
def get_sales_analytics():
    return {"daily_sales": 1500, "monthly_revenue": 45000}

@app.get("/analytics/sentiment")
def get_sentiment_analytics():
    sentiments = [review["sentiment"] for review in db["reviews"]]
    return {
        "positive": sentiments.count("Positive"),
        "neutral": sentiments.count("Neutral"),
        "negative": sentiments.count("Negative"),
    }

@app.post("/users")
def create_user(user: User):
    db["users"].append(user.dict())
    return {"message": "User created successfully"}
