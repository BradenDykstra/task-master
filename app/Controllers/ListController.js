import ListService from "../Services/ListService.js";

//Private
let _listService = new ListService()

//TODO Don't forget to render to the screen after every data change.
function _drawLists() {
    let template = '';
    _listService.Lists.forEach((list, index) => {
        template += list.getTemplate(index)
    });
    document.getElementById("lists").innerHTML = template;
}


//Public
export default class ListController {
    constructor() {
        //NOTE: When the app first starts we want to pull any potential data out of memory
        _listService.getLists();
        //NOTE: After updating the store, we can automatically call to draw the lists.
        _drawLists();
    }

    //TODO: Your app will need the ability to create, and delete both lists and listItems
    addList(event) {
        event.preventDefault();
        let newList = {
            name: event.target.name.value,
            textColor: event.target.textColor.value,
            bgColor: event.target.bgColor.value
        };
        _listService.addList(newList);
        _drawLists();
    }

    deleteList(index) {
        let sure = confirm("Are you sure you want to delete this list?");
        if (sure) {
            _listService.deleteList(index);
        }
        _drawLists();
    }

    addTask(index, event) {
        event.preventDefault();
        let newTask = event.target.task.value;
        _listService.addTask(index, newTask);
        _drawLists();
    }

    deleteTask(index, tIndex) {
        let sure = confirm("Are you sure you want to delete this task?");
        if (sure) {
            _listService.deleteTask(index, tIndex);
        }
        _drawLists();
    }
}