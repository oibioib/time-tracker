export interface TaskArrReduced {
  taskName: string;
  taskStart: string;
  taskTimeSec: number;
  id: string;
  setRefreshPage: React.Dispatch<React.SetStateAction<boolean>>;
  refreshPage: boolean;
}

export interface LocalStorageTimer {
  isTimerOn: boolean;
  startStamp: number;
  totalTime: number;
}
