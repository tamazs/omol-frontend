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
          const response = await axios.get('https://omol-cms.onrender.com/api/projects?populate=*&locale=' + pState.lang);
          pState.projects = response.data.data.map(project => ({
            id: project.id,
            title: project.attributes.name,
            hoverText: project.attributes.hoverText,
            img: project.attributes.coverImage.data.attributes.url,
            gif: project.attributes.coverGif.data.attributes.url,
          }));
        } catch (error) {
          console.error('Failed to fetch projects', error);
        }
      };

      const getSingleProject = async () => {
        try {
      
          const response = await axios.get('https://omol-cms.onrender.com/api/projects/' + projectId.value + '/?populate=*&locale=' + pState.lang);
          const project = response.data.data;
      
          if (project) {
            pState.projects = [{
              id: project.id,
              title: project.attributes.name,
              description: project.attributes.description,
              category: project.attributes.category.data.attributes.name,
              video: project.attributes.video.data.attributes.url,
            }];
            if (Array.isArray(project.attributes.bts.data)) {
              const btsImages = project.attributes.bts.data.map(image => image.attributes.url);
      
              // Add the "btsImages" array to the project object
              pState.projects[0].btsImages = btsImages;
            }
            else {
              // If it's not an array, create a single-item array with the URL
              pState.projects[0].btsImages = [project.attributes.bts.attributes.url];
            }
          } else {
            console.error('Project not found');
          }
      
          // Get the list of projects for the current language
          const responseAll = await axios.get('https://omol-cms.onrender.com/api/projects?populate=*&locale=' + pState.lang);
          const allProjects = responseAll.data.data.map(project => ({
            id: project.id,
          }));
      
          // Find the current project's index in the list
          const currentIndex = allProjects.findIndex(p => p.id === Number(projectId.value));

      
          // Check if the current project is the last one
          const isLastProject = currentIndex === allProjects.length - 1;
      
          // Store the next project ID
          let nextProjectId = null;
          if (!isLastProject) {
            nextProjectId = allProjects[currentIndex + 1].id;
          }
      
          // You can pass the nextProjectId to your button in the template
          pState.nextProjectId = nextProjectId;
        } catch (error) {
          console.error('Failed to fetch the single project', error);
        }
      };

      const latestProjects = async () => {
        try {
            const response = await axios.get(
                'https://omol-cms.onrender.com/api/projects?populate=*&locale=' + pState.lang,
                {
                    params: {
                        _limit: 9, // Limit to 9 projects
                    }
                }
            );
    
            const projects = response.data.data.map(project => ({
                id: project.id,
                title: project.attributes.name,
                hoverText: project.attributes.hoverText,
                createdAt: new Date(project.attributes.createdAt), // Convert createdAt to a JavaScript Date object
                img: project.attributes.coverImage.data.attributes.url,
                gif: project.attributes.coverGif.data.attributes.url,
            }));
    
            // Sort the projects by createdAt in descending order
            projects.sort((a, b) => b.createdAt - a.createdAt);
    
            // Take the first 9 projects
            pState.projects = projects.slice(0, 9);
  
        } catch (error) {
            console.error('Failed to fetch latest projects', error);
        }
    };
    

    return {
        pState,
        getProjects,
        getSingleProject,
        latestProjects
    }
}

export default getProject;