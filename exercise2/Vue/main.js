var app = new Vue({
    el: '#app',
    data: {
        input:'Default test text',
        highlight:'te',
        color:'',
        tokensHL:['Default', 'test', 'text']
    },
    methods: {
        createTokens: function (){
            tokens= this.input.split(" ")
            this.tokensHL=[]
            for (key in tokens){
                this.tokensHL.push(tokens[key].replaceAll(this.highlight, "<font color='"+this.color+"'>"+this.highlight+"</font>"))
            }

        }
    },
    computed: {
        markHL: function (){
            return this.input.replaceAll(this.highlight, "<mark>"+this.highlight+"</mark>")
        },
        classHL: function (){
            return this.input.replaceAll(this.highlight, "<span class='highlight'>"+this.highlight+"</span>")
        }

    }
})
