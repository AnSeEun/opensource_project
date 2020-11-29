<template>
  <div id="app">
    <div class="header">
      <img src="./assets/hellos_logo.png" />
      <p><a href="javascript:location.reload()">Note Knock</a></p>
      <p class="sub-title" style="font-size:70px; margin:0px">낰낰</p>
    </div>
    <div>
      <select class="category-filter" v-model="selected">
        <option value="">전체</option>
        <option v-for="list in categorys" :key="list">
          {{ list }}
        </option>
      </select>
      <button
        class="category-edit"
        @click="modalCategory()"
        @click.prevent="categoryMain = true"
      >
        카테고리 수정
      </button>

      <div v-if="categorylist">
        <div>
          <div class="category-modal-content">
            <div
              v-for="(list, index) in categorys"
              :key="`list-${index}`"
              class="category"
            >
              {{ list }}
              <span v-if="index > 1" @click.prevent="deleteCategory(index)">
                <i class="fas fa-times"></i>
              </span>
            </div>
            <categoryadd
              :main="categoryMain"
              @categoryAdd="addCategory"
              @categoryDeleted="deleteCategory"
              @categoryCancle="modalCategory"
            ></categoryadd>
          </div>
          <div class="category-modal-layer"></div>
        </div>
      </div>
    </div>

    <div>
      <SearchNote @noteSearched="searchNote"></SearchNote>
    </div>

    <table class="noteContainer">
      <!--favorite note part-->
      <!-- <div class="favorite-part">Favorites</div> -->
      <div class="note-favorite">
        <tr
          v-for="(note, index) in notesFilter(selected, search)"
          v-show="note.favorite"
          :key="`note-${index}`"
          class="note"
          :style="{ 'background-color': note.theme }"
        >
          <div>
            <span class="favorites">
              <!-- <i
                class="far fa-star"
                @click="addFavorite(index)"
                v-if="!notes[index].favorite"
              ></i> -->
              <i class="fas fa-star" @click="deleteFavorite(index)"></i>
            </span>
            <span class="delete" @click.prevent="deleteNote(index)">
              <i class="fas fa-times"></i>
            </span>
            <span
              v-if="note.category != 'To-do List'"
              class="deleteContent"
              @click.prevent="deleteNoteContents(index)"
            >
              <i
                v-on:mouseover="deleteContentModalIn(index)"
                v-on:mouseout="deleteContentModalOut(index)"
                class="fas fa-trash-alt"
              ></i>
            </span>
            <div v-if="note.contentModal == true" class="contentDeleteModal">
              노트 내용 삭제
            </div>
            <span class="note-date-span">
              <font class="note-date" size="2em" color="#FFFFFF">
                {{ note.time }}
                <u>
                  <i>By {{ note.nickname }}</i>
                </u>
              </font>
            </span>
            <input
              class="title-view"
              type="text"
              v-model="note.title"
              placeholder="Title"
            />
            <p />
            <div v-if="note.img_path != null" class="note-image-wrap">
              <img class="note-image" :src="note.img_path" />
            </div>

            <div v-if="note.category === 'To-do List'" id="checkbox">
              <div v-for="index in note.listCount" :key="index">
                <input
                  type="checkbox"
                  id="note.Todo[index-1]"
                  value="note.Todo[index-1]"
                  v-model="note.checked[index - 1]"
                />
                <label for="note.Todo[index-1]">
                  <input
                    v-if="note.checked[index - 1] != true"
                    class="todolist"
                    type="text"
                    v-model="note.Todo[index - 1]"
                    placeholder="할 일"
                  />
                  <input
                    v-else
                    class="todolist"
                    type="text"
                    style="text-decoration:line-through"
                    v-model="note.Todo[index - 1]"
                    placeholder="할 일"
                  />
                </label>
              </div>
              <i
                class="fas fa-plus"
                v-if="note.listCount < 5"
                @click.prevent="note.listCount++"
              >
              </i>
            </div>
            <div v-else>
              <textarea
                v-if="note.is_bold"
                style="font-weight:bold"
                class="note-textarea"
                rows="9"
                v-model="note.text"
                placeholder="Take a note..."
              ></textarea>
              <textarea
                v-else-if="note.is_under"
                style="text-decoration:underline"
                class="note-textarea"
                rows="9"
                v-model="note.text"
                placeholder="Take a note..."
              ></textarea>
              <textarea
                v-else-if="note.is_incli"
                style="fontStyle:italic"
                class="note-textarea"
                rows="9"
                v-model="note.text"
                placeholder="Take a note..."
              ></textarea>
              <textarea
                v-else
                class="note-textarea"
                rows="9"
                v-model="note.text"
                placeholder="Take a note..."
              ></textarea>
            </div>
            <hr />
            <span v-if="note.category != 'To-do List'">
              <span class="textform-B" @click="setBold(index)">B</span>
              <span class="textform-U" @click="setUnderbar(index)">U</span>
              <span class="textform-I" @click="setInclination(index)">I</span>
            </span>
            <span class="category-form">
              <select v-model="note.category">
                <option v-for="list in categorys" :key="list">
                  {{ list }}
                </option>
              </select>
            </span>
            <span
              v-if="note.category != 'To-do List'"
              class="speech-to-text"
              @click="speech_to_text(index)"
            >
              <i class="fas fa-microphone"></i>
            </span>
            <span
              v-if="note.category === 'To-do List' && note.checked != true"
              class="text-to-speech"
              @click="
                speak('To do List 목록\n' + note.Todo, {
                  rate: 1,
                  pitch: 1.2,
                  lang: ko - KR,
                })
              "
            >
              <i class="fas fa-volume-up"></i>
            </span>
            <span
              v-if="note.category != 'To-do List'"
              class="text-to-speech"
              @click="speak(note.text, { rate: 1, pitch: 1.2, lang: ko - KR })"
            >
              <i class="fas fa-volume-up"></i>
            </span>
            <span class="note-color" @click="modalColor(index)">
              <i class="fas fa-palette"></i>
            </span>
            <div class="note-colorform" v-show="notes[index].is_show">
              <ul>
                <li class="color1" @click="setNoteColor(index, colors[0])"></li>
                <li class="color2" @click="setNoteColor(index, colors[1])"></li>
                <li class="color3" @click="setNoteColor(index, colors[2])"></li>
                <li class="color4" @click="setNoteColor(index, colors[3])"></li>
                <li class="color5" @click="setNoteColor(index, colors[4])"></li>
              </ul>
            </div>

            <div class="imageInputBox">
              <form>
                <input
                  class="imageInput"
                  type="file"
                  accept="image/*"
                  v-on:change="setImageFile($event)"
                />
              </form>
              <button class="imageInputBtn" v-on:click="setFileExploer(index)">
                이미지 업로드
              </button>
            </div>
          </div>
        </tr>
      </div>

      <hr class="part-line" />
      <!--notes part-->
      <div class="note-part"></div>
      <tr
        v-for="(note, index) in notesFilter(selected, search)"
        v-show="!note.favorite"
        :key="`note-${index}`"
        class="note"
        :style="{ 'background-color': note.theme }"
      >
        <div>
          <span class="favorites">
            <i class="far fa-star" @click="addFavorite(index)"></i>
          </span>
          <span class="delete" @click.prevent="deleteNote(index)">
            <i class="fas fa-times"></i>
          </span>
          <span
            v-if="note.category != 'To-do List'"
            class="deleteContent"
            @click.prevent="deleteNoteContents(index)"
          >
            <i
              v-on:mouseover="deleteContentModalIn(index)"
              v-on:mouseout="deleteContentModalOut(index)"
              class="fas fa-trash-alt"
            ></i>
          </span>
          <div v-if="note.contentModal == true" class="contentDeleteModal">
            노트 내용 삭제
          </div>
          <span class="note-date-span">
            <font class="note-date" size="2em" color="#FFFFFF">
              {{ note.time }}
              <u>
                <i>By {{ note.nickname }}</i>
              </u>
            </font>
          </span>
          <input
            class="title-view"
            type="text"
            v-model="note.title"
            placeholder="Title"
          />
          <p />
          <div v-if="note.img_path != null" class="note-image-wrap">
            <!--<img class="note-image" :src="note.img_path" />-->
            <img id="image-test" src="./assets/dog.jpg" />
            <button @click="predict">Let's predict!</button>
            <h1>Class: {{ predicted }}</h1>
          </div>
          <div v-if="note.category === 'To-do List'" id="checkbox">
            <div v-for="index in note.listCount" :key="index">
              <input
                type="checkbox"
                id="note.Todo[index-1]"
                value="note.Todo[index-1]"
                v-model="note.checked[index - 1]"
              />
              <label for="note.Todo[index-1]">
                <input
                  v-if="note.checked[index - 1] != true"
                  class="todolist"
                  type="text"
                  v-model="note.Todo[index - 1]"
                  placeholder="할 일"
                />
                <input
                  v-else
                  class="todolist"
                  type="text"
                  style="text-decoration:line-through"
                  v-model="note.Todo[index - 1]"
                  placeholder="할 일"
                />
              </label>
            </div>
            <i
              class="fas fa-plus"
              v-if="note.listCount < 5"
              @click.prevent="note.listCount++"
            >
            </i>
          </div>
          <div v-else>
            <textarea
              v-if="note.is_bold"
              style="font-weight:bold"
              class="note-textarea"
              rows="9"
              v-model="note.text"
              placeholder="Take a note..."
            ></textarea>
            <textarea
              v-else-if="note.is_under"
              style="text-decoration:underline"
              class="note-textarea"
              rows="9"
              v-model="note.text"
              placeholder="Take a note..."
            ></textarea>
            <textarea
              v-else-if="note.is_incli"
              style="fontStyle:italic"
              class="note-textarea"
              rows="9"
              v-model="note.text"
              placeholder="Take a note..."
            ></textarea>
            <textarea
              v-else
              class="note-textarea"
              rows="9"
              v-model="note.text"
              placeholder="Take a note..."
            ></textarea>
          </div>
          <hr />
          <span v-if="note.category != 'To-do List'">
            <span class="textform-B" @click="setBold(index)">B</span>
            <span class="textform-U" @click="setUnderbar(index)">U</span>
            <span class="textform-I" @click="setInclination(index)">I</span>
          </span>
          <span class="category-form">
            <select v-model="note.category">
              <option v-for="list in categorys" :key="list">
                {{ list }}
              </option>
            </select>
          </span>
          <span
            v-if="note.category != 'To-do List'"
            class="speech-to-text"
            @click="speech_to_text(index)"
          >
            <i class="fas fa-microphone"></i>
          </span>
          <span
            v-if="note.category === 'To-do List' && note.checked != true"
            class="text-to-speech"
            @click="
              speak('To do List 목록\n' + note.Todo, {
                rate: 1,
                pitch: 1.2,
                lang: ko - KR,
              })
            "
          >
            <i class="fas fa-volume-up"></i>
          </span>
          <span
            v-if="note.category != 'To-do List'"
            class="text-to-speech"
            @click="speak(note.text, { rate: 1, pitch: 1.2, lang: ko - KR })"
          >
            <i class="fas fa-volume-up"></i>
          </span>

          <span class="note-color" @click="modalColor(index)">
            <i class="fas fa-palette"></i>
          </span>

          <div class="note-colorform" v-show="notes[index].is_show">
            <ul>
              <li class="color1" @click="setNoteColor(index, colors[0])"></li>
              <li class="color2" @click="setNoteColor(index, colors[1])"></li>
              <li class="color3" @click="setNoteColor(index, colors[2])"></li>
              <li class="color4" @click="setNoteColor(index, colors[3])"></li>
              <li class="color5" @click="setNoteColor(index, colors[4])"></li>
            </ul>
          </div>

          <div class="imageInputBox">
            <form>
              <input
                class="imageInput"
                type="file"
                accept="image/*"
                v-on:change="setImageFile($event)"
              />
            </form>
            <button class="imageInputBtn" v-on:click="setFileExploer(index)">
              이미지 업로드
            </button>
          </div>
        </div>
      </tr>

      <app-note-editor
        class="note-editor-container"
        :categorylist="categorys"
        v-if="editorOpen"
        @noteAdded="newNote"
        @noteDeleted="deleteNote"
      >
      </app-note-editor>

      <button class="add-btn">
        <i
          id="plus"
          class="fas fa-plus"
          @click.prevent="editorOpen = !editorOpen"
        ></i>
      </button>
    </table>
  </div>
</template>

<script>
import NoteEditor from "./components/NoteEditor.vue";
import NoteSearch from "./components/Search.vue";
import categoryadd from "./components/CategoryAdd.vue";
import * as cocoSSD from "@tensorflow-models/coco-ssd";
//import * as tf from "@tensorflow/tfjs";
let model;

export default {
  name: "App",
  data: function() {
    return {
      editorOpen: false,
      selected: "",
      search: "",
      is_search: false,
      categorylist: false,
      categoryMain: false,
      notes: [
        {
          category: "기본",
          nickname: "user1",
          title: "예시노트1",
          text: "첫번째 노트입니다",
          theme: "#F4CCCC",
          time: "2020-10-25 Sun",
          favorite: false,
          is_show: false,
          Todo: [],
          checked: [],
          listCount: 1,
          is_bold: false,
          is_under: false,
          is_incli: false,
          img_path: "",
          contentModal: false,
        },
        {
          category: "To-do List",
          nickname: "user2",
          title: "예시노트2",
          text: "카테고리에 따라 바뀌는 내용입니다",
          theme: "#FFF2CC",
          time: "2020-10-25 Sun",
          favorite: false,
          is_show: false,
          Todo: [],
          checked: [],
          listCount: 1,
          is_bold: false,
          is_under: false,
          is_incli: false,
          img_path: "",
          contentModal: false,
        },
      ],
      categorys: ["기본", "To-do List"],
      colors: ["#F4CCCC", "#EB9F9F", "#E7D9E7", "#FFF2CC", "#F2F2F2"],
      underbarCnt: 0,
      inclinationCnt: 0,
      imgFile: null,
      imgUrl: null,
      imgIndex: -1,
      fileReader: null,
      test: null,
      predicted: "",
    };
  },

  computed: {},

  methods: {
    newNote(
      category,
      nickname,
      title,
      text,
      theme,
      time,
      favorite,
      is_show,
      Todo,
      checked,
      listCount,
      is_bold,
      is_under,
      is_incli,
      img_path,
      contentModal
    ) {
      this.notes.push({
        category: category,
        nickname: nickname,
        title: title,
        text: text,
        theme: theme,
        time: time,
        favorite: favorite,
        is_show: is_show,
        Todo: Todo,
        checked: checked,
        listCount: listCount,
        is_bold: is_bold,
        is_under: is_under,
        is_incli: is_incli,
        img_path: img_path,
        contentModal: contentModal,
      });
      this.editorOpen = false;
    },
    deleteNote(index) {
      this.notes.splice(index, 1);
    },
    deleteNoteContents(index) {
      this.notes[index].text = "";
      this.notes[index].img_path = null;
    },
    deleteContentModalIn(index) {
      this.notes[index].contentModal = true;
    },
    deleteContentModalOut(index) {
      this.notes[index].contentModal = false;
    },
    notesFilter: function(category, search) {
      return this.notes.filter(function(note) {
        return (
          (note.category == category || category == "") &&
          (note.text.includes(search) ||
            note.title.includes(search) ||
            search == "")
        );
      });
    },
    setNoteColor: function(index, color) {
      this.notes[index].is_show = !this.notes[index].is_show;
      this.notes[index].theme = color;
    },
    modalColor: function(index) {
      this.notes[index].is_show = !this.notes[index].is_show;
    },
    searchNote(search) {
      this.search = search;
      this.is_search = true;
    },
    addCategory(category) {
      this.categorys.push(category);
    },
    deleteCategory(index) {
      this.categorys.splice(index, 1);
    },
    modalCategory: function() {
      this.categorylist = !this.categorylist;
    },
    addFavorite: function(index) {
      this.notes[index].favorite = true;
      // console.log(index, this.notes[index].favorite_cnt);
    },
    deleteFavorite: function(index) {
      this.notes[index].favorite = false;
      // console.log(index, this.notes[index].favorite);
    },
    setBold: function(index) {
      this.notes[index].is_bold = !this.notes[index].is_bold;
    },
    setUnderbar: function(index) {
      this.notes[index].is_under = !this.notes[index].is_under;
    },
    setInclination: function(index) {
      this.notes[index].is_incli = !this.notes[index].is_incli;
    },
    speak(text, opt_prop) {
      if (
        typeof SpeechSynthesisUtterance === "undefined" ||
        typeof window.speechSynthesis === "undefined"
      ) {
        alert("이 브라우저는 음성 합성을 지원하지 않습니다.");
        return;
      }
      window.speechSynthesis.cancel(); // 현재 읽고있다면 초기화
      const prop = opt_prop || {};
      const speechMsg = new SpeechSynthesisUtterance();
      speechMsg.rate = prop.rate || 1; // 속도: 0.1 ~ 10
      speechMsg.pitch = prop.pitch || 1; // 음높이: 0 ~ 2
      speechMsg.lang = prop.lang || "ko-KR";
      speechMsg.text = text;
      // SpeechSynthesisUtterance에 저장된 내용을 바탕으로 음성합성 실행
      window.speechSynthesis.speak(speechMsg);
    },
    speech_to_text(index) {
      var recognition = new (window.SpeechRecognition ||
        window.webkitSpeechRecognition ||
        window.mozSpeechRecognition ||
        window.msSpeechRecognition)();
      recognition.lang = "ko-KR"; //선택하게 해줘야 할듯 .
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
        self.notes[index].text =
          self.notes[index].text + event.results[0][0].transcript;
      };
    },
    setFileExploer: function(index) {
      console.log("setFileExploer!", index);
      this.imgIndex = index;
      document.querySelector(".imageInput").click();
    },
    setImageFile: function(event) {
      this.imgFile = event.target.files;
      console.log(this.imgFile);

      this.fileReader = new FileReader();
      console.log(this.fileReader);
      this.fileReader.readAsDataURL(this.imgFile[0]);
      this.fileReader.onload = event => {
        // console.log(event.target.result);
        this.imgUrl = event.target.result;
        this.notes[this.imgIndex].img_path = this.imgUrl;
      };
    },
    async predict() {
      const img = document.getElementById("image-test");
      let tmp = await model.detect(img);
      this.predicted = tmp[0].class;
    },
  },

  mounted() {
    if (localStorage.getItem("notes")) {
      this.notes = JSON.parse(localStorage.getItem("notes"));
    }
    if (localStorage.getItem("categorys")) {
      this.categorys = JSON.parse(localStorage.getItem("categorys"));
    }

    model = await cocoSSD.load();

    console.log("model loaded");
  },

  watch: {
    notes: {
      handler() {
        var newNotes = this.notes;
        localStorage.setItem("notes", JSON.stringify(newNotes));
      },
      deep: true,
    },
    categorys: {
      handler() {
        var addCategorys = this.categorys;
        localStorage.setItem("categorys", JSON.stringify(addCategorys));
      },
    },
  },

  components: {
    appNoteEditor: NoteEditor,
    SearchNote: NoteSearch,
    categoryadd: categoryadd,
  },
};
</script>

<style lang="scss">
@import "/styles/global.scss";
</style>
