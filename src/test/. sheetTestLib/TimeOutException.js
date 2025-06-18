class TimeOutException extends Error {
  constructor() {
    super("Test runtime reached the treshold, shutting down and saving progress."); 
    this.name = "TimeOutException";
  }
}