"use strict";

const Warrior = function (name, health, damage) {
  this.name = name;
  this.health = health;
  this.damage = damage;
};

const Soldier = new Warrior("Soldier", 52, 7);

// special: granade, dealing 20 damage, only one use

const Dragon = new Warrior("Dragon", 60, 4);

// special: = deal enemy damage * 2, only one use

const KingKong = new Warrior("KingKong", 25, 13);

// special: full regeneneration of health, only one use

const Titan = new Warrior("Titan", 45, 10);

// special: no special attack

const Ghost = new Warrior("Ghost", 40, 11);

// special: enemy player can't use special attack against him

const Devil = new Warrior("Devil", 40, 6);

// special: fire, dealing random damage from 1 to 30, only one use

const Spider = new Warrior("Spider", 55, 4);

// special: poison, half the enemy current health

const Machine = new Warrior("Machine", 55, 5);

// special: having armor that half the enemy damage , every time he is attacked

let player1;
let player2;
let player1Health = 100;
let player2Health = 100;
let playing = true;
let specialPlayerOne = true;
let specialPlayerTwo = true;

const playGameButton = document.querySelector(".main__button");
const attackPlayer1Button = document.querySelector(".button__player1attack");
const attackPlayer2Button = document.querySelector(".button__player2attack");
const specialPlayer1Button = document.querySelector(".player1__special");
const specialPlayer2Button = document.querySelector(".player2__special");
const soldierPlayer1Button = document.querySelector(".button__soldier");
const dragonPlayer1Button = document.querySelector(".button__dragon");
const kingKongPlayer1Button = document.querySelector(".button__kingKong");
const titanPlayer1Button = document.querySelector(".button__titan");
const ghostPlayer2Button = document.querySelector(".button__ghost");
const devilPlayer2Button = document.querySelector(".button__devil");
const spiderPlayer2Button = document.querySelector(".button__spider");
const machinePlayer2Button = document.querySelector(".button__machine");

// COMMON FUNCTION

const pickingPlayerOneCharacter = function (name) {
  document.querySelector(".choosePlayer1").classList.add("hidden");
  document.querySelector(".choosePlayer2").classList.remove("hidden");
  player1 = name;
  player1Health = name.health;
  document.querySelector(
    ".player1__remainingHealth"
  ).textContent = player1Health;
  document.querySelector(".player1__damage").textContent = player1.damage;
  document.querySelector(
    ".picture1"
  ).innerHTML = `<img src="./Images/${player1.name.toLowerCase()}.jpg" alt="${player1.name.toLowerCase()}" style="position: absolute; left: 450px; top: 700px;"></img>;`;
};

const pickingPlayerTwoCharacter = function (name) {
  document.querySelector(".choosePlayer2").classList.add("hidden");
  document.querySelector(".player2Data").classList.remove("hidden");
  document.querySelector(".player1").classList.remove("hidden");
  attackPlayer2Button.classList.add("hidden");
  specialPlayer2Button.classList.add("hidden");
  player2 = name;
  player2Health = name.health;
  document.querySelector(
    ".player2__remainingHealth"
  ).textContent = player2Health;
  document.querySelector(".player2__damage").textContent = player2.damage;
  document.querySelector(".player2__damage").classList.add("hidden");
  document.querySelector(
    ".picture2"
  ).innerHTML = `<img src="./Images/${player2.name.toLowerCase()}.jpg" alt="${player2.name.toLowerCase()}" style="position: absolute; right: 450px; top: 700px;"></img>;`;
};

const attackingPlayerOne = function () {
  document.querySelector(".player2__remainingHealth").textContent = 0;
  document.querySelector(".main__won").innerHTML = `!Player1 won the Game!`;
  document.querySelector(".picture2").classList.add("hidden");
  document.querySelector(".player2Data").classList.add("hidden");
};

const attackingPlayerTwo = function () {
  document.querySelector(".player1__remainingHealth").textContent = 0;
  document.querySelector(".main__won").innerHTML = `!Player2 won the Game!`;
  document.querySelector(".picture1").classList.add("hidden");
  document.querySelector(".player1").classList.add("hidden");
};

// ovde treba da se stavi toggle da se menjaju attack button player1 i 2, ali ovo radi

const hiddingAttack = function () {
  attackPlayer1Button.classList.toggle("hidden");
  console.log(specialPlayerOne);
  console.log(specialPlayerTwo);
  specialPlayerOne
    ? specialPlayer1Button.classList.toggle("hidden")
    : specialPlayer1Button.classList.add("hidden");
  attackPlayer2Button.classList.toggle("hidden");
  specialPlayerTwo
    ? specialPlayer2Button.classList.toggle("hidden")
    : specialPlayer2Button.classList.add("hidden");
  document.querySelector(".player1__damage").classList.toggle("hidden");
  document.querySelector(".player2__damage").classList.toggle("hidden");
};

// PLAY GAME BUTTON

playGameButton.addEventListener("click", function () {
  document.querySelector(".choosePlayer1").classList.remove("hidden");
  playGameButton.classList.add("hidden");
  document.querySelector(".main__name").classList.add("hidden");
  document.querySelector(".main__button").classList.add("hidden");
});

// PICKING CHARACTER PLAYER 1

// Soldier

soldierPlayer1Button.addEventListener("click", function () {
  pickingPlayerOneCharacter(Soldier);
});

// Dragon

dragonPlayer1Button.addEventListener("click", function () {
  pickingPlayerOneCharacter(Dragon);
});

// KingKong

kingKongPlayer1Button.addEventListener("click", function () {
  pickingPlayerOneCharacter(KingKong);
});

// Titan

titanPlayer1Button.addEventListener("click", function () {
  pickingPlayerOneCharacter(Titan);
  specialPlayer1Button.classList.add("hidden");
  specialPlayerOne = false;
});

// PICKING CHARACTER PLAYER 2

// Machine

machinePlayer2Button.addEventListener("click", function () {
  pickingPlayerTwoCharacter(Machine);
  player1.damage /= 2;
  specialPlayer2Button.classList.add("hidden");
  specialPlayerTwo = false;
});

// Spider

spiderPlayer2Button.addEventListener("click", function () {
  pickingPlayerTwoCharacter(Spider);
});

// Devil

devilPlayer2Button.addEventListener("click", function () {
  pickingPlayerTwoCharacter(Devil);
});

// Ghost

ghostPlayer2Button.addEventListener("click", function () {
  pickingPlayerTwoCharacter(Ghost);
  specialPlayer1Button.classList.add("hidden");
  specialPlayer2Button.classList.add("hidden");
  specialPlayerOne = false;
  specialPlayerTwo = false;
});

// attackPlayer1Button

attackPlayer1Button.addEventListener("click", function () {
  if (player2Health >= 0) {
    player2Health -= player1.damage;
    document.querySelector(
      ".player2__remainingHealth"
    ).textContent = player2Health;
    hiddingAttack();
    if (player2Health <= 0) {
      attackingPlayerOne();
    }
  }
});

// attackPlayer2Button

attackPlayer2Button.addEventListener("click", function () {
  if (player1Health >= 0) {
    player1Health -= player2.damage;
    document.querySelector(
      ".player1__remainingHealth"
    ).textContent = player1Health;
    hiddingAttack();
    if (player1Health <= 0) {
      attackingPlayerTwo();
    }
  }
});

// specialPlayer1Button

specialPlayer1Button.addEventListener("click", function () {
  // Soldier
  if (player1 === Soldier) {
    hiddingAttack();
    specialPlayerOne = false;
    if (player2Health >= 0) {
      player2Health -= 20;
      document.querySelector(
        ".player2__remainingHealth"
      ).textContent = player2Health;
      if (player2Health <= 0) {
        attackingPlayerOne();
      }
    }
  }
  // Dragon
  if (player1 === Dragon) {
    if (player2Health >= 0) {
      hiddingAttack();
      specialPlayerOne = false;
      player2Health -= player2.damage * 2;
      document.querySelector(
        ".player2__remainingHealth"
      ).textContent = player2Health;
      if (player2Health <= 0) {
        attackingPlayerOne();
      }
    }
  }
  // KingKong
  if (player1 === KingKong) {
    hiddingAttack();
    specialPlayerOne = false;
    player1Health = 25;
    document.querySelector(".player1__remainingHealth").textContent = 25;
  }
});

// specialPlayer2Button

specialPlayer2Button.addEventListener("click", function () {
  //Devil
  if (player2 === Devil) {
    hiddingAttack();
    specialPlayerTwo = false;
    let randomDamage = Math.trunc(Math.random() * 30 + 1);
    console.log(randomDamage);
    if (player1Health >= 0) {
      player1Health -= randomDamage;
      document.querySelector(
        ".player1__remainingHealth"
      ).textContent = player1Health;
      if (player1Health <= 0) {
        attackingPlayerTwo();
      }
    }
  }
  //Spider
  if (player2 === Spider) {
    hiddingAttack();
    specialPlayerTwo = false;
    player1Health /= 2;
    document.querySelector(
      ".player1__remainingHealth"
    ).textContent = player1Health;
  }
});
