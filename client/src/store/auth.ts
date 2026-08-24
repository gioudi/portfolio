import axios from "@/axios";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || null,
    loggedIn: !!localStorage.getItem("token") as boolean,
  }),
  actions: {
    async login(username: string, password: string) {
      let data: { message?: string; token?: string };
      try {
        const response = await axios.post("api/login", { username, password });
        data = response.data;
      } catch {
        this.loggedIn = false;
        throw new Error("Invalid credentials");
      }

      if (!data.token) {
        this.loggedIn = false;
        throw new Error(data.message || "Invalid credentials");
      }

      this.token = data.token;
      this.loggedIn = true;
      localStorage.setItem("token", this.token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${this.token}`;
    },
    logout() {
      this.token = null;
      this.loggedIn = false;
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
    },
  },
});
