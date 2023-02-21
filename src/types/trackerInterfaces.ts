export interface ProjectData {
  id: string;
  title: string;
  salary?: string;
  color?: string;
}

export interface TaskArrReduced {
  taskName: string;
  taskStart: string;
  taskTimeSec: number;
  id: string;
  project: ProjectData;
  setRefreshPage: React.Dispatch<React.SetStateAction<boolean>>;
  refreshPage: boolean;
}

export interface LocalStorageTimer {
  isTimerOn: boolean;
  startStamp: number;
  totalTime: number;
}

export interface UserProject {
  id: string;
  title: string;
}

export interface TimerData {
  startTime: number;
  totalTime: number;
  title: string;
  id: string;
  isActive: boolean;
  project: ProjectData;
}
