# custom_patterns.py - Custom DLP patterns

from presidio_analyzer import PatternRecognizer, Pattern
from presidio_anonymizer import AnonymizerEngine

class CustomDLP:
    def __init__(self):
        """Initialize custom DLP recognizers"""
        self.recognizers = []
        
        # 1. SSN Pattern (Social Security Number)
        ssn_pattern = Pattern(
            name="US_SSN",
            regex=r"\b\d{3}-\d{2}-\d{4}\b",
            score=0.85
        )
        ssn_recognizer = PatternRecognizer(
            supported_entity="US_SSN",
            patterns=[ssn_pattern],
            supported_language="en"
        )
        self.recognizers.append(ssn_recognizer)
        
        # 2. AWS API Key Pattern
        aws_pattern = Pattern(
            name="AWS_KEY",
            regex=r"\bAKIA[0-9A-Z]{16}\b",
            score=0.85
        )
        aws_recognizer = PatternRecognizer(
            supported_entity="AWS_KEY",
            patterns=[aws_pattern],
            supported_language="en"
        )
        self.recognizers.append(aws_recognizer)
        
        # 3. GitHub Token Pattern
        github_pattern = Pattern(
            name="GITHUB_TOKEN",
            regex=r"\bghp_[A-Za-z0-9]{36}\b",
            score=0.85
        )
        github_recognizer = PatternRecognizer(
            supported_entity="GITHUB_TOKEN",
            patterns=[github_pattern],
            supported_language="en"
        )
        self.recognizers.append(github_recognizer)
        
        # 4. Stripe API Key Pattern
        stripe_pattern = Pattern(
            name="STRIPE_KEY",
            regex=r"\bsk_live_[A-Za-z0-9]{24}\b",
            score=0.85
        )
        stripe_recognizer = PatternRecognizer(
            supported_entity="STRIPE_KEY",
            patterns=[stripe_pattern],
            supported_language="en"
        )
        self.recognizers.append(stripe_recognizer)
        
        # 5. Generic API Key Pattern (any key with 'key' or 'token' in name)
        generic_key_pattern = Pattern(
            name="API_KEY",
            regex=r"\b(?:api[_-]?key|token|secret)\s*[=:]\s*[A-Za-z0-9_\-]{20,}\b",
            score=0.75
        )
        generic_recognizer = PatternRecognizer(
            supported_entity="API_KEY",
            patterns=[generic_key_pattern],
            supported_language="en"
        )
        self.recognizers.append(generic_recognizer)
    
    def get_recognizers(self):
        """Return all custom recognizers"""
        return self.recognizers