new Vue({
  el: '#app',
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false,
    turns: [],
  },
  methods: {
    startGame: function() {
      this.gameIsRunning = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.turns = [];
    },
    attack: function() {
      // Setting the damage variable for the attack
      var damage = this.calculateDamage(3, 10);
      // Editing the monster health after an attack
      this.monsterHealth -= damage;
      this.turns.unshift({
        isPlayer: true,
        text: 'Player hits Monster for ' + damage,
      });
      // Checking to see if the game is over yet and who has won
      if (this.checkWin()) {
        return;
      }
      // Making the monster attack as well when we attack
      this.monsterAttacks();
    },
    specialAttack: function() {
      // Setting the damage variable to calculate the damage
      var damage = this.calculateDamage(10, 20);
      // Editing the monster Health after a special attack
      this.monsterHealth -= damage;
      // Setting whos turn it is afer a move has been made
      this.turns.unshift({
        isPlayer: true,
        text: 'Player hits Monster hard for ' + damage,
      });
      // Checking to see if the game is over with and who has won
      if (this.checkWin()) {
        return;
      }
      this.monsterAttacks();
    },
    heal: function() {
      // Checking to see where the player health is at when healing to make sure there is no overflow
      if (this.playerHealth <= 90) {
        this.playerHealth += 10;
      } else {
        this.playerHealth = 100;
      }
      // Setting whos turn it is afer a move has been made
      this.turns.unshift({
        isPlayer: true,
        text: 'Player heals for 10',
      });
      this.monsterAttacks();
    },
    giveUp: function() {
      this.gameIsRunning = false;
    },
    monsterAttacks: function() {
      // Setting the damage variable to calculate the damage
      var damage = this.calculateDamage(5, 12);
      // Setting the player health after a monster attack
      this.playerHealth -= damage;
      this.checkWin();
      // Setting whos turn it is afer a move has been made
      this.turns.unshift({
        isPlayer: false,
        text: 'Monster hits Player for ' + damage,
      });
    },
    calculateDamage: function(min, max) {
      return Math.max(Math.floor(Math.random() * max) + 1, min);
    },
    checkWin: function() {
      if (this.monsterHealth <= 0) {
        if (confirm('You won! New Game?')) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      } else if (this.playerHealth <= 0) {
        if (confirm('You lost! New Game?')) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      }
      return false;
    },
  },
});
