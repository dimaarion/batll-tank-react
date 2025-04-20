import Body from "./Body";

export default class Arta extends Body{
    constructor(x, y, name, head = 'Gun_art', corpus = 'Hull_art', live = 10, shield = 10, attack = 5, speedAttack = 10, radiusSensor = 20, speed = 10) {
        super(x, y, name, head, corpus, live, shield, attack, speedAttack, radiusSensor, speed);

        this.bot = 1;
        this.namePule = "pule_bot";
        this.icon = "HP-bot";
    }


}