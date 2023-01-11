<template>
  <div class="task-view">
    <div class="flex flex-col flex-grow flex-start items-start px-4">
      <input
        class="font-bold text-xl p-2 w-full flex-grow outline-none"
        type="text"
        :value="task.name"
        @change="updateTaskData($event, 'name')"
        @keyup.enter="updateTaskData($event, 'name')"
      />
      <textarea
        class="h-64 mt-2 border border-0 w-full resize-none border-none outline-none"
        :value="task.description"
        @change="updateTaskData($event, 'description')"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["getTask"]),
    task() {
      return this.getTask(this.$route.params.id);
    },
  },
  methods: {
    updateTaskData(e, key) {
      this.$store.commit("UPDATE_TASK", {
        task: this.task,
        key,
        value: e.target.value,
      });
    },
  },
};
</script>

<style>
.task-view {
  @apply relative flex flex-row bg-white pin mx-4 m-32 mx-auto py-4 text-left rounded shadow;
  max-width: 700px;
}
</style>
