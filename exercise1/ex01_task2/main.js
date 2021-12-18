var app = new Vue({
    el: '#app',
    data: {
        oTasks:[{ prio: 'A', text: "Finish the assignment"},
        {prio: 'A', text: 'Remember to submit the assignment'}],
        cTasks:[],
        newPrio:"",
        newText:""
    },
    methods: {
        createTask: function (newPrio,newText){
            this.oTasks.push({prio:newPrio, text:newText})
        },
        completeTask: function (oTask){
            this.cTasks.push({prio:oTask.prio, text:oTask.text})
            this.oTasks.splice(this.oTasks.indexOf(oTask), 1);
        },
        deleteOpenTask(oTask) {
            this.oTasks.splice(this.oTasks.indexOf(oTask), 1);
            //remove one element starting from the element 'item'
        },
        deleteCompletedTask(cTask) {
            this.cTasks.splice(this.cTasks.indexOf(cTask), 1);
        }
    }

})

