<template>
 <div class="search-filter">
    <form>
      <input v-model="search" placeholder="Search">
      <button @click.prevent=SearchNote>검색</button>
    </form>
  </div>
</template>

<script>
export default {
    data: function() {
        return {
            search:''
        }
    },
    methods: {        
        SearchNote() {
            this.$emit('noteSearched',this.search);
            this.search='';
        },
    },
}
</script>
