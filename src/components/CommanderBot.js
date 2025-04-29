import Bot from "./Bot";

export default class CommanderBot extends Bot{
    constructor(x, y, name, head = 'Gun_01', corpus = 'Hull_01', live = 10, shield = 10, attack = 5, speedAttack = 10, radiusSensor = 20, speed = 10) {
        super(x, y, name, head, corpus, live, shield, attack, speedAttack, radiusSensor, speed);
    }

    createBoss(){

    }
}