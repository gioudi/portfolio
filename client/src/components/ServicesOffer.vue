<template>
  <section class="services-offer py-4">
    <div class="container">
      <h2 id="services" class="title is-2 has-text-centered">
        {{ t("services.heading") }}
      </h2>
      <div class="columns is-multiline is-mobile is-variable is-4">
        <article
          v-for="(key, index) in serviceKeys"
          :key="key"
          class="column is-full-mobile is-half-tablet is-one-quarter-desktop"
          data-aos="fade-up"
          :data-aos-delay="index * 100"
        >
          <div class="card service-card">
            <div class="card-content">
              <p class="title is-5">
                {{ t(`services.items.${key}.title`) }}
              </p>
              <p class="subtitle is-6">
                {{ t(`services.items.${key}.description`) }}
              </p>
              <p class="price tag is-medium has-text-weight-bold">
                {{ t(`services.items.${key}.price`) }}
              </p>
              <ul class="features">
                <li v-for="feature in featuresOf(key)" :key="feature">
                  <span class="icon is-small mr-1"
                    ><i class="fas fa-check"></i></span
                  >{{ feature }}
                </li>
              </ul>
              <a href="#contact" class="button is-small mt-3">
                {{ t("services.cta") }}
              </a>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t, tm } = useI18n();

const serviceKeys = ["frontend", "systems", "fullstack", "ai"];

const featuresOf = (key: string) => {
  const nodes = tm(`services.items.${key}.features`) as unknown[];
  return nodes.map((node) => String(node));
};
</script>

<style scoped lang="scss">
.service-card {
  height: 100%;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.25s ease-in-out, box-shadow 0.25s ease-in-out;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
  }
}

.service-card .card-content {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.features {
  margin-top: auto;

  li {
    list-style-type: none;
    margin-bottom: 0.25rem;
  }
}
</style>
