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
      <!--favorite note-->
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
                    class="todolist"
                    type="text"
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
            <textarea
              v-else
              class="note-textarea"
              rows="9"
              onclick="this.selec()"
              v-model="note.text"
              placeholder="Take a note..."
            ></textarea>
            <hr />
            <span>
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
          </div>
        </tr>
      </div>

      <hr class="part-line" />
      <!--notes-->
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
            <!-- <i
              class="fas fa-star"
              @click="deleteFavorite(index)"
              v-if="notes[index].favorite"
            ></i> -->
          </span>
          <span class="delete" @click.prevent="deleteNote(index)">
            <i class="fas fa-times"></i>
          </span>
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
                  class="todolist"
                  type="text"
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
          <textarea
            v-else
            class="note-textarea"
            rows="9"
            onclick="this.selec()"
            v-model="note.text"
            placeholder="Take a note..."
          ></textarea>
          <hr />
          <span>
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
        </div>
      </tr>
      <!-- <div class="testdiv">하이</div> -->

      <app-note-editor
        class="note-editor-container"
        :categorylist="categorys"
        v-if="editorOpen"
        @noteAdded="newNote"
        @noteDeleted="deleteNote"
        @todoList="TodoList"
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
        },
      ],
      categorys: ["기본", "To-do List"],
      colors: ["#F4CCCC", "#EB9F9F", "#E7D9E7", "#FFF2CC", "#F2F2F2"],
      // boldCnt: 0,
      underbarCnt: 0,
      inclinationCnt: 0,
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
      is_incli
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
      });
      this.editorOpen = false;
    },
    deleteNote(index) {
      this.notes.splice(index, 1);
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
    addCategory(category, index) {
      this.categorys.push(category);
      this.notes[index].category = category;
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

      document.getElementsByTagName("textarea")[index].style.fontWeight =
        "bold";
      console.log("bold 적용");

      console.log(index, "bold", this.is_bold);
    },
    setUnderbar: function(index) {
      this.notes[index].is_under = !this.notes[index].is_under;

      document.getElementsByTagName("textarea")[index].style.textDecoration =
        "underline";
      console.log("underline 적용");

      console.log(index, "underline", this.is_under);
    },
    setInclination: function(index) {
      this.notes[index].is_incli = !this.notes[index].is_incli;

      document.getElementsByTagName("textarea")[index].style.fontStyle =
        "italic";
      console.log("italic 적용");

      console.log(index, "italic", this.is_incli);
    },
    // unsetBold: function(index) {
    //   this.is_bold = false;

    //   if(this.is_bold == true) {
    //     document.getElementsByTagName("textarea")[index].style.fontWeight =
    //       "bold";
    //     console.log("bold 적용");
    //   }
    //   console.log(index, "bold", this.is_bold);
    // },
    // setUnderbar: function(index) {
    //   this.underbarCnt++;
    //   if (this.underbarCnt % 2 != 0) {
    //     document.getElementsByTagName("textarea")[index].style.textDecoration =
    //       "underline";
    //   } else if (this.underbarCnt % 2 == 0) {
    //     document.getElementsByTagName("textarea")[index].style.textDecoration =
    //       "none";
    //   }
    // },
    // setInclination: function(index) {
    //   this.inclinationCnt++;
    //   if (this.inclinationCnt % 2 != 0) {
    //     document.getElementsByTagName("textarea")[index].style.fontStyle =
    //       "italic";
    //   } else if (this.inclinationCnt % 2 == 0) {
    //     document.getElementsByTagName("textarea")[index].style.fontStyle =
    //       "normal";
    //   }
    // },
  },

  mounted() {
    if (localStorage.getItem("notes"))
      this.notes = JSON.parse(localStorage.getItem("notes"));
    if (localStorage.getItem("categorys"))
      this.categorys = JSON.parse(localStorage.getItem("categorys"));
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
