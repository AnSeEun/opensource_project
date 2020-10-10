<template>
  <div id="app">
   <div class="header">  
     <img src="./assets/hellos_logo.png" />
    <p><a href="javascript:location.reload()">Note Knock</a></p>
    <p class="sub-title" style="font-size:70px; margin:0px">낰낰</p>
   </div>
   <div> 
     <select class="category-filter" v-model="selected">
              <option value=''>전체</option>
              <option v-for="list in categorys" :key="list">
                {{list}}
              </option>                 
     </select>
  </div>
  <div class="search-filter">
    <input type="text">
    <button type="submit">검색</button>
  </div>
    <div class="noteContainer">
        <div v-for="(note, index) in notesFilter(selected)" :key="`note-${index}`" class="note" :style="{'background-color': note.theme,}">
            <div>
              <span class="favorites"><i class="far fa-star"></i></span>
              <span class="delete" @click.prevent="deleteNote(index)"><i class="fas fa-times"></i></span> 
              <span class="note-date-span"><font class="note-date" size="2em" color="#FFFFFF">{{note.time}} <u><i>By {{note.nickname}}</i></u></font></span>
              <input class="title-view" type="text" v-model="note.title" placeholder="Title">
              <p/>
              <textarea class="note-textarea" rows="9" onclick="this.selec()" v-model="note.text" placeholder="Take a note..."></textarea>
              <hr/> 
              <span><span class="textform-B">B</span><span class="textform-U">U</span><span class="textform-I">I</span></span>
              <span class="categoryform">
                 <select v-model="note.category">
                  <option v-for="list in categorys" :key="list">
                    {{list}}
                  </option>
                  <option>사용자 추가</option>                 
                  </select>
              </span>
              <span class="note-color"><i class="fas fa-palette"></i></span> 
            </div>
        </div>
    <app-note-editor :categorylist=categorys v-if="editorOpen" @noteAdded="newNote" @noteDeleted="deleteNote"></app-note-editor>
    <button class="add-btn" @click.prevent="editorOpen = !editorOpen"><i id="plus" class="fas fa-plus"></i>
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
      selected:'',
      notes: [
        {
          category:'',
          nickname:'user1',
          title: 'Code',
          text: '1131111222',
          theme: '#FF8A80',
          time : '',
        },
        {
          category:'',
          nickname:'user2',
          title: 'event',
          text: 'event',
          theme: '#DDA0DD',
          time : '',
        },
      ],
      categorys:['기본','To-do List'],        
    }
  },
	computed: {
		
	},
  methods: {   
    newNote(category,nickname,title, text, theme,time) {
      this.notes.push({category:category,nickname:nickname,title: title, text: text, theme: theme,time:time});
      this.editorOpen = false;
    },
    deleteNote(index) {
      this.notes.splice(index, 1)
    },
    notesFilter: function(category){
      return this.notes.filter(function(note){
          return note.category == category || category==''
      })
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
