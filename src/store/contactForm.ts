// contactForm.ts

import { defineStore } from "pinia";

interface ContactFormData {
  name: string;
  subject: string;
  message: string;
}

export const useContactFormStore = defineStore({
  id: "contactForm",
  state: (): ContactFormData => ({
    name: "",
    subject: "",
    message: "",
  }),
  actions: {
    resetForm() {
      this.name = "";
      this.subject = "";
      this.message = "";
    },
  },
});
