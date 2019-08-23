import List from "../models/List.js";

//Private
let _state = {
    lists: []
}


//Public
export default class ValuesService {
    addList(newList) {
        _state.lists.push(new List(newList));
        this.saveLists();
    }

    deleteList(index) {
        _state.lists.splice(index, 1);
        this.saveLists();
    }

    addTask(index, newTask) {
        _state.lists[index].tasks.push(newTask);
        this.saveLists();
    }

    deleteTask(index, tIndex) {
        _state.lists[index].tasks.splice(tIndex, 1);
        this.saveLists();
    }

    completeTask(index, tIndex) {
        if (_state.lists[index].tasks[tIndex].complete) {
            _state.lists[index].tasks[tIndex].complete = false;
        } else {
            _state.lists[index].tasks[tIndex].complete = true;
        }
        this.saveLists();
    }

    //TODO  Here is where we handle all of our data manipulation, 
    //given the information you need in the controller, 
    //what methods will be required to support that functionality?

    get Lists() {
        return _state.lists.map(list => new List(list))
    }


    //NOTE You will need this code to persist your data into local storage, these methods should not require changing

    //NOTE call saved list everytime you change the list collection in any way
    saveLists() {
        localStorage.setItem('lists', JSON.stringify(_state.lists))
    }

    //NOTE this method will get the lists from local storage at the start of the app
    getLists() {
        let saved = JSON.parse(localStorage.getItem('lists'))
        if (saved) {
            _state.lists = saved;
        }
    }
}
