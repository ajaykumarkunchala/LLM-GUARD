# DLP Scanner using Microsoft Presidio with Custom Patterns
# This detects and masks sensitive data like emails, phones, credit cards, SSNs, API keys

from presidio_analyzer import AnalyzerEngine
from presidio_anonymizer import AnonymizerEngine
from custom_patterns import CustomDLP

print("=" * 60)
print("         DLP SCANNER - Presidio with Custom Patterns")
print("=" * 60)

print("\n[1] Initializing Analyzer...")
analyzer = AnalyzerEngine()

# Add custom recognizers
print("[1a] Loading custom patterns (SSN, API keys, etc.)...")
custom_dlp = CustomDLP()
for recognizer in custom_dlp.get_recognizers():
    analyzer.registry.add_recognizer(recognizer)
print("     ✅ Custom patterns loaded!")

print("[2] Initializing Anonymizer...")
anonymizer = AnonymizerEngine()

print("[3] Creating test prompt...")
test_prompt = """
My email is john.doe@example.com.
My phone number is (123) 456-7890.
My credit card is 4111-1111-1111-1111.
My Social Security number is 123-45-6789.
My AWS API key is AKIA1234567890ABCDEF.
My GitHub token is ghp_1234567890abcdefghijklmnopqrstuv.
"""

print("[4] Original prompt:")
print("-" * 60)
print(test_prompt)
print("-" * 60)

print("\n[5] Analyzing for sensitive data...")
analyzer_results = analyzer.analyze(text=test_prompt, language='en')

print(f"[6] Found {len(analyzer_results)} sensitive items:")
for result in analyzer_results:
    detected_text = test_prompt[result.start:result.end]
    print(f"    - {result.entity_type}: '{detected_text}'")

print("\n[7] Anonymizing sensitive data...")
anonymized_result = anonymizer.anonymize(
    text=test_prompt,
    analyzer_results=analyzer_results
)

print("\n[8] Results:")
print("=" * 60)
print("SANITIZED PROMPT:")
print("=" * 60)
print(anonymized_result.text)
print("=" * 60)

print("\n[9] Summary:")
print(f"    Total sensitive items detected: {len(analyzer_results)}")
print("    All items have been masked/redacted.")
print("\n" + "=" * 60)
print("         DLP SCANNER COMPLETE!")
print("=" * 60)