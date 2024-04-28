
import Vimeo from '@vimeo/player';
const throttle = require('lodash.throttle');

document.addEventListener('DOMContentLoaded', function() {
  const iframe = document.getElementById('vimeo-player');
  const player = new Vimeo(iframe);
  let isInitialLoad = true; // Flag to track initial page load

  player.ready().then(() => {
    player.on('timeupdate', throttle(() => {
      const currentTime = player.getCurrentTime();

      if (isInitialLoad) {
        // Check saved playback time on initial load
        const savedTime = localStorage.getItem('videoplayer-current-time');
        if (savedTime) {
          const newTime = parseFloat(savedTime);
          if (newTime >= 0 && newTime <= player.getDuration()) {
            player.setCurrentTime(newTime)
              .then(() => {
                console.log('Playback time set to:', newTime);
                isInitialLoad = false; // Update flag after setting time
              })
              .catch((error) => {
                console.error('Error setting playback time:', error);
              });
          } else {
            console.error('Playback time out of range.');
          }
        }
      } else {
        localStorage.setItem('videoplayer-current-time', currentTime.toString());
      }
    }, 1000)); // Throttle to once per second
  });
});
