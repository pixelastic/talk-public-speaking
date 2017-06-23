const Talk = {
  $slides: null,
  init() {
    Reveal.initialize({
      width: 1368,
      height: 768,
      margin: 0,
      minScale: 0.8,
      maxScale: 2,

      controls: false,
      progress: true,
      history: true,
      center: true,
      transition: 'linear',

      dependencies: [
        {
          src: 'js/vendors/classList.js',
          condition: () => !document.body.classList,
        },
        {
          src: 'js/vendors/notes.js',
        },
        {
          src: 'js/vendors/prism.js',
          callback: () => {
            Prism.highlightAll();
          },
        },
      ],
    });

    Talk.$slides = $('.slides').first();

    // Resizing slides to fit the whole screen
    Reveal.addEventListener('ready', Talk.onSlideChange);
    Reveal.addEventListener('slidechanged', Talk.onSlideChange);
    $(window).on(
      'resize',
      _.throttle(() => {
        Talk.forceFullScreen('section.present');
      }, 500)
    );
  },
  onSlideChange(event) {
    Talk.setGlobalStateClasses();
    Talk.forceFullScreen(event.currentSlide);
    if (event.previousSlide) {
      Talk.forceFullScreen(event.previousSlide);
    }
  },
  // Cancel Reveal positioning of slides
  forceFullScreen(slide) {
    $(slide).css('top', 0);
  },
  // We set a global "state" to the whole deck, based on the current slide
  // layout
  setGlobalStateClasses() {
    const currentSlide = document.querySelector('section.present');
    const currentStateClasses = Talk.$slides.attr('class').split(' ');
    const currentSlideClasses = _.filter(currentSlide.classList, className =>
      _.startsWith(className, 'slide--')
    );
    const newStateClasses = _.concat(
      _.reject(currentStateClasses, className =>
        _.startsWith(className, 'layout--')
      ),
      _.map(currentSlideClasses, className =>
        className.replace('slide--', 'layout--')
      )
    );
    Talk.$slides.attr('class', newStateClasses.join(' '));
  },
};
export default Talk;
