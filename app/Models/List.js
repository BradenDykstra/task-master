export default class List {
    //TODO You will need to create a constructor 
    //and the methods needed to create the view template for this model
    constructor(data) {
        this.name = data.name
        this.textColor = data.textColor
        this.bgColor = data.bgColor
        this.tasks = data.tasks || []
    }

    getTemplate(index) {
        let template = '';
        template += `<div class="col-3 m-5 p-3 rounded" style="border: 5px solid ${this.textColor}; background: ${this.bgColor}">
                <h3 style="color: ${this.textColor}">${this.name}</h3>
                <hr style="background-color: ${this.textColor}">
                <ul>`
        template += this.drawTasks(index);
        template += `</ul>
            <form onsubmit="app.controllers.listController.addTask(${index}, event)" autocomplete="off">
                <input type="text" class="form-control mb-2" name="task" placeholder="Add an item to your list">
                <button class="mb-2 btn btn-success" type="submit"><i class="fas fa-plus"></i></button>
            </form>
                <button class="btn btn-danger" onclick="app.controllers.listController.deleteList(${index})">Delete</button>
                </div>`
                return template;
            }
            
    drawTasks(index){
        let taskTemplate = '';
        this.tasks.forEach((task, tIndex) => {
            if (task.complete){
                taskTemplate += `<li style="color: ${this.textColor}"><strike>${task.task}</strike> <span class="text-success span-btn" onclick="app.controllers.listController.completeTask(${index}, ${tIndex})"><i class="fas fa-check"></i></span> <span class="text-danger span-btn" onclick="app.controllers.listController.deleteTask(${index}, ${tIndex})"><i class="fas fa-times"></i></span> <i class="span-btn fas fa-arrow-up" onclick="app.controllers.listController.moveTask(${index}, ${tIndex}, 'up')"></i><i class="span-btn fas fa-arrow-down"onclick="app.controllers.listController.moveTask(${index}, ${tIndex}, 'down')"></i></li>`
            } else {
                taskTemplate += `<li style="color: ${this.textColor}">${task.task} <span class="text-success span-btn" onclick="app.controllers.listController.completeTask(${index}, ${tIndex})"><i class="fas fa-check"></i></span> <span class="text-danger span-btn" onclick="app.controllers.listController.deleteTask(${index}, ${tIndex})"><i class="fas fa-times"></i></span> <i class="fas fa-arrow-up span-btn" onclick="app.controllers.listController.moveTask(${index}, ${tIndex}, 'up')"></i><i class="span-btn fas fa-arrow-down" onclick="app.controllers.listController.moveTask(${index}, ${tIndex}, 'down')"></i></li>`
            }
        });
        return taskTemplate;
    }
}