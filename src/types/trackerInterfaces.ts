export interface TaskArrReduced {
  taskName: string;
  taskStart: string;
  taskTimeSec: number;
}

export interface LocalStorageTimer {
  isTimerOn: boolean;
  startStamp: number;
  totalTime: number;
}
