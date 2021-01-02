"use strict";

import './store/store';
import 'alpinejs';
import { env } from './libs/utils/constants';
import { initPageLoader } from './libs/components/pageloader';
import { switchDemoImages, insertBgImages } from './libs/utils/utils';
import { initNavbar } from './libs/components/navbar';
import { initHero } from './libs/components/hero';
import { initTabs } from './libs/components/tabs';
import { initCountdown } from './libs/components/countdown';
import { initRoadmap } from './libs/components/roadmap';
import { initLike } from './libs/components/like';
import { initBackToTop } from './libs/components/backtotop';
const feather = require('feather-icons');

window.initNavbar = initNavbar;
window.initHero = initHero;
window.initTabs = initTabs;
window.initCountdown = initCountdown;
window.initRoadmap = initRoadmap;
window.initLike = initLike;
window.initBackToTop = initBackToTop;

const showPageloader = initPageLoader();

document.onreadystatechange = function () {
    if (document.readyState == 'complete') {

        //Switch demo images
        const changeImages = switchDemoImages(env);

        //Switch backgrounds
        const changeBackgrounds = insertBgImages();

        //Feather Icons
        const featherIcons = feather.replace();
        
    }
}

