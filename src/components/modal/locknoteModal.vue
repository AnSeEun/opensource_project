<template>
  <div>
    <button class="lockBtn" @click="locknoteModal = false">노트 잠금</button>
    <div class="locknoteModal" v-show="locknoteModal == false">
      <span class="locknote">
        노트 잠금
        <input
          type="radio"
          id="lock"
          v-bind:value="true"
          v-model="note.lock_answer"
        />
        <label for="lock">Yes</label>
        <input
          type="radio"
          id="unlock"
          v-bind:value="false"
          v-model="note.lock_answer"
        />
        <label for="unlock">No</label>
      </span>
      <span v-if="note.lock_answer">
        <select v-model="note.lock_value">
          <option>휴대폰</option>
          <option>머그컵</option>
          <option>마우스</option>
          <option>키보드</option>
        </select>
        <span v-if="note.lock_value != ''">
          <button @click="setlock(index)">잠금</button>
        </span>
      </span>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
