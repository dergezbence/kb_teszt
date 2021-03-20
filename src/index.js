import ImageContainer from './image_container'
import DraggingManager from './dragging_manager'



var urls = [
    'https://akcios-ujsag.hu/wp-content/uploads/2021/03/aldi-akcios-ujsag-20210304-0310_Page_01.jpg',
    'https://akcios-ujsag.hu/wp-content/uploads/2021/03/aldi-akcios-ujsag-20210304-0310_Page_02.jpg',
    'https://akcios-ujsag.hu/wp-content/uploads/2021/03/aldi-akcios-ujsag-20210304-0310_Page_03.jpg'
];


urls.forEach(url => {
    const loader = new ImageContainer(url,  new DraggingManager());
    loader.render();
})