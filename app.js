const minimumHealth = 5;

function getRandom(min, max) {
    return parseInt(Math.random() * (max - min) + min);
}

const app = Vue.createApp({
    data() {
        return {
            monsterHealth: 100,
            playerHealth: 100,
            currentRound: 0,
            winner: null,
            battleLog: []
        }
    },
    watch: {
        monsterHealth() {
            if (this.monsterHealth <= minimumHealth && this.playerHealth <= minimumHealth)
                this.winner = 'draw';
            else if (this.monsterHealth <= minimumHealth)
                this.winner = 'player';
        },
        playerHealth() {
            if (this.monsterHealth <= minimumHealth && this.playerHealth <= minimumHealth)
                this.winner = 'draw';
            else if (this.playerHealth <= minimumHealth)
                this.winner = 'monster';
        }
    },
    computed: {
        canPerformSpecialAttack() {
            return this.currentRound % 3 === 0;
        },
        monsterHealthStyles() {
            return {width: Math.max(0, this.monsterHealth) + '%'};
        },
        playerHealthStyles() {
            return {width: Math.max(0, this.playerHealth) + '%'};
        }
    },
    methods: {
        attackMonster() {
            const attackValue = getRandom(5, 12);
            this.monsterHealth -= attackValue;
            this.addNewLog('player', 'monster', attackValue);
            this.attackPlayer();
            this.currentRound++;
        },
        attackPlayer() {
            const attackValue = getRandom(8, 15);
            this.playerHealth -= attackValue;
            this.addNewLog('monster', 'player', attackValue);
        },
        specialAttack() {
            const attackValue = getRandom(10, 25);
            this.monsterHealth -= attackValue;
            this.addNewLog('player', 'monster', attackValue);
            this.attackPlayer();
            this.currentRound++;
        },
        healPlayer() {
            const healValue = getRandom(8, 20);
            this.playerHealth = Math.min(100, this.playerHealth + healValue);
            this.addNewLog('player', 'heal', healValue);
            this.attackPlayer();
            this.currentRound++;
        },
        surrender() {
            this.playerHealth = 0;
        },
        startNewGame() {
            this.monsterHealth = 100;
            this.playerHealth = 100;
            this.currentRound = 0;
            this.winner = null;
            this.battleLog = [];
        },
        addNewLog(attacker, target, damage) {
            this.battleLog.unshift({
                attacker: attacker,
                target: target,
                damage: damage
            })
        },
        logStyle(log, type) {
            switch (type) {
                case 'monster':
                    return {color: "red"};
                case 'player':
                    return {color: "blue"};
                default:
                    return {color: "green"};
            }
        }
    }
});

app.mount("#v-main");