function openLightbox(imgSrc) {
            var overlay = document.getElementById('lightboxOverlay');
            var image = document.getElementById('lightboxImg');
            
            image.src = imgSrc;
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden'; 
            overlay.scrollTop = 0; 
        }

        function closeLightbox() {
            var overlay = document.getElementById('lightboxOverlay');
            overlay.classList.remove('active');
            document.body.style.overflow = 'auto'; 
        }

        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                closeLightbox();
            }
        });
