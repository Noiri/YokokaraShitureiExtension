"use strict";

$(function(){
    let $to_right = $('<img width="200">');
    let to_rightUrl = chrome.extension.getURL("images/to_right.png");
    $to_right.attr("src", to_rightUrl);
    $to_right.css({
        position: "fixed",
        bottom: -10,
        left: -280,        
        zIndex: "9999999",
        width: '200px',
        pointerEvents: "none"
    })
    $('body').append($to_right);

    let $to_left = $('<img width="200">');
    let to_leftUrl = chrome.extension.getURL("images/to_left.png");
    $to_left.attr("src", to_leftUrl);
    $to_left.css({
        position: "fixed",
        bottom: -10,
        right: -280,
        zIndex: "9999999",
        width: "200px", 
        pointerEvents: "none"
    })
    $('body').append($to_left);


    function moveToRight() {
        return $to_right.animate({'left':'-60px'}, 1000, 'linear').promise();
    }

    function backToLeft() {
        return $to_right.animate({'left':'-200px'}, 1000, 'linear').promise();
    }
    
    function moveToLeft() {
        return $to_left.animate({'right':'-60px'}, 1000, 'linear').promise();
    }
    function backToRight() {
        return $to_left.animate({'right':'-280px'}, 1000, 'linear').promise();
    }

    function sleep(mSec) {
        return new Promise(resolve => setTimeout(resolve, mSec));
    }

    function setRandomPos(jq){
        var rand = Math.round(Math.random()*100);
        if(rand > 70){
            rand -= 20;
        }
        var percentage = String(rand) + "%";
        jq.css({
            bottom: percentage
        })
    }



    async function animate() {
        await sleep(5000);
        for(;;){
            var randomPos = Math.round(Math.random()*100);
            if(randomPos < 50) {
                setRandomPos($to_right);
                await moveToRight();
                await backToLeft();
            }
            else if(randomPos >= 50) {
                setRandomPos($to_left);
                await moveToLeft();
                await backToRight();
            }
            var SleepTime = Math.round(Math.random()*10000 + 1500);
            await sleep(SleepTime);
        }
    }
    animate();

});
