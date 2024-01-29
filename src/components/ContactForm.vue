<template>
  <div class="column is-6 py-5">
    <h2 class="title is-2">Contact to me</h2>
    <form @submit.prevent="submitForm">
      <div class="field">
        <label class="label">Name</label>
        <div class="control">
          <input
            v-model="formData.name"
            type="text"
            class="input"
            placeholder="Your Name"
          />
        </div>
        <p v-if="!formData.name" class="help is-danger">Name is required</p>
      </div>

      <div class="field">
        <label class="label">Subject</label>
        <div class="control">
          <input
            v-model="formData.subject"
            type="text"
            class="input"
            placeholder="Subject"
          />
        </div>
        <p v-if="!formData.subject" class="help is-danger">
          Subject is required
        </p>
      </div>

      <div class="field">
        <label class="label">Message</label>
        <div class="control">
          <textarea
            v-model="formData.message"
            class="textarea"
            placeholder="Your Message"
          ></textarea>
        </div>
        <p v-if="!formData.message" class="help is-danger">
          Message is required
        </p>
      </div>

      <div class="field">
        <div class="control">
          <button type="submit" class="button is-primary">Submit</button>
        </div>
      </div>
    </form>

    <!-- Success Notification -->
    <notify v-if="showSuccessNotification" type="success">
      {{ successNotificationMessage }}
    </notify>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { useContactFormStore } from "@/store/contactForm";

const formData = useContactFormStore();

const showSuccessNotification = ref(false);
const successNotificationMessage = ref("");

const submitForm = () => {
  if (validateForm()) {
    successNotificationMessage.value =
      "Your form has been submitted successfully.";
    showSuccessNotification.value = true;

    formData.resetForm();
  }
};

const validateForm = () => {
  return formData.name && formData.subject && formData.message;
};

watchEffect(() => {
  if (showSuccessNotification.value) {
    setTimeout(() => {
      showSuccessNotification.value = false;
    }, 3000);
  }
});
</script>
