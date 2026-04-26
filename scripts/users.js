export default class Users{
    _progress;
    _level;
    _max;

    constructor(user) {
        if (!user) user = {
            progress: 0,
            level: 1
        }
        this._progress = user._progress;
        this._level = user._level;
        this._max = (user._level+1) * 1000;
    }

    get level() {
        return this._level;
    }
    get max() {
        return this._max;
    }
    get progress() {
        return this._progress;
    }
    levelUp() {
        this._level++;
        this._max = (this._level+1) * 1000;
        return
    }
    progressUp(reward) {
       const progress = this._progress + Math.abs(Number(reward.exp));
       if(progress >= this._max){
          return this._progress = this.progressUpCheck(progress);
       }
       return this._progress = progress;
    }
    progressUpCheck(progress) {
        progress = progress - this._max;
        this.levelUp();

        if(progress >= this._max){
           return this.progressUpCheck(progress);
        }
        return progress;
    }
}