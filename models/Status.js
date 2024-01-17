class Status {

    static NOT_STARTED = new Status('Not started')
    static WAITING_TO_START = new Status('Waiting to start')
    static STARTED = new Status('Started')
    static PAUSED = new Status('Paused')
    static FINISHED = new Status('Finished')
  
    constructor(value) {
      this.value = value
    }
    
}

module.exports = { Status };
