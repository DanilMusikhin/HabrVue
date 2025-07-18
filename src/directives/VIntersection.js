// Директива для просмотра того, что пользователь увидел элемент

export default {
    mounted(el, binding) {
        const options = {
            rootMargin: '0px',
            threshold: 1.0
        }
        const callback = async (entries, observer) => {
            if (entries[0].isIntersecting) { // только при входе
                binding.value()
            }
        }
        const observer = new IntersectionObserver(callback, options)
        observer.observe(el)
    },
    name: 'intersection'
}