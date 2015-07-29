if (!RedactorPlugins) var RedactorPlugins = {};

(function($)
{
    RedactorPlugins.pdf = function()
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
                var button = this.button.add('advanced', 'Advanced');
                this.button.addCallback(button, this.pdf.show);

                // make your added button as Font Awesome's icon
                this.button.setAwesome('advanced', 'fa-bar-chart');

                //console.log(this.opts.figuresList);


            },

            show: function()
            {
                this.modal.addTemplate('advanced', this.pdf.getTemplate());

                this.modal.load('advanced', 'Select Figure:', 400);

                this.modal.createCancelButton();

                //var button = this.modal.createActionButton('Insert');
                //button.on('click', this.pdf.insert);

                this.selection.save();
                this.modal.show();

                var root = this;


                $.getJSON(this.opts.figuresList, $.proxy(function(data)
                {


                    $.each(data, $.proxy(function(key, val)
                    {

                        //console.log(key);
                        // title
                        var thumbtitle = '';
                        var item_id = '';
                        if (typeof val.title !== 'undefined') thumbtitle = val.title;
                        if (typeof val.figure_id !== 'undefined') item_id = val.figure_id;

                        var img = $('<div class="redactor-figure-list-item row"><div class="image col-md-4"><img src="' + val.thumb + '" class="img-responsive" title="' + thumbtitle + '" />' + '</div><div class="title col-md-8"><p>' + thumbtitle + '</p></div><div class="button-row col-md-12"> <a href="javascript:void(0)" class="btn btn-default button-figure" data-id="'+ item_id +'">Insert Figure</a> <a href="javascript:void(0)" class="btn btn-default button-modal" data-id="'+ item_id +'">Insert Modal</a></div></div>');


                        $('#redactor_figures_box').append(img);


                    }, this));

                    $('.button-modal').click(function(){
                        var clicked_id = $(this).data('id');
                        console.log(clicked_id);

                        var input_string = '[[m-'+clicked_id+']]';

                        root.modal.close();
                        root.insert.html(input_string);

                    });

                    $('.button-figure').click(function(){
                        var clicked_id = $(this).data('id');
                        console.log(clicked_id);

                        var input_string = '[[f-'+clicked_id+']]';

                        root.modal.close();
                        root.insert.html(input_string);

                    });


                }, this));

                $('#mymodal-textarea').focus();
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