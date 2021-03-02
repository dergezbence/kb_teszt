import ImageContainer from './image_container'



var urls = ["https://akcios-ujsag.hu/wp-content/uploads/2021/02/aldi-akcios-ujsag-20210204-0210_Page_01.jpg"];


urls.forEach(url => {
    const loader = new ImageContainer(url);
    loader.render();
})