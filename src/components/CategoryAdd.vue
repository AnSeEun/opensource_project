<template>
  <div class="categoryAdd" style="text-align:center;">
    <input
      type="text"
      v-model="category"
      placeholder="category"
    />
    <button class="category-modal-add" @click.prevent="createNew">
      추가
    </button>
    <button class="category-modal-cancle" @click.prevent="categoryCancle">
      취소
    </button>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      category: "",
    };
  },
  methods: {
    createNew() {
      this.$emit("categoryAdd", this.category);
      this.category = "";
    },
    deleteNote(index) {
      this.$emit("categoryDeleted", index);
    },
    categoryCancle() {
      this.$emit("categoryCancle");
    },
  },
};
</script>
