export enum LoggingState {
  Started = 1,
  Stopped
}

export enum EventType {
  Start = "loggingStart",
  Stop = "loggingStop"
}

export const STATE_KEY = "logging-state";
export const EVENT_KEY = "logging-event";
