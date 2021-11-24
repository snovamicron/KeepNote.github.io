const updateData = ()=>{
    const notePad = document.querySelectorAll('.notePad > .writeText');
    let dataArray = [];
    notePad.forEach((data)=>{
        return dataArray.push(data.value);
    });
    localStorage.setItem('data',JSON.stringify(dataArray));
};

const creatNote = (text ="")=>{
    // creating the note box 
    const note = document.createElement('div');
    note.classList.add('notePad');
    
    const htmlData = `<div style="height: 45px;"><button class="edit"><i class="far fa-edit"></i></button>
    <button class="delete"><i class="fas fa-trash-alt"></i></button></div>
    <div class="note writeDiv ${text ? "" : "hidden"}"> </div>
    <textarea class="note writeText ${text ? "hidden" : ""}" ></textarea>`;
    
    note.insertAdjacentHTML('afterbegin', htmlData);
    
    // deleteing the note 
    const delBtn = note.querySelector('.delete');
    delBtn.addEventListener('click', ()=> {
        note.remove();
        updateData();
    });
    
    // toggeling the hidden class
    const editBtn = note.querySelector('.edit');
    editBtn.addEventListener('click', ()=>{
        note.querySelector('.writeText').classList.toggle('hidden');
        note.querySelector('.writeDiv').classList.toggle('hidden');
    })
    
    // putting the text value
    note.querySelector('.writeDiv').innerHTML = text;
    note.querySelector('.writeText').innerHTML = text;
    
    
    // get user input
    note.querySelector('.writeText').addEventListener('change', (event)=>{
        const value = event.target.value;
        console.log(value);
        note.querySelector('.writeDiv').innerHTML = value;
        updateData();
    })
   
    const noteSection = document.getElementById('noteSection');
    noteSection.appendChild(note);
}

let allSaveData = JSON.parse(localStorage.getItem('data'));
if(allSaveData){allSaveData.forEach((data)=>creatNote(data))};
const addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', ()=> creatNote());