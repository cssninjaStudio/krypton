export function initHero() {
    return {
        initParticles() {
            tsParticles.load("tsparticles", {
                "fullScreen": {
                    "enable": false
                },
                "particles": {
                    "number": {
                        "value": 50,
                        "density": {
                            "enable": true,
                            "area": 1000
                        }
                    },
                    "color": {
                        "value": "#5507fc"
                    },
    
                    "shape": {
                        "type": "circle"
                    },
                    "stroke": {
                        "width": 0,
                        "color": "#5507fc"
                    },
                    "opacity": {
                        "value": 0.6,
                    },
                    "size": {
                        "value": { min: 0, max: 2 }
                    },
                    "links": {
                        "enable": true,
                        "distance": 120,
                        "color": "#5507fc",
                        "opacity": 0.2,
                        "width": 1.6
                    },
                    "move": {
                        "enable": true,
                        "speed": 1.5,
                        "direction": "top",
                        "outModes": "out"
                    }
                },
                "interactivity": {
                    "detectsOn": "window",
                    "events": {
                        "onHover": {
                            "enable": true,
                            "mode": "grab"
                        }
                    },
                    "modes": {
                        "grab": {
                            "distance": 140,
                            "links": {
                                "opacity": 1
                            }
                        }
                    }
                }
            });
        }
    }
}