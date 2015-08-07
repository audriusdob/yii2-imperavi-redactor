if (!RedactorPlugins) var RedactorPlugins = {};

(function($)
{
    RedactorPlugins.reference = function()
    {
        return {
            imageGetJson2: '/site/test', // json url (ex. /some-images.json ) or false

            getTemplate: function()
            {
                return String()
                    + '<section id="redactor-modal-references">'
                    + '<div id="redactor_references_box"></div>'
                    + '</section>'
                    ;
            },
            init: function()
            {
                var button = this.button.add('reference', 'Add References');
                this.button.addCallback(button, this.reference.show);

                // make your added button as Font Awesome's icon
                this.button.setAwesome('reference', 'fa-eye');

                //console.log(this.opts.figuresList);


            },

            show: function()
            {
                this.modal.addTemplate('advanced', this.reference.getTemplate());

                this.modal.load('advanced', 'Select Reference:', 400);

                this.modal.createCancelButton();

                //var button = this.modal.createActionButton('Insert');
                //button.on('click', this.pdf.insert);

                this.selection.save();
                this.modal.show();

                var root = this;


                $.getJSON(this.opts.referencesList, $.proxy(function(data)
                {


                    $.each(data, $.proxy(function(key, val)
                    {

                        //console.log(key);
                        // title
                        var thumbtitle = '';
                        var item_id = '';
                        if (typeof val.title !== 'undefined') thumbtitle = val.title;
                        if (typeof val.figure_id !== 'undefined') item_id = val.figure_id;

                        var img = $('<div class="redactor-figure-list-item row"><div class="image col-md-4"><img src="' + val.thumb + '" class="img-responsive" title="' + thumbtitle + '" />' + '</div><div class="title col-md-8"><p>' + thumbtitle + '</p></div><div class="button-row col-md-12"> <a href="javascript:void(0)" class="btn btn-default button-reference" data-title="'+thumbtitle+'" data-id="'+ item_id +'">Insert Reference</a></div></div>');


                        $('#redactor_references_box').append(img);


                    }, this));

                    $('.button-reference').click(function(){
                        var clicked_id = $(this).data('id');
                        var clicked_title = $(this).data('title');
                       // var input_string = '[[m-'+clicked_id+'{'+clicked_title+'}]]';

                        var input_string = '[[r'+clicked_id+']]*';

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