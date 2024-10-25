<template>
  <article v-if="loading"> loading...</article>
  <article v-else>
    <section class="container content-baseline py-6 hv-100">
      <div class="columns px-3">
        <article class="column is-half is-offset-one-quarter">
          <div class="create-project-form">
            <h2 class="title is-2 has-text-centered mb-6">
              Create a new project
            </h2>

            <form class="mt-6" @submit.prevent="createProject">
              <div class="field">
                <label class="label">Name</label>
                <div class="control">
                  <Field name="name" class="input" v-model="name" type="text" />
                  <ErrorMessage name="name" class="has-text-danger" />
                </div>
              </div>
              <div class="field">
                <label class="label">Description</label>
                <div class="control">
                  <Field
                    name="description"
                    class="input"
                    v-model="description"
                    type="text"
                  />
                  <ErrorMessage name="description" class="has-text-danger" />
                </div>
              </div>
              <div class="field">
                <label class="label">Project type: </label>
                <div class="control">
                  <multiselect
                    v-model="project_type_id"
                    :options="projectTypes"
                    label="name" track-by="id"
                  ></multiselect>
                  <ErrorMessage
                    name="project_type_id"
                    class="has-text-danger"
                  />
                </div>
              </div>
              <div class="field">
                <label class="label">URL: </label>
                <div class="control">
                  <Field name="link" class="input" v-model="link" type="text" />
                  <ErrorMessage name="link" class="has-text-danger" />
                </div>
              </div>
              <div class="field">
                <label class="label">Technologies: </label>
                <div class="control">
                  <multiselect
                    v-model="technologies"
                    :multiple="true"
                    :options="technologiesOptions"
                    label="name" track-by="name"
                    :preserve-search="true" placeholder="Pick the stack"
                  ></multiselect>
                  <ErrorMessage name="technologies" class="has-text-danger" />
                </div>
              </div>
              <div class="field">
                <label class="label">Responsibilities:</label>
                <div class="control">
                  <Field
                    name="responsibilities"
                    class="input"
                    v-model="responsibilities"
                    type="text"
                  />
                  <ErrorMessage
                    name="responsibilities"
                    class="has-text-danger"
                  />
                </div>
              </div>
              <div class="field">
                <label class="label">Tags: </label>
                <div class="control">
                  <multiselect
                    v-model="tags"
                    :multiple="true"
                    :options="tagsOptions"
                    :preserve-search="true" placeholder="Pick some"
                  >
                </multiselect>
                  <ErrorMessage name="tags" class="has-text-danger" />
                </div>
              </div>
              <div class="field">
                <label class="label">List of Images (10 max):</label>
                <FilePond
                  ref="imageUploader"
                  allowMultiple
                  acceptedFileTypes="image/*"
                  v-model="images"
                  name="images"
                />
                <ErrorMessage name="images" class="has-text-danger" />
              </div>
              <div class="field">
                <label class="label">Video (optional)</label>
                <FilePond
                  ref="videoUploader"
                  acceptedFileTypes="video/*"
                  v-model="video"
                  name="video"
                />
              </div>
              <button class="button is-primary" type="submit">
                Create Project
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
import { ref, onMounted } from "vue";
import { useForm, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import router from "../router";
import { useProjectStore } from "../store/projects";
import Multiselect from "vue-multiselect";
import FooterLine from "../components/FooterLine.vue";
import vueFilePond from "vue-filepond";

import "filepond/dist/filepond.min.css";

import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";

import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import { storeToRefs } from "pinia";


const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview
);

type ProjectForm = {
  name: string;
  description: string;
  project_type_id: number | null;
  link: string;
  technologies: Array<string>;
  responsibilities: string;
  tags: Array<string>;
  images: Array<File>;
  video: File | null;
};

onMounted(async () => {
      await fetchTypeProjects();
    });
    const technologiesOptions = ref([
      { name: "Vue.js", language: "JavaScript" },
      { name: "Rails", language: "Ruby" },
      { name: "Sinatra", language: "Ruby" },
      { name: "Laravel", language: "PHP" },
      { name: "Phoenix", language: "Elixir" },
    ]);
    const tagsOptions = ref([
      "public site",
      "private site",
      "onboarding",
      "design components",
      "dependency",
      "todo",
      "frontend",
      "backend",
      "fullstack",
      "personal",
    ]);

    const formValues = ref<ProjectForm>({
      name: "",
      description: "",
      project_type_id: null,
      link: "",
      technologies: [],
      responsibilities: "",
      tags: [],
      images: [],
      video: null,
    });

    const { handleSubmit, errors, resetForm } = useForm({
      initialValues: formValues.value,
      validationSchema: yup.object({
        name: yup.string().required("Project's name is required"),
        description: yup.string().required("Project's description is required"),
        project_type_id: yup.number().required("Project's type is required"),
        link: yup.string().required("Project's link is required"),
        technologies: yup.array().min(1, "At least one technology is required"),
        responsibilities: yup
          .string()
          .required("Responsibilities are required"),
        tags: yup.array().min(1, "At least one tag is required"),
        images: yup.array().max(10, "Maximum of 10 images allowed"),
      }),
    });

    const name = ref("");
    const description = ref("");
    const project_type_id = ref(null);
    const link = ref("");
    const technologies = ref([]);
    const responsibilities = ref("");
    const tags = ref([]);
    const images = ref<File[]>([]);
    const video = ref<File[]>([]);
    const user_id = ref(1);

    const projectStore = useProjectStore();
    const { fetchTypeProjects } = projectStore;
    const { loading, projectTypes} = storeToRefs(projectStore);
 

    const createProject = handleSubmit(async (values: ProjectForm) => {
      try {
        await projectStore.createProject({
          ...values,
          images,
          video,
          user_id,
        });
        resetForm();
        console.log("Project created")
      } catch (error) {
        console.error("Error creating project:", error);
        alert("Failed to create project. Please try again.");
      }
    });
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
