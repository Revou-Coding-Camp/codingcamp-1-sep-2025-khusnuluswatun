// console.log("wwa");
// swal("Hello world!");
let allToDoList = [];

addListToTable();
function addTodo() {
  const todo = document.getElementById("input-todo").value;
  const date = document.getElementById("input-date").value;
  console.log(todo, date);
  if (todo == "" || date == "") {
    swal("", "Task and date is required!", "warning");
  } else {
    allToDoList.push([todo, date]);
    document.getElementById("input-todo").value = "";
    document.getElementById("input-date").value = "";
    document.getElementById("filterData").value = "";
    addListToTable();
  }
}

function addListToTable() {
  console.log("list: ", allToDoList, allToDoList.length);
  let tr = "";
  if (allToDoList.length > 0) {
    allToDoList.forEach((e, i) => {
      let today = new Date();
      let y = today.getFullYear();
      let m = String(today.getMonth() + 1).padStart(2, "0");
      let d = String(today.getDate()).padStart(2, "0");
      let dateNow = `${y}-${m}-${d}`;

      let status = "Pending";
      if (dateNow > e[1]) {
        status = "Overdue";
      } else if (dateNow == e[1]) {
        status = "D-Day";
      }

      tr +=
        `<tr class="tr-task">
                    <td class="dark:bg-gray-800 p-1.5">
                      ` +
        e[0] +
        `
                    </td>
                    <td class="dark:bg-gray-800 p-1.5">` +
        e[1] +
        `</td>
                    <td class="dark:bg-gray-800 p-1.5">` +
        status +
        `</td>
                    <td class="dark:bg-gray-800">
                      <div class="flex items-center justify-center space-x-2">
                        <input type="checkbox" name="" id="" class="h-5 w-5" />
                        <button
                          type="button"
                          class="bg-red-800 text-white px-2 rounded-sm font-bold"
                          onclick="deleteTask(this, ` +
        i +
        `)"
                        >
                          x
                        </button>
                      </div>
                    </td>
                    </tr>
                  `;
    });
  } else {
    tr += `<tr class="tr-empty"><td class="dark:bg-gray-800 p-1.5 text-center" colspan="4">No task found</td></tr>`;
  }
  document.getElementById("bag-tbody-tr-list").innerHTML = tr;
}

function deleteAll() {
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this task",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      allToDoList = [];
      addListToTable();
      swal("Your task has been deleted!", {
        icon: "success",
      });
    }
  });
}

function deleteTask(btn, i) {
  swal({
    title: "Are you sure?",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      btn.closest("tr").remove();
      let checkTask = document.getElementsByClassName("tr-task").length;
      console.log("ok", i);
      allToDoList.splice(i, 1);
      if (checkTask == 0) {
        document.getElementById(
          "bag-tbody-tr-list"
        ).innerHTML = `<tr class="tr-empty"><td class="dark:bg-gray-800 p-1.5 text-center" colspan="4">No task found</td></tr>`;
      }
    }
  });
}

function filterTableTask() {
  const filternya = document.getElementById("filterData").value.toLowerCase();
  const rows = document.querySelectorAll("#bag-tbody-tr-list .tr-task");

  let check = 0;
  rows.forEach((row) => {
    const text = row.textContent.toLowerCase();
    if (text.includes(filternya)) {
      row.style.display = "";
    } else {
      row.style.display = "none";
      check++;
    }
  });
  console.log("hai - ", check, rows.length, rows);
  if (check == rows.length) {
    if (document.getElementsByClassName("tr-empty").length == 0) {
      document.getElementById("bag-tbody-tr-list").insertAdjacentHTML(
        "beforeend",
        `
            <tr class="tr-empty"><td class="dark:bg-gray-800 p-1.5 text-center" colspan="4">No task found</td></tr>
            `
      );
    }
  } else {
    document.querySelectorAll(".tr-empty").forEach((e) => e.remove());
  }
}
