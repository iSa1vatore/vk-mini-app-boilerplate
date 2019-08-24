import {store} from "../../index";

export const smoothScrollToTop = () => {
    const c = document.documentElement.scrollTop || document.body.scrollTop;

    if (c > 30) {
        return;
    }

    if (c > 0) {
        window.requestAnimationFrame(smoothScrollToTop);
        window.scrollTo(0, c - c / 8);
    }
};

export const restoreScrollPosition = () => {
    let scrolls = store.getState().vkui.componentScroll;

    Object.keys(scrolls).forEach((component) => {
        let componentData = scrolls[component];

        let element = document.getElementById(component);

        if (element) {
            element = element.getElementsByClassName("HorizontalScroll__in")[0];

            element.scrollLeft = componentData.x;
            element.scrollTop = componentData.y;
        }
    });
};