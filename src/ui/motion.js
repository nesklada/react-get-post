const motionOnView = {
    initial: {
        y: 100,
        opacity: 0
    },

    whileInView: {
        y: 0,
        opacity: 1
    },
    
    viewport: {
        once: true
    }
}

export default motionOnView;