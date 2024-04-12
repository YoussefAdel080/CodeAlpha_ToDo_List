let currentTheme = 'light';
$('.theme-icon').on('click',function(e){
    if(currentTheme === 'light')
    {
        e.target.classList.remove('fa-solid', 'fa-moon');
        e.target.classList.add('fa-solid', 'fa-sun');
    
        document.body.style.setProperty('background-color', 'hsl(235, 24%, 19%)');
        document.documentElement.style.setProperty('--white', 'hsl(237, 14%, 26%)');
        document.documentElement.style.setProperty('--very-light-gray', 'hsl(233, 14%, 35%)');
        document.documentElement.style.setProperty('--very-dark-grayish-blue', 'hsl(234, 39%, 85%)');

        if (window.matchMedia('(max-width: 470px)').matches) {
            $('.bg-img').attr("src",'images/bg-mobile-dark.jpg');    
        }
        else {
            $('.bg-img').attr("src",'images/bg-desktop-dark.jpg');
        };

        
        currentTheme = 'dark';
    }
    else
    {
        e.target.classList.remove('fa-solid', 'fa-sun');
        e.target.classList.add('fa-solid', 'fa-moon');

        
        document.documentElement.style = '';
        document.body.style = '';
        
        if (window.matchMedia('(max-width: 470px)').matches) {
            $('.bg-img').attr("src",'images/bg-mobile-light.jpg');    
        }
        else {
            $('.bg-img').attr("src",'images/bg-desktop-light.jpg');
        };

        currentTheme = 'light';
    }
    
})

if (window.matchMedia('(max-width: 470px)').matches && currentTheme === 'light') {
    $('.bg-img').attr("src",'images/bg-mobile-light.jpg');    
}
else if(window.matchMedia('(max-width: 470px)').matches && currentTheme === 'dark'){
    $('.bg-img').attr("src",'images/bg-mobile-dark.jpg');
};




let enteredTask = '';
let allTasks = [];
let compeletedTasks = [];
let activeTasks = [];
let currentTasksCategory = 'All';

$('.todo-input').on('input',function(e) {
    enteredTask = e.target.value;
});

$(document).on('keypress',function(e) {
    if(e.which == 13 && enteredTask != '') {
        checkSecondaryContainerHight();
        $('.todo-input')[0].value = ''
        const generatedTask = generateTask(enteredTask);
        enteredTask = '';
        setTasks('e',generatedTask);
        
        generatedTask.addEventListener('change',function(e){
            if(e.target.checked)
            {
                e.target.nextElementSibling.classList.add('completed-task');
                setTasks('c' , e.target.parentElement)
            }
            else
            {
                e.target.nextElementSibling.classList.remove('completed-task');
                setTasks('u' , e.target.parentElement)
            }
            updateTasksCategory(currentTasksCategory);
        });
        
    }
});


$('.todo-footer-nav button').on('click',function(e)
{
    setTasksCategory(e.target);
    updateTasksCategory(currentTasksCategory);
});

$('.clear-btn').on('click',function(e)
{
    clearCompletedtasks();
})

function generateTask(enteredTask)
{
    let listItemInput = $('<input>').addClass("todo-check rounded-circle")[0];
    listItemInput.type = 'checkbox';

    let listItemTaskDescription = $('<h2>').addClass("fs-6 m-0 ms-3")[0];
    listItemTaskDescription.innerText = enteredTask;

    let taskDeleteIcon = $('<i>').addClass("delete-icon fa-solid fa-x fw-light fs-6 ms-auto")[0]

    let listItem = $('<li>').addClass('todo d-flex align-items-center p-3').append(listItemInput).append(listItemTaskDescription).append(taskDeleteIcon); 
    taskDeleteIcon.addEventListener('click' ,e =>  deleteTask(e.target.parentElement));

    return listItem[0];
}

function updateTasksCategory(currentTasksCategory)
{
    resetTasks();
    if(currentTasksCategory === 'All')
    {
        allTasks.forEach(element => {
            $('.todo-list')[0].append(element);
        });
    }
    else if(currentTasksCategory === 'Active')
    {   
        activeTasks.forEach(element => {
            $('.todo-list')[0].append(element);
        });
    }
    else
    {
        compeletedTasks.forEach(element => {
            $('.todo-list')[0].append(element);
        });
    }
}

function setTasks(condition , task)
{
    if(condition === 'e')
    {
        allTasks.push(task);
        activeTasks.push(task);
    }
    else if(condition === 'c')
    {
        activeTasks = activeTasks.filter(iteme => iteme !== task)
        compeletedTasks.push(task);
    }
    else
    {
        activeTasks.push(task);
        compeletedTasks = compeletedTasks.filter(iteme => iteme !== task)
    }
    updateTasksLeft();
    updateTasksCategory(currentTasksCategory);
}

function updateTasksLeft()
{
    $('.todos-left-number')[0].innerText = activeTasks.length
};

function resetTasks()
{
    $('.todo-list').html("");
}

function setTasksCategory(ele)
{
    Array.from($('.todo-footer-nav')[0].children).forEach(cat => {if(cat == ele){ele.classList.add('current')}else{cat.classList.remove('current')}})
    currentTasksCategory = ele.innerText;
};

function deleteTask(task)
{
    allTasks = allTasks.filter(iteme => iteme !== task)
    activeTasks = activeTasks.filter(iteme => iteme !== task)
    compeletedTasks = compeletedTasks.filter(iteme => iteme !== task)
    resetTasks();
    updateTasksCategory(currentTasksCategory);
    updateTasksLeft();
}

function clearCompletedtasks()
{
    resetTasks();
    allTasks = activeTasks;
    compeletedTasks = [];
    updateTasksCategory(currentTasksCategory);
}

function checkSecondaryContainerHight()
{
    if(Math.ceil((($(".mb-todo-footer-nav")[0].getBoundingClientRect().top > 0)*($(".mb-todo-footer-nav").height()+(3*16))) +
    ($(".todo-footer")[0].getBoundingClientRect().bottom + (2*16)) +
    ($('.todo-list li').height()+(2*16))) >= $(window).height()
    )
    {
        $('.todo-list').css({'max-height': Math.ceil($('.todo-list').height().toString()),
        'overflow-y':'scroll'
    })
    } 
    
};

