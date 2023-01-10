<template>
  <div class="board">
    <div class="flex flex-row items-start">
      <div class="column" v-for="(column, index) of board.columns" :key="index">
        <div class="flex flex-center font-bold mb-2">
          {{ column.name }}
        </div>
        <div
          class="task"
          v-for="(task, taskIndex) of column.tasks"
          :key="taskIndex"
          @click="openTaskModal(task)"
        >
          <span class="w-full font-bold">
            {{ task.name }}
          </span>
          <p class="text-sm mt-1 w-full" v-if="task.description">
            {{ task.description }}
          </p>
        </div>
        <input
          class="bg-transparent p-2 w-full border-0 outline-none border-none"
          placeholder="+ enter new task"
          type="text"
          @keyup.enter="createTask($event, column.tasks)"
        />
      </div>
    </div>
    <div
      class="task-bg"
      v-if="isTaskOpen"
      @click.self="closeTaskModal"
      @keyup.esc="closeTaskModal"
      tabindex="0"
    >
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["board"]),
    isTaskOpen() {
      return this.$route.name === "task";
    },
  },
  methods: {
    openTaskModal(task) {
      this.$router.push({ name: "task", params: { id: task.id } });
    },
    closeTaskModal() {
      this.$router.push({ name: "board" });
    },
    createTask(event, tasks) {
      this.$store.commit("CREATE_TASK", {
        tasks,
        name: event.target.value,
      });
      event.target.value = "";
    },
  },
};
</script>

<style lang="css">
.task {
  @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-grey-darkest no-underline;
}

.column {
  @apply bg-grey-light p-2 mr-4 text-left shadow rounded;
  min-width: 350px;
}

.board {
  @apply p-4 bg-blue-dark h-full overflow-auto;
}

.task-bg {
  @apply pin absolute;
  background: rgba(0, 0, 0, 0.5);
}
</style>
