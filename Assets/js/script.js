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

            /*Add diffferent descriptions based on services*/
            const serviceName = item.querySelector('p')?.textContent || '';
            const description ={
                'Straight back': 'Classic straight back braids, neat and long-lasting style.',
                'Patewo braids': 'Stylish Patewo braids with a modern twist.',
                'Short Kinky': 'Voluminous long kinky hair for aa bold statement.',
                'Short Kinky': 'Playful short kinky style, perfect for everyday wear.',
                'Long curls': 'Elegant long curls with beautiful bounce and movement.',
                'Side part': 'sophisticated side part style for glamorous look.',
                'Short bob': 'Classic short bob cut, timeless and versatile.',
                'Colored bob': 'Vibrant colored bob to make a statement.',
                'Medium almond': 'Elegant medium almond-shaped nails.',
                'Long almond': 'Dramatic long almond nails for a sophisticated look.',
                'Short almond model': 'Natural short almond style, perfect for daily wear.',
                'Short almond': 'Classic short almond nails.',
                'Medium square': 'Modern medium square nails.',
                'Long square': 'Bold long square nails.',
                'Fullbeat': 'Full coverage glamour makeup look.',
                'Matt glow': 'Matte finish with a subtle glow.',
                'Natural glam': 'Natural-looking glamorous makeup.'

            };

            description.textContent = description[serviceName] || 'Professional service with quality results.';

            /*Insert description after the price button*/
            item.appendChild(description);

            /*Add click event to toggle description*/
            priceBtn.addEventListener('click', function(e){
                e.stopPropagation();


                /*Hide all other description*/
                document.querySelectorAll('.service-descripion').forEach(desc => {
                    if(desc !== description){
                        desc.style.display ='none';
                    }
                });

                /*Toggle current description*/
                if(description.style.display === 'none' || description.style.display === ''){
                    description.style.display = 'block';
                    priceBtn.textContent = 'Hide Details';
                }else{
                    description.style.display = 'none';
                    priceBtn.textContent = this.textContent.replace('Hide Details', '').trim() || 'View Details';
                }
            });

        });
    }

});