<template>
  <div class="contact py-5" data-aos="fade-down">
    <h2 class="title is-2 has-text-centered mb-5">Contact</h2>
    <p class="mb-2">
      Let's connect! Reach out to me through the following channels:
    </p>
    <div
      class="contact-options is-flex is-justify-content-center"
      data-aos="fade-left"
    >
      <a :href="'mailto:' + email" title="Email" data-aos="flip-right"
        ><span class="icon is-large is-hoverable is-size-3"
          ><i class="fa fa-envelope"></i></span
      ></a>
      <a
        href="https://www.linkedin.com/in/analyst-sergio-penagos/"
        target="_blank"
        title="linkedin"
        data-aos="flip-right"
      >
        <span class="icon is-large is-hoverable is-size-3">
          <i class="fab fa-linkedin"></i>
        </span>
      </a>
      <a :href="github" target="_blank" title="GitHub" data-aos="flip-right"
        ><span class="icon is-large is-hoverable is-size-3"
          ><i class="fab fa-github"></i></span
      ></a>
      <a :href="github" target="_blank" title="GitHub" data-aos="flip-right"
        ><span class="icon is-large is-hoverable is-size-3"
          ><i class="fab fa-github"></i></span
      ></a>
    </div>
  </div>
</template>

<script setup>
const email = "sergiopenagos881@gmail.com";
const github = "https://github.com/gioudi";
const github2 = "https://github.com/SergioVass";
</script>
