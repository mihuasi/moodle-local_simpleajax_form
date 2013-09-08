M.simpleajax_form = {

    // params from PHP
    Y : null,
    root : null,

    init: function(Y) {
        this.Y  =   Y;
        this.root = M.cfg.wwwroot;
        M.simpleajax_form.prepare_clickme_for_ajax();
    },
    prepare_clickme_for_ajax: function() {
        var Y = this.Y;
        Y.one('.clickme').on('click', function() {
            var url = this.getData('url');
            Y.io(url, {
                method: "POST",
                on: {
                    success: function(id, o) {
                        var response = Y.JSON.parse(o.responseText);
                        var form = Y.Node.create(response.html);
                        var formarea = Y.one('.formarea');
                        formarea.setHTML(form);

                        scriptel = document.createElement('script'); // Create a <script> tag
                        scriptel.textContent = response.script; // Put the Javascript inside the script tag
                        document.body.appendChild(scriptel); // Add the script tag to the page.

                        var cancel = Y.one('#id_cancel');
                        cancel.setAttribute('type', 'button');

                        cancel.on('click', function(){
                            formarea.setHTML('');
                        });

                        YUI().use('event', function (Y) {
                            Y.one('#mform1').on('submit', function (e) {
                                M.simpleajax_form.submit_form(e, this._node, formarea, url);
                            });
                        });
                    }
                }
            });
        });
    },
    submit_form: function(e, mform, formarea, url) {
        var Y = this.Y;
        e.preventDefault();
        url += "?processing=1";

        var formwrapper =new Object();
        formwrapper.id = 'mform1';

        Y.io(url, {
            method: "POST",
            on: {
                success: function(id, o) {
                    formarea.setHTML("");

                    var newoutput_container = Y.one('.newoutput-container');
                    var response=Y.JSON.parse(o.responseText);
                    newoutput_container.setHTML(response.new_output);
                }
            },
            form: formwrapper,
            context: this
        });
    }

}
