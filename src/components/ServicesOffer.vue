<template>
  <div class="services-offer py-5">
    <div class="container">
      <h2 class="title">My Freelance Services</h2>
      <div class="columns is-multiline">
        <div
          class="column is-half"
          data-aos="fade-up"
          v-for="service in services"
          :key="service.title"
        >
          <div class="card">
            <div class="card-content">
              <p class="title">{{ service.title }}</p>
              <p class="subtitle">{{ service.description }}</p>
              <p class="price">{{ service.price }}</p>
              <div class="features">
                <ul>
                  <li v-for="feature in service.features" :key="feature">
                    {{ feature }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      services: [
        {
          title: "Frontend Development",
          description: "Customized solutions for your web projects.",
          price: "$25 per hour",
          features: [
            "Responsive design",
            "Cross-browser compatibility",
            "SEO optimization",
          ],
        },
        {
          title: "Vue.js / React.js Development",
          description: "Building dynamic and interactive web applications.",
          price: "$30 per hour",
          features: ["Components", "State management", "API integration"],
        },
      ],
    };
  },
});
</script>
<style scoped>
.services-offer {
  padding: 2rem 0;
}

.card {
  margin-bottom: 1.5rem;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-content {
  padding: 1.5rem;
}

.title {
  font-size: 1.5rem;
  font-weight: bold;
}

.subtitle {
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.price {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.features {
  margin-top: 1rem;
}

.features ul {
  list-style-type: disc;
  margin-left: 2rem;
}
</style>
