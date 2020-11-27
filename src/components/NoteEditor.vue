<template>
  <div class="note-grid">
    <tr class="note-editor">
      <input
        class="title-input"
        type="text"
        v-model="title"
        placeholder="Title"
      />
      <input
        class="title-input-user"
        type="text"
        v-model="nickname"
        placeholder="username"
      />
      <select v-model="category">
        <option v-for="list in categorylist" :key="list">
          {{ list }}
        </option>
        <option>사용자 추가</option>
      </select>

      <categoryadd
        v-if="category === '사용자 추가'"
        @categoryAdd="addCategory"
      ></categoryadd>

      <div v-if="category === 'To-do List'">
        <div v-for="index in checkBoxAdd" :key="index">
          <TodoList @listAdd="addList"></TodoList>
        </div>
        <i
          class="fas fa-plus"
          v-if="checkBoxAdd < 5"
          @click.prevent="checkBoxAdd++"
        >
        </i>
      </div>

      <textarea
        v-else
        rows="10"
        v-model="text"
        placeholder="Take a note..."
      ></textarea>
      <div v-if="category != 'To-do List'">
        <span @click="speech_to_text">
          <i class="fas fa-microphone"></i>
        </span>
      </div>
      <div class="note-editor-bottom">
        <button @click="createNew" class="fas fas-check-circle">
          <i class="fas fa-check-circle"></i>
        </button>
      </div>
    </tr>
  </div>
</template>

<script>
import moment from "moment";
import categoryadd from "./CategoryAdd.vue";
import TodoList from "./TodoList.vue";

export default {
  data: function() {
    return {
      category: "기본",
      nickname: "user",
      title: "",
      theme: "#F4CCCC",
      text: "",
      time: moment().format("YYYY-MM-DD ddd"),
      favorite: false,
      is_show: false,
      checkBoxAdd: 0,
      Todo: [],
      TodoList: [],
      is_bold: false,
      is_under: false,
      is_incli: false,
      img_path: "",
      contentModal: false,
      lock: false,
      model:null,
      webcam:null,   
      predicted:"",
    };
  },
  props: ["categorylist"],
  methods: {
    createNew() {
      this.$emit(
        "noteAdded",
        this.category,
        this.nickname,
        this.title,
        this.text,
        this.theme,
        this.time,
        this.favorite,
        this.is_show,
        this.Todo,
        this.TodoList,
        this.checkBoxAdd,
        this.is_bold,
        this.is_under,
        this.is_incli,
        this.img_path,
        this.contentModal,
        this.lock,
        this.model,
        this.webcam,
        this.predicted
      );
      this.category = "기본";
      this.nickname = "user";
      this.title = "";
      this.text = "";
      this.theme = "#F4CCCC";
      this.time = moment().format("YYYY-MM-DD ddd");
      this.favorite = false;
      this.is_show = false;
      this.is_bold = false;
      this.is_under = false;
      this.is_incli = false;
      this.img_path = "";
      this.contentModal = false;
    },
    deleteNote(index) {
      this.$emit("noteDeleted", index);
    },
    addCategory(category) {
      this.categorylist.push(category);
      this.category = category;
      this.categorylist = !this.categorylist;
    },
    addList(todo, checked) {
      this.Todo.push(todo);
      this.TodoList.push(checked);
    },
    speech_to_text() {
      var recognition = new (window.SpeechRecognition ||
        window.webkitSpeechRecognition ||
        window.mozSpeechRecognition ||
        window.msSpeechRecognition)();
      recognition.lang = "ko-KR";
      recognition.interimResults = false;
      recognition.maxAlternatives = 5;
      recognition.start();
      recognition.onstart = function() {
        console.log(
          "음성인식이 시작 되었습니다. 이제 마이크에 무슨 말이든 하세요."
        );
      };
      var self = this;
      recognition.onresult = function() {
        console.log("You said: ", event.results[0][0].transcript);
        self.text = self.text + event.results[0][0].transcript;
      };
    },
  },
  components: {
    categoryadd: categoryadd,
    TodoList: TodoList,
  },
};
</script>
