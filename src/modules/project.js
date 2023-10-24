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
            hoverText: project.attributes.hoverText,
            img: 'http://localhost:1337' + project.attributes.coverImage.data.attributes.url,
            gif: 'http://localhost:1337' + project.attributes.coverGif.data.attributes.url,
          }));
        } catch (error) {
          console.error('Failed to fetch projects', error);
        }
      };

      const getSingleProject = async () => {
        try {
          console.log("Current Project ID:", projectId.value); // Log the current project ID
      
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
      
          // Get the list of projects for the current language
          const responseAll = await axios.get('http://localhost:1337/api/projects?populate=*&locale=' + pState.lang);
          const allProjects = responseAll.data.data.map(project => ({
            id: project.id,
          }));
      
          console.log("All Projects:", allProjects); // Log the array of all projects
          // Find the current project's index in the list
          const currentIndex = allProjects.findIndex(p => p.id === Number(projectId.value));

          console.log("Current Project Index:", currentIndex); // Log the current project's index
      
          // Check if the current project is the last one
          const isLastProject = currentIndex === allProjects.length - 1;
      
          // Store the next project ID
          let nextProjectId = null;
          if (!isLastProject) {
            nextProjectId = allProjects[currentIndex + 1].id;
          }
      
          console.log("Next Project ID:", nextProjectId); // Log the next project ID
      
          // You can pass the nextProjectId to your button in the template
          pState.nextProjectId = nextProjectId;
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