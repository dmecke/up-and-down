var $ = require('jquery');
require('jqueryui');

var Vue = require('vue/dist/vue.js');

import Game from "./Game/Game";

var game = new Game();

new Vue({
    el: '#game',
    data: {
        game: game,
        movingCard: null
    },
    methods: {
        toggleCard: function(card, index) {
            $('.card').removeClass('moving');
            this.movingCard = index;
            $(card).addClass('moving');
        },
        dropCard: function(slot) {
            if (null == this.movingCard) return;

            if (this.game.slot(slot).isValid(this.game.hand.cards[this.movingCard])) {
                this.game.slot(slot).drop(this.game.hand.cards[this.movingCard]);
                this.game.hand.cards.splice(this.movingCard, 1);
                this.movingCard = null;
                $('.card').removeClass('moving');
                this.game.hand.take(this.game.stack.draw(1));
            }
        }
    }
});

$.each($('.card'), function() {
    $(this).css('transform', 'rotate(' + (Math.random() * 6 - 3) + 'deg)');
});
