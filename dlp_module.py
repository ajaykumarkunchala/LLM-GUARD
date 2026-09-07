# dlp_module.py - Reusable DLP module for team integration

from presidio_analyzer import AnalyzerEngine
from presidio_anonymizer import AnonymizerEngine
from custom_patterns import CustomDLP

class DLPModule:
    """
    Data Loss Prevention Module
    Detects and masks sensitive data in user prompts
    """
    
    def __init__(self):
        """Initialize the DLP module with custom patterns"""
        self.analyzer = AnalyzerEngine()
        self.anonymizer = AnonymizerEngine()
        
        # Add custom recognizers
        custom_dlp = CustomDLP()
        for recognizer in custom_dlp.get_recognizers():
            self.analyzer.registry.add_recognizer(recognizer)
    
    def scan_prompt(self, prompt):
        """
        Scan a user prompt for sensitive data
        
        Args:
            prompt (str): The user's input text
            
        Returns:
            dict: {
                'sanitized_prompt': str (masked text),
                'detected_items': int (number of sensitive items),
                'is_safe': bool (True if no sensitive data found),
                'details': list (details of each detection)
            }
        """
        # Analyze the prompt
        results = self.analyzer.analyze(text=prompt, language='en')
        
        # Anonymize sensitive data
        anonymized = self.anonymizer.anonymize(
            text=prompt,
            analyzer_results=results
        )
        
        # Prepare detailed results
        details = []
        for result in results:
            detected_text = prompt[result.start:result.end]
            details.append({
                'entity_type': result.entity_type,
                'text': detected_text,
                'confidence': result.score,
                'start': result.start,
                'end': result.end
            })
        
        return {
            'sanitized_prompt': anonymized.text,
            'detected_items': len(results),
            'is_safe': len(results) == 0,
            'details': details
        }
    
    def mask_text(self, prompt):
        """Simplified version - just returns masked text"""
        result = self.scan_prompt(prompt)
        return result['sanitized_prompt']


# ============================================
# TEST THE MODULE (run this file directly)
# ============================================
if __name__ == "__main__":
    print("=" * 60)
    print("Testing DLP Module...")
    print("=" * 60)
    
    # Create the DLP module
    dlp = DLPModule()
    
    # Test with sample data
    test_prompt = """
    Email: test@company.com
    Phone: 555-123-4567
    SSN: 987-65-4321
    """
    
    print("\nOriginal prompt:")
    print(test_prompt)
    
    # Scan the prompt
    result = dlp.scan_prompt(test_prompt)
    
    print("\nResults:")
    print("-" * 40)
    print(f"Sanitized: {result['sanitized_prompt']}")
    print(f"Detected items: {result['detected_items']}")
    print(f"Is safe: {result['is_safe']}")
    
    if result['details']:
        print("\nDetected details:")
        for item in result['details']:
            print(f"  - {item['entity_type']}: '{item['text']}'")
    
    print("=" * 60)
    print("DLP Module test complete!")
    print("=" * 60)