import { reactive, computed, watch } from "vue";
import { useRoute, useRouter } from 'vue-router';
import { store } from '@/store';
import axios from "axios";

const getCategoryProjects = () => {
  const route = useRoute();
  const router = useRouter();
  const projectId = computed(() => route.params.id);

  const pState = reactive({
    lang: store.lang,
    projectsByCategory: {},
  });

  watch(() => store.lang, (newLang) => {
    pState.lang = newLang;
    getProjectsByCategory();
  });

  const getProjectsByCategory = async () => {
    try {
      const categoriesResponse = await axios.get('https://omol-cms.onrender.com/api/categories?locale=' + pState.lang);
      const categories = categoriesResponse.data.data;
  
      console.log(categories);
  
      const projectsByCategory = {};
  
      for (const category of categories) {
        const categoryName = category.attributes.name;
  
        const projectsResponse = await axios.get('https://omol-cms.onrender.com/api/projects/?populate=*&locale=' + pState.lang);
  
        const filteredProjects = projectsResponse.data.data
          .filter((project) => project.attributes.category.data.attributes.name === categoryName)
          .map((project) => ({
            id: project.id,
            title: project.attributes.name,
            hoverText: project.attributes.hoverText,
            img: project.attributes.coverImage.data.attributes.url,
            gif: project.attributes.coverGif.data.attributes.url,
          }));
        console.log(filteredProjects);
        projectsByCategory[categoryName] = filteredProjects;
      }
  
      pState.projectsByCategory = projectsByCategory;
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  return {
    pState,
    getProjectsByCategory,
  };
};

export default getCategoryProjects;