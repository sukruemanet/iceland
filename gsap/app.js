document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('video');
    const mask = document.getElementById('mask');
    const container = document.getElementById('container');
    const welcome = document.getElementById('welcome');
    const header = document.getElementById('header');
    const linePaths = document.querySelectorAll('.line-path');

    gsap.registerPlugin(ScrollTrigger);

    gsap.set(mask, {
        width: 300,
        height: 300,
        scale: 1,
    });

    gsap.set(welcome, {
        opacity: 0,
        y: 30,
    });

    gsap.set(header, {
        opacity: 0,
        y: -20,
    });

    video.play();

    const tl = gsap.timeline({
        defaults: { ease: 'power2.inOut' },
        delay: 0.5,
    });

    tl.to(mask, {
        width: '100vw',
        height: '100vh',
        duration: 2,
    })
    .to(
        container,
        {
            backgroundColor: 'transparent',
            duration: 1,
        },
        '-=1'
    )
    .to(
        welcome,
        {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
        },
        '-=0.5'
    )
    .to(
        header,
        {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
        },
        '-=0.7'
    );

    const scrollTl = gsap.timeline({
        scrollTrigger: {
            trigger: container,
            start: "top top",
            end: "+=100%",
            pin: true,
            pinSpacing: true,
            scrub: 1,
          
        }
    });

    linePaths.forEach(path => {
        gsap.set(path, {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "black",
            clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)"
        });

        scrollTl.to(path, {
            clipPath: "polygon(100% 0, 0 0%, 0 100%, 100% 100%)",
            duration: 1,
            ease: "none"
        }, "<");
    });
});