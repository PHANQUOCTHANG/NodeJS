//CHECK-ALL
const checkAll = document.querySelector("input[name = check-all]");
const checkId = document.querySelectorAll("input[name=id]");
if (checkAll) {
  checkAll.addEventListener("click", () => {
    checkId.forEach((item) => {
      item.checked = checkAll.checked;
    });
  });
}
checkId.forEach((item) => {
  item.addEventListener("click", () => {
    const countCheckId = document.querySelectorAll("input[name=id]:checked");
    if (countCheckId.length === checkId.length) {
      checkAll.checked = true;
    } else checkAll.checked = false;
  });
});
// END

// CHANGE-ALL
const formChangeAll = document.querySelector("#form-change-all");
const type = document.querySelector("[name=type]");
if (formChangeAll) {
  formChangeAll.addEventListener("submit", (e) => {
    e.preventDefault();
    const id = document.querySelectorAll("input[name=id]:checked"); // mảng chứa các phần tử được chọn để thay đổi .
    if (id.length > 0) {
      let ids = [];
      const inputIds = formChangeAll.querySelector("[name=ids]");
      id.forEach((item) => {
        if (type.value === "update-position") {
          const position = item
            .closest("tr")
            .querySelector("input[name=position]");
          const idPosition = `${item.value}-${position.value}`;
          ids.push(idPosition);
        } else ids.push(item.value);
      });
      if (type.value === "delete") {
        const isConfirm = confirm("Bạn có chắc muốn xóa không?");
        if (!isConfirm) return;
      }
      inputIds.value = ids.join(", ");
      formChangeAll.submit();
    } else {
      alert("Vui chon 1 ban ghi!");
    }
  });
}
// END

// [CHANGE-STATUS]
const changeStatus = document.querySelectorAll("[data-status]");
if (changeStatus.length > 0) {
  const formChangeStatus = document.querySelector("#form-changeStatus");
  const pathChange = formChangeStatus.getAttribute("data-path");
  changeStatus.forEach((item) => {
    item.addEventListener("click", () => {
      let status = item.getAttribute("data-status");
      const id = item.getAttribute("data-id");
      status = status == "active" ? "inactive" : "active";
      const action = `${pathChange}/${status}/${id}?_method=PATCH`;
      formChangeStatus.action = action;
      formChangeStatus.submit();
    });
  });
}
// END

// [DELETE-PRODUCT]
const buttonDeletes = document.querySelectorAll(".button-delete");
console.log(buttonDeletes) ;
if (buttonDeletes.length > 0) {
  const formDelete = document.querySelector("#form-delete");
  const path = formDelete.getAttribute("data-path");
  buttonDeletes.forEach((button) => {
    button.addEventListener("click", () => {
      const isConfirm = confirm("Bạn chắc chắn muốn xóa?");
      if (isConfirm) {
        const id = button.getAttribute("data-id");
        const action = `${path}/${id}?_method=DELETE`;
        formDelete.action = action;
        formDelete.submit();
      }
    });
  });
}
// END

// Upload Image Preview .
const uploadImage = document.querySelector("[upload-image]");
if (uploadImage) {
  const uploadImageInput = document.querySelector("[upload-image-input]");
  const uploadImagePreview = document.querySelector("[upload-image-preview]");
  uploadImageInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadImagePreview.src = URL.createObjectURL(file);
      uploadImagePreview.style.width = "100px";
      uploadImagePreview.style.height = "100px";
    }
  });
}
// End .


// SORT
const divSort = document.querySelector("[sort]");
if (divSort) {
  const selectSort = divSort.querySelector("[sort-select]");
  // get url
  let url = new URL(window.location.href);
  selectSort.addEventListener("change", (e) => {
    let valueSelect = e.target.value;
    console.log(valueSelect);
    valueSelect = valueSelect.split("-");
    const [sortKey, sortValue] = valueSelect;
    //  edit url
    url.searchParams.set("sortKey", sortKey);
    url.searchParams.set("sortValue", sortValue);
    // give url = new url after edit .
    window.location.href = url;
  });

  const sortKey = url.searchParams.get("sortKey");
  const sortValue = url.searchParams.get("sortValue");
  // Selected option
  if (sortKey && sortValue) {
    const optionValue = `${sortKey}-${sortValue}`;
    console.log(optionValue);
    const option = selectSort.querySelector(`option[value=${optionValue}]`);
    option.selected = true;
  }
  // End selected option .

  // clear 
  const buttonClear = divSort.querySelector("[clear]") ;
  if (buttonClear)
  {
      buttonClear.addEventListener("click" , () => {
      if (sortKey && sortValue) {
        url.searchParams.delete("sortKey") ;
        url.searchParams.delete("sortValue") ;

        window.location.href =  url ; // chuyển hướng .
      }
    })
  }
  // End clear
}
// End SORT
