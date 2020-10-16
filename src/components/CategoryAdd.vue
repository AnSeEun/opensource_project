<template>
 <div class="categoryAdd">
    <form>
      <input v-model="category" placeholder="category">
      <button v-if= "category!=''" @click.prevent=createNew>추가</button>
    </form>
  </div>
</template>

<script>
export default {
    data: function() {
        return {
            category:''
        }
    },
    methods: {        
        createNew() {
            this.$emit('categoryAdd',this.category);
            this.category='';
        },
         deleteNote(index) {
            this.$emit('categoryDeleted', index);
        },
    },
}
</script>
