"use strict";

console.clear();

{
  const today = new Date();

  let year = today.getFullYear();
  let month = today.getMonth();

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

    if (year === today.getFullYear() && month === today.getMonth()) {
      //今日の日付だけtrueで上書きする
      dates[today.getDate() - 1].isToday = true;
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

  function clearCalendar() {
    const tbody = document.querySelector("tbody");

    //prev・nextボタンを押した時に一つ前に表示されていた月を削除する方法
    while (tbody.firstChild) {
      tbody.removeChild(tbody.firstChild);
    }
  }

  function renderTitle() {
    const title = document.getElementById("title");
    //String()は()の引数を文字列にするメソッド
    //padStart()は文字列に対してしか使えない
    //以下のpadStart()の意味は2桁で表示してね、それに満たなかったら"0"の文字列で埋めてねという意味になる
    title.textContent = `${year}/${String(month + 1).padStart(2, "0")}`;
  }

  function renderWeeks() {
    //配列の中に配列が入っている状態
    //全ての要素を一つの配列の中で展開して欲しい
    //その場合はスプレッド演算子を利用する
    // const dates = [getCalendarHead(), getCalendarBody(), getCalendarTail()];
    const dates = [
      ...getCalendarHead(),
      ...getCalendarBody(),
      ...getCalendarTail(),
    ];

    const weeks = [];
    const weeksCount = dates.length / 7;

    for (let i = 0; i < weeksCount; i++) {
      //先頭から７個要素を取り出しつつ取得する
      weeks.push(dates.splice(0, 7));
    }

    weeks.forEach((week) => {
      const tr = document.createElement("tr");
      week.forEach((date) => {
        const td = document.createElement("td");

        td.textContent = date.date;
        if (date.isToday) {
          td.classList.add("today");
        }
        if (date.isDisabled) {
          td.classList.add("disabled");
        }
        tr.appendChild(td);
      });

      const tbody = document.querySelector("tbody");
      tbody.appendChild(tr);
    });
  }

  function createCalendar() {
    clearCalendar();
    renderTitle();
    renderWeeks();
  }

  const prev = document.getElementById("prev");
  prev.addEventListener("click", () => {
    month--;
    if (month < 0) {
      year--;
      month = 11;
    }

    createCalendar();
  });

  const next = document.getElementById("next");
  next.addEventListener("click", () => {
    month++;
    if (month > 11) {
      year++;
      month = 0;
    }

    createCalendar();
  });

  const todaybutton = document.getElementById("today");
  todaybutton.addEventListener("click", () => {
    year = today.getFullYear();
    month = today.getMonth();

    createCalendar();
  });

  createCalendar();

  // getCalendarHead();
  // getCalendarBody();
  // getCalendarTail();
}
