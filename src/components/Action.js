export default class Action{
    scene
    constructor(scene) {
        this.scene = scene
    }


  getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

   getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // Максимум и минимум включаются
  }

    seconds(time,clock){
      let n = Math.floor(clock.seek(time).now / 1000) % 60;
        if(n > 60){
            clock.now = 0;
        }
        return n;
    }

    createArray(n = 4){
      let a = []
      for (let i = 0; i < n; i++){
          a[i] = i;
      }
      return a
    }

    getOption(arr,name){
    return arr.options?.filter((opt)=>opt.name === name)[0]?.num;
    }

    getProperties(arr,name){
      if(arr.properties){
          return arr.properties.filter((prop)=>prop.name === name)[0].value;
      }else {
          return "";
      }
    }

}
