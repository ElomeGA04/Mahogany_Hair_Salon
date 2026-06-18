document.addEventListener('DOMContentLoaded', function(){

    /*GALLERY LIGHTBOX*/

    function initAccordion(){
        const serviceItems = document.querySelectorAll('.service-item');

        serviceItems.forEach((item, index) => {

            /*Create accordion toggle button*/
            const img = item.querySelector('img');
            const priceBtn = item.querySelector('btn-prod');
            const description = document.createElement('p');
            description.className = 'service-description';
            description.style.display = 'none';
            description.style.marginTop = '10px';
            description.style.padding = '10px';
            description.style.background = '#fff1b5';
            description.style.borderRadius = '8px';
            description.style.color = '#43302e';
        })
    }

});