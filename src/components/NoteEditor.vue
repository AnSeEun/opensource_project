<template>
    <div class="note-grid">
        <div class="note-editor">
            <input class="title-input" type="text" v-model="title" placeholder="Title">
            <input class="title-input" type="text" v-model="nickname" placeholder="username">
            <select v-model="category">
                  <option v-for="list in categorylist" :key="list">
                      {{list}}
                </option>
                  <option>사용자 추가</option>                 
            </select>
            <textarea rows="10" v-model="text" placeholder="Take a note..."></textarea>            
            <div class="note-editor-bottom">
                <button @click=createNew class="fas fas-check-circle"><i class="fas fa-check-circle"></i></button>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
export default {
    data: function() {
        return {
            category:'기본',
            nickname:'user',
            title: '',            
            theme: '#F4CCCC',            
            text: '',
            time : moment().format('YYYY-MM-DD')
        }
    },  
    props:['categorylist'], 
    methods: {        
        createNew() {
            this.$emit('noteAdded',this.category,this.nickname, this.title, this.text, this.theme,this.time);
            this.category='기본'
            this.nickname = 'user';
            this.title = '';
            this.text = '',
            this.theme = '#F4CCCC';
            this.time= moment().format('YYYY-MM-DD')   
        },
        deleteNote(index) {
            this.$emit('noteDeleted', index);
        },
        colorNote(index) {
            this.$emit('noteColor', index);
        },
    },
}
</script>
