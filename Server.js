const express = require('express');
const app = express();
const PORT = 5000;

app.use(express.json());

let tasks=[];

app.get('/tasks',(req,res)=>{
    res.json(tasks);
});

app.get('/tasks/:id',(req,res)=>{
    const task = tasks.find(t=> t.id ===parseInt(req.params.id));
    if(!task){
        return res.status(404).json({message:'Task not found'});
    }
    res.json(task);
});

app.get('/',(req,res)=>{
    res.send("Server ruuning properly!");
});

//POST-to add new task
app.post('/tasks',(req,res)=>{
    const{title,description}=req.body;
    if(!title || !description){
        return res.status(400).json({message:'Title and description required'
        });
    }
    const newTask={
        id:tasks.length +1,
        title,
        description,
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});
//PUT-update a task
app.put('/tasks/:id',(req,res)=>{
    const task = tasks.find(t=>t.id === parseInt(req.params.id));
    if(!task){
        return res.status(404).json({message:'Task not found'});
    }
    const {title,description}= req.body;
    if(!title||!description){
        return res.status(400).json({message:'Title and description required'});
    }
    task.title=title;
    task.description=description;
    res.json(task);
});

app.delete('/tasks/:id',(req,res)=>{
    const taskIndex =tasks.findIndex(t=>t.id ===parseInt(req.params.id));
    if(taskIndex ===-1)
        {
            return res.status(404).json({message:'Task not found'});
        }
    tasks.splice(taskIndex,1);
    res.json({message:'Task deleted succesfully'});
});

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
});