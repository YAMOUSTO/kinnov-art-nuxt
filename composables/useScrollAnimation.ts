// Scroll Animation Composable
import { onMounted, onUnmounted } from 'vue'

export const useScrollAnimation = () => {
    let observer: IntersectionObserver | null = null

    const initScrollAnimation = () => {
        const elements = document.querySelectorAll('.scroll-reveal')

        if (!elements.length) return

        observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible')
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
        // Delay to ensure DOM is ready
        setTimeout(initScrollAnimation, 100)
    })

    onUnmounted(() => {
        destroyScrollAnimation()
    })

    return {
        initScrollAnimation,
        destroyScrollAnimation
    }
}
