import axios from "@/axios";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || null,
    loggedIn: !!localStorage.getItem("token") as boolean,
  }),
  actions: {
    async login(username: string, password: string) {
      try {
        const response = await axios.post("api/login", { username, password });
        console.log(response.data[0].message);
        if (response.data[0].token) {
          this.token = response.data[0].token;
          this.loggedIn = true;
          if (this.token) {
            localStorage.setItem("token", this.token);
          }
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${this.token}`;
        }
      } catch (error) {
        this.loggedIn = false;
        throw new Error("Invalid credentials");
      }
    },
    logout() {
      this.token = null;
      this.loggedIn = false;
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
    },
  },
});
