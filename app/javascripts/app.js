let Talk = {
  $slides: null,
  init() {
    Reveal.initialize({
      width: "100%",
      height: "100%",
      margin: 0,
      minScale: 1,
      maxScale:1,

      controls: false,
      progress: true,
      history: true,
      center: true,
      transition: 'linear',

      dependencies: [{
        src: 'js/vendors/classList.js',
        condition: () => {
          return !document.body.classList;
        }
      }, {
        src: 'js/vendors/notes.js'
      },{
        src: 'js/vendors/prism.js',
        callback: () => {
          Prism.highlightAll();
        }
      }]
    });

    Talk.$slides = $('.slides').first();

    // Resizing slides to fit the whole screen
    Reveal.addEventListener('ready', Talk.onSlideChange);
    Reveal.addEventListener('slidechanged', Talk.onSlideChange);
    $(window).on('resize', _.throttle(() => {
      Talk.forceFullScreen('section.present');
    }, 500));
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
    var currentSlide = document.querySelector('section.present');
    let currentStateClasses = Talk.$slides.attr('class').split(' ');
    let currentSlideClasses = _.filter(currentSlide.classList, className => {
      return _.startsWith(className, 'slide--');
    });
    let newStateClasses = _.concat(
      _.reject(currentStateClasses, className => {
        return _.startsWith(className, 'layout--')
      }),
      _.map(currentSlideClasses, className => {
        return className.replace('slide--', 'layout--')
      })
    );
    Talk.$slides.attr('class', newStateClasses.join(' '));
  },
}
export default Talk;
