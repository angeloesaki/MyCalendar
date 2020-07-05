"use strict";
{
  const year = 2020;
  const month = 4; // 5月

  //カレンダーは大きく分けて３つのパートに分かれている：先月、今月、来月
  //以下は今月のパート
  function getCalendarBody() {
    const dates = [];
    //末日は翌月１日の一日前という意味で、翌月０日目を指定することで取得することができる
    const lastDate = new Date(year, month + 1, 0).getDate();

    for (let i = 1; i <= lastDate; i++) {
      dates.push(i);
    }
    console.log(dates);
  }
  getCalendarBody();
}
