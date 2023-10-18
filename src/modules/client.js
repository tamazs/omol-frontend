import { reactive } from "vue"
import axios from "axios";


const getClient = () => {

    const cState = reactive({
        clients: []
    })

    const getClients = async () => {
        try {
          const response = await axios.get('http://localhost:1337/api/client?populate=*');
          const images = response.data.data.attributes.img.data; // Access the image data
      
          if (Array.isArray(images)) {
            images.forEach((image) => {
              image.attributes.url = 'http://localhost:1337' + image.attributes.url;
            });
      
            cState.clients = images;
          } else {
            console.error('No clients data found or the data is not an array.');
          }
        } catch (error) {
          console.error('Failed to fetch clients', error);
        }
      };
      

    return {
        cState,
        getClients
    }
}

export default getClient;