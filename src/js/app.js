///////////////////Declare Dom/////////////////////////

const toastBox = document.querySelector("#toast-success");
const toastId = document.querySelector(".toast-text");
const btnAddNote = document.querySelector(".btn__note");

///////////////////Events/////////////////////////////

document.addEventListener("DOMContentLoaded", initNote);
document.addEventListener("click", (e) => showToast(e));
btnAddNote.addEventListener("click", addNewNote);
/////////////////////Function//////////////////////////
function initNote() {
  let currentNotes = Notes.getAllNotes();
  currentNotes.forEach((note) => {
    addNotes(note);
  });
  let id = 0;
  const noteItems = document.querySelectorAll(".notes__list-item");
  const noteMaintitle = document.querySelector(".main__title");
  const noteMainContent = document.querySelector(".main__content");
  const deleteNote = document.querySelector(".delete__note");
  const previewNote = document.querySelector(".notes__preview");

  [noteMaintitle, noteMainContent].forEach((input) => {
    input.addEventListener("blur", () => {
      const updatedNote = Notes.getNote(id);
      updatedNote.title = noteMaintitle.value.trim();
      updatedNote.description = noteMainContent.value.trim();
      updatedNote.updateAt = new Date().echoFa();
      updatedNote.timeStamp = (new Date().valueOf() / 10000).toFixed(0);
      Notes.updateNote(updatedNote, currentNotes);
      location.reload();
    });
  });

  // noteMaintitle.addEventListener("focusout", () => {
  //   const updatedNote = Notes.getNote(id);
  //   updatedNote.title = noteMaintitle.value;
  //   updatedNote.updateAt = new Date().echoFa();
  //   updatedNote.timeStamp = (new Date().valueOf() / 10000).toFixed(0);
  //   Notes.updateNote(updatedNote, currentNotes);
  //   location.reload();
  // });

  // noteMainContent.addEventListener("focusout", () => {
  //   const updatedNote = Notes.getNote(id);
  //   updatedNote.description = noteMainContent.value;
  //   updatedNote.updateAt = new Date().echoFa();
  //   updatedNote.timeStamp = (new Date().valueOf() / 10000).toFixed(0);
  //   Notes.updateNote(updatedNote, currentNotes);
  //   location.reload();
  // });

  deleteNote.addEventListener("click", () => {
    console.log("What Delete..");
    Notes.deleteNote(id);
    location.reload();
  });

  noteItems.forEach((e) => {
    e.addEventListener("click", () => {
      id = e.dataset.id;
      let selectedNote = Notes.getNote(id);
      console.log(selectedNote.title);
      noteMaintitle.value = selectedNote.title;
      noteMaintitle.value = selectedNote.title;
      noteMainContent.value = selectedNote.description;
    });
  });
}

function addNotes(note) {
  const MAX_DESCRIPTION_LEN = 50;
  let newNote = `<div
  class="notes__list-item w-full p-2 max-h-36  border border-gray-100  rounded-md space-y-2 cursor-pointer" data-id=${note.id}>
  <span class="notes__title block font-medium" data-id=${note.id}>${note.title}</span>
  <span
    class="notes__body block max-h-20 font-light text-ellipsis overflow-hidden text-justify" data-id=${note.id}}
    >${note.description.substring(0,MAX_DESCRIPTION_LEN)}${note.description.length > MAX_DESCRIPTION_LEN ?"...":""}
    </span
  >
  <div
  class="notes__date w-full font-thin text-left text-sm text-gray-300 "
  >${note.updateAt}</div
>
</div>`;
  let currentNotes = noteList.innerHTML;
  noteList.innerHTML = currentNotes + newNote;
}

function addNewNote() {
  let count = getCounter() + 1;
  const note = {
    id: count,
    title: " يادداشت" + count,
    description: "توضيحات يادداشت " + count,
    updateAt: new Date().echoFa(),
    timeStamp: (new Date().valueOf() / 10000).toFixed(0),
    isModified: false,
  };
  Notes.addNote(note);
  // setCounter();
  let newNote = `<div
  class="notes__list-item w-full p-2 max-h-36  border border-gray-100 rounded-md space-y-2 cursor-pointer" data-id=${note.id}>
  <span class="notes__title block font-medium" data-id=${note.id}>${note.title}</span>
  <span
    class="notes__body block max-h-20 font-light text-ellipsis overflow-hidden text-justify" data-id=${note.id}}
    >${note.description}
    </span
  >
  <div
    class="notes__date w-full flex items-end justify-end font-thin text-left text-sm text-gray-300"
    >${note.updateAt}</div
  >
</div>`;
  let currentNotes = noteList.innerHTML;
  noteList.innerHTML = currentNotes + newNote;
  setCounter();
  location.reload();
  // console.log(strNotes);
}

function showToast(e) {
  console.log(toastId.classList);
  toastId.innerHTML = e.target.classList[0];
}

function getCounter() {
  return JSON.parse(localStorage.getItem("count")) || 0;
}

function setCounter() {
  // console.log(noteList.childElementCount);
  console.log(noteList.childElementCount);
  console.log(getCounter());
  noteList.childElementCount > getCounter()
    ? localStorage.setItem("count", JSON.stringify(noteList.childElementCount))
    : localStorage.setItem("count", getCounter() + 1);
}

///////////////////////////DOM//////////////////////////
const noteList = document.querySelector(".notes__list");

////////////////////////Class Notes/////////////////////
class Notes {
  static getAllNotes() {
    return JSON.parse(localStorage.getItem("notes")) || [];
  }

  static addNote(note) {
    //Array of Object
    const notes = Notes.getAllNotes();
    // console.log(notes);
    notes.find((n) => n.id == note.id)
      ? note.isModified
        ? this.updateNote(note)
        : true
      : notes.push(note);

    console.log(notes);
    notes.sort((a, b) => b.timeStamp - a.timeStamp);
    localStorage.setItem("notes", JSON.stringify(notes));
  }

  static updateNote(note) {
    const notes = this.getAllNotes();
    notes.map((n) => {
      console.log(n);
      if (n.id == note.id) {
        n.title = note.title;
        n.description = note.description;
        n.updateAt = note.updateAt;
        n.timeStamp = note.timeStamp;
        n.isModified = false;
      }
    });
    notes.sort((a, b) => b.timeStamp - a.timeStamp);
    localStorage.setItem("notes", JSON.stringify(notes));
  }

  static getNote(id) {
    const notes = this.getAllNotes();
    return notes.find((n) => n.id == id) || {};
  }

  static deleteNote(id) {
    const notes = this.getAllNotes();
    const deleteNotes = notes.filter((note) => note.id != id);
    localStorage.setItem("notes", JSON.stringify(deleteNotes));
  }
}
