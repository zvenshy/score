$('document').ready ->
	btnClick = -> 
		stuId = $('#stuId').val()
		newScript = '<script src="http://api.ecjtu.net/score.php?s=' + stuId + '&callback=data">'
		$('body').append newScript
	$('#idSubmit').click -> btnClick()
	$('#term').on 'click', 'li', (event) ->
		event.preventDefault()
		$(this).addClass('active').siblings('.active').removeClass('active')
		output $('tbody'), $(this).children().text(), data.cache()
	$('body').keydown (event) ->
		btnClick() if event.keyCode is 13

data = (jsondata) ->
	return $('.help-block').show() if jsondata is 'error'
	term = []
	content = ''
	for item, index in jsondata
		i
		l = term.length
		if item.Term in term then i = 0 else i = 1
		if i then term.push item.Term
	term.sort (a, b) -> if a >= b then -1 else 1                       
	for value, index in term
		if not index then content += '<li class="active"><a href="#">'+ value + '</a></li>' else content += '<li><a href="#">' + value + '</a></li>'
	$('#term').html content
	output $('tbody'), term[0], jsondata
	data.cache = -> jsondata

output = (obj, term, info) ->
	$('#score').addClass 'loading'
	$('.help-block').hide()
	content = ''
	for value, index in info
		if value.Term is term 
			if value.Score < 60 or value.Score is "不及格" or value.Score is "不合格" 
				if value.FirstScore != ''
					if value.FirstScore < 60 or value.FirstScore is "不及格" or value.FirstScore is "不合格"
						content += '<tr class="error"><td class="span9">' + value.Course + '</td><td class="span3">' + value.Score + '/' + value.FirstScore + '</td></tr>'
					else
						content += '<tr><td class="span9">' + value.Course + '</td><td class="span3">' + value.Score + '/' + value.FirstScore + '</td></tr>'
				else
					content += '<tr><td class="span9">' + value.Course + '</td><td class="span3">' + value.Score + '</td></tr>'
			else
				content += '<tr><td class="span9">' + value.Course + '</td><td class="span3">' + value.Score + '</td></tr>'
	obj.html content
	$('#score').removeClass 'loading'