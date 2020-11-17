<template>
  <span id="checkbox">
    <input type="checkbox" id="Todo.todo" value="Todo.todo" v-model="Todo.checked" disabled>
    <label for="Todo.todo">
      <input class="todolist-edit" type="text" v-model="Todo.todo" placeholder="할 일"/>
    </label>
  </span>
</template>

<script>
export default {
  data: function() {
    return {
      Todo:[
        {
          todo:'',
          checked:false,
        }
      ]
    };
  },
  methods: {
    createList() {
      this.$emit('listAdd',this.Todo.todo, this.Todo.checked); 
    },
  },
  
  mounted() {
    if (localStorage.getItem("Todo")){
      this.Todo = JSON.parse(localStorage.getItem("Todo"));
    }
  },

  watch: {
    notes: {
      handler() {
        var newTodo = this.Todo;
        localStorage.setItem("Todo", JSON.stringify(newTodo));
      },
    },
  },
};

</script>
