import { makeAutoObservable } from "mobx";

class viewModeStore {
  view = "day"; // day | week

  constructor() {
    makeAutoObservable(this);
  }

  setView = (value) => {
    this.view = value;
  };
}

export default new viewModeStore();
