var iPhone = /iPhone/.test(navigator.userAgent) && !window.MSStream;
var iPad = /iPad/.test(navigator.userAgent) && !window.MSStream;
var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
if(iPhone){
    $('body').addClass('iphone');
}
if(iPad){
    $('body').addClass('ipad');
}
var ua = navigator.userAgent.toLowerCase();
if (ua.indexOf('safari') != -1) {
  if (ua.indexOf('chrome') > -1) {
    // alert("1") // Chrome
  } else {
    // alert("2") // Safari
    $('body').addClass('safari');
  }
}



if(window.navigator.userAgent.indexOf("Edge") > -1) {
  $('body').addClass('edge');
}

var UAString = navigator.userAgent;
if (UAString.indexOf("Trident") !== -1 && UAString.indexOf("rv:11") !== -1)
{
  $('body').addClass('ie');
}
if (UAString.indexOf("Trident") !== -1 && UAString.indexOf("rv:10") !== -1)
{
  $('body').addClass('ie');
}


$(document).ready(function () {
  // $('.quest__btn').click(function (e) {
  //
  //   if($(this).closest('.quest__item.active').length > 0){
  //     $(this).closest('.quest__item').removeClass('active');
  //   } else{
  //     $('.quest__item').removeClass('active');
  //     $(this).closest('.quest__item').addClass('active');
  //   }
  // });

  var bLazy = new Blazy({
    src: 'data-blazy' // Default is data-src
  });

  $('.header__menu-item').hover(function () {
    bLazy = new Blazy({
      src: 'data-blazy-menu' // Default is data-src
    });
  })

  $('.header__mobile-menu').click(function () {
    $('.mobile-menu').addClass('open');
    $(this).toggleClass('active');
  });

  $('.mobile-menu__close').click(function () {
    $('.mobile-menu').removeClass('open');
  });

  $('.mobile-menu').click(function (e) {
    if ($(e.target).hasClass('mobile-menu')) {
      $('.mobile-menu__close').click();
    }
  });

  $('.header__mobile-search a').click(function () {
    $('.header__search').addClass('open');
  });

  $('.header__search-close').click(function (e) {
    $('.header__search').removeClass('open');
  });
  $('.footer__subscribe-input-send').click(function (e) {
    if ($('.footer__subscribe-input input[type="text"]').val().length === 0) {
      e.preventDefault();
      $('.footer__subscribe-input input[type="text"]').addClass('error');
    }
  });
  $('.filter__category-name').click(function (e) {
    $('.filter').toggleClass('open');
  });

  $('.select-two').select2({
    minimumResultsForSearch: -1
  });

  $('.select-cart').select2({

  });

  $('.cart__summ-promocode-link').click(function (e) {
    e.preventDefault();
    $('.cart__summ-promocode-block').slideToggle();
  })

  $('.product-card-slider-js').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: true,
    asNavFor: '.product-card-navslider-js',
    responsive: [
      {
        breakpoint: 550,
        settings: {
          dots: true
        }
      },
    ]
  });
  $('.product-card-navslider-js').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: '.product-card-slider-js',
    arrows: false,
    dots: false,
    centerMode: false,
    focusOnSelect: true,
  });

  $('.product-card-slider-js, .product-card-navslider-js').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
    setTimeout(function () {
      bLazy.revalidate();
    }, 200);
  });

  $(document).on('click', '.product-card__property-item > a', function (e) {
    e.preventDefault();
    $(this).closest('.product-card__property-list').find('.product-card__property-item').removeClass('active');
    $(this).closest('.product-card__property-item').addClass('active');
  });


  if ($(window).width() > 992) {

    $('.product-card__tab-item').click()
    $(document).on('click', '.product-card__tab-item', function (e) {
      $('.product-card__tab-item').removeClass('active');
      $(this).addClass('active');
      $('.product-card__tab-content-item').removeClass('active');
      $('.product-card__tab-item').each(function (index, item) {
        if ($(item).hasClass('active')) {
          $('.product-card__tab-content-item:eq(' + index + ')').addClass('active');
        }
      });

      bLazy.revalidate();
    });
  } else {
    $('.product-card__tab-content-item').removeClass('active');

    $('.product-card__tab-content-mobile-title').click(function (e) {
      var that = $(this);
      if($(that).closest('.product-card__tab-content-item').hasClass('active')){
        $(that).siblings('.product-card__tab-content-inner').slideToggle();
        $(that).closest('.product-card__tab-content-item').removeClass('active');
        return;
      } else {
        $('.product-card__tab-content-item.active .product-card__tab-content-inner').slideToggle();
        $('.product-card__tab-content-item').removeClass('active');
        $(that).closest('.product-card__tab-content-item').addClass('active');
        $(that).siblings('.product-card__tab-content-inner').slideToggle();

        setTimeout(function(){
          $([document.documentElement, document.body]).animate({
            scrollTop:  $('.product-card__tab-content-item.active').offset().top
          }, 300);
          $('.products__items-slider').slick('reinit');
        },500);
      }

      setTimeout(function(){
        bLazy.revalidate();
      },300);
    });
  }

  if($(window).width() > 992) {
    $(document).on('click', '[data-personal-tab]', function (e) {
      var tabNumber = $(this).attr('data-personal-tab');
      $('[data-personal-tab]').removeClass('active');
      $(this).addClass('active');

      $('[data-personal-section]').removeClass('active');
      $('[data-personal-section=' + tabNumber + ']').addClass('active');
    });

  } else {

    $('.personal__section-item').removeClass('active');

    $('.personal__section-title-mob').click(function (e) {

      if($(this).closest('.personal__section-item').hasClass('active')){
        $(this).siblings('.personal__section-item-container').slideToggle();
        $(this).closest('.personal__section-item').removeClass('active');
        return;
      } else {
        $('.personal__section-item.active .personal__section-item-container').slideToggle();
        $('.personal__section-item').removeClass('active');
        $(this).closest('.personal__section-item').addClass('active');
        $(this).siblings('.personal__section-item-container').slideToggle();

        setTimeout(function () {
          $([document.documentElement, document.body]).animate({
            scrollTop: $('.personal__section-item.active').offset().top
          }, 300);
        }, 500);
      }
    });
  }

  $('.header__search-block input[type="text"]').focus(function () {
    $('.header__search-block').addClass('active');
  })

  $('.header__search-block input[type="text"]').focusout(function () {
    $('.header__search-block').removeClass('active');
  });

  $('.cart__summ-promocode-input[type="submit"]').click(function (e) {
    if($(this).prev().find('input').val().length === 0) {
      $(this).prev().addClass('error-field');
      $(this).prev().find('input').focus();
      e.preventDefault();
    }
  })

  /*validation start*/
  $(document).on('click', '.site-form-submit-js', function(e){
    e.preventDefault();
    if($(this).closest('form').find('input[type="tel"]').length != 0) {
      var inputTel = $(this).closest('form').find('input[type="tel"]');
      if (inputTel.val().indexOf('_') === -1 && inputTel.val() != 0) {
        $(inputTel).closest('.site-form__input').addClass('correct');
        $(inputTel).closest('.site-form__input').removeClass('error-field');
        } else {
        $(inputTel).closest('.site-form__input').addClass('error-field');
        $(inputTel).closest('.site-form__input').removeClass('correct');
        }
    }

    if($(this).closest('form').find('input[type="email"].required').length != 0) {
      var reg = /^[\w\.\d-_]+@[\w\.\d-_]+\.\w{2,4}$/i;

      var input = $(this).closest('form').find('input[type="email"].required');
      var email = $(this).closest('form').find('input[type="email"].required').length > 0
        ? $(this).closest('form').find('input[type="email"].required')
        : false;


      if (email.val() == "" && email !== false) {
        email.closest('.site-form__input').addClass('error-field');

      } else {
        if (reg.test(email.val()) == false) {
          email.closest('.site-form__input').addClass('error-field');
          email.closest('.site-form__input').removeClass('correct');

        } else {
          email.closest('.site-form__input').addClass('correct');
          email.closest('.site-form__input').removeClass('error-field');
        }
      }
    }

    $(this).closest('form').find('input[type="password"].required').each(function () {

      if($(this).val().length < 4){
        $(this).closest('.site-form__row').addClass('error-field');
        $(this).closest('.site-form__row').removeClass('correct');
      } else {
        $(this).closest('.site-form__row').addClass('correct');
        $(this).closest('.site-form__row').removeClass('error-field');
      }
    });

    $(this).closest('form').find('input[type="text"].required').each(function () {
      if($(this).val() === ''){
        $(this).closest('.site-form__input').addClass('error-field');
        $(this).closest('.site-form__input').removeClass('correct');
      } else {
        $(this).closest('.site-form__input').addClass('correct');
        $(this).closest('.site-form__input').removeClass('error-field');
      }
    });

    $(this).closest('form').find('textarea.required').each(function () {
      if($(this).val() === ''){
        $(this).closest('.site-form__textarea').addClass('error-field');
        $(this).closest('.site-form__textarea').removeClass('correct');
      } else {
        $(this).closest('.site-form__input').addClass('correct');
        $(this).closest('.site-form__input').removeClass('error-field');
      }
    });

    if($(this).closest('form').find('.error-field').length == 0 && ($(this).closest('form').find('.required').length === 0 || $(this).closest('form').find('.correct').length > 0)){
      $(this).closest('form').find('.correct').removeClass('correct');
      $(this).siblings('input[type="submit"]').click();
    }
  });

  $(document).on('click', '.site-form-pass-js', function(e){
    e.preventDefault();

    $(this).closest('form').find('input[type="password"].required').each(function () {

      if($(this).val().length < 4){
        $(this).closest('.site-form__row').addClass('error-field');
        $(this).closest('.site-form__row').removeClass('correct');
      } else {
        $(this).closest('.site-form__row').addClass('correct');
        $(this).closest('.site-form__row').removeClass('error-field');
      }
    });


    if($(this).closest('form').find('.error-field').length == 0 && ($(this).closest('form').find('.required').length === 0 || $(this).closest('form').find('.correct').length > 0)){
      $(this).closest('form').find('.correct').removeClass('correct');
      $(this).siblings('input[type="submit"]').click();
    }
  });

  $('.phonemask').inputmask("+38(999)99-99-99");

  /*validation end*/

  $('.site-form__input-show-pass').click(function (e) {
    if($(this).siblings('input').attr('type') == 'password') {
      $(this).siblings('input').attr('type', 'text');
    } else {
      $(this).siblings('input').attr('type', 'password');
    }
  });

  $(".personal__table-wrap").mCustomScrollbar({
    axis:"x" // horizontal scrollbar
  });

  $(document).on('click', '.submit-cart-from-js', function(e){
    e.preventDefault();
    // $(document).find('.site-form-submit-js').click();

    // $('[data-cart-content="1"]').removeClass('active');
    // $('[data-cart-content="2"]').addClass('active');
    // $('[data-cart-tab="2"]').addClass('active');

    if($('[data-cart-content="2"]').hasClass('active')){
      location.href = './cart-order-last.html';

    } else {
      $('[data-cart-content="1"]').removeClass('active');
      $('[data-cart-content="2"]').addClass('active');
      $('[data-cart-tab="2"]').addClass('active');
    }


  });



  $(document).scroll(function () {
    var top = $(document).scrollTop();
    if (top < 1) {
      $(".header").removeClass('scroll');
    } else {
      $(".header").addClass('scroll');
    }
  });

  $( "#slider-range" ).slider({
    range: true,
    min: 0,
    max: 7000,
    values: [ 1000, 3000 ],
    slide: function( event, ui ) {
      $( "#amount-for" ).val( ui.values[ 0 ] );
      $( "#amount-from" ).val( ui.values[ 1 ] );
    }
  });


  $( "#amount-for" ).val( $( "#slider-range" ).slider( "values", 0 ) );
  $( "#amount-from" ).val( $( "#slider-range" ).slider( "values", 1 ) );


  $('#amount-for, #amount-from').focusout(function () {
    $( "#slider-range" ).slider( "option", "values", [ parseInt($('#amount-for').val()), parseInt($('#amount-from').val()) ] );
  })

  $('.filter-other__name').click(function () {
    $(this).next().slideToggle();
    $(this).toggleClass('active');
  });

  $('.filter-mob').click(function (e) {
    e.preventDefault();
    $(this).toggleClass('active');
    if($('.sort-mob').hasClass('active')){
      $('.sort-mob').removeClass('active');
      $('.catalog-sort-wrap').slideToggle();
    }
    $('.filter-other__block-wrap').slideToggle();
  });

  $('.sort-mob').click(function (e) {
    e.preventDefault();
    $(this).toggleClass('active');
    if($('.filter-mob').hasClass('active')){
      $('.filter-mob').removeClass('active');
      $('.filter-other__block-wrap').slideToggle();
    }
    $('.catalog-sort-wrap').slideToggle();
  });

  $(document).scroll();

  AOS.init({disable: 'mobile'});

  $(document).on('click', '[data-auth-tab]', function(e){
    var tabNumber = $(this).attr('data-auth-tab');
    $('[data-auth-tab]').removeClass('active');
    $(this).addClass('active');

    $('.auth-popup__body-item').removeClass('active');
    $('.auth-popup__body-item[data-auth-content='+ tabNumber +']').addClass('active');
  });

  $(document).on('click', '.site-form__fp', function(e){
    var tabNumber = $(this).attr('data-auth-tab');
    $('[data-auth-tab]').removeClass('active');

    $('.auth-popup__body-item').removeClass('active');
    $('.auth-popup__body-item[data-auth-content=3]').addClass('active');
  });

  $(document).on('click', '[data-custom-tab]', function(e){
    var tabNumber = $(this).attr('data-custom-tab');
    $('[data-custom-tab]').removeClass('active');
    $(this).addClass('active');

    $('[data-custom-tab]').removeClass('active');
    $('[data-custom-tab='+ tabNumber +']').addClass('active');
  });

  $(document).on('click', '[data-cart-tab=1]', function(e){
    e.preventDefault();
    $('[data-cart-tab=2]').removeClass('active');

    $('[data-cart-content="2"]').removeClass('active');
    $('[data-cart-content="1"]').addClass('active');
  });


  //
  // $('.header__menu-btn').click(function () {
  //   $(this).toggleClass('open');
  //   $('.header__menu').toggleClass('open');
  // });
  //
  // $('.has-submenu-first').click(function (e) {
  //   // console.log($(e.target));
  //   if($(e.target).hasClass('open') && $(e.target).hasClass('has-submenu-first')){
  //     $(this).children('.header__submenu').slideUp();
  //     $(this).removeClass('open');
  //   } else {
  //     $(this).addClass('open');
  //     $(this).children('.header__submenu').slideDown();
  //   }
  // });
  //
  //
  // $('.header__submenu-item').click(function (e) {
  //
  //     if($(e.target).hasClass('open') && $(e.target).hasClass('header__submenu-item')){
  //       $(this).children('.header__submenu2').slideUp();
  //       $(this).removeClass('open');
  //     } else {
  //       $(this).addClass('open');
  //       $(this).children('.header__submenu2').slideDown();
  //     }
  // });
  //
  // $('.header__submenu2-item').click(function (e) {
  //
  //   if($(e.target).hasClass('open') && $(e.target).hasClass('header__submenu2-item')){
  //     $(this).children('.header__submenu3').slideUp();
  //     $(this).removeClass('open');
  //     console.log($(e.target));
  //   } else {
  //     $(this).addClass('open');
  //     $(this).children('.header__submenu3').slideDown();
  //   }
  // });
  //
  // var bLazy = new Blazy({
  //   src: 'data-blazy'
  // });
  //
  // // checking browser for WEBP
  // hasWebP().then(function () {
  //
  //   if($(window).width() > 768) {
  //     $('.webp-img').each(function () {
  //       var webp = $(this).data('webp');
  //       $(this).attr('data-blazy', webp);
  //     });
  //   } else {
  //     $('.webp-img').each(function () {
  //       var webp;
  //       if($(this).data('webp-mobile') !== undefined)
  //         webp = $(this).data('webp-mobile'); else webp = $(this).data('webp');
  //       console.log($(this).data('webp-mobile'));
  //       $(this).attr('data-blazy', webp);
  //     });
  //   }
  //
  //   bLazy.revalidate();
  //
  // }, function () {
  //   if($(window).width() > 768) {
  //     $('.webp-img').each(function () {
  //       var img = $(this).data('img');
  //       $(this).attr('data-blazy', img);
  //     });
  //   } else {
  //     $('.webp-img').each(function () {
  //       var img;
  //       if($(this).data('img-mobile') !== undefined)
  //         img = $(this).data('img-mobile'); else webp = $(this).data('img');
  //       $(this).attr('data-blazy', img);
  //     });
  //   }
  //
  //   bLazy.revalidate();
  // });
  //
  // $('.site-widget__btn').click(function (e) {
  //   e.preventDefault();
  //   $('.site-widget__inner').toggleClass('open');
  //   $(this).toggleClass('active');
  // });


  if($(document).width() < 992){
    $('.products__items-slider').slick({
      infinite: true,
      variableWidth: false,
      arrows: false,
      dots: true,
      responsive: [
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 380,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        },
      ]
    });
  }
  //
  // $('.advantage__item').hover(function () {
  //   $(this).removeClass('active');
  // }, function () {
  //   $(this).addClass('active');
  // });
  //
  // $('form a').click(function (e) {
  //   e.preventDefault();
  //   $(this).prev().click();
  // });
  //
  // $('.phone').inputmask("+7 (999) 999-99-99");
  // if($(document).find('#licen-slider').length > 0) {
  //   $('#licen-slider').magnificPopup({
  //     delegate: 'a:not(.slick-cloned)',
  //     type: 'image',
  //     closeOnContentClick: false,
  //     closeBtnInside: false,
  //     gallery: {
  //       enabled: true,
  //     },
  //     zoom: {
  //       enabled: true,
  //       duration: 300
  //     },
  //     removalDelay: 300,
  //     disableOn: 0,
  //     midClick: true,
  //
  //   });
  //
  //   $('#licen-slider').slick({
  //     slidesToShow: 1,
  //     slidesToScroll: 1,
  //     infinite: true,
  //     arrows: true,
  //     dots: false,
  //   });
  //
  //   $('#licen-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
  //     setTimeout(function () {
  //       bLazy.revalidate();
  //     },300);
  //   });
  // }
  //
  // if($(document).find('#gallery-block-slider').length > 0) {
  //   $('#gallery-block-slider').magnificPopup({
  //     delegate: 'a:not(.slick-cloned)',
  //     type: 'image',
  //     closeOnContentClick: false,
  //     closeBtnInside: false,
  //     gallery: {
  //       enabled: true,
  //     },
  //     zoom: {
  //       enabled: true,
  //       duration: 300
  //     },
  //     removalDelay: 300,
  //     disableOn: 0,
  //     midClick: true,
  //
  //   });
  //
  //   $('#gallery-block-slider').slick({
  //     infinite: true,
  //     arrows: true,
  //     dots: true,
  //     responsive: [
  //       {
  //         breakpoint: 2500,
  //         settings: {
  //           variableWidth: true,
  //           centerMode: true,
  //           slidesToShow: 2,
  //           slidesToScroll: 1
  //         }
  //       },
  //       {
  //         breakpoint: 992,
  //         settings: {
  //           slidesToShow: 1,
  //           slidesToScroll: 1
  //         }
  //       }
  //     ]
  //   });


  $('.slick-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
    setTimeout(function () {
      bLazy.revalidate();
    },300);
  });

  /*popups start*/
  $(document).on('click', 'a[data-modal-class]', function (e) {
    e.preventDefault();
    var dataModalId = $(this).attr('data-modal-class');
    $('.popup.' + dataModalId + '').addClass('open');
    $('body').addClass('hidden');
    setTimeout(function () {
      bLazy.revalidate();
    },500)
  });

  $(document).on('click', '.popup__close', function (e) {
    $('.popup ').removeClass('open');
    $('body').removeClass('hidden');
  });

  $(document).on('click', '.popup', function (e) {

    if(e.target.classList[0] == "popup") {
      $('.popup ').removeClass('open');
      $('body').removeClass('hidden');
    }
  });
  /*popups end*/

});


//script fro webp img and background
var hasWebP = (function () {
  // some small (2x1 px) test images for each feature
  var images = {
    basic: "data:image/webp;base64,UklGRjIAAABXRUJQVlA4ICYAAACyAgCdASoCAAEALmk0mk0iIiIiIgBoSygABc6zbAAA/v56QAAAAA==",
    lossless: "data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAQAAAAfQ//73v/+BiOh/AAA="
  };

  return function (feature) {
    var deferred = $.Deferred();

    $("<img>").on("load", function () {
      // the images should have these dimensions
      if (this.width === 2 && this.height === 1) {
        deferred.resolve();
      } else {
        deferred.reject();
      }
    }).on("error", function () {
      deferred.reject();
    }).attr("src", images[feature || "basic"]);

    return deferred.promise();
  }
})();

