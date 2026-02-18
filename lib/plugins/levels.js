ig.module(
    'plugins.levels'
).requires(
	'impact.impact'
).
defines(function() {

    ig.levels = {
    

        data: [
            {
                baddies: 10, interval: 3,
                bg: 0,
                makeup: {
                    Bouncer: 2
                }
            },
            {
                baddies: 5, interval: 3,
                bg: 0,
                makeup: {
                    Bouncer: 2,
                    Chick: 2
                }
            },
            {
                baddies: 10, interval: 2,
                bg: 0,
                makeup: {
                    Bouncer: 2,
                    Bomber: 2,
                    Chick: 2,
                    Powerup: 2
                }
            },

            {
                baddies: 10, interval: 3,
                bg: 1,
                makeup: {
                    Bomber: 2,
                    Burrower: 2,
                    Mole: 2,
                    Powerup: 1
                }
            },
            {
                baddies: 20, interval: 2,
                bg: 1,
                makeup: {
                    Bomber: 2,
                    Burrower: 2,
                    Mole: 2,
                    Powerup: 2
                }
            },
            {
                baddies: 20, interval: 2,
                bg: 2,
                makeup: {
                    Jetpacker: 2,
                    Bomber: 2,
                    Chick: 2
                }
            },
            {
                baddies: 30, interval: 2,
                bg: 2,
                makeup: {
                    Jetpacker: 2
                    // Bouncer: 2,
                    // Burrower: 2,
                    // Bomber: 2,
                    // Chick: 2,
                    // Powerup: 2
                }
            }




        ]

    
    };


});




