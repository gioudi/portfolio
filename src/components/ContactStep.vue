<template>
  <div class="contact py-5">
    <h2 class="title is-2 has-text-centered mb-5">Contact</h2>
    <p class="mb-2">
      Let's connect! Reach out to me through the following channels:
    </p>
    <div class="contact-options is-flex is-justify-content-center">
      <a
        :href="'mailto:' + email"
        class="icon animate__animated animate__fadeIn"
        title="Email"
        ><i class="fa fa-envelope"></i
      ></a>
      <a
        :href="github"
        class="icon animate__animated animate__fadeIn"
        title="GitHub"
        ><i class="fab fa-github"></i
      ></a>
    </div>
  </div>
</template>

<script setup>
const email = "your.email@example.com";
const github = "https://github.com/yourusername";
</script>
