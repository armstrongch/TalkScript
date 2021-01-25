var sample =
			"#1 Would you like a cookie?"
+"\r\n"+	"@2 Yes"
+"\r\n"+	"@3 No"
+"\r\n"+	"#2 Here you go!"
+"\r\n"+	"@1 Thanks!"
+"\r\n"+	"#3 Suit yourself!";

var fullScript = "";

function setup()
{
	$('#inputTextArea').text(sample);
}

function parse()
{
	$('#setupDiv').addClass('invisible');
	$('#gameDiv').removeClass('invisible');
	showNode(1);
}

function showNode(index)
{
	if (fullScript == "")
	{
		fullScript = $('#inputTextArea').val().replace(/(\r\n|\n|\r)/gm,"");
	}
	
	var startIndex = fullScript.indexOf("#"+index);
	var endIndex = fullScript.indexOf("#"+parseInt(index+1));
	if (endIndex == -1)
	{
		endIndex = fullScript.length;
	}
	var nodeText = fullScript.substring(startIndex, endIndex);
	console.log(nodeText);
	
	var promptStartIndex = nodeText.indexOf(" ") + 1;
	var promptEndIndex = nodeText.indexOf("@");
	if (promptEndIndex == -1)
	{
		promptEndIndex = nodeText.length;
	}
	var promptText = nodeText.substring(promptStartIndex, promptEndIndex);
	console.log(promptText);
	
	var optionStrings = [];
	var optionAddresses = [];
	
	for (let i = promptEndIndex-1; i < nodeText.length; i++)
	{
		if (nodeText.charAt(i) == "@")
		{
			var optionSubstring = nodeText.substring(i+1);
			var nextSpaceIndex = optionSubstring.indexOf(" ");
			optionAddresses.push(parseInt(optionSubstring.substring(0, nextSpaceIndex)));
			var nextAmpersandIndex = optionSubstring.indexOf("@");
			if (nextAmpersandIndex == -1)
			{
				optionStrings.push(optionSubstring.substring(nextSpaceIndex+1));
			}
			else
			{
				optionStrings.push(optionSubstring.substring(nextSpaceIndex+1, nextAmpersandIndex));
			}
		}
	}
	
	var gameDivHTML = "<p>" + promptText + "</p>";
	for (let i = 0; i < optionStrings.length; i++)
	{
		gameDivHTML += "<p><button onclick = showNode(" + optionAddresses[i] + ")>" + optionStrings[i] + "</button></p>";
	}
	$('#gameDiv').html(gameDivHTML);
}