export default class List {
    //TODO You will need to create a constructor 
    //and the methods needed to create the view template for this model
    constructor(data) {
        this.name = data.name
        this.tasks = data.tasks || []
    }

    getTemplate(index) {
        let template = '';
        template += `<div class="col-3 bg-secondary m-5 p-3 rounded">
                <h3>${this.name}</h3>
                <hr>
                <ul>`
        template += this.drawTasks(index);
        template += `</ul>
            <form onsubmit="app.controllers.listController.addTask(${index}, event)">
                <input type="text" class="form-control" name="task" placeholder="Add a task">
                <button class="btn btn-success" type="submit"><i class="fas fa-plus"></i></button>
            </form>
                <button class="btn btn-danger" onclick="app.controllers.listController.deleteList(${index})">Delete</button>
                </div>`
                return template;
            }
            
    drawTasks(index){
        let taskTemplate = '';
        this.tasks.forEach((task, tIndex) => {
            taskTemplate += `<li>${task} <span class="text-danger" onclick="app.controllers.listController.deleteTask(${index}, ${tIndex})"><i class="fas fa-times"></i></span></li>`
        });
        return taskTemplate;
    }
}