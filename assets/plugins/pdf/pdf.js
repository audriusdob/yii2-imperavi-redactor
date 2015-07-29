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
                this.button.setAwesome('advanced', 'fa-tasks');

                console.log(this.opts.figuresList);


            },

            show: function()
            {
                this.modal.addTemplate('advanced', this.pdf.getTemplate());

                this.modal.load('advanced', 'Select Figure:', 400);

                this.modal.createCancelButton();

                var button = this.modal.createActionButton('Insert');
                button.on('click', this.pdf.insert);

                this.selection.save();
                this.modal.show();

                $.getJSON(this.opts.figuresList, $.proxy(function(data)
                {

                    $.each(data, $.proxy(function(key, val)
                    {

                        //console.log(key);
                        // title
                        var thumbtitle = '';
                        if (typeof val.title !== 'undefined') thumbtitle = val.title;


                        var img = $('<div class="redactor-figure-list-item row"><div class="image col-md-4"><img src="' + val.thumb + '" class="img-responsive" title="' + thumbtitle + '" />' + '</div><div class="title col-md-8"><a href="javascript:void(0)" title="' + thumbtitle + '"> <p>' + thumbtitle + '</p></a></div></div>');


                        $('#redactor_figures_box').append(img);

                        $(img).click(function(){

                            var text = $('#selection-marker-2').map(function(){
                                return this.previousSibling.nodeValue;
                            });
                            $("#selection-marker-2").after(" <a href='/"+val.title+"' target='_blank'>"+text[0]+"</a> ");
                            var text = $('#selection-marker-2').map(function(){
                                // console.log(this.previousSibling);
                                // this.previousSibling.remove();
                                this.previousSibling.parentNode.removeChild(this.previousSibling);

                            });

                            $('.redactor-selection-marker').remove();

                            var content_val = $( ".redactor_editor" ).html();
                            $("textarea#CmsPage_body").val(content_val);
                            $("textarea#CmsBlog_content").val(content_val);
                            $("textarea#Events_event_txt").val(content_val);
                            $("textarea#EmailTemplate_body").val(content_val);
                            $("textarea#Remembrances_body").val(content_val);
                            $("textarea#Homepage_body").val(content_val);


                        });

                        $(img).click($.proxy(this.imageCallbackLink, this));



                    }, this));


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