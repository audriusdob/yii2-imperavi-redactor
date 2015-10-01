if (!RedactorPlugins) var RedactorPlugins = {};

(function($)
{
    RedactorPlugins.blue = function()
    {
        return {
            imageGetJson2: '/site/test', // json url (ex. /some-images.json ) or false

            init: function()
            {
                var button = this.button.add('blue', 'Mark as blue');
                this.button.addCallback(button, this.blue.show);

                // make your added button as Font Awesome's icon
                this.button.setAwesome('blue', 'fa-paint-brush');

                //console.log(this.opts.figuresList);


            },

            show: function()
            {
                var wrapper = this.selection.getHtml();
                var return_text = '<span class="blue">'+wrapper+'</span>';
                this.insert.html(return_text);
            }


        };
    };
})(jQuery);