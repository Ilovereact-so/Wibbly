import $ from 'jquery'
import React, {useState } from 'react'

let windowW 
let windowH


$(window).on('resize scroll', function() {
    windowW = $(window).innerWidth()
    windowH = $(window).innerHeight()

    
    // if((windowW - windowH) <= 200 && (windowW - windowH) >= -200 ){
    //     let div = $("#UXPsys").innerHeight()
    //     console.log("scale ", windowW - windowH)
    //     if($("div").innerHeight() === windowH){
    //         $(this).css("height","120vh")
    //         console.log(this)
    // }
        
    //}

    if(windowW < 1024){
        if((windowH - 400) < windowW ){
            $("#UXPsys").addClass('properties');
            $("#Home").addClass('properties');
            $("#Aboatme > div > div").addClass('propertiesP');
        }else{
            $("#UXPsys").removeClass('properties'); 
            $("#Home").removeClass('properties'); 
            $("#Aboatme > div > div").removeClass('propertiesP'); 
        }
    }else{
        $("#UXPsys").removeClass('properties'); 
        $("#Home").removeClass('properties'); 
        $("#Aboatme > div > div").removeClass('propertiesP'); 
    }
})




$( document ).ready(function(){
    windowW = $(window).innerWidth()
    windowH = $(window).innerHeight()
});




