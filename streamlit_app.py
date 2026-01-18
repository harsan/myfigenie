import streamlit as st
import os
import json
from openai import OpenAI

# Page configuration
st.set_page_config(
    page_title="AstraHeritage | Wealth Simulator",
    page_icon="💰",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# Custom CSS for styling
st.markdown("""
<style>
    .main-header {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 2rem;
    }
    .logo-container {
        width: 80px;
        height: 80px;
    }
    .header-text {
        flex: 1;
    }
    .metric-card {
        background-color: #f8f9fa;
        padding: 1rem;
        border-radius: 0.5rem;
        border: 1px solid #e0e0e0;
    }
    .section-card {
        background-color: #f8f9fa;
        padding: 1.5rem;
        border-radius: 0.5rem;
        border: 1px solid #e0e0e0;
        margin-bottom: 1rem;
    }
</style>
""", unsafe_allow_html=True)

# Initialize session state
if 'page' not in st.session_state:
    st.session_state.page = 'home'
if 'profile' not in st.session_state:
    st.session_state.profile = {
        'age': '',
        'income': '',
        'cashSavings': '',
        'investments': '',
        'retirementAccounts': '',
        'kidsAges': '',
        'targetRetirementAge': ''
    }
if 'advice' not in st.session_state:
    st.session_state.advice = None
if 'loading' not in st.session_state:
    st.session_state.loading = False

def format_currency(value):
    """Format number as currency with commas"""
    if not value or value == '':
        return "$0"
    try:
        num = float(value)
        return f"${num:,.0f}"
    except (ValueError, TypeError):
        return "$0"

def get_ai_advice(profile):
    """Get financial advice from OpenAI"""
    # Try Streamlit secrets first, then environment variable
    try:
        api_key = st.secrets['OPENAI_API_KEY']
    except (KeyError, AttributeError):
        api_key = os.getenv('OPENAI_API_KEY')
    
    if not api_key:
        return None, "OpenAI API key not configured. Please add it to .streamlit/secrets.toml or set OPENAI_API_KEY environment variable."
    
    try:
        client = OpenAI(api_key=api_key)
        
        prompt = f"""You are a financial advisor helping someone understand their financial situation.

Profile:
- Age: {profile.get('age', 'N/A')}
- Target retirement age: {profile.get('targetRetirementAge', 'N/A')}
- Annual income: ${format_currency(profile.get('income', '0'))}
- Cash/emergency savings: ${format_currency(profile.get('cashSavings', '0'))}
- Brokerage/stocks/ETFs: ${format_currency(profile.get('investments', '0'))}
- Retirement accounts (401k, IRA, etc.): ${format_currency(profile.get('retirementAccounts', '0'))}
{f"- Kids' ages: {profile.get('kidsAges', 'N/A')}" if profile.get('kidsAges') else ""}

Provide personalized financial advice covering:
1. Retirement planning assessment
2. Investment allocation feedback
3. Emergency fund adequacy
4. Any specific recommendations based on their situation

Keep the advice clear, actionable, and educational."""

        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "system",
                    "content": "You are a helpful financial advisor providing educational guidance. Be clear, concise, and actionable."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0.7,
            max_tokens=1000
        )
        
        advice = response.choices[0].message.content
        return advice, None
        
    except Exception as e:
        return None, f"Error generating advice: {str(e)}"

def home_page():
    """Home/Landing page"""
    col1, col2 = st.columns([1, 3])
    
    with col1:
        try:
            logo_path = "public/astraheritage-logo.jpg"
            if os.path.exists(logo_path):
                st.image(logo_path, width=80)
            else:
                st.write("🏛️")  # Fallback emoji
        except Exception as e:
            st.write("🏛️")  # Fallback emoji
    
    with col2:
        st.markdown("## ASTRA HERITAGE")
        st.markdown("**Advanced Intelligence. Enduring Heritage.**")

    st.markdown("""
    An AI-powered financial guide that helps you make smarter decisions
    about retirement, housing, college planning, and investments—without
    spreadsheets or analysis paralysis.
    """)
    
    st.markdown("---")
    
    st.markdown("### What AstraHeritage will help you with:")
    st.markdown("""
    - See if you're on track to retire on your terms.
    - Understand how much house you can comfortably afford.
    - Plan 529 and college savings for your kids.
    - Spot if your portfolio is too concentrated in a few stocks.
    """)
    
    col1, col2 = st.columns(2)
    with col1:
        if st.button("Start free financial checkup", type="primary", use_container_width=True):
            st.session_state.page = 'profile'
            st.rerun()
    
    st.markdown("---")
    st.markdown("""
    <small>AstraHeritage provides educational guidance only and does not give
    individualized financial, legal, or tax advice.</small>
    """, unsafe_allow_html=True)
    
    if st.button("About Us"):
        st.session_state.page = 'about'
        st.rerun()
    st.divider()
    
    # NEW: Add your trademark and LLC footer
    st.caption("© 2026 Astra Heritage Holdings LLC. Astra Heritage™ is a registered trademark.")

def profile_page():
    """Profile form page"""
    st.markdown("### Step 1 · Your basics")
    st.markdown("## Tell AstraHeritage about your finances")
    st.markdown("A few high-level numbers are enough for now. You can refine the details later.")
    
    with st.form("profile_form"):
        col1, col2 = st.columns(2)
        
        with col1:
            age = st.number_input("Your age", min_value=0, max_value=120, value=int(st.session_state.profile['age']) if st.session_state.profile['age'] else 0, step=1)
            target_retirement_age = st.number_input("Target retirement age", min_value=0, max_value=120, value=int(st.session_state.profile['targetRetirementAge']) if st.session_state.profile['targetRetirementAge'] else 0, step=1)
            income = st.text_input("Annual household income (USD)", value=st.session_state.profile['income'], placeholder="0")
            cash_savings = st.text_input("Cash / emergency savings (USD)", value=st.session_state.profile['cashSavings'], placeholder="0")
        
        with col2:
            investments = st.text_input("Brokerage / stocks / ETFs (USD)", value=st.session_state.profile['investments'], placeholder="0")
            retirement_accounts = st.text_input("Retirement accounts (401k, IRA, etc.) (USD)", value=st.session_state.profile['retirementAccounts'], placeholder="0")
            kids_ages = st.text_input("Kids' ages (e.g. '8, 15')", value=st.session_state.profile['kidsAges'], placeholder="8, 15")
        
        submitted = st.form_submit_button("Continue", type="primary", use_container_width=True)
        
        if submitted:
            # Store profile data
            st.session_state.profile = {
                'age': str(age),
                'income': income,
                'cashSavings': cash_savings,
                'investments': investments,
                'retirementAccounts': retirement_accounts,
                'kidsAges': kids_ages,
                'targetRetirementAge': str(target_retirement_age)
            }
            st.session_state.page = 'dashboard'
            st.rerun()
def about_page():
    """Founders / About Page within the main app"""
    if st.button("← Back to main page"):
        st.session_state.page = 'home'
        st.rerun()
        
    st.markdown("# Our Leadership")
    col1, col2 = st.columns(2)
    with col1:
        st.image("public/harsan.jpg", width=130) 
        st.subheader("Harsan Singh")
        st.info("**Founder & CTO**")
        st.write("Harsan Singh heads the technology, architecture and development of our AI-driven core, ensuring the engine behind your financial checkup is both powerful and secure.")
    with col2:
        st.image("public/andy.jpg", width=130)
        st.subheader("Andy Singh")
        st.info("**Product & UX Manager**")
        st.write(" Andy Singh ensures the platform addresses real-world complexities like 529 college savings and sustainable retirement paths.")

def dashboard_page():
    """Dashboard page"""
    profile = st.session_state.profile
    
    # Check if profile is filled
    if not profile.get('age') or not profile.get('income'):
        st.warning("No profile data found. Please fill out your profile first.")
        if st.button("Go to Profile"):
            st.session_state.page = 'profile'
            st.rerun()
        return
    
    st.markdown("### AstraHeritage · Dashboard")
    st.markdown("## Your financial snapshot")
    st.markdown("A high-level view based on the numbers you shared. Next step will be to run AI analysis on this.")
    
    # Summary cards
    col1, col2, col3 = st.columns(3)
    
    with col1:
        st.markdown(f"""
        <div class="metric-card">
            <p style="font-size: 0.75rem; color: #666; text-transform: uppercase; margin: 0;">Age / Target</p>
            <p style="font-size: 1.5rem; font-weight: bold; margin: 0.25rem 0;">
                {profile.get('age', '--')} → {profile.get('targetRetirementAge', '--')}
            </p>
        </div>
        """, unsafe_allow_html=True)
    
    with col2:
        st.markdown(f"""
        <div class="metric-card">
            <p style="font-size: 0.75rem; color: #666; text-transform: uppercase; margin: 0;">Annual income</p>
            <p style="font-size: 1.5rem; font-weight: bold; margin: 0.25rem 0;">
                {format_currency(profile.get('income', '0'))}
            </p>
        </div>
        """, unsafe_allow_html=True)
    
    with col3:
        total_investable = float(profile.get('investments', '0') or '0') + float(profile.get('retirementAccounts', '0') or '0')
        st.markdown(f"""
        <div class="metric-card">
            <p style="font-size: 0.75rem; color: #666; text-transform: uppercase; margin: 0;">Total investable</p>
            <p style="font-size: 1.5rem; font-weight: bold; margin: 0.25rem 0;">
                {format_currency(str(total_investable))}
            </p>
        </div>
        """, unsafe_allow_html=True)
    
    st.markdown("---")
    
    # Financial Details
    st.markdown("### Financial Details")
    
    col1, col2 = st.columns(2)
    
    with col1:
        st.markdown(f"**Cash / Emergency Savings**  \n{format_currency(profile.get('cashSavings', '0'))}")
        st.markdown(f"**Brokerage / Stocks / ETFs**  \n{format_currency(profile.get('investments', '0'))}")
    
    with col2:
        st.markdown(f"**Retirement Accounts**  \n{format_currency(profile.get('retirementAccounts', '0'))}")
        if profile.get('kidsAges'):
            st.markdown(f"**Kids' Ages**  \n{profile.get('kidsAges')}")
    
    st.markdown("---")
    
    # Actions
    col1, col2 = st.columns(2)
    
    with col1:
        if st.button("Edit Profile", use_container_width=True):
            st.session_state.page = 'profile'
            st.rerun()
    
    with col2:
        if st.button("Get AI Financial Advice", type="primary", use_container_width=True, disabled=st.session_state.loading):
            st.session_state.loading = True
            st.session_state.advice = None
            st.rerun()
    
    # Generate advice if button was clicked
    if st.session_state.loading and not st.session_state.advice:
        with st.spinner("Generating Advice..."):
            advice, error = get_ai_advice(profile)
            st.session_state.loading = False
            if error:
                st.error(error)
            else:
                st.session_state.advice = advice
                st.rerun()
    
    # Display advice
    if st.session_state.advice:
        st.markdown("---")
        st.markdown("### AI Financial Advice")
        st.markdown(st.session_state.advice)

# Main app routing
if st.session_state.page == 'home':
    home_page()
elif st.session_state.page == 'profile':
    profile_page()
elif st.session_state.page == 'dashboard':
    dashboard_page()
elif st.session_state.page == 'about':  # ADD THIS
    about_page()