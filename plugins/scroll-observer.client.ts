export default defineNuxtPlugin((nuxtApp) => {
    const observerCallback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible')
                observer.unobserve(entry.target)
            }
        })
    }

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    }

    let observer: IntersectionObserver | null = null

    if (import.meta.client) {
        observer = new IntersectionObserver(observerCallback, observerOptions)
    }

    const observeElements = () => {
        if (!observer) return
        const elements = document.querySelectorAll('.scroll-reveal:not(.is-visible)')
        elements.forEach((el) => observer!.observe(el))
    }

    nuxtApp.hook('app:mounted', () => {
        observeElements()
    })

    nuxtApp.hook('page:finish', () => {
        // Delay slightly to ensure DOM is ready after navigation
        setTimeout(observeElements, 100)
        setTimeout(observeElements, 500) // Fallback for slower renders
    })
})
