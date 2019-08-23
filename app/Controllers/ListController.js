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
        swal({
            title: "Are you sure?",
            text: "Do you really want to delete this list?",
            icon: "warning",
            buttons: ["Not really...", "Yeah, destroy it!"],
            dangerMode: true
        })
            .then((sure) => {
                if (sure) {
                    _listService.deleteList(index);
                    _drawLists();
                }
            })
    }

    addTask(index, event) {
        event.preventDefault();
        let newTask = {
            task: event.target.task.value,
            complete: false
        }
        _listService.addTask(index, newTask);
        _drawLists();
    }

    deleteTask(index, tIndex) {
        swal({
            title: "Are you sure?",
            text: "Do you really want to delete this item?",
            icon: "warning",
            buttons: ["Not really...", "Yeah, destroy it!"],
            dangerMode: true
        })
            .then((sure) => {
                if (sure) {
                    _listService.deleteTask(index, tIndex);
                    _drawLists();
                }
            })
        // if (sure) {
        //     _listService.deleteTask(index, tIndex);
        // }
    }

    completeTask(index, tIndex) {
        _listService.completeTask(index, tIndex);
        _drawLists();
    }
}