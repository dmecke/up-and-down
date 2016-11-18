var $ = require('jquery');
require('jqueryui');

var Vue = require('vue/dist/vue.js');

import Game from "./Game/Game";

var game = new Game();

new Vue({
    el: '#game',
    data: {
        game: game,
        movingCardIndex: null,
        visibleContainer: 'menu'
    },
    methods: {
        toggleCard: function(card, index) {
            $('.card').removeClass('moving');
            this.movingCardIndex = index;
            $(card).closest('.card').addClass('moving');
        },
        dropCard: function(slot) {
            if (null == this.movingCardIndex) return;

            var handIndex = this.movingCardIndex;
            var card = this.game.hand.cards[handIndex];

            if (this.game.slot(slot).isValid(card)) {
                this.game.dropCard(handIndex, slot, card);
                $('.card').removeClass('moving');
                this.movingCardIndex = null;
            }
        },
        showMenu: function() {
            this.visibleContainer = 'menu';
        },
        showHighscore: function() {
            this.visibleContainer = 'highscore';
        },
        showGame: function() {
            this.visibleContainer = 'game';
        }
    }
});
