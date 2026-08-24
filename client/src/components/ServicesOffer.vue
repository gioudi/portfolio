<template>
  <section class="services-offer py-4">
    <div class="container is-narrow">
      <h2 id="services" class="title is-2 has-text-centered">
        {{ t("services.heading") }}
      </h2>

      <div class="offers-panel" data-aos="fade-up">
        <div v-for="key in offerKeys" :key="key" class="offer-row">
          <div class="offer-info">
            <p class="offer-name has-text-weight-bold">
              {{ t(`services.offers.${key}.name`) }}
            </p>
            <p class="offer-blurb">
              {{ t(`services.offers.${key}.blurb`) }}
            </p>
          </div>
          <div class="offer-leader" aria-hidden="true"></div>
          <div class="offer-price">
            <span class="has-text-weight-bold">{{ prices[key] }}</span
            ><span class="is-size-7">{{ t("services.hourly") }}</span>
          </div>
        </div>

        <a href="#contact" class="button offers-cta mt-4">
          {{ t("services.cta") }}
          <span class="icon ml-1"><i class="fas fa-arrow-right"></i></span>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const offerKeys = ["standard", "ai"] as const;

const prices: Record<string, string> = {
  standard: "$35",
  ai: "$50",
};
</script>

<style scoped lang="scss">
.is-narrow {
  max-width: 860px;
}

.offers-panel {
  background: rgba(255, 255, 255, 0.55);
  border: 1px solid rgba(51, 51, 51, 0.12);
  border-radius: 6px;
  padding: 1.5rem 2rem;
}

.offer-row {
  display: flex;
  align-items: baseline;
  gap: 1rem;
  padding: 0.9rem 0;

  & + .offer-row {
    border-top: 1px dashed rgba(51, 51, 51, 0.18);
  }
}

.offer-info {
  flex-shrink: 0;
  width: 46%;
}

.offer-name {
  margin-bottom: 0.15rem;
}

.offer-blurb {
  font-size: 0.85rem;
  color: #555;
}

.offer-leader {
  flex-grow: 1;
  border-bottom: 1px dotted rgba(51, 51, 51, 0.3);
  transform: translateY(-4px);
}

.offer-price {
  white-space: nowrap;
  font-size: 1.15rem;
}

.offers-cta {
  display: inline-flex;
  align-items: center;
  background-color: #333;
  color: #f2f2f2;
  font-weight: 700;

  &:hover {
    background-color: #000;
    color: #fff;
  }
}

@media screen and (max-width: 768px) {
  .offers-panel {
    padding: 1rem 1.25rem;
  }

  .offer-row {
    flex-direction: column;
    gap: 0.35rem;
  }

  .offer-info {
    width: 100%;
  }

  .offer-leader {
    display: none;
  }
}
</style>
