if (!RedactorPlugins) var RedactorPlugins = {};

(function($)
{
    RedactorPlugins.wrapper = function()
    {
        return {
            imageGetJson2: '/site/test', // json url (ex. /some-images.json ) or false

            getTemplate: function()
            {
                return String()
                    + '<section id="redactor-modal-advanced">'
                    + '<div id="redactor_figures_box"></div>'
                    + '</section>'
                    ;
            },
            init: function()
            {
                var button = this.button.add('wrapper', 'Wrap text');
                this.button.addCallback(button, this.wrapper.show);

                // make your added button as Font Awesome's icon
                this.button.setAwesome('wrapper', 'fa-circle-o-notch');

                //console.log(this.opts.figuresList);


            },

            show: function()
            {
                this.selection.save();

                var text = $('#selection-marker-2').map(function(){
                    return this.previousSibling.nodeValue;
                });
                console.log(text[1]);

                $("#selection-marker-2").after("<div class='outstand_text'>"+text[0]+"</div> ");

                $('#selection-marker-2').map(function(){
                    this.previousSibling.parentNode.removeChild(this.previousSibling);
                });

                $('.redactor-selection-marker').remove();

                $('.redactor-editor').each(function(){
                    var insert_html = $(this).html();
                    $(this).next('textarea').val(insert_html);
                });

            },
            insert: function()
            {
                var html = $('#mymodal-textarea').val();

                this.modal.close();
                this.selection.restore();

                this.insert.html(html);

                this.code.sync();

            }

        };
    };
})(jQuery);