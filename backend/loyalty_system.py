def calculate_loyalty_points(sentiment: str) -> int:
    """Calculates loyalty points based on sentiment."""
    if sentiment == "Positive":
        return 20
    elif sentiment == "Neutral":
        return 5
    else:
        return 0
