<template>
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-section">
          <p class="footer-title">se pueden olvidar de tu logo, pero no de lo que les hiciste sentir</p>
        </div>
        <div class="footer-section">
          <div class="contact-info">
            <div class="contact-item">{{ $t('footer.contactUs') }}</div>
            <div class="contact-item contact-hover">{{ $t('footer.callUs') }}<a href="tel:+34 911 542 253">+34 911 542 253</a></div>
            <div class="contact-item contact-hover">WhatsApp: <a href="https://wa.me/34662746484">+34 662 74 64 84</a></div>
            <div class="contact-item contact-hover">Email: <a href="mailto:nbuenavista@goodsightmedia.com">nbuenavista@goodsightmedia.com</a></div>
          </div>
        </div>
        <div class="footer-section-mid">
          <div class="footer-section-div">
            <p class="footer-title">Portfolio</p>
            <button class="news-btn">Download</button>
          </div>
          <div class="footer-section-div">
            <p class="footer-title">{{ $t('footer.followUs') }}</p>
            <div class="social-icons">
              <a href="https://vimeo.com/goodsightmedia" target="_blank"><i class="fab fa-vimeo-v"></i></a>
              <a href="https://www.instagram.com/omolvideo/" target="_blank"><i class="fab fa-instagram"></i></a>
              <a href="https://www.youtube.com/@omolvideo/videos" target="_blank"><i class="fab fa-youtube"></i></a>
              <a href="https://www.linkedin.com/company/goodsight/" target="_blank"><i class="fab fa-linkedin-in"></i></a>
            </div>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <img :src="gLogo" alt="Logo" class="footer-logo" />
        <div class="footer-text">
          <p>&copy; 2023 | Goodsight | Todos los derechos reservados</p>
        </div>
        <div class="footer-links">
          <a href="#">Cookies Policy</a>
          <a href="#">Privacy Policy</a>
        </div>
      </div>
    </footer>
  </template>
  
  <style scoped>
@media (max-width: 767px) {
  .footer-title {
    font-size: var(--t-header2) !important;
    max-width: 100vw !important;
  }

  .contact-info {
    flex-direction: column !important;
  }

  .footer-section-mid {
    align-items: flex-start !important;
    flex-direction: column !important;
  }

  .news-btn {
    padding: 1rem 1rem !important;
    width: 10rem !important;
    margin-bottom: 2.2rem;
  }

  .footer-text {
    border-top: 1px solid rgb(112, 112, 112, .3);
    padding-top: 2rem;
    width: 100vw;
  }
  }
  .footer {
    background-color: var(--c-white);
    color: var(--c-black);
    padding: 20px;
    overflow: hidden;
    width: 100vw;
  }
  
  .footer-content {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  
  .footer-section {
    flex: 1;
    margin: 10px;
    border-bottom: 1px solid rgb(112, 112, 112, .3);
  }

  .footer-section:first-child {
    border: none;
  }

  .footer-section-mid {
    flex: 1;
    margin: 10px;
    border-bottom: 1px solid rgb(112, 112, 112, .3);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 3rem 0rem;
  }

  .footer-section-div {
    flex: 1;
    margin-bottom: 10px;
  }

  .news-btn {
    background-color: var(--c-black);
    color: var(--c-white);
    padding: 1rem 4rem;
    border: none;
    border-radius: 50px;
    cursor:url('../assets/cursor.png'), auto;
    width: max-content;
    margin-top: 30px;
    font-family: var(--f-thin);
    text-transform: uppercase;
    font-size: 1.2rem;
  }
  
  .footer-title {
    font-size: var(--t-bigText);
    max-width: 40vw;
    text-transform: uppercase;
    font-family: var(--f-light);
  }
  
  .contact-info {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  
  .contact-item {
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    border: 2px transparent solid;
    border-radius: 50%;
    padding: 1.2rem 1.8rem;
  }

  .contact-hover:hover {
    border: 2px var(--c-red) solid;
  }

  .contact-item a{
    margin-top: 10px;
    text-decoration: none;
    color: var(--c-black);
    cursor:url('../assets/cursor.png'), auto;
  }
  
  .social-icons {
    margin-top: 30px;
    font-size: var(--t-header2);
    display: flex;
    gap: 40px;
    margin-bottom: 10px;
  }

  .social-icons a{
    color: var(--c-black);
    cursor:url('../assets/cursor.png'), auto;
  }
  
  .footer-logo {
    max-width: 150px;
  }
  
  .footer-bottom {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    font-size: 12px;
    margin-bottom: 20px;
    text-transform: uppercase;
  }
  
  .footer-links a {
    text-decoration: none;
    color: var(--c-black);
    margin-left: 10px;
    cursor:url('../assets/cursor.png'), auto;
  }
  </style>
  
<script setup>

import gLogo from '@/assets/goodsight.png';
</script>