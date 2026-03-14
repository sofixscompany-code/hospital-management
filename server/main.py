
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI()

# In-memory database for orders
orders = {
    "1": {
        "id": "1",
        "table_number": 12,
        "status": "pending",
        "items": [
            {"id": "1", "name": "Pizza", "quantity": 1},
            {"id": "2", "name": "Coke", "quantity": 2},
        ],
    },
    "2": {
        "id": "2",
        "table_number": 8,
        "status": "pending",
        "items": [
            {"id": "3", "name": "Burger", "quantity": 1},
        ],
    },
}

class OrderItem(BaseModel):
    id: str
    name: str
    quantity: int

class Order(BaseModel):
    id: str
    table_number: int
    status: str
    items: List[OrderItem]


@app.get("/order/list", response_model=List[Order])
def list_orders():
    return list(orders.values())


@app.put("/order/update-status")
def update_order_status(order_id: str, status: str):
    if order_id not in orders:
        raise HTTPException(status_code=404, detail="Order not found")
    orders[order_id]["status"] = status
    return {"message": "Order status updated successfully"}


# Allow CORS for development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
