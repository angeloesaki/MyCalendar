"use strict";

console.clear();

{
  const year = 2020;
  const month = 4; // 5月

  //前月分の日付を取得
  function getCalendarHead() {
    const dates = [];
    //前月の末尾
    const d = new Date(year, month, 0).getDate();
    //カレンダーに表示する前月の日数
    const n = new Date(year, month, 1).getDay();

    for (let i = 0; i < n; i++) {
      //30
      //29, 30
      //28, 29, 30
      //配列の先頭に要素を追加するメソッド=unshift()
      dates.unshift({
        date: d - i,
        isToday: false,
        isDisabled: true,
      });
    }

    return dates;
  }

  //カレンダーは大きく分けて３つのパートに分かれている：先月、今月、来月
  //今月分の日付を取得
  function getCalendarBody() {
    const dates = [];
    //末日は翌月１日の一日前という意味で、翌月０日目を指定することで取得することができる
    const lastDate = new Date(year, month + 1, 0).getDate();

    for (let i = 1; i <= lastDate; i++) {
      dates.push({
        date: i,
        isToday: false,
        isDisabled: false,
      });
    }
    return dates;
  }

  function getCalendarTail() {
    const dates = [];
    const lastDay = new Date(year, month + 1, 0).getDay();

    for (let i = 1; i < 7 - lastDay; i++) {
      dates.push({
        date: i,
        isToday: false,
        isDisabled: true,
      });
    }

    return dates;
  }

  function createCalendar() {
    //配列の中に配列が入っている状態
    //全ての要素を一つの配列の中で展開して欲しい
    //その場合はスプレッド演算子を利用する
    // const dates = [getCalendarHead(), getCalendarBody(), getCalendarTail()];
    const dates = [
      ...getCalendarHead(),
      ...getCalendarBody(),
      ...getCalendarTail(),
    ];

    console.log(dates);
  }

  createCalendar();

  // getCalendarHead();
  // getCalendarBody();
  // getCalendarTail();
}
