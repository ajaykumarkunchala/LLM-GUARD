# LLM-GUARD

# LLM Guard - DLP Module

## Overview
This is the Data Loss Prevention (DLP) module for the LLM Guard project. It detects and masks sensitive information in user prompts before they reach the AI model.

## Features
- ✅ Email detection and masking
- ✅ Phone number detection and masking  
- ✅ Credit card detection and masking
- ✅ Social Security number detection and masking
- ✅ API key detection and masking

## Technology Used
- Microsoft Presidio for PII detection and anonymization
- spaCy for natural language processing

## Setup Instructions

### 1. Create virtual environment
```bash
python -m venv venv
venv\Scripts\activate  # On Windows

