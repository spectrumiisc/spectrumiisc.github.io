if (!String.prototype.format) {
// This is the function.
		String.prototype.format = function (args) {
			var str = this;
			return str.replace(String.prototype.format.regex, function(item) {
				var intVal = parseInt(item.substring(1, item.length - 1));
				var replace;
				if (intVal >= 0) {
					replace = args[intVal];
				} else if (intVal === -1) {
					replace = "{";
				} else if (intVal === -2) {
					replace = "}";
				} else {
					replace = "";
				}
				return replace;
			});
		};
		String.prototype.format.regex = new RegExp("{-?[0-9]+}", "g");
}




function SetTeamDetails(team_data){
 
 var scroll = $('#team_status');
  var d = '';
  for(var i = 0 ; i < team_data.length;i++){

				d = d +  '<div id="team_block_{0}"><div id="team_block">'.format([i.toString()]); 				
				d = d +  '	<div id="team_rank" style="width:10%;height:100px;float: left;">{0}</div>'.format([(i+1).toString()]) ; 
				d = d +  '	<div id="team_data" style="height:105px;">' ; 
				d = d +  '		<div style="float:left;width: 40%;">' ; 
				d = d +  '			<div style="padding-left:14%;height:100px;font-size:300%;line-height: 100px;text-align: left;"><p><b>{0}</b></p></div>'.format([team_data[i][0]]) ; 
		
				d = d +  '</div>';
				
				d = d +  '		<div style="float:right;width:30%;padding-left:0px;font-family:TextFont_C;">' ; 
				d = d +  '			<div style="font-size:300%;margin-top:40px;text-align: center; "><p><b>{0}</b></p></div>'.format([team_data[i][1]])  ; 
				d = d +  '		</div>' ; 
				// d = d +  '		<div style="float:right;width:10%;padding-left:0px;font-family:TextFont_C;">' ; 
				// d = d +  '			<div style="font-size:250%;margin-top:40px;text-align: center; "><p>{0}</b></div>'.format([team_data[i][3]])  ; 
				// d = d +  '		</div>' ; 
				// d = d +  '		<div style="float:right;width:10%;padding-left:0px;font-family:TextFont_C;">' ; 
				// d = d +  '			<div style="font-size:250%;margin-top:40px;text-align: center; "><p>{0}</b></div>'.format([team_data[i][2]])  ; 
				// d = d +  '		</div>' ;
				// d = d +  '		<div style="float:right;width:10%;padding-left:0px;font-family:TextFont_C;">' ; 
				// d = d +  '			<div style="font-size:250%;margin-top:40px;text-align: center; "><p>{0}</b></div>'.format([team_data[i][1]])  ; 
				d = d +  '		</div>' ;
				d = d +  '	</div>' ; 
				d = d +  '  </div></div>' ; 
  }
  scroll.empty();
  scroll.html(d);				
}



function run(dir,bids){

	$(document).ready(function() {
		$.ajax({
			type: "GET",
			url: 'test.csv',
			dataType: "text",
			success: function(data) {processData(data);}
		 });
	});

}

function processData(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    var headers = allTextLines[0].split(',');
    var lines = [];

    for (var i=1; i<allTextLines.length; i++) {
        var data = allTextLines[i].split(',');
        if (data.length == headers.length) {

            var tarr = [];
            for (var j=0; j<headers.length; j++) {
                tarr.push(data[j]);
            }
			tarr.push(parseInt(data[1])+parseInt(data[2])+parseInt(data[3]))
            lines.push(tarr);
        }
    }
	lines.sort(sortFunction1);
	console.log(lines);
	var ind = lines[0][0];
	var team_data = [];
	var sum = 0;
	for (var i=0; i<lines.length;i++){
		while (ind == lines[i][0] && i<lines.length){
			sum += parseInt(lines[i][1]);
			i++;
		} 
		team_data.push([ind,sum]);
		ind = lines[i][0];
		sum = parseInt(lines[i][1]);
	}
	team_data.push([ind,sum]);
	team_data.sort(sortFunction2);

    console.log(team_data);
	SetTeamDetails(team_data);
}
function sortFunction1(a, b) {
    if (a[0] === b[0]) {
        return 0;
    }
    else {
        return (a[0] > b[0]) ? -1 : 1;
    }
}

function sortFunction2(a, b) {
    if (a[1] === b[1]) {
        return 0;
    }
    else {
        return (a[1] > b[1]) ? -1 : 1;
    }
}

