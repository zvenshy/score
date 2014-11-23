(function() {
  var data, output,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  $('document').ready(function() {
    var btnClick;
    btnClick = function() {
      var newScript, stuId;
      stuId = $('#stuId').val();
      newScript = '<script src="http://api.ecjtu.net/score.php?s=' + stuId + '&callback=data">';
      return $('body').append(newScript);
    };
    $('#idSubmit').click(function() {
      return btnClick();
    });
    $('#term').on('click', 'li', function(event) {
      event.preventDefault();
      $(this).addClass('active').siblings('.active').removeClass('active');
      return output($('tbody'), $(this).children().text(), data.cache());
    });
    return $('body').keydown(function(event) {
      if (event.keyCode === 13) {
        return btnClick();
      }
    });
  });

  data = function(jsondata) {
    var content, i, index, item, l, term, value, _i, _j, _len, _len1, _ref;
    if (jsondata === 'error') {
      return $('.help-block').show();
    }
    term = [];
    content = '';
    for (index = _i = 0, _len = jsondata.length; _i < _len; index = ++_i) {
      item = jsondata[index];
      i;
      l = term.length;
      if (_ref = item.Term, __indexOf.call(term, _ref) >= 0) {
        i = 0;
      } else {
        i = 1;
      }
      if (i) {
        term.push(item.Term);
      }
    }
    term.sort(function(a, b) {
      if (a >= b) {
        return -1;
      } else {
        return 1;
      }
    });
    for (index = _j = 0, _len1 = term.length; _j < _len1; index = ++_j) {
      value = term[index];
      if (!index) {
        content += '<li class="active"><a href="#">' + value + '</a></li>';
      } else {
        content += '<li><a href="#">' + value + '</a></li>';
      }
    }
    $('#term').html(content);
    output($('tbody'), term[0], jsondata);
    return data.cache = function() {
      return jsondata;
    };
  };

  output = function(obj, term, info) {
    var content, index, value, _i, _len;
    $('#score').addClass('loading');
    $('.help-block').hide();
    content = '';
    for (index = _i = 0, _len = info.length; _i < _len; index = ++_i) {
      value = info[index];
      if (value.Term === term) {
        if (value.Score < 60 || value.Score === "不及格" || value.Score === "不合格") {
          if (value.FirstScore !== '') {
            if (value.FirstScore < 60 || value.FirstScore === "不及格" || value.FirstScore === "不合格") {
              content += '<tr class="error"><td class="span9">' + value.Course + '</td><td class="span3">' + value.Score + '/' + value.FirstScore + '</td></tr>';
            } else {
              content += '<tr><td class="span9">' + value.Course + '</td><td class="span3">' + value.Score + '/' + value.FirstScore + '</td></tr>';
            }
          } else {
            content += '<tr><td class="span9">' + value.Course + '</td><td class="span3">' + value.Score + '</td></tr>';
          }
        } else {
          content += '<tr><td class="span9">' + value.Course + '</td><td class="span3">' + value.Score + '</td></tr>';
        }
      }
    }
    obj.html(content);
    return $('#score').removeClass('loading');
  };

}).call(this);
