// Scroll Animation Composable
import { onMounted, onUnmounted, nextTick } from 'vue'

export const useScrollAnimation = () => {
    let observer: IntersectionObserver | null = null

    const initScrollAnimation = () => {
        if (observer) {
            observer.disconnect()
        }

        const elements = document.querySelectorAll('.scroll-reveal:not(.is-visible)')
        if (!elements.length) return

        observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible')
                        observer?.unobserve(entry.target)
                    }
                })
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }
        )

        elements.forEach((el) => observer?.observe(el))
    }

    const destroyScrollAnimation = () => {
        if (observer) {
            observer.disconnect()
            observer = null
        }
    }

    onMounted(() => {
        nextTick(initScrollAnimation)
    })

    onUnmounted(() => {
        destroyScrollAnimation()
    })

    return {
        initScrollAnimation,
        destroyScrollAnimation
    }
}
