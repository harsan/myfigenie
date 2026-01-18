# AstraHeritage - Streamlit App

This is the Streamlit version of the AstraHeritage financial advisor application.

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Set up environment variables:
Create a `.streamlit/secrets.toml` file (or use environment variables):
```toml
OPENAI_API_KEY = "your_openai_api_key_here"
```

Or export as environment variable:
```bash
export OPENAI_API_KEY="your_openai_api_key_here"
```

## Running Locally

```bash
streamlit run streamlit_app.py
```

The app will be available at http://localhost:8501

## Deploying to Streamlit Cloud

1. Push your code to GitHub
2. Go to https://share.streamlit.io/
3. Sign in with GitHub
4. Click "New app"
5. Select your repository and branch
6. Set the main file path to `streamlit_app.py`
7. Add your OpenAI API key in the "Secrets" section:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```
8. Click "Deploy"

## Features

- **Home Page**: Landing page with logo, branding, and call-to-action
- **Profile Page**: Form to collect financial information
- **Dashboard Page**: Display financial snapshot and get AI-powered advice

## File Structure

- `streamlit_app.py` - Main Streamlit application
- `requirements.txt` - Python dependencies
- `.streamlit/config.toml` - Streamlit configuration
- `public/astraheritage-logo.jpg` - Logo image
