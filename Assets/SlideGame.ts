


// class SlidingPuzzle {
//     constructor(boardElement) {
//             this.board = boardElement;
//             this.state = [];
//             this.stepCount = 0;
//             this.rows = 2;
//             this.cols = 3;
//             this.init();
//           }

//     init() {
//       this.state = this.generateSolvablePuzzle();
//       this.render();
//       this.updateStepDisplay();
//     }

//     generateSolvablePuzzle() {
//       let numbers = Array.from({ length: this.rows * this.cols }, (_, i) => (i === 0 ? null : i));
      
//       // 打乱数组
//       for (let i = numbers.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
//       }

//       // 确保可解（偶数逆序对）
//       while (!this.isSolvable(numbers.filter(n => n !== null))) {
//         for (let i = numbers.length - 1; i > 0; i--) {
//           const j = Math.floor(Math.random() * (i + 1));
//           [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
//         }
//       }

//       return numbers;
//     }

//     isSolvable(tiles) {
//       let inversions = 0;
//       for (let i = 0; i < tiles.length; i++) {
//         for (let j = i + 1; j < tiles.length; j++) {
//           if (tiles[i] > tiles[j]) inversions++;
//         }
//       }
//       return inversions % 2 === 0;
//     }

//     render() {
//       this.board.innerHTML = '';
//       this.state.forEach((num, index) => {
//         const tile = document.createElement('div');
//         tile.className = 'tile flex items-center justify-center text-2xl font-extrabold rounded-lg';
//         tile.dataset.index = index.toString();

//         if (num === null) {
//           tile.classList.add('empty');
//           tile.textContent = '';
//         } else {
//           tile.classList.add('numbered');
//           tile.textContent = num.toString();
//           tile.addEventListener('click', () => this.handleTileClick(index));
//         }

//         this.board.appendChild(tile);
//       });
//     }

//     handleTileClick(clickedIndex) {
//       const emptyIndex = this.state.indexOf(null);
//       if (this.canMove(clickedIndex, emptyIndex)) {
//         [this.state[clickedIndex], this.state[emptyIndex]] = [this.state[emptyIndex], this.state[clickedIndex]];
//         this.stepCount++;
//         this.render();
//         this.updateStepDisplay();
//         this.checkWin();
//       }
//     }

//     canMove(fromIndex, emptyIndex) {
//       const rowFrom = Math.floor(fromIndex / this.cols);
//       const colFrom = fromIndex % this.cols;
//       const rowEmpty = Math.floor(emptyIndex / this.cols);
//       const colEmpty = emptyIndex % this.cols;

//       return (
//         (rowFrom === rowEmpty && Math.abs(colFrom - colEmpty) === 1) ||
//         (colFrom === colEmpty && Math.abs(rowFrom - rowEmpty) === 1)
//       );
//     }

//     updateStepDisplay() {
//       const stepElement = document.getElementById('step-count');
//       if (stepElement) stepElement.textContent = this.stepCount.toString();
//     }

//     checkWin() {
//       // 检查是否完成拼图
//       const solved = Array.from({ length: this.rows * this.cols }, (_, i) => (i === 0 ? null : i));
//       if (JSON.stringify(this.state) === JSON.stringify(solved)) {
//         setTimeout(() => {
//           // 添加获胜动画效果
//           document.querySelectorAll('.numbered').forEach(el => {
//             el.classList.add('win-animation');
//           });
          
//           // 显示获胜消息
//           const winMessage = document.getElementById('win-message');
//           if (winMessage) {
//             winMessage.classList.remove('hidden');
//           }
//         }, 300);
//       }
//     }

//     reset() {
//       this.stepCount = 0;
//       const winMessage = document.getElementById('win-message');
//       if (winMessage) {
//         winMessage.classList.add('hidden');
//       }
//       this.state = this.generateSolvablePuzzle();
//       this.render();
//       this.updateStepDisplay();
//       document.querySelectorAll('.numbered').forEach(el => {
//         el.classList.remove('win-animation');
//       });
//     }
//   }

//   // 页面加载完成后初始化游戏
//   document.addEventListener('DOMContentLoaded', () => {
//     const boardElement = document.getElementById('board');
//     if (boardElement) {
//       const game = new SlidingPuzzle(boardElement);

//       // 绑定重置按钮
//       const resetBtn = document.getElementById('reset-btn');
//       if (resetBtn) {
//         resetBtn.addEventListener('click', () => game.reset());
//       }
//     }
//   });