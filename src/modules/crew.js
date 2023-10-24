import { reactive, computed, watch } from "vue"
import { useRoute, useRouter } from 'vue-router'
import { store } from '@/store';
import axios from "axios";


const getCrew = () => {
    const route = useRoute();
    const router = useRouter();

    const crewId = computed(() => route.params.id)

    const crewState = reactive({
        lang: store.lang,
        crews: []
    })

    watch(() => store.lang, (newLang) => {
        crewState.lang = newLang;
        getCrews();
      });

    const getCrews = async () => {
        try {
          const response = await axios.get('http://localhost:1337/api/crews?populate=*&locale=' + crewState.lang);
          crewState.crews = response.data.data.map(crew => ({
            id: crew.id,
            img: 'http://localhost:1337' + crew.attributes.img.data.attributes.url
          }));
        } catch (error) {
          console.error('Failed to fetch crew', error);
        }
      };

      const getSingleCrew = async () => {
        try {
          const response = await axios.get('http://localhost:1337/api/crews/' + crewId.value + '/?populate=*&locale=' + crewState.lang);
          const crew = response.data.data;
      
          if (crew) {
            crewState.crews = [{
              id: crew.id,
              firstName: crew.attributes.firstName,
              lastName: crew.attributes.lastName,
              bio: crew.attributes.bio,
              img: 'http://localhost:1337' + crew.attributes.img.data.attributes.url
            }];
          } else {
            console.error('Crew not found');
          }
        } catch (error) {
          console.error('Failed to fetch the single project', error);
        }
      };      

    return {
        crewState,
        getCrews,
        getSingleCrew,
    }
}

export default getCrew;