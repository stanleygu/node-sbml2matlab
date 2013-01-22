/*global ace */

$(document).ready(function() {

  //    var $inputModelText = $(document.createElement('div'));
  //    $inputModelText.height('40%');
  //    $inputModelText.width('80%');
  //    var editor = ace.edit($inputModelText[0]);
  //    editor.getSession().setMode("ace/mode/xml");
  //    $inputModelText.appendTo($('body'));
  //
  //    
  //    var $outputModel = $(document.createElement('div'));
  //    $outputModel.height('40%');
  //    $outputModel.width('80%');
  //    var editor2 = ace.edit($outputModel[0]);
  //    editor2.getSession().setMode("ace/mode/xml");
  //    $outputModel.appendTo($('body'));


  var editor1 = ace.edit("editor1");
  var editor2 = ace.edit("editor2");
  editor1.getSession().setMode("ace/mode/xml");
  editor2.getSession().setMode("ace/mode/xml");
  editor1.setTheme("ace/theme/solarized_light");
  editor2.setTheme("ace/theme/solarized_light");

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
