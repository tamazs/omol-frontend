import { reactive } from "vue"
import axios from "axios";


const getAbout = () => {

    const aState = reactive({
        abouts: []
    })

    const getAbouts = async () => {
        try {
          const response = await axios.get('http://localhost:1337/api/about-image?populate=*');
          const images = response.data.data.attributes.image.data; // Access the image data
      
          if (Array.isArray(images)) {
            images.forEach((image) => {
              image.attributes.url = 'http://localhost:1337' + image.attributes.url;
            });
      
            aState.abouts = images;
          } else {
            console.error('No about data found or the data is not an array.');
          }
        } catch (error) {
          console.error('Failed to fetch abouts', error);
        }
      };
      

    return {
        aState,
        getAbouts
    }
}

export default getAbout;