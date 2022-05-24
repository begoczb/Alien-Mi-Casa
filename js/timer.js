class Timer {
  constructor(time) {
    this.currentTime = time;
    this.time = time;
    this.intervalId = null;
  }

  start(callback) {
    this.intervalId = setInterval(() => {
      this.currentTime -= 1;
      console.log(`current time is: ${this.currentTime}`);
      if (typeof callback === "function") {
        callback();
      }
    }, 1000);
  }
  getMinutes() {
    return Math.floor(this.currentTime / 60);
  }

  getSeconds() {
    return Math.floor(this.currentTime % 60);
  }

  computeTwoDigitNumber(value) {
    let newValue = value.toString();
    if (newValue.length < 2) {
      return `0${newValue}`;
    } else {
      return newValue;
    }
  }

  stop() {
    return clearInterval(this.intervalId);
  }

  //   reset() {
  //     this.currentTime = 0;
  //   }
}
