var app = new Vue({
    el: '#app',
    data: {
        //input:'This is an example text highlighting the 8 default colours for this particular app.',
        input:'In information extraction, a named entity is a real-world object, such as a person, location, organization, product, etc., that can be denoted with a proper name. It can be abstract or have a physical existence. Examples of named entities include Barack Obama, New York City, Volkswagen Golf, or anything else that can be named. Named entities can simply be viewed as entity instances (e.g., New York City is an instance of a city). From a historical perspective, the term Named Entity was coined during the MUC-6 evaluation campaign[1] and contained ENAMEX (entity name expressions e.g. persons, locations and organizations) and NUMEX (numerical expression). A more formal definition can be derived from the rigid designator by Saul Kripke. In the expression "Named Entity", the word "Named" aims to restrict the possible set of entities to only those for which one or many rigid designators stands for the referent.[2] A designator is rigid when it designates the same thing in every possible world. On the contrary, flaccid designators may designate different things in different possible worlds. As an example, consider the sentence, "Biden is the president of the United States". Both "Biden" and the "United States" are named entities since they refer to specific objects (Joe Biden and United States). However, "president" is not a named entity since it can be used to refer to many different objects in different worlds (in different presidential periods referring to different persons, or even in different countries or organizations referring to different people). Rigid designators usually include proper names as well as certain natural terms like biological species and substances. There is also a general agreement in the Named Entity Recognition community to consider temporal and numerical expressions as named entities, such as amounts of money and other types of units, which may violate the rigid designator perspective. The task of recognizing named entities in text is Named Entity Recognition while the task of determining the identity of the named entities mentioned in text is called Named Entity Disambiguation. Both tasks require dedicated algorithms and resources to be addressed.[3] ',
        current_hl_token:'',
        current_hl_color:'',
        default_colors:['cyan','blue','violet','darkred','red','orange','yellow','greenyellow','green'],
        used_colors_pos:[],
        used_colors_ne:[],
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
                this.html_text=[]
                this.pos_list.push(...response.data)
                console.log(this.pos_list)
                app.doHighlighting(this.pos_list,this.used_colors_pos)
            })
            .catch(error=> console.log(error.message))
            
            
            
            console.log(app.getRandomColor())

            // Send POST_HL_POS    
        },
        doHighlighting: function (tokenized_list,color_mapping_list){
            tokenized_list.forEach(function(pos_el){
                 // 0) For each POS element
                // 1) Check if POS-tag is in used-colors list (object: pos,color)
                    // a) Pick default color or new 
                    // b) Add mapping to color_mapping_list
                    // c) Add POS element to html-text
                    
                    //pos_color_mapping={}
                    
                    if(color_mapping_list.filter(el => el.pos==pos_el.pos).length){
                        app.current_hl_color=color_mapping_list.find(el => el.pos==pos_el.pos).color                   
                        app.current_hl_token={pos:pos_el.pos,color:app.current_hl_color}
                    }
                    else{
                        app.current_hl_color=''
                        app.default_colors.forEach(function(default_color){
                            if(!color_mapping_list.filter(el => el.color==default_color).length){
                                app.current_hl_color=default_color
                                //break
                            }
                        })
                        if(app.current_hl_color==''){
                            app.current_hl_color=app.getRandomColor()     
                        }                      
                        app.current_hl_token={pos:pos_el.pos,color:app.current_hl_color}
                        
                        color_mapping_list.push(app.current_hl_token)
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
            // Send POST_HL_NE 
            // Clear existing POS tagging
            this.ne_list=[]

            const data = new FormData()
            data.append("text",this.input)

            //const res = await 
            axios.post('http://localhost:5000/HL-NE', data)
            .then(response => {
                this.ne_list=[]
                this.html_text=[]
                this.ne_list.push(...response.data)
                console.log(this.ne_list)
                app.doHighlighting(this.ne_list,this.used_colors_ne)
            })
            .catch(error=> console.log(error.message))   
        }
    }
})
