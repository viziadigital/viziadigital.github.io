const scrollDuration = 600;

const disableScroll = () => document.body.style.overflow = "hidden";

scrollTo(0, 0);
disableScroll();

let currentSectionIndex = 0;
const maxSectionIndex = document.querySelectorAll("section").length - 1;

const getSection = (sectionIndex) => document.querySelectorAll("section")[sectionIndex];
const getCurrentSection = () => getSection(currentSectionIndex);

const scrollIntoView = (target, duration) => {
    const start = window.pageYOffset
    const end = target.getBoundingClientRect().top + start
    const distance = end - start
    let startTime = null
    const ease = (t) => t * (2 - t)
    const animation = (currentTime) => {
        if (startTime === null) startTime = currentTime
        const timeElapsed = currentTime - startTime
        const progress = Math.min(timeElapsed / duration, 1)
        window.scrollTo(0, start + distance * ease(progress))
        if (timeElapsed < duration) requestAnimationFrame(animation)
    }
    requestAnimationFrame(animation)
}

let isScrollLocked = false

const scrollToSection = (sectionIndex) => {
    if (isScrollLocked) return
    isScrollLocked = true
    setTimeout(() => isScrollLocked = false, scrollDuration * 0.8)
    scrollIntoView(getSection(sectionIndex), scrollDuration)
}
const scrollToCurrentSection = () => scrollToSection(currentSectionIndex)

const switchToNextSection = () => {
    if (isScrollLocked) return
    if (currentSectionIndex < maxSectionIndex) {
        currentSectionIndex++
        scrollToSection(currentSectionIndex)
    }
}
const switchToPreviousSection = () => {
    if (isScrollLocked) return
    if (currentSectionIndex > 0) {
        currentSectionIndex--
        scrollToSection(currentSectionIndex)
    }
}

addEventListener("wheel", (event) => {
    const hasScrolledDown = (event.deltaY > 0)
    hasScrolledDown ? switchToNextSection() : switchToPreviousSection()
})

addEventListener("keydown", (event) => {
    if (event.key === " ") switchToNextSection()
    if (event.key === "ArrowUp") switchToPreviousSection()
    if (event.key === "ArrowDown") switchToNextSection()
})

let swipeStartY
addEventListener("touchstart", (event) => swipeStartY = event.touches[0].clientY)
addEventListener("touchend", (event) => {
    const swipeEndY = event.changedTouches[0].clientY
    const swipeDeltaY = swipeEndY - swipeStartY
    if (swipeDeltaY === 0) return
    const hasSwipedDown = swipeDeltaY > 0
    hasSwipedDown ? switchToPreviousSection() : switchToNextSection()
})

addEventListener("resize", scrollToCurrentSection)

addEventListener("scroll", () => {
    (currentSectionIndex === maxSectionIndex)
        ? menu.classList.remove("text-white")
        : menu.classList.add("text-white");
})
