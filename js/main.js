// 【設定項目】
// 制限時間
let timeLimit = 60;
// 穴の数
let halls = 9;

// 【登場人物】
// スタートボタン
const startBtn = document.querySelector('#startBtn');
// 穴エリア
const hallArea = document.querySelector('#hallArea');
// もぐら
const mogura = document.querySelector('.mogura')
// もう一回ボタン
const againBtn = document.querySelector('#againBtn');
// 時間表示エリア
const timeDisplay = document.querySelector('#timeDisplay');
// ポイント
let point = 0;
// モグラの動き関数
let moguraMove;
// ゲーム開始時間
let startTime;
// タイマーを止めるためのパーツ
let timeoutId;




// 【ゲームスタート関数】
const gameStart = () => {
    // スタート時間を記録
    startTime = Date.now();
    // タイマー発動
    timer();
    // もぐら出現関数発動
    moguraMove();
    
    // 制限時間が0になったら
    // タイマーをとめて
    
}
// ストップ（開発中のみ）
document.querySelector('#stop').addEventListener('click',function(){
    clearTimeout(timeoutId);
})


// 時間表示エリアに時間を表示
timeDisplay.textContent = `あと${timeLimit.toFixed(2)}秒`;

// スタートボタンを押すとゲームスタート関数発動
startBtn.addEventListener('click',function(){
    gameStart();
})

// 【もぐら出現関数】
moguraMove = () => {
    // どの穴に出現するか決める
    // もぐら出現
    document.querySelector('.mogura').classList.remove('invisible');
    // 出現しつづける時間（stayTime）を設定
    stayTime = Math.floor(Math.random() * 5000);
    // 一定時間（stayTime）経過したら消える
    setTimeout(() => {
        document.querySelector('.mogura').classList.add('invisible');
    }, stayTime);
    // 次を呼ぶ時間を設定（ネクストコールタイム）
    let nextCallTime = Math.floor(Math.random()*2000);
    // ネクストコールタイムが経過したらもぐら出現関数をもう一度呼び出す
    const timeoutMove = () => {
        setTimeout(() => {
            moguraMove();
        }, nextCallTime);
    } 
    mogura.addEventListener("transitionend", timeoutMove);
    
    // もぐらをクリックしたら叩かれた画像に変わる
    mogura.addEventListener('click',function(){
        point++;
        document.querySelector('#point').textContent = `現在　${point}　点`
        mogura.src = './images/mogura_ng.png';
        setTimeout(() => {
            mogura.src = './images/mogura.png';        
        }, 1000);
    })
};




// もし穴をクリックしたときにもぐらが出ていたら（isもぐらがtrueだったら）ポイントを1プラス




// 【タイマー関数】
timer = () => {
    let time = (timeLimit - (Date.now() - startTime) /1000).toFixed(2);
    timeDisplay.textContent = `あと${time}秒`;
    timeoutId = setTimeout(() => {
        timer();
    }, 10);
}

// 【もぐら出てくる関数】