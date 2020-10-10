<template>
  <div id="app">
   <div class="header">  
     <img src="./assets/hellos_logo.png" />
    <p><a href="javascript:location.reload()">Note Knock</a></p>
    <p class="sub-title" style="font-size:70px; margin:0px">낰낰</p>
   </div>
    <div class="noteContainer">
        <div v-for="(note, index) in notes" :key="`note-${index}`" class="note" :style="{'background-color': note.theme,}">
            <div>
              <input class="title-view" type="text" v-model="note.title" placeholder="Title">
                <span class="delete" @click.prevent="deleteNote(index)"><i class="fas fa-times"></i></span> 
                <span ><p class="note-date" font size="2em" color="#654B52">by {{note.nickname}} {{note.time}}</p></span>
                <textarea class="note-textarea" rows="9" onclick="this.selec()" v-model="note.text" placeholder="Take a note..."></textarea>
                <hr/>
                
                <span><span class="textform-B">B</span><span class="textform-U">U</span><span class="textform-I">I</span></span>
                <span class="note-color" @noteColor = "colorNote" @click.prevent="colorNote"><i class="fas fa-palette"></i></span> 
            </div>
        </div>
    <app-note-editor v-if="editorOpen" @noteAdded="newNote" @noteDeleted="deleteNote"></app-note-editor>
    <button class="add-btn" @click.prevent="editorOpen = !editorOpen"><i class="fas fa-plus"></i>
     </button>
    </div>
  </div>
</template>

<script>
import NoteEditor from './components/NoteEditor.vue';

export default {
  name: 'App',
  data: function() {
    return {
      editorOpen: false,
      notes: [
        {
          nickname:'user1',
          title: 'Code',
          text: '1131111222',
          theme: '#FF8A80',
          time : '',
        },
        {
          nickname:'user2',
          title: 'event',
          text: 'event',
          theme: '#DDA0DD',
          time : '',
        },
      ],      
    }
  },
	computed: {
		
	},
  methods: {   
    newNote(nickname,title, text, theme,time) {
      this.notes.push({nickname:nickname,title: title, text: text, theme: theme,time:time});
      this.editorOpen = false;
    },
    deleteNote(index) {
      this.notes.splice(index, 1)
    },
    reviseNote(){

    },
    colorNote(index){
      this.notes.slice(index,1)
      
    }

  },
  mounted() {
    if (localStorage.getItem('notes')) this.notes = JSON.parse(localStorage.getItem('notes'));
  },
  watch: {
    notes: {
      handler() {
        var newNotes = this.notes;
        localStorage.setItem('notes', JSON.stringify(newNotes));
      },
      deep: true,
    },
  },
  components: {
   appNoteEditor: NoteEditor
  }
}
</script>

<style lang="scss">
  @import '/styles/global.scss';
</style>
