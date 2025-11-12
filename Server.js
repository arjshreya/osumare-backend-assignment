const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const PORT = 5000;

app.use(express.json());

const SECRET_KEY="secretkey";

let tasks=[];

const users=[
    {id:1, username: 'admin', password: 'admin123',role: 'admin'},
    {id:2, username: 'user', password: 'user123', role: 'user'}
];

app.post('/login',(req,res)=>{
    const {username,password}= req.body;
    const user=users.find(u=>u.username ===username &&u.password ===password);
    if(!user)return res.status(400).json({message:"Invalid credentials"});

    const token= jwt.sign({id: user.id, role: user.role},SECRET_KEY,{expiresIn:'1h'});
    res.json({token});
});

function tokenAuthentication(req,res,next){
    const authHeader= req.headers['authorization'];
    const token=authHeader && authHeader.split(' ')[1];
    if(!token)return res.status(401).json({message:"No token provided"});

    jwt.verify(token, SECRET_KEY, (err,user)=>{
        if(err)return res.status(403).json({message:"Invalid token"});
        req.user = user;
        next();
    });
}

function roleAuthorization(role){
    return(req,res,next)=>{
        if(req.user.role!==role){
            return res.status(403).json({message: "Insufficient rights"});
        }
        next();
    };
}

//GET-to fetch all tasks from list
app.get('/tasks',tokenAuthentication,(req,res)=>{
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

app.get('/tasks/:id',tokenAuthentication,(req,res)=>{
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
app.post('/tasks',tokenAuthentication,(req,res)=>{
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
app.put('/tasks/:id',tokenAuthentication,(req,res)=>{
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

app.delete('/tasks/:id',tokenAuthentication,roleAuthorization('admin'),(req,res)=>{
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