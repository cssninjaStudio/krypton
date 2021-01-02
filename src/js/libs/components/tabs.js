export function initTabs() {
    return {
        activeTab: 'tab-1',
        switchTabs(e) {
            const tab = e.target.getAttribute('data-tab');
            this.activeTab = tab;
        },

        setupCountdown() {
            // Set the date we're counting down to
            var countDownDate = new Date("Oct 24, 2021 07:00:00").getTime();
      
            // Update the count down every 1 second
            var x = setInterval(function () {
              // Get todays date and time
              var now = new Date().getTime();
      
              // Find the distance between now and the count down date
              var distance = countDownDate - now;
      
              var d = document;
              var daysElement = d.querySelector("#days-count");
              var hoursElement = d.querySelector("#hours-count");
              var minutesElement = d.querySelector("#minutes-count");
              var secondsElement = d.querySelector("#seconds-count");
      
              // Time calculations for days, hours, minutes and seconds
              daysElement.textContent = Math.floor(distance / (1000 * 60 * 60 * 24));
              hoursElement.textContent = Math.floor(
                (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
              );
              minutesElement.textContent = Math.floor(
                (distance % (1000 * 60 * 60)) / (1000 * 60)
              );
              secondsElement.textContent = Math.floor(
                (distance % (1000 * 60)) / 1000
              );
      
              // If the count down is finished, write some text
              if (distance < 0) {
                clearInterval(x);
              }
            }, 1000);
          },
    }
}