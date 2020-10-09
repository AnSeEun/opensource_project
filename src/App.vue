<template>
  <div id="app">
   <div class="header">  
     <img src="./assets/hellos_logo.png" />
    <p>Note Knock</p>
   </div>
    <div class="noteContainer">
        <div v-for="(note, index) in notes" :key="`note-${index}`" class="note" :style="{'background-color': note.theme,}">
            <div>
                <span class="delete" @click.prevent="deleteNote(index)"><i class="fas fa-times"></i></span> 
                <span >{{note.title}} <font size="2em" color="gray">by {{note.nickname}} {{note.time}}</font></span>
                <p class="note-text">{{ note.text }}</p>
                <span class="color" @noteColor = "colorNote" @click.prevent="colorNote"><i class="fas fa-palette"></i></span> 
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
