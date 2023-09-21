// 開始時間
let startTime;
//経過秒数様タイマーID
let timer;
// カードめくり用　タイマーID(動作中はカードがめくれないように)
let backTimer;
// 1枚目かどうかのフラグ(1枚目: true 2枚目: false)
let flgFirst = true;
// 1枚目のカードを収納
let cardFirst;
// 揃えた枚数(ペアができるたびに+1 10で終了)
let countUnit = 0;

let img_arr = [
   "1", "2", "3", "4", "5", "6", "7", "8", "9","10"
];

let img_tag_arr = [];
for (let i = 0; i<10; i++ ) {
  img_tag_arr.push("<img src='" + img_arr[i] + ".png'>")
}

window.onload = function () {
  let arr = [];
  for (let i = 0; i < 10; i++) {
    arr.push(i);
    arr.push(i);
  } //[0,0,1,1,2,2,........8,8,9,9]　合計20要素


shuffle(arr); // シャッフル[1,7,3,4,4,5...]
let game_board = document.getElementById('game_board');

// div要素作成(カード)
for (i = 0; i < 20; i++) {
  let div = document.createElement('div');
  div.className = 'card back'; // カードの裏側を表示
  div.number = arr[i]; //プロパティを設定
  //console.log(Object.keys(div));
  //console.log(Object.values(div));
  div.onclick = turn;
  game_board.appendChild(div);
}

startTime = new Date(); //　開始時刻を取得
startTimer(); // タイマー開始

}

//　シャッフル用関数
function shuffle(arr) {
  let n = arr.length;
  while (n) { //nが0になったら終了    ここで毎回-1
    i = Math.floor(Math.random() * n--);
    [arr[n], arr[i]] = [arr[i], arr[n]]
  }
  return arr;
}

// カードクリック時の処理
function turn(e) {
  let div = e.target; //クリックしたカード
  // カードタイマー処理が動作中はreturn
  if (backTimer) return; //連続で押せない様に
  // 裏向きのカードをクリックした場合は画像を表示する
  if (div.innerHTML == '') {
    div.className = 'card'; //backというクラス名を取り除いた
    div.innerHTML = img_tag_arr[div.number];
  } else {
      return // 数字が表示されているカードはリターン
  }

  if(flgFirst) { //1枚目の処理 1枚目ならtrue
      cardFirst = div;
      flgFirst = false;
  } else { //2枚目の処理
    if(cardFirst.number == div.number) {
      countUnit++; //揃った数
      backTimer = setTimeout(function () {
        div.className = 'card finish'; //0.5秒で透明
        cardFirst.className = 'card finish';
        backTimer = NaN;
        if (countUnit == 10) { //全てのカードが揃ったら
          clearInterval(timer); //timer終了
          //setInterval(showSecond, 1000)
        }
      }, 500)
    } else {
      backTimer = setTimeout(function () {
        div.className = 'card back';
        div.innerHTML = ''; //カードを裏側に戻す
        cardFirst.className = 'card back';
        cardFirst.innerHTML = '';
        cardFirst = null;
        backTimer = NaN;
      }, 500)
    }
    flgFirst = true;
  }
  
}

//タイマー開始
function startTimer() {
  timer = setInterval(showSecond, 1000);
}

//秒数表示
function showSecond() {
  let nowTime = new Date();
  let elapsedTime = Math.floor((nowTime - startTime) / 1000);
  let str = '経過秒数:' + elapsedTime + '秒';
  let re = document.getElementById('result');
  re.innerHTML = str;
}