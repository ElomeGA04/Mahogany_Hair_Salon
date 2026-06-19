

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

    /*MODAL FOR SERVICE IMAGES (Lighhtbox)*/
    function initLightbox(){
        /*Create modal overlay*/
        const modal = document.createElement('div');
        modal.id = 'lightbox-modal';
        modal.style.display = 'none';
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.backgroundColor = 'rgba(0,0,0,0.9)';
        modal.style.justifyContent = 'center';
        modal.style.alignItems = 'center';
        modal.style.padding = '20px';

        /*close button*/
        const closeBtn = document.createElement('span');
        closeBtn.innerHTML = '&times;';
        closeBtn.style.position = 'absolute';
        closeBtn.style.top = '20%';
        closeBtn.style.color = '#fff1b5';
        closeBtn.style.fontSize = '40px';
        closeBtn.style.cursor = 'pointer';
        closeBtn.style.zIndex = '1001';

        closeBtn.addEventListener('mouseenter', function(){
            this.style.color = '#c1dbe8';
            this.style.transform = 'scale(1.2)';

        });

        closeBtn.addEventListener('mouseleave', function(){
            this.style.color = '#fff1b5';
            this.style.transform = 'scale(1)';
        
        });

        /*Modal image*/
        const modalImg = document.createElement('img');
        modalImg.id = 'modal-image';
        modalImg.style.maxWidth = '90%';
        modalImg.style.maxHeight = '90%';
        modalImg.style.borderRadius = '0 0 50px rgba(0, 0, 0,  0.5)';
        modalImg.style.objectFit = 'contain';

        /*Modal caption*/
        const caption = document.createElement('p');
        caption.id  = 'modal-caption';
        caption.style.color = '#fff1b5';
        caption.style.textAlign = 'center';
        caption.style.marginTop = '20px';
        caption.style.fontSize = '1.2rem';
        caption.style.fontFamily = 'Playfair Display, serif';

        /*Assemble modal*/
        modal.appendChild(closeBtn);
        modal.appendChild(modalImg);
        modal.appendChild(caption);
        document.body.appendChild(modal);

        /*Click event for images*/
        document.querySelectorAll('.service-item img, .products-img').forEach(img => {
            img.style.cursor = 'pointer';
            img.addEventListener('click', function(){
                modal.style.display = 'flex';
                modalImg.src = this.src;
                caption.textContent = this.alt || 'Mahogany Hair Salon Service';

                /*Prevent body roll*/
                document.body.style.overflow = 'hidden';
            });
        });

        /*Close modal functions*/
        function closeModal(){
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }

        closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', function(e){
            if(e.target === this){
                closeModal();
            }
        });

        /*Keyboard escape to close*/
        document.addEventListener('keydown', function(e){
            if(e.key === 'Escape' && modal.style.display === 'flex'){
                closeModal();
            }

        });

    

    /*TAB FUNCTIONALITY FOR SERVICES*/
    function initTabs(){
        /*Create tabs container*/
        const heroSections = document.querySelectorAll('.hero');
        if(heroSections.length > 1){
            const tabsContainer = document.createElement('div');
            tabsContainer.className = 'service-tabs';
            tabsContainer.style.display = 'flex';
            tabsContainer.style.justifyContent = 'center';
            tabsContainer.style.gap = '10px';
            tabsContainer.style.margin = '20px 0';
            tabsContainer.style.flexWrap = 'wrap';

            const serviceCategories = ['All', 'Braiding', 'Wig Installation', 'Nail Art', 'Makeup'];
            const categoryData = {
                'All': {images: document.querySelectorAll('.services-grid')},
                'Braiding':{images: document.querySelectorAll('.services-grid')[0]},
                'Wig Installation': {images: document.querySelectorAll('.services-grid')[1]},
                'Nail Art': {images: document.querySelectorAll('.services-grid')[2]},
                'Makeup': {images: document.querySelectorAll('.services-grid')[3]}
            };

            /*Create tabs buttons*/
            serviceCategories.forEach(category => {
                const tabBtn = document.createElement('button');
                tabBtn.textContent = category;
                tabBtn.className = 'tab-button';
                tabBtn.style.padding = '10px 25px';
                tabBtn.style.border = '2px solid #43302e';
                tabBtn.style.borderRadius = '30px';
                tabBtn.style.background = 'transparent';
                tabBtn.style.color = '#43302e';
                tabBtn.style.fontFamily = 'Poppins, sans-serif';
                tabBtn.style.fontWeight = '500';
                tabBtn.style.transition = 'all 0.3s ease';

                if(category === 'All'){
                    tabBtn.style.background = '#43302e';
                    tabBtn.style.color = '#fff1b5';

                }

                tabBtn.addEventListener('mouseenter', function(){
                    if(this.style.background !== '#43302e'){
                        this.style.background = '#c1dbe8';
                        this.style.color = '#43302e';
                    }
                });

                tabBtn.addEventListener('mouseleave', function(){
                    if(this.style.background !== '#43302e'){
                        this.style.background = 'transparent';
                        this.style.color= '#43302e';
                    }
                });

                tabBtn.addEventListener('click', function(){
                    /*Reset all tabs*/
                    document.querySelectorAll('.tab-button').forEach(btn => {
                        btn.style.background = 'transparent';
                        btn.style.color = '#43302e';

                    });
                    this.style.background = '#43302e';
                    this.style.color = '#fff1b5';

                    /*Show/hide service grids*/
                    const grids = document.querySelectorAll('.services-grid');
                    grids.forEach(grid => grid.style.display = 'none');

                    if(category === 'All'){
                        grids.forEach(grid => grid.style.display = 'grid');

                    }else{
                        const categoryMap = {
                            'Braiding': 0,
                            'Wig Installation': 1,
                            'Nail Art': 2,
                            'Makeup': 3
                        };
                        const index = categoryMap[category];
                        if(index !== undefined && grids[index]){
                            grids[index].style.display = 'grid';
                        }
                    }
                });

                tabsContainer.appendChild(tabsBtn);
            });

            /*Insert tabs after the first hero section*/
            const firstHero = document.querySelector('.hero');
            if(firstHero){
                firstHero.parentNode.insertBefore(tabsContainer, firstHero.nextSibling);
            }
        }

    }

    

};