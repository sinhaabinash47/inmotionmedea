<template>
  <v-app>
    <v-app-bar app>
      <v-btn text to="/">INMOTION MEDIA</v-btn>
      <v-spacer></v-spacer>
      <div class="mx-3">
        Date: {{ currentDate }} | Time: <v-chip color="primary" variant="outlined">{{ currentTime }}</v-chip>
      </div>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      currentDate: "",
      currentTime: "",
    };
  },
  created() {
    this.getCurrentDateTime();
    setInterval(() => {
      this.getCurrentDateTime();
    }, 1000);
  },
  methods: {
    getCurrentDateTime() {
      const now = new Date();
      this.currentDate = now.toLocaleDateString();
      this.currentTime = now.toLocaleTimeString();
    },
  },
};
</script>

<style></style>
