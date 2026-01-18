import streamlit as st

st.set_page_config(page_title="About Us | Astra Heritage", page_icon="⚖️")
# inside pages/about.py
if st.button("← Back to Simulator"):
    st.switch_page("streamlit_app.py")
st.divider()
st.markdown("# Our Leadership")
st.markdown("Astra Heritage Holdings LLC was founded to simplify wealth management through the responsible use of Artificial Intelligence.")

col1, col2 = st.columns(2)

with col1:
    st.subheader("[Your Name]")
    st.info("**Founder & CTO**")
    st.write("The Architect of Intelligence. [Your Name] leads the development of our AI-driven core, ensuring the engine behind your financial checkup is both powerful and secure.")

with col2:
    st.subheader("Andy Singh")
    st.info("**Product & US Manager**")
    st.write("The Guardian of Heritage. Andy ensures the platform addresses real-world complexities like 529 college savings and sustainable retirement paths.")

st.divider()
st.caption("© 2026 Astra Heritage Holdings LLC. Astra Heritage™ is a registered trademark.")