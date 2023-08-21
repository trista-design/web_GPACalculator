// 開場動畫
let animation = document.querySelector(".animation-wrapper");
let hero = document.querySelector(".hero");
let slider = document.querySelector(".slider");

const time_line = new TimelineMax();

time_line
  .fromTo(hero, 1, { height: "0%" }, { height: "100%", ease: Power2.easeInout })
  .fromTo(
    hero,
    1.2,
    { width: "80%" },
    { width: "100%", ease: Power2.easeInout }
  )
  .fromTo(
    slider,
    1,
    { x: "-100%" },
    { x: "0%", ease: Power2.easeInout },
    "-=1.2"
  )
  .fromTo(
    animation,
    0.3,
    { opacity: 1 },
    { opacity: 0, ease: Power2.easeInout }
  );
setTimeout(() => {
  animation.style.pointerEvents = "none";
}, 2500);

// 讓"Enter key"無法回送
window.addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    e.preventDefault();
  }
});

// 讓"from:button"無法回送
let allButton = document.querySelectorAll("button");
allButton.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
  });
});

// 在頁面載入時初始化 GPA 背景顏色
window.onload = function () {
  let gpaInputs = document.querySelectorAll(".class-gpa");
  gpaInputs.forEach((select) => {
    changeColor(select);
  });
};

// credit 加效果
let creditInputs = document.querySelectorAll(".class-credit");
creditInputs.forEach((input) => {
  input.addEventListener("input", () => {
    addCredit();
  });
  input.addEventListener("change", () => {
    addCredit();
  });
});

// grade 加效果
let gradeInputs = document.querySelectorAll(".class-grade");
gradeInputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    updateGpa(e.target);
    addGrade();
    addGpa();
  });
  input.addEventListener("change", (e) => {
    updateGpa(e.target);
    addGrade();
    addGpa();
  });
});

// gpa 加效果
let gpaSelects = document.querySelectorAll("select");
gpaSelects.forEach((select) => {
  select.addEventListener("input", () => {
    changeColor(select);
    addGpa();
  });
  select.addEventListener("change", () => {
    changeColor(select);
    addGpa();
  });
});

// 讓gpa改顏色
function changeColor(target) {
  if (target.value === "") {
    target.style.backgroundColor = "rgb(144, 144, 144)";
  } else if (
    target.value == "A+" ||
    target.value == "A" ||
    target.value == "A-"
  ) {
    target.style.backgroundColor = "#37e2d5";
    target.style.color = "#272727";
  } else if (
    target.value == "B+" ||
    target.value == "B" ||
    target.value == "B-"
  ) {
    target.style.backgroundColor = "#fedb39";
    target.style.color = "#272727";
  } else if (
    target.value == "C+" ||
    target.value == "C" ||
    target.value == "C-"
  ) {
    target.style.backgroundColor = "#fb5050";
    target.style.color = "#272727";
  } else if (target.value == "F") {
    target.style.backgroundColor = "gray";
    target.style.color = "white";
  }
}

// 讓grade跟gpa一起變動
function updateGpa(input) {
  // 使用grade的父元素來選取相關的input
  let gpaValue = input.parentNode.querySelector(".class-gpa");
  let grade = input.value.trim(); // 移除多餘空白後再轉換成數字

  if (grade === "") {
    gpaValue.value = "";
  } else if (grade >= 90) {
    gpaValue.value = "A+";
  } else if (grade >= 85) {
    gpaValue.value = "A";
  } else if (grade >= 80) {
    gpaValue.value = "A-";
  } else if (grade >= 77) {
    gpaValue.value = "B+";
  } else if (grade >= 73) {
    gpaValue.value = "B";
  } else if (grade >= 70) {
    gpaValue.value = "B-";
  } else if (grade >= 67) {
    gpaValue.value = "C+";
  } else if (grade >= 63) {
    gpaValue.value = "C";
  } else if (grade >= 60) {
    gpaValue.value = "C-";
  } else if (grade < 60) {
    gpaValue.value = "F";
  }

  changeColor(gpaValue);
}

// 讓credit加總放circle-credit
function addCredit() {
  let formLength = document.querySelectorAll(".grader-form").length;
  let credits = document.querySelectorAll(".class-credit");
  let total = 0;

  for (let i = 0; i < formLength; i++) {
    let credit = credits[i].valueAsNumber || 0;
    total += credit;
  }
  //   放入circle-credit;
  document.getElementById("circle-credit").value = total.toFixed();
}

// 讓grade加總放circle-grade
function addGrade() {
  let credits = document.querySelectorAll(".class-credit");
  let grades = document.querySelectorAll(".class-grade");
  let sum = 0; //分子
  let creditSum = 0; //分母

  for (let i = 0; i < credits.length; i++) {
    let credit = credits[i].valueAsNumber;
    let grade = grades[i].valueAsNumber;
    if (!isNaN(credit) && !isNaN(grade)) {
      creditSum += credit;
      sum += credit * grade;
    }
  }
  //   結果運算
  let result;
  if (creditSum == 0) {
    result = (0.0).toFixed(1);
  } else {
    result = (sum / creditSum).toFixed(1);
  }
  //  放入circle-grade
  document.getElementById("circle-grade").value = result;
}

// 讓gpa加總放到circle-gpa
function convertor(gpa) {
  switch (gpa) {
    case "A+":
      return 4.3;
    case "A":
      return 4.0;
    case "A-":
      return 3.7;
    case "B+":
      return 3.3;
    case "B":
      return 3.0;
    case "B-":
      return 2.7;
    case "C+":
      return 2.3;
    case "C":
      return 2.0;
    case "C-":
      return 1.7;
    case "F":
      return 0.0;
    default:
      return 0;
  }
}
function addGpa() {
  let credits = document.querySelectorAll(".class-credit");
  let gpas = document.querySelectorAll(".class-gpa");
  let sum = 0;
  let creditSum = 0;
  for (let i = 0; i < credits.length; i++) {
    let credit = credits[i].valueAsNumber;
    let gpa = gpas[i].value;
    if (!isNaN(credit) && !(gpa == "")) {
      creditSum += credit;
      sum += credit * convertor(gpa);
    }
  }
  // 計算結果
  let result;
  if (creditSum == 0) {
    result = (0.0).toFixed(1);
  } else {
    result = (sum / creditSum).toFixed(2);
  }
  //  套入circle-gpa裡
  document.getElementById("circle-gpa").value = result;
}

// 讓plusButton增加表格
let plusBtn = document.querySelector(".plus-btn");
plusBtn.addEventListener("click", () => {
  //   重新做一個表格
  let newForm = document.createElement("form");
  newForm.classList.add("grader-form");
  let newDiv = document.createElement("div");
  newDiv.classList.add("grader");
  //   1小元素：input-name
  let newInput1 = document.createElement("input");
  newInput1.setAttribute("type", "text");
  newInput1.setAttribute("placeholder", "課程名稱");
  newInput1.classList.add("class-name");
  //   2小元素：input-credit
  let newInput2 = document.createElement("input");
  newInput2.setAttribute("type", "number");
  newInput2.setAttribute("placeholder", "學分");
  newInput2.setAttribute("min", "0");
  newInput2.setAttribute("max", "6");
  newInput2.classList.add("class-credit");
  // 加上效果
  newInput2.addEventListener("input", () => {
    addCredit();
  });
  newInput2.addEventListener("change", () => {
    addCredit();
  });
  //   3小元素：input-grade
  let newInput3 = document.createElement("input");
  newInput3.setAttribute("type", "number");
  newInput3.setAttribute("placeholder", "成績");
  newInput3.setAttribute("min", "0");
  newInput3.setAttribute("max", "100");
  newInput3.classList.add("class-grade");
  //   加上效果
  newInput3.addEventListener("input", (e) => {
    updateGpa(e.target);
    addGrade();
    addGpa();
  });
  newInput3.addEventListener("change", (e) => {
    updateGpa(e.target);
    addGrade();
    addGpa();
  });
  //   4小元素:select-gpa
  let newSelect = document.createElement("select");
  newSelect.setAttribute("name", "class-gpa");
  newSelect.classList.add("class-gpa");
  let opt1 = document.createElement("option");
  opt1.setAttribute("value", "");
  opt1.setAttribute("selected", "");
  opt1.setAttribute("hidden", "");
  let textNode1 = document.createTextNode("");
  opt1.appendChild(textNode1);
  let opt2 = document.createElement("option");
  opt2.setAttribute("value", "A+");
  let textNode2 = document.createTextNode("A+");
  opt2.appendChild(textNode2);
  let opt3 = document.createElement("option");
  opt3.setAttribute("value", "A");
  let textNode3 = document.createTextNode("A");
  opt3.appendChild(textNode3);
  let opt4 = document.createElement("option");
  opt4.setAttribute("value", "A-");
  let textNode4 = document.createTextNode("A-");
  opt4.appendChild(textNode4);
  let opt5 = document.createElement("option");
  opt5.setAttribute("value", "B+");
  let textNode5 = document.createTextNode("B+");
  opt5.appendChild(textNode5);
  let opt6 = document.createElement("option");
  opt6.setAttribute("value", "B");
  let textNode6 = document.createTextNode("B");
  opt6.appendChild(textNode6);
  let opt7 = document.createElement("option");
  opt7.setAttribute("value", "B-");
  let textNode7 = document.createTextNode("B-");
  opt7.appendChild(textNode7);
  let opt8 = document.createElement("option");
  opt8.setAttribute("value", "C+");
  let textNode8 = document.createTextNode("C+");
  opt8.appendChild(textNode8);
  let opt9 = document.createElement("option");
  opt9.setAttribute("value", "C");
  let textNode9 = document.createTextNode("C");
  opt9.appendChild(textNode9);
  let opt10 = document.createElement("option");
  opt10.setAttribute("value", "C-");
  let textNode10 = document.createTextNode("C-");
  opt10.appendChild(textNode10);
  let opt11 = document.createElement("option");
  opt11.setAttribute("value", "F");
  let textNode11 = document.createTextNode("F");
  opt11.appendChild(textNode11);

  newSelect.appendChild(opt1);
  newSelect.appendChild(opt2);
  newSelect.appendChild(opt3);
  newSelect.appendChild(opt4);
  newSelect.appendChild(opt5);
  newSelect.appendChild(opt6);
  newSelect.appendChild(opt7);
  newSelect.appendChild(opt8);
  newSelect.appendChild(opt9);
  newSelect.appendChild(opt10);
  newSelect.appendChild(opt11);
  //   加上效果
  newSelect.addEventListener("input", () => {
    changeColor(select);
    addGpa();
  });
  newSelect.addEventListener("change", () => {
    changeColor(select);
    addGpa();
  });
  //   5小元素：button-trash
  let newTrashBtn = document.createElement("button");
  newTrashBtn.classList.add("trash-btn");
  let newItag = document.createElement("i");
  newItag.classList.add("fa-solid");
  newItag.classList.add("fa-trash");
  newTrashBtn.appendChild(newItag);
  // 加上效果
  newTrashBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let form = e.target.closest(".grader-form");
    form.style.animation = "scaleDown 0.5s ease forwards";
    form.addEventListener("animationend", (e) => {
      e.target.remove();
      addCredit();
      addGrade();
      addGpa();
    });
  });
  //   把5小元素都放入div
  newDiv.appendChild(newInput1);
  newDiv.appendChild(newInput2);
  newDiv.appendChild(newInput3);
  newDiv.appendChild(newSelect);
  newDiv.appendChild(newTrashBtn);
  //   把div放入form
  newForm.appendChild(newDiv);
  //   把form放入div.all-inputs
  document.querySelector(".all-inputs").appendChild(newForm);

  //   加入表格出現動畫
  newForm.style.animation = "scaleUp 0.5s ease forwards";
});

// trash-btn刪除表格
let trashBtns = document.querySelectorAll(".trash-btn");
trashBtns.forEach((button) => {
  button.addEventListener("click", () => {
    let form = button.closest(".grader-form");
    form.style.animation = "scaleDown 0.5s ease forwards";
    setTimeout(() => {
      form.remove();
      addCredit();
      addGrade();
      addGpa();
    }, 500);
  });
});

// 排序演算法
// let btn1 = document.querySelector(".sort-descending");
// let btn2 = document.querySelector(".sort-ascending");

// btn1.addEventListener("click", () => {
//   handleSorting("descending"); // 大到小
// });

// btn2.addEventListener("click", () => {
//   handleSorting("ascending"); // 小到大
// });

// // 創function:handlesorting 去排序
// function handleSorting(direction) {
//   let graders = document.querySelectorAll("div.grader");
//   let objectArray = [];
//   // 先把要排序的資訊都放進來
//   for (let i = 0; i < graders.length; i++) {
//     let class_name = graders[i].children[0].value;
//     let class_credit = graders[i].children[1].value;
//     let class_grade = graders[i].children[2].value;
//     let class_gpa = graders[i].children[3].value;

//     if (
//       !(
//         class_name == "" &&
//         class_credit == "" &&
//         class_grade == "" &&
//         class_gpa == ""
//       )
//     ) {
//       let class_object = {
//         class_name: class_name,
//         class_credit,
//         class_grade,
//         class_gpa,
//       };
//       objectArray.push(class_object);
//     }
//   }
//   //   在把gpa成績從"A"String 改成 數字
//   for (let i = 0; i < objectArray.length; i++) {
//     objectArray[i].class_gpa_number = convertor(objectArray[i].class_gpa);
//   }
//   //   對objectArray執行mergeSort，再存回objectArray
//   objectArray = mergeSort(objectArray);
//   //   把handleSorting的參數"direction" == descending(大到小排)
//   if (direction == "descending") {
//     objectArray = objectArray.reverse();
//   }
//   //   根據objectArray的內容，更新網頁(all.inputs)
//   let allInputs = document.querySelector(".all-inputs");
//   //   先清空allInputs，在重新排序
//   allInputs.innerHTML = "";
//   // 把form用成backtick(換成String)套入
//   for (let i = 0; i < objectArray.length; i++) {
//     allInputs.innerHTML += `<form class="grader-form">
//     <div class="grader">
//       <input
//         type="text"
//         placeholder="課程名稱"
//         class="class-name"
//         value=${objectArray[i].class_name}
//       /><!--
//     --><input
//         type="number"
//         placeholder="學分"
//         min="0"
//         max="6"
//         class="class-credit"
//         value=${objectArray[i].class_credit}
//       /><!--
//     --><input
//         type="number"
//         class="class-grade"
//         min="0"
//         max="100"
//         placeholder="成績"
//         value=${objectArray[i].class_grade}
//       /><!--
//     --><select name="class-gpa" class="class-gpa">
//         <option value="" selected hidden></option>
//         <option value="A+">A+</option>
//         <option value="A">A</option>
//         <option value="A-">A-</option>
//         <option value="B+">B+</option>
//         <option value="B">B</option>
//         <option value="B-">B-</option>
//         <option value="C+">C+</option>
//         <option value="C">C</option>
//         <option value="C-">C-</option>
//         <option value="F">F</option></select
//       ><!--
//     --><button class="trash-btn">
//         <i class="fa-solid fa-trash"></i>
//       </button>
//     </div>
//     </form>`;
//   }
//   // backtick：select無法直接用value放入，所以用JS更改
//   graders = document.querySelectorAll("div.grader");
//   for (let i = 0; i < graders.length; i++) {
//     graders[i].children[3].value = objectArray[i].class_gpa;
//   }
//   // credit - addEventListener
//   let creditInputs = document.querySelectorAll(".class-credit");
//   creditInputs.forEach((input) => {
//     input.addEventListener("input", () => {
//       addCredit();
//     });
//     input.addEventListener("change", () => {
//       addCredit();
//     });
//   });
//   // grade - addEventListener
//   let gradeInputs = document.querySelectorAll(".class-grade");
//   gradeInputs.forEach((input) => {
//     input.addEventListener("input", (e) => {
//       updateGpa(e.target);
//       addGrade();
//       addGpa();
//     });
//     input.addEventListener("change", (e) => {
//       updateGpa(e.target);
//       addGrade();
//       addGpa();
//     });
//   });
//   // gpa - addEventListener
//   let gpaSelects = document.querySelectorAll(".class-gpa");
//   gpaSelects.forEach((select) => {
//     select.addEventListener("input", () => {
//       changeColor(select);
//       addGpa();
//     });
//     select.addEventListener("change", () => {
//       changeColor(select);
//       addGpa();
//     });
//   });
//   // trash - addEventListener
//   let trashBtns = document.querySelectorAll("trash-btn");
//   trashBtns.forEach((button) => {
//     button.addEventListener("click", () => {
//       let form = button.closest(".grader-form");
//       form.style.animation = "scaleDown 0.5s ease forwards";
//       setTimeout(() => {
//         form.remove();
//         addCredit();
//         addGrade();
//         addGpa();
//       }, 500);
//     });
//   });
// }

// // 用mergeSort去解，遞迴方式，小到大排
// function merge(a1, a2) {
//   let result = [];
//   let i = 0;
//   let j = 0;
//   // 如果a2[j]<a1[i]，就先放a2[j]，不然就放a1[i]
//   while (i < a1.length && j < a2.length) {
//     if (a1[i].class_gpa_number > a2[j].class_gpa_number) {
//       result.push(a2[j]);
//       j++;
//     } else {
//       result.push(a1[i]);
//       i++;
//     }
//   }
//   // 如果a2[j]都放完了，剩a1[i]就全放進去
//   while (i < a1.length) {
//     result.push(a1[i]);
//     i++;
//   }
//   // 如果a1[i]都放完了，剩a2[j]就全放進去
//   while (j < a2.length) {
//     result.push(a2[j]);
//   }
//   return result;
// }

// function mergeSort(arr) {
//   // 如果arr內沒東西，就返回"沒有"
//   if (arr.length == 0) {
//     return;
//   }
//   // 如果arr內只有1，就返回"自己"
//   if (arr.length == 1) {
//     return arr;
//   } else {
//     let middle = arr.length / 2;
//     let left = arr.slice(0, middle);
//     let right = arr.slice(middle, arr.length);
//     return merge(mergeSort(left), mergeSort(right));
//   }
// }
