var app = new Vue({
    el: '#app',
    data: {
        input:'This is an example text highlighting the 8 default colours for this particular app.',
        current_hl_token:'',
        current_hl_color:'',
        default_colors:['cyan','blue','violet','darkred','red','orange','yellow','greenyellow','green'],
        used_pos:[],
        used_colors:[],
        pos_list:[],
        ne_list:[],
        html_text:[],
        pos_color_pickers:[{pos:'NOUN',color:'green'},{pos:'VERB',color:'red'}]
        },
    methods: {
        highlightPOS: function (){
            // Clear existing POS tagging
            this.pos_list=[]

            const data = new FormData()
            data.append("text",this.input)

            //const res = await 
            axios.post('http://localhost:5000/HL-POS', data)
            .then(response => {
                this.pos_list=[]
                this.used_pos=[]
                this.used_colors=[]
                this.html_text=[]
                this.pos_list.push(...response.data)
                console.log(this.pos_list)
                app.doHighlighting(this.pos_list)
            })
            .catch(error=> console.log(error.message))
            
            
            
            console.log(app.getRandomColor())

            // Send POST_HL_POS    
        },
        doHighlighting: function (tokenized_list){
            tokenized_list.forEach(function(pos_el){
                 // 0) For each POS element
                // 1) Check if POS-tag is in used-colors list (object: pos,color)
                    // a) Pick default color or new 
                    // b) Add mapping to used_colors
                    // c) Add POS element to html-text
                    
                    //pos_color_mapping={}
                    
                    if(app.used_pos.includes(pos_el.pos)){
                        app.current_hl_color=app.used_colors.find(el => el.pos==pos_el.pos)                        
                        app.current_hl_token={pos:pos_el.pos,color:app.current_hl_color}
                    }
                    else{
                        app.current_hl_color=''
                        app.default_colors.forEach(function(default_color){
                            if(!app.used_colors.filter(el => el.color==default_color).length){
                                app.current_hl_color=default_color
                                //break
                            }
                        })
                        if(app.current_hl_color==''){
                            app.current_hl_color=app.getRandomColor()     
                        }                      
                        app.current_hl_token={pos:pos_el.pos,color:app.current_hl_color}
                        
                        app.used_pos.push(pos_el.pos)
                        app.used_colors.push(app.current_hl_token)
                    }
                    app.html_text.push("<font color='"+app.current_hl_color+"'>"+pos_el.text+"</font>")
                    console.log(pos_el.text,pos_el.pos)
                    //if(pos_el.)
            })
            
        },
        getRandomColor: function(){
            var letters = '0123456789ABCDEF'
            var color = '#'
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)]
            }
            return color
        },
        highlightNE: function (){
            //const res = await axios.post('localhost:5000/HL-NE', { text: input });
            //res.data.json;
            // Send POST_HL_NE    
        }
    },
    mounted:{
         //axios.post('localhost:5000/HL-NE', { text: input }).then(response => (this.info = response))
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
