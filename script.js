document.addEventListener('DOMContentLoaded', () => {

    let currentTarget = 1;
    let numberIndex =0;
    let currentTargetIndex = 0;
    let isPlaying = false;
    let startTime = 0;
    let timerInterval = null;

    const MAX_NUMBER = 36;
    const tables = [
        document.getElementById('table-1'),
        document.getElementById('table-2'),
        document.getElementById('table-3'),
        document.getElementById('table-4')
    ];
    const centerTarget = document.getElementById('center-target');
    const startBtn = document.getElementById('start-btn');
    const timerDisplay = document.getElementById('timer');

    // タイマー開始
    function startTimer() {
        startTime = Date.now();
        timerDisplay.textContent = '0.0';
        timerInterval = setInterval(() => {
            const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(1);
            timerDisplay.textContent = `${elapsedTime}`;
        }, 100);

        startBtn.textContent = 'RESTART';
    }

  // タイマー停止
    function stopTimer() {
        if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
        }

        startBtn.textContent = 'START';
    }

  // ゲームの初期化・スタート処理
    function initGame() {
        stopTimer();
        currentTarget = 1;
        currentTargetIndex = 0;
        numberIndex = 0;

        // 1~36の配列
        // const numbers = Array.from({ length: MAX_NUMBER }, (_, i) => i+1);
        // for (ret i=numbers.length -1; i > 0; i--){
        //     const j = Math.floor(Math.random() * (i+1));
        //     [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
        // }
        const numbers = [];
        for (let i = 1; i <= MAX_NUMBER; i++){
            numbers.push(i);
        }
        
        //配列をシャッフル
        for (let i=numbers.length -1; i>0;i--){
            const j = Math.floor(Math.random() * (i+1));

            const temp = numbers[i];
            numbers[i] = numbers[j];
            numbers[j] = temp;
        }

        // テーブルのクリア
        tables.forEach(table => table.innerHTML = '');

        // 各テーブルにマスを生成
        tables.forEach(table => {
            for (let i=0; i<9; i++){
                const cell = document.createElement('div');
                cell.classList.add('cell');

                const num = numbers[numberIndex];
                cell.dataset.number = num;
                cell.textContent = num;

                cell.addEventListener('click', () => {
                    //if (cell.classList.add('clicked')) return;
                    if(isPlaying){
                        const clickedNum = parseInt(cell.dataset.number, 10);
                        if (clickedNum === currentTarget) {
                            currentTarget ++;

                            //正解時の処理
                            cell.style.backgroundColor = 'gray';
                            setTimeout(() => {
                                cell.style.backgroundColor = '';
                            }, 100);
                            
                        }else{
                            //不正解時の処理
                            cell.style.backgroundColor = 'red';
                            setTimeout(() => {
                                cell.style.backgroundColor = '';
                            }, 100);
                        }
                        //クリア時の処理
                        if(currentTarget > MAX_NUMBER){
                            stopTimer();
                            isPlaying = false;
                            centerTarget.textContent = 'Clear!';
                            const clearTime = timerDisplay.textContent;
                            alert(`全クリア！ 記録: ${clearTime}`);
                        } else {
                            centerTarget.textContent = currentTarget;
                        }
                    }
                });

                cell.addEventListener('dblclick', (e) => {
                    e.preventDefault(); // ダブルクリックの標準動作を打ち消す
                });

                table.appendChild(cell);
                numberIndex++;
            }
        });

    }

    // STARTボタンをクリックした時
    startBtn.addEventListener('click', () => {
        
        isPlaying = true;
        
        // タイマー計測開始
        
        initGame();
        startTimer();
    });

});