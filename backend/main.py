from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict
from sentiment_analysis import analyze_sentiment
from loyalty_system import calculate_loyalty_points

app = FastAPI()

# In-memory database for demonstration
db = {
    "orders": [],
    "reviews": [],
    "users": [],
    "menu_items": [],
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

class Order(BaseModel):
    id: int
    tableNumber: int
    items: List[Dict]
    status: str
    total: float
    timestamp: str

class Review(BaseModel):
    id: int
    userId: int
    orderId: int
    reviewText: str
    sentiment: str = None

class User(BaseModel):
    id: int
    name: str
    email: str
    role: str
    loyaltyPoints: int

class LoyaltyReward(BaseModel):
    id: int
    userId: int
    points: int
    rewardType: str
    timestamp: str

@app.post("/order/create")
def create_order(order: Order):
    db["orders"].append(order.dict())
    return {"message": "Order created successfully"}

@app.get("/order/list")
def list_orders():
    return db["orders"]

@app.put("/order/update-status")
def update_order_status(order_id: int, status: str):
    for order in db["orders"]:
        if order["id"] == order_id:
            order["status"] = status
            return {"message": "Order status updated successfully"}
    raise HTTPException(status_code=404, detail="Order not found")

@app.post("/review/analyze")
def analyze_review_endpoint(review: Review):
    sentiment = analyze_sentiment(review.reviewText)
    review.sentiment = sentiment
    db["reviews"].append(review.dict())

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
                "timestamp": "2024-07-23T12:00:00Z",  # Replace with actual timestamp
            }
            db["loyalty_rewards"].append(reward)
            break

    return {"sentiment": sentiment, "awarded_points": points}

@app.get("/analytics/sales")
def get_sales_analytics():
    # Dummy sales data
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
