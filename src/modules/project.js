import { reactive, computed, watch } from "vue"
import { useRoute, useRouter } from 'vue-router'
import { store } from '@/store';
import axios from "axios";


const getProject = () => {
    const route = useRoute();
    const router = useRouter();

    const projectId = computed(() => route.params.id)

    const pState = reactive({
        lang: store.lang,
        title: '',
        members: '',
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
            img: 'http://localhost:1337' + project.attributes.coverImage.data.attributes.url,
            gif: 'http://localhost:1337' + project.attributes.coverGif.data.attributes.url,
          }));
        } catch (error) {
          console.error('Failed to fetch projects', error);
        }
        console.log(pState.projects)
      };

    return {
        pState,
        getProjects,
    }
}

export default getProject;