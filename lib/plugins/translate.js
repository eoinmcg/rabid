ig.module(
    'plugins.translate'
).requires(
	'impact.impact'
).
defines(function() {

    ig.TR = {
    

        lang: SF.data.lang,
        phrases: SF.data.phrases,

        get: function(phrase) {

            try {
                return this.phrases[this.lang][phrase];
            } catch(e) {
                console.log(e);
                return phrase;
            }

            return phrase;

        }

    
    };


});

