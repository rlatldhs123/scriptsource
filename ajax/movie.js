// 어제 날짜 구하기

const txtYear = document.querySelector("#txtYear");
const selMon = document.querySelector("#selMon");
const selDay = document.querySelector("#selDay");
const init = () => {
  // 오늘날짜 구하기

  const today = new Date();

  const year = today.getFullYear();
  const mon = today.getMonth() + 1;
  const day = today.getDate() - 1;

  // 화면에 보여주기 요소 찾고 밸류 변경

  txtYear.value = year;
  //   // 1~9월에 경우에 ""+month => 01 02
  //   // 1~9일에 경우에 ""+day => 01 02
  //   if (mon < 10) {
  //     mon = "0" + mon;
  //   }
  //   if (day < 10) {
  //     day = "0" + day;
  //   }

  //   selMon.value = mon;
  //   selDay.value = day;

  selMon.value = mon < 10 ? "0" + mon : mon;
  selDay.value = day < 10 ? "0" + day : day;
  console.log(txtYear.value);
  console.log(selMon.value);
  console.log(selDay.value);
};

// 만들어진 것을 호출

init();

// 제목을 클릭시 show 함수가 시작 영화의  영화 코드가 movieCd 안에 담겼으면 좋겠음

function show(movieCd) {
  console.log(movieCd);
  url = "http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?key=f5eef3421c602c6cb7ea224104795888&movieCd=";
  url += movieCd;

  // 영화 한글제목 movieNm
  // 영화 영어 제목 movieNmEn
  // 상영 시간 showTm
  // 감독 directors{} 배열
  // 배우  actors {}배열 등등을 뽑아내고 싶음
  fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error();
      {
        return res.json();
      }
    })
    .then((data) => {
      console.log(data);
      let movieInfo = data.movieInfoResult.movieInfo;

      let directors = "";

      movieInfo.directors.forEach((director) => {
        directors += `${director.peopleNm},`;
      });

      // 배우

      let actors = "";
      console.log("배우들", actors);

      movieInfo.actors.forEach((actor) => {
        actors += `${actor.peopleNm},`;
      });

      let out2 = `<ul>`;
      out2 += `<li> 영화 제목 : ${movieInfo.movieNm}</li>`;
      out2 += `<li> 영어 제목 : ${movieInfo.movieNmEn}</li>`;
      out2 += `<li> 상영 시간 : ${movieInfo.showTm}</li>`;
      out2 += `<li> 감독 : ${directors}</li>`;
      out2 += `<li> 출현배우 : ${actors}</li>`;
      out2 += `</ul>`;
      document.querySelector(".box2").innerHTML = out2;
    });
}

// 버튼 클릭시 영화 진흥 위원회에 박스 오피스 가져오기 사용자가 선택한 날짜의

document.querySelector("button").addEventListener("click", () => {
  let url = "https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=f5eef3421c602c6cb7ea224104795888&targetDt=";
  url += txtYear.value + selMon.value + selDay.value;
  console.log(url);
  fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error();
      {
        return res.json();
      }
    })
    .then((data) => {
      console.log(data);

      let boxofficeList = data.boxOfficeResult.dailyBoxOfficeList;
      console.log(boxofficeList);

      // 순위 1위(▲ 1) 파묘 <<<div 증감 값의 따라 다르게

      //

      //

      let out = `<div>`;
      boxofficeList.forEach((movie) => {
        let rankIn = movie.rankInten;
        if (rankIn > 0) {
          rankIn = `▲${rankIn}`;
        }
        if (rankIn < 0) {
          rankIn = `▼${rankIn}`;
        }

        // let rankInten = movie.rankInten;

        out += `${movie.rank}위(`;
        out += `${rankIn}) : `;
        out += `<a href="#" onclick='javascript:show(${movie.movieCd})'>${movie.movieNm}</a><br><br>`;
      });
      out += `</div>`;
      document.querySelector("#msg").innerHTML = out;
    })

    .catch(() => {
      console.log("주소확인");
    });
});
