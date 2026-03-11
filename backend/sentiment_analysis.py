from textblob import TextBlob

def analyze_sentiment(text: str) -> str:
    """Analyzes the sentiment of a given text."""
    analysis = TextBlob(text)
    if analysis.sentiment.polarity > 0:
        return "Positive"
    elif analysis.sentiment.polarity == 0:
        return "Neutral"
    else:
        return "Negative"
