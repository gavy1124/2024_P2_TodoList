// 유저가 값을 입력한다.
// +버튼을 클릭하면, 할일이 추가된다.
// Check 버튼을 누르면 할일이 끝나면서 밑줄이 쳐진다.
// 1. Check 버튼을 클릭하는 순간 false를 true로
// 2. true이면 끝난걸로 간주하고 밑줄 보여주기
// 3. false이면 안끝난걸로 간주하고 그대로
// Delete 버튼을 누르면 할일이 삭제된다.


// 진행중 끝남 탭을 누르면, 언다바가 이동한다.
// 끝남탭은, 끝난 아이템만, 진행중탭은 진행중인 아이템만
// All탭을 누르면 다시 전체 아이템으로 돌아옴





let mode = 'all';
let taskInput = document.getElementById("taskInput");
let addBtn = document.getElementById("addBtn")
let taskList = []
let filterList = []
let list = []
let tabs = document.querySelectorAll(".task_tabs div")
addBtn.addEventListener("click", addTask)

for (let i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener("click", function (event) {
        filter(event)
    });
}

taskInput.addEventListener("focus", function () { taskInput.value = "" })



function filter(event) {
    filterList = []
    mode = event.target.id;
    if (mode === "all") {
        //전체리스트
        render()
    } else if (mode === "onGoing") {
        //진행중 (task.isComplete == false)
        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].isComplete === false) {
                filterList.push(taskList[i])
            }
        }
        render()

    } else if (mode === "done") {
        //완료  (task.isComplete == true)
        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].isComplete === true) {
                filterList.push(taskList[i])
            }
        }

        render()
    }
}



function randomIdGenerate() {
    return '_' + Math.random().toString(36).substr(2, 9);
}


function addTask() {
    let task = {
        id: randomIdGenerate(),
        taskContent: taskInput.value,
        isComplete: false
    }


    taskList.push(task)
    console.log("taskList")
    render()
}



function deleteTask(id) {
    for (let i = 0; i < list.length; i++) {
        if (list[i].id === id) {
            list.splice(i, 1)
            break;
        }
    }
    render()

}






function render() {
    // 1. 내 선택한 탭에 따라서
    list = []
    if (mode === "all") {
        list = taskList;
    } else if (mode === "onGoing") {
        list = filterList
    } else if (mode === "done") {
        list = filterList
    }

    // 2. 리스트를 달리 보여준다.
    // 예) all = taskList를 보여준다
    //    ongoing, donne, = filterList
    let resultHTML = '';
    for (let i = 0; i < list.length; i++) {
        if (list[i].isComplete == true) {
            resultHTML += `<div class="task">
            <div class="taskDone">${list[i].taskContent}</div>
            <div>
                <button onClick="toggleComplete('${list[i].id}')">Check</button>
                <button onClick="deleteTask('${list[i].id}')">Delete</button>
            </div>
        </div>`;
        } else {
            resultHTML += `<div class="task">
            <div>${list[i].taskContent}</div>
            <div>
                <button onClick="toggleComplete('${list[i].id}')">Check</button>
                <button onClick="deleteTask('${list[i].id}')">Delete</button>
            </div>
        </div>`;
        }



    }


    document.getElementById("taskBoard").innerHTML = resultHTML;
}


function toggleComplete(id) {
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id == id) {
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    render()
    console.log(taskList)

}







let underLine = document.getElementById("underLine")
let underLineMenus = document.querySelectorAll(".task_tabs div")
underLineMenus.forEach(menu => menu.addEventListener("click", (e) => underLineIndicator(e)))
function underLineIndicator(e) {
    underLine.style.left = e.currentTarget.offsetLeft + "px";
    underLine.style.width = e.currentTarget.offsetWidth + "px";
    underLine.style.top = e.currentTarget.offsetTop + e.currentTarget.offsetHeight + "px";
}









let horizontalUnderline = document.getElementById("horizontalUnderline")
let horizontalMenus = document.querySelectorAll("nav:first-child a")


horizontalMenus.forEach(menu => menu.addEventListener("click", (e) => horizontalIndicator(e)))


function horizontalIndicator(e) {
    horizontalUnderline.style.left = e.currentTarget.offsetLeft + "px";
    horizontalUnderline.style.width = e.currentTarget.offsetWidth + "px";
    horizontalUnderline.style.top = e.currentTarget.offsetTop + e.currentTarget.offsetHeight + "px"
}

let verticalUnderline = document.getElementById("verticalUnderline")
let verticalMenus = document.querySelectorAll("nav:nth-child(2) a")

verticalMenus.forEach(menu => menu.addEventListener("click", (e) => verticalIndicator(e)))

function verticalIndicator(e) {
    verticalUnderline.style.left = e.currentTarget.offsetLeft + "px";
    verticalUnderline.style.width = e.currentTarget.offsetWidth + "px";
    verticalUnderline.style.top = e.currentTarget.offsetTop + e.currentTarget.offsetHeight + "px";


}

