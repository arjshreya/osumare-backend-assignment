const express = require('express');
const app = express();
const PORT = 5000;

app.use(express.json());

let tasks=[];
//GET-to fetch all tasks from list
app.get('/tasks',(req,res)=>{
    let page= parseInt(req.query.page)||1;
    let limit= parseInt(req.query.limit)||10;
    let{sort, order, title, description}=req.query;
    order=order ==='desc'?'desc':'asc';


    //filtering
    let filteredTasks =tasks.filter(t=>{
        let MatchTitle=true;
        let MatchDescription=true;
    if(title){
        MatchTitle = t.title.toLowerCase().includes(title.toLowerCase());
    
    }
    if(description){
        MatchDescription = t.description.toLowerCase().includes(description.toLowerCase());

    }
    return MatchTitle && MatchDescription;
});
    //sorting
    if(sort){
        filteredTasks.sort((a,b)=>{
            if(a[sort] > b[sort])return order==='asc'?1:-1;
            if(a[sort] < b[sort])return order==='asc'?-1:1;
            return 0;
        });
    }
    //pagination
    let startIndex=(page - 1)*limit;
    let endIndex= startIndex + limit;
    const paginateTask=filteredTasks.slice(startIndex,endIndex);
    
    const response={
        page: page,
        limit: limit,
        totalTasks: filteredTasks.length,
        totalpages: Math.ceil(filteredTasks.length/limit),
        tasks: paginateTask
    };
    res.json(response);
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

//POST-to add a new task in list
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
//PUT-update a task by id in a list
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