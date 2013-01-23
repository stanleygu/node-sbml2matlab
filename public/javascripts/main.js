/*global ace */

$(document).ready(function() {

  $('div#about').fadeToggle(0);

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
});


var resize = function(editor1, editor2) {
  //$('div#accordionContainer').height($(window).height());
  $('div#editor1').width($('div#pane1').width());
  $('div#editor1').height($('div#pane1').height());
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
        return data;
      }
    });
  }
  catch (error) {
    editor.setValue("Something went wrong: " + error);
  }
};
