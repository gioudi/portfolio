<template>
  <div>
    <form @submit.prevent="submitForm">
      <div class="field">
        <label class="label">Name</label>
        <div class="control">
          <input
            v-model="name"
            type="text"
            class="input"
            placeholder="Your Name"
          />
        </div>
        <p v-if="errors.has('name')" class="help is-danger">
          {{ errors.first("name") }}
        </p>
      </div>

      <div class="field">
        <label class="label">Subject</label>
        <div class="control">
          <input
            v-model="subject"
            type="text"
            class="input"
            placeholder="Subject"
          />
        </div>
        <p v-if="errors.has('subject')" class="help is-danger">
          {{ errors.first("subject") }}
        </p>
      </div>

      <div class="field">
        <label class="label">Message</label>
        <div class="control">
          <textarea
            v-model="message"
            class="textarea"
            placeholder="Your Message"
          ></textarea>
        </div>
        <p v-if="errors.has('message')" class="help is-danger">
          {{ errors.first("message") }}
        </p>
      </div>

      <div class="field">
        <div class="control">
          <button type="submit" class="button is-primary">Submit</button>
        </div>
      </div>
    </form>

    <!-- Success Modal -->
    <div v-if="showSuccessModal" class="modal is-active">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="box">
          <p class="title">Mensaje Enviado</p>
          <button @click="closeModal" class="button">Cerrar</button>
        </div>
      </div>
      <button
        @click="closeModal"
        class="modal-close is-large"
        aria-label="close"
      ></button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validations";
import { useNotify } from "vue3-notify";
import { usePinia } from "pinia";

const pinia = usePinia();
const notify = useNotify();

const { value: name, errorMessage: nameError } = useVuelidate({
  name: { required },
});
const { value: subject, errorMessage: subjectError } = useVuelidate({
  subject: { required },
});
const { value: message, errorMessage: messageError } = useVuelidate({
  message: { required },
});

const errors = {
  name: nameError,
  subject: subjectError,
  message: messageError,
};
const showSuccessModal = ref(false);

const submitForm = () => {
  if (!name.$pending && !subject.$pending && !message.$pending) {
    if (name.$invalid || subject.$invalid || message.$invalid) {
      notify.error("Form contains errors. Please check and submit again.");
      return;
    }

    showSuccessModal.value = true;
  }
};

const closeModal = () => {
  showSuccessModal.value = false;
};
</script>
