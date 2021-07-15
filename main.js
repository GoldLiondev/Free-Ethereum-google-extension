function setSaveAddress() {
  let address = document.getElementById("walletaddress").value;
  console.log("object");
  localStorage.setItem("address", address);
}
window.onload = function () {
  document.getElementById("walletaddress").value =
    localStorage.getItem("address");
};
function setTime(value) {
  localStorage.setItem("last_time", value);
}
document.getElementById("save").addEventListener("click", function () {
  setSaveAddress();
});

document.getElementById("autoGet").addEventListener("click", function () {
  //   let time = localStorage.getItem("request_time");
  //   if (time) {
  //     localStorage.setItem("request_time", 3);
  //   }
  //   time = localStorage.getItem("request_time");

  setTimeout(() => {
    let address = document.getElementById("walletaddress").value;
    const Url = "http://rinkeby-faucet.com/send?address=" + address;
    fetch(Url, { mode: "no-cors" })
      .then((data) => {
        const { ok } = data;
        if (ok == false) {
        } else {
          let cur = localStorage.getItem("last_time");
          if (cur) {
            localStorage.setItem("hours", cur - Date.parse(new Date()));
          }
          setTime(Date.parse(new Date()));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, 3600000);
});

document.getElementById("manualGet").addEventListener("click", function () {
  let address = document.getElementById("walletaddress").value;
  const Url = "http://rinkeby-faucet.com/send?address=" + address;
  fetch(Url, { mode: "no-cors" })
    .then((data) => {
      const { ok } = data;
      if (ok == false) {
      } else {
        setTime(Date.parse(new Date()));
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
