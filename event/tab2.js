// 오렌지 클래스명 이동

// li 클릭시 오랜지 클래스명 움직이기
// show를 움직인다
// 첫번쨰  li 클릭시 첫번째  div 보여주기

const tabs = document.querySelectorAll(".tab-button");
const contents = document.querySelectorAll(".tab-content");
tabs.forEach((tab, idx) => {
  tab.addEventListener("click", () => {
    tabs.forEach((tab) => {
      tab.classList.remove("orange");
    });
    tab.classList.add("orange");
    contents.forEach((content) => {
      content.classList.remove("show");
    });
    contents[idx].classList.add("show");
  });
});
// 현재 이벤트가 일어난 li 와 순서가 일치하는 곳에 div show 를 추가하면 된다
