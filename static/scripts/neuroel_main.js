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
				
				d = d +  '		<div style="float:right;width:15%;padding-left:0px;font-family:TextFont_C;">' ; 
				d = d +  '			<div style="font-size:300%;margin-top:40px;text-align: center; "><p><b>{0}</b></p></div>'.format([team_data[i][4]])  ; 
				d = d +  '		</div>' ; 
				d = d +  '		<div style="float:right;width:10%;padding-left:0px;font-family:TextFont_C;">' ; 
				d = d +  '			<div style="font-size:250%;margin-top:40px;text-align: center; "><p>{0}</b></div>'.format([team_data[i][3]])  ; 
				d = d +  '		</div>' ; 
				d = d +  '		<div style="float:right;width:10%;padding-left:0px;font-family:TextFont_C;">' ; 
				d = d +  '			<div style="font-size:250%;margin-top:40px;text-align: center; "><p>{0}</b></div>'.format([team_data[i][2]])  ; 
				d = d +  '		</div>' ;
				d = d +  '		<div style="float:right;width:10%;padding-left:0px;font-family:TextFont_C;">' ; 
				d = d +  '			<div style="font-size:250%;margin-top:40px;text-align: center; "><p>{0}</b></div>'.format([team_data[i][1]])  ; 
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

	lines.sort(sortFunction);

    console.log(lines);
	SetTeamDetails(lines);
}

function sortFunction(a, b) {
    if (a[4] === b[4]) {
        return 0;
    }
    else {
        return (a[4] > b[4]) ? -1 : 1;
    }
}

