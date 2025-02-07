// roles permission .
const permissionForm = document.querySelector(".form-permission");
if (permissionForm) {
  // const buttonSubmit = permissionForm.querySelector("[button-submit");
  permissionForm.addEventListener("submit", () => {
    const ids = permissionForm.querySelectorAll("[data-id]");
    const row = permissionForm.querySelectorAll("[data-roles]");
    let permission = [];
    for (let i = 0; i < ids.length; i++) {
      const id = ids[i].getAttribute("data-id");
      permission.push({
        _id: id,
        permission: [],
      });
    }
    row.forEach((row) => {
      const data_roles = row.getAttribute("data-roles");
      const inputs = row.querySelectorAll("input");
      inputs.forEach((input, index) => {
        if (input.checked) permission[index].permission.push(data_roles);
      });
    });
    const dataPermission = permissionForm.querySelector("[data-permission]");
    dataPermission.value = JSON.stringify(permission);
  });
}

//  xử lí checked .

let records = document.querySelector("[record]").getAttribute("record");
if (records) {
  const record = JSON.parse(records);
  record.forEach((record, index) => {
    const permission = record.permission;
    permission.forEach((permission) => {
      const row = permissionForm.querySelector(`[data-roles=${permission}]`);
      const input = row.querySelectorAll("input")[index];
      input.checked = true;
    });
  });
}
