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
  <div>
      <SearchNote @noteSearched="searchNote"></SearchNote>
  </div>
    <div class="noteContainer">
        <div v-for="(note, index) in notesFilter(selected,search)" :key="`note-${index}`" class="note" :style="{'background-color': note.theme,}">
            <div>
              <span class="favorites"><i class="far fa-star"></i></span>
              <span class="delete" @click.prevent="deleteNote(index)"><i class="fas fa-times"></i></span> 
              <span class="note-date-span"><font class="note-date" size="2em" color="#FFFFFF">{{note.time}} <u><i>By {{note.nickname}}</i></u></font></span>
              <input class="title-view" type="text" v-model="note.title" placeholder="Title">
              <p/>
              <textarea class="note-textarea" rows="9" onclick="this.selec()" v-model="note.text" placeholder="Take a note..."></textarea>
              <hr/> 
              <span><span class="textform-B">B</span><span class="textform-U">U</span><span class="textform-I">I</span></span>
              <span class="category-form">
                 <select v-model="note.category">
                  <option v-for="list in categorys" :key="list">
                    {{list}}
                  </option>
                  <option>사용자 추가</option>                 
                  </select>
              </span>
              <span class="note-color" @click="modalColor(index)"><i class="fas fa-palette"></i></span>
                <div class="note-colorform" v-show="notes[index].is_show">
                  <ul>
                    <li class="color1" @click="setNoteColor(index, colors[0])"></li>
                    <li class="color2" @click="setNoteColor(index, colors[1])"></li>
                    <li class="color3" @click="setNoteColor(index, colors[2])"></li>
                    <li class="color4" @click="setNoteColor(index, colors[3])"></li>
                    <li class="color5" @click="setNoteColor(index, colors[4])"></li>
                  </ul>
                </div>
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
import NoteSearch from './components/Search.vue';

export default {
  name: 'App',
  data: function() {
    return {
      editorOpen: false,
      selected:'',
      search:'',
      notes: [
        {
          category:'',
          nickname:'user1',
          title: 'Code',
          text: '1131111222',
          theme: '#FF8A80',
          time : '',
          is_show: false,
        },
        {
          category:'',
          nickname:'user2',
          title: 'event',
          text: 'event',
          theme: '#DDA0DD',
          time : '',
          is_show: false,
        },
      ],
      categorys:['기본','To-do List'],
      colors: ["#F4CCCC", "#EB9F9F", "#E7D9E7", "#FFF2CC", "#F2F2F2"],    
    }
  },

	computed: {
		
  },
  
  methods: {   
    newNote(category,nickname,title, text, theme,time,is_show) {
      this.notes.push({category:category,nickname:nickname,title: title, text: text, theme: theme,time:time,is_show:is_show});
      this.editorOpen = false;
    },
    deleteNote(index) {
      this.notes.splice(index, 1)
    },
    notesFilter: function(category,search){
      return this.notes.filter(function(note){
          return (note.category == category || category=='') && (note.text.includes(search) || note.title.includes(search) ||search=='')
      })
    },
    setNoteColor: function(index, color) {
      this.notes[index].is_show = !this.notes[index].is_show;
      this.notes[index].theme = color;
      // console.log(color);
      // ("note-colorform").click(function(){
      //   ("note-colorform").fadeIn();
      // });
    },
    modalColor: function(index) {
      this.notes[index].is_show = !this.notes[index].is_show;
      // console.log(index, this.notes[index].is_show);
    },
    searchNote(search){
      this.search = search;
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
   appNoteEditor: NoteEditor,
   SearchNote: NoteSearch
  }
}
</script>

<style lang="scss">
  @import '/styles/global.scss';
</style>
