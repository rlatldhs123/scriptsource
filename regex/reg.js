// form 이 서브밋이 일어나면 서브밋 중지후
// requored
// 인풋 벨류가 들어있는지 확인

// value 가 어떤 특정 조건을 만족하는지 확인

const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const userid = document.querySelector("#userid");
  const password = document.querySelector("#password");
  const passwordck = document.querySelector("#confirm-password");

  const regid = /(?=^[A-Za-z])(?=.+\d)[A-Za-z\d]{6,12}$/;
  const regpass = /(?=^[A-Za-z])(?=.+\d)(?=.+[!@$%])[A-Za-z\d!@$%]{8,15}$/;
  // (?=^[A-Za-z])(?=.+\d)(?=.+[!@$%])[A-Za-z\d!@$%]{6,12}$

  // true 자료 : 0 제외 숫자, '문자', [],{}
  // false 자료 : 0, '', null,undefined, NaN
  // pass word 벨류와 == 컴펌 패스워드와 같길 원함
  // 같지 않다면 메시지를 준다 이번비밀번호와 다르다
  if (!userid.value || regid.test(userid.value) == false) {
    userid.nextElementSibling.classList.add("show");
  } else {
    userid.nextElementSibling.classList.remove("show");
  }
  if (!password.value || regpass.test(password.value) == false) {
    password.nextElementSibling.classList.add("show");
  } else {
    password.nextElementSibling.classList.remove("show");
  }
  if (!passwordck.value || regpass.test(passwordck.value) == false) {
    passwordck.nextElementSibling.classList.add("show");
  } else {
    passwordck.nextElementSibling.classList.remove("show");
  }
  if (password.value != passwordck.value) {
    passwordck.nextElementSibling.textContent = "이전 비밀번호와 다릅니다.";
    passwordck.nextElementSibling.classList.add("show");
  }
  if (password.value == "" && passwordck.value == "") {
    passwordck.nextElementSibling.classList.textContent = "이전 비밀번호와 다릅니다";
  } else {
    // password 와 passwordck 가 둘다 입력이안된경우 걸린다
    passwordck.nextElementSibling.classList.remove("show");
  }
});
