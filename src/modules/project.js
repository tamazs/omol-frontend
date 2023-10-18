import { reactive, computed, watch } from "vue"
import { useRoute, useRouter } from 'vue-router'
import { store } from '@/store';
import axios from "axios";


const getProject = () => {
    const route = useRoute();
    const router = useRouter();

    const projectId = computed(() => route.params.id)

    const pState = reactive({
        title: '',
        description: '',
        lang: store.lang,
        projects: []
    })

    watch(() => store.lang, (newLang) => {
        pState.lang = newLang;
        getProjects();
      });

    const getProjects = async () => {
        try {
          const response = await axios.get('http://localhost:1337/api/projects?populate=*&locale=' + pState.lang);
          pState.projects = response.data.data.map(project => ({
            id: project.id,
            title: project.attributes.name,
            img: 'http://localhost:1337' + project.attributes.coverImage.data.attributes.url,
            gif: 'http://localhost:1337' + project.attributes.coverGif.data.attributes.url,
          }));
        } catch (error) {
          console.error('Failed to fetch projects', error);
        }
      };

      const getSingleProject = async () => {
        try {
          const response = await axios.get('http://localhost:1337/api/projects/' + projectId.value + '/?populate=*&locale=' + pState.lang);
          const project = response.data.data;
      
          if (project) {
            pState.projects = [{
              id: project.id,
              title: project.attributes.name,
              description: project.attributes.description,
              category: project.attributes.category.data.attributes.name,
              video: 'http://localhost:1337' + project.attributes.video.data.attributes.url
            }];
          } else {
            console.error('Project not found');
          }
        } catch (error) {
          console.error('Failed to fetch the single project', error);
        }
      };      

    return {
        pState,
        getProjects,
        getSingleProject,
    }
}

export default getProject;