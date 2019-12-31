"use strict";

initPageloader();
$(document).ready(function () {
  initNavbar();
  initMobileMenu();
  highlightMenu();
  initPopDropdowns();
  initNavigationTabs();
  initModalVideo();
  feather.replace();
  handleResize();
  AOS.init();
  initLangToggles();
  initAnchorScroll();
  initLikeButton();
  initParticles();
});