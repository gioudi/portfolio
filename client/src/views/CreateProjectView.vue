<template>
  <article v-if="loading">loading...</article>
  <article v-else>
    <section class="container content-baseline py-5">
      <div class="columns px-3 is-centered">
        <article class="column is-8-desktop is-10-tablet">
          <div class="create-project-form">
            <h2 class="title is-2 has-text-centered mb-6">
              {{ t("create.heading") }}
            </h2>

            <form class="mt-4" @submit.prevent="createProject">
              <div
                v-if="attemptedSubmit && (errorList.length || backendError)"
                class="form-error-card"
                role="alert"
              >
                <p class="form-error-card__title">
                  <span class="icon is-small mr-1">
                    <i class="fas fa-exclamation-triangle"></i>
                  </span>
                  {{ t("create.errors.summary") }}
                </p>
                <ul v-if="errorList.length">
                  <li v-for="message in errorList" :key="message">
                    {{ message }}
                  </li>
                </ul>
                <p v-if="backendError" class="mt-1">{{ backendError }}</p>
              </div>

              <div class="field">
                <label class="label" for="name">{{ t("create.name") }}</label>
                <div class="control">
                  <Field
                    id="name"
                    name="name"
                    class="input"
                    v-model="name"
                    type="text"
                  />
                  <ErrorMessage name="name" class="help is-danger" />
                </div>
              </div>

              <div class="field">
                <label class="label" for="description">{{
                  t("create.description")
                }}</label>
                <div class="control">
                  <Field
                    id="description"
                    name="description"
                    class="input"
                    v-model="description"
                    type="text"
                  />
                  <ErrorMessage name="description" class="help is-danger" />
                </div>
              </div>

              <div class="field">
                <label class="label">{{ t("create.type") }}</label>
                <div class="control">
                  <multiselect
                    v-model="projectTypeRaw"
                    :options="projectTypes"
                    label="name"
                    track-by="id"
                    :placeholder="t('create.typePlaceholder')"
                  ></multiselect>
                  <p v-if="typeError" class="help is-danger">
                    {{ typeError }}
                  </p>
                </div>
              </div>

              <div class="field">
                <label class="label" for="link">{{ t("create.url") }}</label>
                <div class="control">
                  <Field
                    id="link"
                    name="link"
                    class="input"
                    v-model="link"
                    type="text"
                  />
                  <ErrorMessage name="link" class="help is-danger" />
                </div>
              </div>

              <div class="field">
                <label class="label">{{ t("create.technologies") }}</label>
                <div class="control">
                  <multiselect
                    v-model="technologySelections"
                    :multiple="true"
                    :options="technologiesOptions"
                    label="name"
                    track-by="name"
                    :preserve-search="true"
                    :placeholder="t('create.technologiesPlaceholder')"
                  ></multiselect>
                  <p v-if="techError" class="help is-danger">
                    {{ techError }}
                  </p>
                </div>
              </div>

              <div class="field">
                <label class="label" for="responsibilities">{{
                  t("create.responsibilities")
                }}</label>
                <div class="control">
                  <Field
                    id="responsibilities"
                    name="responsibilities"
                    as="textarea"
                    class="textarea"
                    v-model="responsibilities"
                    rows="4"
                  />
                  <ErrorMessage
                    name="responsibilities"
                    class="help is-danger"
                  />
                </div>
              </div>

              <div class="field">
                <label class="label">{{ t("create.tags") }}</label>
                <div class="control">
                  <multiselect
                    v-model="tagSelections"
                    :multiple="true"
                    :options="tagsOptions"
                    :preserve-search="true"
                    :placeholder="t('create.tagsPlaceholder')"
                  >
                  </multiselect>
                  <p v-if="tagError" class="help is-danger">{{ tagError }}</p>
                </div>
              </div>

              <div class="field">
                <label class="label">{{ t("create.images") }}</label>
                <FilePond
                  ref="imageUploader"
                  allowMultiple
                  acceptedFileTypes="image/*"
                  v-model="imageFiles"
                  name="images"
                />
                <p v-if="imageError" class="help is-danger">
                  {{ imageError }}
                </p>
              </div>

              <div class="field">
                <label class="label">{{ t("create.video") }}</label>
                <FilePond
                  ref="videoUploader"
                  acceptedFileTypes="video/*"
                  v-model="videoFile"
                  name="video"
                />
              </div>

              <button
                class="button is-primary mt-3"
                type="submit"
                :disabled="submitting"
              >
                {{ submitting ? t("create.submitting") : t("create.submit") }}
              </button>
            </form>
          </div>
        </article>
      </div>
    </section>
    <FooterLine />
  </article>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useForm, Field, ErrorMessage, useField } from "vee-validate";
import * as yup from "yup";
import { useI18n } from "vue-i18n";
import { storeToRefs } from "pinia";
import { useProjectStore } from "../store/projects";
import Multiselect from "vue-multiselect";
import FooterLine from "../components/FooterLine.vue";
import vueFilePond from "vue-filepond";
import { TECHNOLOGY_OPTIONS, TAG_OPTIONS } from "../constants/technologies";

import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";

const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview
);

const { t } = useI18n();
const router = useRouter();

const technologiesOptions = TECHNOLOGY_OPTIONS;

const tagsOptions = TAG_OPTIONS;

const { handleSubmit, resetForm, errors } = useForm({
  validationSchema: yup.object({
    name: yup.string().required(() => t("create.errors.nameRequired")),
    description: yup
      .string()
      .required(() => t("create.errors.descriptionRequired")),
    project_type_id: yup
      .number()
      .typeError(() => t("create.errors.typeRequired"))
      .required(() => t("create.errors.typeRequired")),
    link: yup.string().required(() => t("create.errors.linkRequired")),
    technologies: yup.array().min(1, () => t("create.errors.techMin")),
    responsibilities: yup
      .string()
      .required(() => t("create.errors.respRequired")),
    tags: yup.array().min(1, () => t("create.errors.tagsMin")),
    images: yup
      .array()
      .min(1, () => t("create.errors.imagesMin"))
      .max(10, () => t("create.errors.imagesMax")),
    video: yup.mixed().nullable(),
  }),
});

const { value: name } = useField<string>("name");
const { value: description } = useField<string>("description");
const { value: link } = useField<string>("link");
const { value: responsibilities } = useField<string>("responsibilities");

const { value: project_type_id, errorMessage: typeError } = useField<
  number | null
>("project_type_id");
const { value: technologies, errorMessage: techError } =
  useField<string[]>("technologies");
const { value: tags, errorMessage: tagError } = useField<string[]>("tags");
const { value: images, errorMessage: imageError } = useField<File[]>("images");
const { value: video } = useField<File | null>("video");

const projectTypeRaw = ref<{ id: number; name: string } | null>(null);
const technologySelections = ref<Array<{ name: string }>>([]);
const tagSelections = ref<string[]>([]);
const imageFiles = ref<File[]>([]);
const videoFile = ref<File | null>(null);

watch(projectTypeRaw, (selection) => {
  project_type_id.value = selection ? selection.id : null;
});

watch(
  technologySelections,
  (selections) => {
    technologies.value = selections.map((item) =>
      typeof item === "string" ? item : item.name
    );
  },
  { deep: true }
);

watch(tagSelections, (selections) => {
  tags.value = selections;
});

watch(imageFiles, (files) => {
  images.value = files ?? [];
});

watch(videoFile, (file) => {
  video.value = file ?? null;
});

const submitting = ref(false);
const submitError = ref(false);
const attemptedSubmit = ref(false);
const backendError = ref("");

const errorList = computed(() =>
  Object.values(errors.value).filter(
    (message): message is string => typeof message === "string"
  )
);

const projectStore = useProjectStore();
const { fetchTypeProjects } = projectStore;
const { loading, projectTypes } = storeToRefs(projectStore);

onMounted(async () => {
  await fetchTypeProjects();
});

const getUserIdFromToken = (): number => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return 1;
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.user_id ?? 1;
  } catch {
    return 1;
  }
};

const createProject = handleSubmit(
  async (values) => {
    attemptedSubmit.value = true;
    backendError.value = "";
    submitting.value = true;
    submitError.value = false;
    try {
      await projectStore.createProject({
        name: values.name,
        description: values.description,
        project_type_id: Number(values.project_type_id),
        link: values.link,
        technologies: (values.technologies as string[]) ?? [],
        responsibilities: values.responsibilities,
        tags: (values.tags as string[]) ?? [],
        images: (values.images as File[]) ?? [],
        video: (values.video as File | null) ?? null,
        user_id: getUserIdFromToken(),
      });
      resetForm();
      router.push("/");
    } catch (error) {
      console.error("Error creating project:", error);
      submitError.value = true;
      backendError.value =
        error instanceof Error ? error.message : t("create.failed");
    } finally {
      submitting.value = false;
    }
  },
  () => {
    attemptedSubmit.value = true;
  }
);
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped lang="scss">
.create-project-form .field {
  margin-bottom: 1.25rem;
}

.textarea {
  min-height: 6rem;
  resize: vertical;
}
</style>
