/*global ace */

$(document).ready(function() {

  $('div#about').fadeToggle(0);

  // making tabs  
  $('div#pane0').tabs();

  var editor1 = ace.edit("editor1");
  var editor2 = ace.edit("editor2");
  editor1.getSession().setMode("ace/mode/xml");
  editor2.getSession().setMode("ace/mode/xml");
  editor1.setTheme("ace/theme/github");
  editor2.setTheme("ace/theme/github");

  $("#accordion").accordion({
    fillSpace: true,
    heightStyle: 'fill',
    change: function() {
      resize(editor1, editor2);
      if ($('#accordion').accordion('option', 'active') == 1) {

        

        translate(editor1.getValue(), editor2);

      }
    }
  });
  resize(editor1, editor2);
  $(window).resize(function() {
    resize(editor1, editor2);
  });
  $("#accordionContainer").resizable({
    minHeight: 140,
    minWidth: 200,
    resize: function() {
      $("#accordion").accordion("refresh");
    }
  });

  var fadeDuration = 400;

  $('li#home, li#about').click(function(){
    $('li#home').toggleClass('active');
    $('li#about').toggleClass('active');
    $('div#app').slideToggle(fadeDuration);
    $('div#about').fadeToggle(fadeDuration);
  })

  // file upload
  $(':file').change(function(){
    var file = this.files[0];
    name = file.name;
    size = file.size;
    type = file.type;
    //your validation

    var formData = new FormData($('form')[0]);
    window.myObj = $.ajax({
        url: '/upload',  //server script to process data
        type: 'POST',
        // xhr: function() {  // custom xhr
        //     myXhr = $.ajaxSettings.xhr();
        //     if(myXhr.upload){ // check if upload property exists
        //         myXhr.upload.addEventListener('progress',progressHandlingFunction, false); // for handling the progress of the upload
        //     }
        //     return myXhr;
        // },
        //Ajax events
        //beforeSend: beforeSendHandler,
        success: function(data, textStatus, jqXHR) {
          console.log(data)
          editor1.setValue(data);
        },
        error: function(data) {console.log('failed to upload file:' + data)},
        // Form data
        data: formData,
        //Options to tell JQuery not to process data or worry about content-type
        cache: false,
        contentType: false,
        processData: false
    });

  });

});

var progressHandlingFunction = function() {
  console.log('upload in progress')
}

var resize = function(editor1, editor2) {
  //$('div#accordionContainer').height($(window).height());
  $('div#editor1').width($('div#pane0').width());
  $('div#editor1').height($('div#pane0').height());
  $('div#editor2').width($('div#pane2').width());
  $('div#editor2').height($('div#pane2').height());
  editor1.resize();
  editor2.resize();
};

var translate = function(sbml, editor) {
  try {
    var xmlDocument = $.parseXML(sbml);

    var xmlRequest = $.ajax({
      url: "sbml2matlab",
      processData: true,
      data: {
        sbml: (new XMLSerializer()).serializeToString(xmlDocument)
      },
      dataType: "text",
      type: "POST",
      success: function(data, textStatus, jqXHR) {
        editor.setValue(data);

        var buttonId = 'downloadButton';
        if (!($('button#'+buttonId).length > 0)) {
          var downloadButton = $(document.createElement('button'));
          $('div#app').append(downloadButton);
          downloadButton.attr('id', buttonId);
          downloadButton.append('Download translated .m File');
          downloadButton.click(downloadMFile);
        }
        return data;
      }
    });
  }
  catch (error) {
    editor.setValue("Something went wrong: " + error);
  }
};



var downloadMFile = function() {
  try {
    var xmlRequest = $.ajax({
      url:"download",
      type:"GET",
      success:downloadURL('./download')
    })
  }
  catch (error) {
    throw error;
  }
}

var downloadURL = function downloadURL(url) {
    var hiddenIFrameID = 'hiddenDownloader',
        iframe = document.getElementById(hiddenIFrameID);
    if (iframe === null) {
        iframe = document.createElement('iframe');
        iframe.id = hiddenIFrameID;
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
    }
    iframe.src = url;
};


