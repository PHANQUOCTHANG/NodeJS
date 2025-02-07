// Phần thanh xem các sản phẩm ở trạng thái (status) mình muốn .
const buttons = document.querySelectorAll("[button-status]");
if (buttons.length > 0) {
  let url = new URL(window.location.href);
  buttons.forEach((item) => {
    item.addEventListener("click", () => {
      const status = item.getAttribute("button-status");
      console.log(status);
      if (status) {
        url.searchParams.set("status", status);
      } else url.searchParams.delete("status");
      console.log(url.href);
      window.location.href = url.href;
    });
  });
}

// Thanh tìm kiếm .
const buttonFind = document.querySelector("#form-search");
if (buttonFind) {
  const url = new URL(window.location.href);
  buttonFind.addEventListener("submit", (e) => {
    e.preventDefault(); // ngăn chặn các xử lí mặc định .
    const keyword = e.target.elements.keyword.value;
    if (keyword) {
      url.searchParams.set("keyword", keyword);
    } else url.searchParams.delete("keyword");
    window.location.href = url.href;
  });
}

// Chuyển trang .
const buttonPage = document.querySelectorAll("[number-page]");
if (buttonPage) {
  let url = new URL(window.location.href);
  buttonPage.forEach((item) => {
    item.addEventListener("click", () => {
      const page = item.getAttribute("number-page");
      console.log(page);
      url.searchParams.set("page", page);
      window.location.href = url.href;
    });
  });
}
