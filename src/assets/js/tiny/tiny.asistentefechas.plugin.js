tinymce.PluginManager.add('wpxDates', function(editor, url) {
    var openDialog = function () {


        return editor.windowManager.open({
            title: 'Asistente de Fechas',
            body: {
              
              
              
              type: 'panel',
              items: [
                {
              
                  
                type: 'htmlpanel', // component type
                html: '<div>Html goes here<br><label>Fecha</label><input name="title" type="date" tabindex="-1" data-alloy-tabstop="true" class="tox-textfield" id="form-field_511484932171634816435783"></div>'

/*
                  type: 'input',
                  name: 'title',
                  label: 'Fecha',
                  inputMode: 'date'
*/                  
                }
              ]
              
            },
            buttons: [
              {
                type: 'cancel',
                text: 'Close'
              },
              {
                type: 'submit',
                text: 'Save',
                primary: true
              }
            ],
            onSubmit: function (api) {
              var data = api.getData();
              /* Insert content when the window form is submitted */
              editor.insertContent(data.title);
              api.close();
            }
          });
        };



        editor.ui.registry.addButton('wpxDates', {
            text: 'Asistente Fechas',
            onAction: function () {
              /* Open window */
              openDialog();
            }
          });
          /* Adds a menu item, which can then be included in any menu via the menu/menubar configuration */
          editor.ui.registry.addMenuItem('wpxDates', {
            text: 'Asistente Fechas',
            onAction: function() {
              /* Open window */
              openDialog();
            }
          });
          /* Return the metadata for the help plugin */
          

          return {
            getMetadata: function () {
              return  {
                name: 'Asistente Fechas',
                url: 'http://exampleplugindocsurl.com'
              };
            }
          

    };

});