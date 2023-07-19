const URL = "http://localhost:8080/";

Vue.createApp({
  data() {
    return {
      minutes: 0,
      seconds: 0,
      bombs: 20,
      minutes: 0,
      seconds: 0,
      timer: false,
      Beginner: {
        col: 10,
        row: 10,
        mines: 10,
      },
      Intermediate: {
        col: 16,
        row: 16,
        mines: 40,
      },
      Hard: {
        col: 30,
        row: 16,
        mines: 99,
      },
      activeDifficulty: [this.Beginner],
      hotbarOn: false,
      socket: null,
      gameOver: false,
      mines: [],
      tiles: [],
    };
  },







  methods: {
    setTimer() {
        this.timer = true;
        setInterval(() => {
            if (this.seconds < 59) {
                this.seconds++;
            } else {
                this.seconds = 0;
                this.minutes++;
            }
        }, 1100);
    },

    startTimer() {
        if (this.timer == false) {
            this.setTimer()
        }
    },

    placeFlag() {
        var board = document.querySelector("#board");
        board.innerHTML = "";
    }, 

    changeDifficultytoBeginner() {
      this.activeDifficulty.shift();
      this.activeDifficulty.push(this.Beginner);
      console.log("Difficulty is Beginner");
    },

    changeDifficultytoIntermediate() {
      this.activeDifficulty.shift();
      this.activeDifficulty.push(this.Intermediate);
      console.log("Difficulty is Intermediate");
    },

    changeDifficultytoHard() {
      this.activeDifficulty.shift();
      this.activeDifficulty.push(this.Hard);
      console.log("Difficulty is Hard");
    },

    tile_click: function (row, difficulty) {
      if (this.gameOver == false) {
        var diff = difficulty;
        if (row.mine == false) {
          if (row.class != "clicked") {
            row.class = "clicked";
            console.log(row);
            // Start with the Cross with out of bounds check
            //
            // Right of the cross
            if (row.col + 1 <= diff.col - 1) {
              if (this.tiles[row.col + 1][row.row].mine == true) {
                if (row.number == "") {
                  row.number = 1;
                } else {
                  row.number += 1;
                }
              }
            }
            // Bottom of the cross
            if (row.row + 1 <= diff.row - 1) {
              if (this.tiles[row.col][row.row + 1].mine == true) {
                if (row.number == "") {
                  row.number = 1;
                } else {
                  row.number += 1;
                }
              }
            }
            // Left of the cross
            if (row.col - 1 >= 0) {
              if (this.tiles[row.col - 1][row.row].mine == true) {
                if (row.number == "") {
                  row.number = 1;
                } else {
                  row.number += 1;
                }
              }
            }
            // Top of the cross
            if (row.row - 1 >= 0) {
              if (this.tiles[row.col][row.row - 1].mine == true) {
                if (row.number == "") {
                  row.number = 1;
                } else {
                  row.number += 1;
                }
              }
            }
            //Do the corners next
            //
            // Bottom Right
            if (row.col + 1 <= diff.col - 1 && row.row + 1 <= diff.row - 1) {
              if (this.tiles[row.col + 1][row.row + 1].mine == true) {
                if (row.number == "") {
                  row.number = 1;
                } else {
                  row.number += 1;
                }
              }
            }
            // Bottom Left
            if (row.col - 1 >= 0 && row.row + 1 <= diff.row - 1) {
              if (this.tiles[row.col - 1][row.row + 1].mine == true) {
                if (row.number == "") {
                  row.number = 1;
                } else {
                  row.number += 1;
                }
              }
            }
            // Top Left
            if (row.col - 1 >= 0 && row.row - 1 >= 0) {
              if (this.tiles[row.col - 1][row.row - 1].mine == true) {
                if (row.number == "") {
                  row.number = 1;
                } else {
                  row.number += 1;
                }
              }
            }
            // Top Right
            if (row.col + 1 <= diff.col - 1 && row.row - 1 >= 0) {
              if (this.tiles[row.col + 1][row.row - 1].mine == true) {
                if (row.number == "") {
                  row.number = 1;
                } else {
                  row.number += 1;
                }
              }
            }
            if (row.number == "") {
              if (row.col == diff.col - 1 && row.row == diff.row - 1) {
                this.tile_click(this.tiles[row.col - 1][row.row], diff);
                this.tile_click(this.tiles[row.col - 1][row.row - 1], diff);
                this.tile_click(this.tiles[row.col][row.row - 1], diff);
              }
              if (row.col == diff.col - 1 && row.row == 0) {
                this.tile_click(this.tiles[row.col - 1][row.row], diff);
                this.tile_click(this.tiles[row.col - 1][row.row + 1], diff);
                this.tile_click(this.tiles[row.col][row.row + 1], diff);
              }
              if (row.col == 0 && row.row == 0) {
                this.tile_click(this.tiles[row.col + 1][row.row], diff);
                this.tile_click(this.tiles[row.col + 1][row.row + 1], diff);
                this.tile_click(this.tiles[row.col][row.row + 1], diff);
              }
              if (row.col == 0 && row.row == diff.row - 1) {
                this.tile_click(this.tiles[row.col + 1][row.row], diff);
                this.tile_click(this.tiles[row.col][row.row - 1], diff);
                this.tile_click(this.tiles[row.col + 1][row.row - 1], diff);
              }
              if (row.col == 0 && 0 < row.row && row.row < diff.row - 1) {
                this.tile_click(this.tiles[row.col][row.row + 1], diff);
                this.tile_click(this.tiles[row.col][row.row - 1], diff);
                this.tile_click(this.tiles[row.col + 1][row.row - 1], diff);
                this.tile_click(this.tiles[row.col + 1][row.row], diff);
                this.tile_click(this.tiles[row.col + 1][row.row + 1], diff);
              }
              if (0 < row.col && row.col < diff.col - 1 && row.row == 0) {
                this.tile_click(this.tiles[row.col - 1][row.row], diff);
                this.tile_click(this.tiles[row.col + 1][row.row], diff);
                this.tile_click(this.tiles[row.col - 1][row.row + 1], diff);
                this.tile_click(this.tiles[row.col][row.row + 1], diff);
                this.tile_click(this.tiles[row.col + 1][row.row + 1], diff);
              }
              if (
                row.col == diff.col - 1 &&
                0 < row.row &&
                row.row < diff.row - 1
              ) {
                this.tile_click(this.tiles[row.col][row.row + 1], diff);
                this.tile_click(this.tiles[row.col][row.row - 1], diff);
                this.tile_click(this.tiles[row.col - 1][row.row - 1], diff);
                this.tile_click(this.tiles[row.col - 1][row.row], diff);
                this.tile_click(this.tiles[row.col - 1][row.row + 1], diff);
              }
              if (
                0 < row.col &&
                row.col < diff.col - 1 &&
                row.row == diff.row - 1
              ) {
                this.tile_click(this.tiles[row.col - 1][row.row], diff);
                this.tile_click(this.tiles[row.col + 1][row.row], diff);
                this.tile_click(this.tiles[row.col - 1][row.row - 1], diff);
                this.tile_click(this.tiles[row.col][row.row - 1], diff);
                this.tile_click(this.tiles[row.col + 1][row.row - 1], diff);
              }
              if (
                0 < row.col &&
                row.col < diff.col - 1 &&
                0 < row.row &&
                row.row < diff.row - 1
              ) {
                this.tile_click(this.tiles[row.col + 1][row.row + 1], diff);
                this.tile_click(this.tiles[row.col][row.row + 1], diff);
                this.tile_click(this.tiles[row.col - 1][row.row + 1], diff);
                this.tile_click(this.tiles[row.col - 1][row.row], diff);
                this.tile_click(this.tiles[row.col - 1][row.row - 1], diff);
                this.tile_click(this.tiles[row.col][row.row - 1], diff);
                this.tile_click(this.tiles[row.col + 1][row.row - 1], diff);
                this.tile_click(this.tiles[row.col + 1][row.row], diff);
              }
            }
          }
        } else {
          this.gameOver = true;
          this.gameOverExec(this.Beginner);
          row.class = "mine";
        }
      }
    },

    generateMines: function (row, difficulty) {
      var diff = difficulty;
      if (this.mines.length == 0) {
        for (let i = 0; i < diff.mines; i++) {
          var rand_col = Math.ceil(Math.random() * diff.col - 1);
          var rand_row = Math.ceil(Math.random() * diff.row - 1);
          while (
            this.tiles[rand_col][rand_row].mine == true ||
            rand_col == row.col ||
            rand_row == row.row
          ) {
            rand_col = Math.ceil(Math.random() * diff.col - 1);
            rand_row = Math.ceil(Math.random() * diff.row - 1);
          }
          this.tiles[rand_col][rand_row].mine = true;
          this.tiles[rand_col][rand_row].col = rand_col;
          this.tiles[rand_col][rand_row].row = rand_row;
          this.mines.push(this.tiles[rand_col][rand_row]);
        }
      }
    },

    generateBoard: function (difficulty) {
      var diff = difficulty;
      var rowNum = 0;
      var colNum = 0;
      for (let i = 0; i < diff.col; i++) {
        const column = [];
        for (let j = 0; j < diff.row; j++) {
          tile = {
            mine: false,
            class: "tile",
            number: "",
            col: colNum,
            row: rowNum,
          };
          rowNum += 1;
          column.push(tile);
        }
        colNum += 1;
        rowNum = 0;
        this.tiles.push(column);
      }
      console.log(this.tiles);
    },

    gameOverExec: function () {
      for (i = 0; i < this.mines.length; i++) {
        this.tiles[this.mines[i].col][this.mines[i].row].class = "mine";
      }
    },

    toggle_hotbar: function () {
      this.hotbarOn = !this.hotbarOn;
    },
    hotbarOff: function () {
      this.hotbarOn = false;
    },
    connect: function () {
      const protocol = window.location.protocol.includes("https")
        ? "wss"
        : "ws";
      this.socket = new WebSocket(`${protocol}://localhost:8080`);
      this.socket.onopen = function () {
        console.log("Connected to websocket");
      };
      this.socket.onmessage = function (event) {
        console.log("Test:", event.data);
      };
    },
    HTTPtest: function () {
      fetch("/messages", {
        method: "post",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          message: this.HTTPmessage,
        }),
      })
        .then((response) => {
          console.log("HTTP message was sent through websocket");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    SocketTest: function () {
      this.socket.send(this.Socketmessage);
    },
    getMessageWS: function () {
      this.socket.onmessage = function (event) {
        console.log(event.data);
      };
    },
},




  computed: {
    formatTimer() {
        const formattedMinutes = this.minutes.toString();
        const formattedSeconds = this.seconds.toString().padStart(2, '0');
        return `${formattedMinutes}:${formattedSeconds}`;
    },
},





  created: function () {
    window.addEventListener("keydown", (e) => {
        if (e.key == "Escape") {
          this.hotbarOn = false;
        }
      });
      this.connect();
      this.generateBoard(this.Beginner.col, this.Beginner.row);
      console.log(this.mines);
    },
}).mount("#app");
