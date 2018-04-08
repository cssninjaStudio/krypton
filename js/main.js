$(document).ready(function() {
    
    "use strict";
    
    //Page loader
    if ($('.pageloader').length) {

        $('.pageloader').toggleClass('is-active');

        $(window).on('load', function() {
            var pageloaderTimeout = setTimeout( function() {
                $('.pageloader').toggleClass('is-active');
                $('.infraloader').toggleClass('is-active')
                clearTimeout( pageloaderTimeout );
            }, 700 );
        })
    }

    //Navbar Clone
    if ($('#navbar-clone').length) {
        $(window).scroll(function() {    // this will work when your window scrolled.
            var height = $(window).scrollTop();  //getting the scrolling height of window
            if(height  > 50) {
                $("#navbar-clone").addClass('is-active');
            } else{
                $("#navbar-clone").removeClass('is-active');
            }
        });
    }

    //Mobile menu toggle
    if ($('.navbar-burger').length) {
        $('.navbar-burger').on("click", function(){
            $('.navbar-burger').toggleClass('is-active');
            if ($('.navbar-menu').hasClass('is-active')) {
                $('.navbar-menu').removeClass('is-active');
                $('.navbar').removeClass('is-dark-mobile');
            } else {
                $('.navbar-menu').addClass('is-active');
                $('.navbar').addClass('is-dark-mobile');
            }
        });
    }
    
    //Pop Dropdowns
    $('.dropdown-trigger').on('click', function(event) {
        event.stopPropagation();
        $('.dropdown').removeClass('is-active');
        $(this).closest('.dropdown').addClass('is-active');
    })
    //Close pop dropdowns on click outside
    $(window).on('click', function(event) {
        //if(!$(event.target).find('.dropdown-menu').length) {
        if($('.dropdown').hasClass('is-active')) {
            $('.dropdown').removeClass('is-active');
        }
        //} 
    });
    
})