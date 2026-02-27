class TypewriterAnimation {
      constructor(element, texts, typeSpeed = 100, deleteSpeed = 50, pauseTime = 2000) {
        this.element = element;
        this.texts = texts;
        this.typeSpeed = typeSpeed;
        this.deleteSpeed = deleteSpeed;
        this.pauseTime = pauseTime;
        this.textIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.isPaused = false;
        
        this.startAnimation();
      }
      
      startAnimation() {
        this.type();
      }
      
      type() {
        const currentText = this.texts[this.textIndex];
        
        if (!this.isDeleting && this.charIndex <= currentText.length) {
          // Typing
          this.element.textContent = currentText.substring(0, this.charIndex);
          this.charIndex++;
          
          if (this.charIndex > currentText.length) {
            // Finished typing, pause then start deleting
            this.isPaused = true;
            setTimeout(() => {
              this.isPaused = false;
              this.isDeleting = true;
              this.type();
            }, this.pauseTime);
            return;
          }
          
          setTimeout(() => this.type(), this.typeSpeed);
        } else if (this.isDeleting && this.charIndex >= 0) {
          // Deleting
          this.element.textContent = currentText.substring(0, this.charIndex);
          this.charIndex--;
          
          if (this.charIndex < 0) {
            // Finished deleting, move to next text
            this.isDeleting = false;
            this.textIndex = (this.textIndex + 1) % this.texts.length;
            this.charIndex = 0;
            
            setTimeout(() => this.type(), this.typeSpeed);
            return;
          }
          
          setTimeout(() => this.type(), this.deleteSpeed);
        }
      }
    }

    function toggleMobileMenu() {
      const navMenu = document.getElementById('navMenu');
      navMenu.classList.toggle('active');
    }

    function scrollToSection(id) {
      const element = document.getElementById(id);
      if (element) {
        const headerHeight = document.querySelector('header').offsetHeight;
        const elementPosition = element.offsetTop - headerHeight;
        
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        });
        
        // Close mobile menu after clicking
        document.getElementById('navMenu').classList.remove('active');
        
        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(link => {
          link.classList.remove('active');
        });
        event.target.classList.add('active');
      }
    }

    // Scroll indicator
    window.addEventListener('scroll', () => {
      const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      document.getElementById('scrollIndicator').style.width = scrolled + '%';
    });

    // Header background on scroll
    window.addEventListener('scroll', () => {
      const header = document.querySelector('header');
      if (window.scrollY > 100) {
        header.style.background = 'rgba(10, 10, 10, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(139, 92, 246, 0.1)';
      } else {
        header.style.background = 'rgba(10, 10, 10, 0.9)';
        header.style.boxShadow = 'none';
      }
    });

    // Active navigation tracking
    window.addEventListener('scroll', () => {
      const sections = ['hero', 'about', 'experience', 'languages', 'tools', 'projects', 'contact'];
      const navLinks = document.querySelectorAll('.nav-link');
      
      let current = '';
      const offset = 150;
      
      sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
          const sectionTop = section.offsetTop - offset;
          const sectionHeight = section.offsetHeight;
          
          if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = sectionId;
          }
        }
      });
      
      navLinks.forEach((link, index) => {
        link.classList.remove('active');
        if (sections[index] === current) {
          link.classList.add('active');
        }
      });
    });

    // Intersection Observer for animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
        }
      });
    }, observerOptions);

    // Enhanced animations for different elements
    const leftObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animation = 'fadeInLeft 0.6s ease-out forwards';
        }
      });
    }, observerOptions);

    // Observe all cards and elements
    document.addEventListener('DOMContentLoaded', () => {
      const cards = document.querySelectorAll('.card, .lang-card, .experience-item');
      cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        // Add staggered delay
        setTimeout(() => {
          observer.observe(card);
        }, index * 50);
      });

      // Observe about section content
      const aboutContent = document.querySelector('.about-content');
      if (aboutContent) {
        aboutContent.style.opacity = '0';
        aboutContent.style.transform = 'translateX(-20px)';
        leftObserver.observe(aboutContent);
      }

      // Initialize typewriter animation
      const typewriterElement = document.getElementById('typewriter');
      const texts = [
        'Cloud Engineer & Full-Stack Developer',
        'AWS Solutions Architect',
        'React & Node.js Expert',
        'Database Designer',
        'DevOps Enthusiast',
        'Mobile App Developer'
      ];
      
      if (typewriterElement) {
        new TypewriterAnimation(typewriterElement, texts, 50, 30, 1000);
      }
    });

    // Smooth scrolling for all CTA buttons
    document.querySelectorAll('.cta-button').forEach(button => {
      button.addEventListener('click', (e) => {
        const href = button.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const targetId = href.substring(1);
          scrollToSection(targetId);
        }
      });
    });

    // Enhanced hover effects for project cards
    document.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-12px) scale(1.02)';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(-8px) scale(1)';
      });
    });
