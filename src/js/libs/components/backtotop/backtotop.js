const progressWrap = document.querySelector(".progress-wrap");
const progressPath = document.querySelector(".progress-wrap path");
const pathLength = progressPath.getTotalLength();

export function initBackToTop() {
  return {
    scrolled: false,
    height: 60,
    mobileOpen: false,
    setup() {
      progressPath.style.transition = progressPath.style.WebkitTransition = "none";
      progressPath.style.strokeDasharray = pathLength + " " + pathLength;
      progressPath.style.strokeDashoffset = pathLength;
      progressPath.getBoundingClientRect();
      progressPath.style.transition = progressPath.style.WebkitTransition = "stroke-dashoffset 10ms linear";
      
    },
    updateProgress() {
      let scrollValue = window.scrollY;
      let scrollHeight = document.body.scrollHeight - window.innerHeight;
      let progress = pathLength - (scrollValue * pathLength) / scrollHeight;
      progressPath.style.strokeDashoffset = progress;
      //console.log(scrollValue);
    },
    scroll() {
      this.updateProgress();
      let scrollValue = window.scrollY;
      if (scrollValue >= this.height) {
        this.scrolled = true;
        progressWrap.classList.add('active-progress');
      } else {
        this.scrolled = false;
        progressWrap.classList.remove('active-progress');
      }
    },
    scrollTop() {
      window.scrollTo({top: 0, behavior: 'smooth'});
      return false;
    }
  };
}
