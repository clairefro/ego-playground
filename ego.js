
var ew = ["i'm", "i'd", "i've","i'll",'i','me','my','mine','myself'];
var ww = ["we'd", "we've","we're","we'll",'our','ours','ourselves','let\'s'];
var yw = ["you're", "you'd","you'll","you've",'your','yours','yourself','yourselves',"yous",'y\'all', 'you'];
var tw = ["she'll","she'd","he'll","he'd","he's","she's","her", "she", "hers",'he','him','his','himself','herself', 'she\'d','he\'d', 'he\'s', 'she\'s'];
var them = ["they've", "they'd","they'll", "they're","they",'them','their','theirs','themselves'];

var text = document.body.textContent;
var body = document.querySelector('body');

document.getElementById('getEgo').addEventListener('click', function () {
  getEgoAndHighlightText(text, ew, 'red')
  getEgoAndHighlightText(text, ww, 'yellow')
  getEgoAndHighlightText(text, yw, 'green')
  getEgoAndHighlightText(text, tw, 'blue')
  getEgoAndHighlightText(text, them, 'purple')
})

function getEgoAndHighlightText(text, egoWords, color) {
  getEgo(text, egoWords);
  highlightText(body, egoWords, color);
}

function egoArrayToRegex(arr) {
  var re = "";
  arr.forEach(ew => re += '((\\b' + ew + '\\b)|(\\b' + ew +'[^\\w\'-]))|');
  console.log(re.slice(0,-1))
  return re.slice(0,-1); // chop final '|'
}

function getEgo(text, egoWords) {
  var wordCountAll = text.split(' ').length;

  var countByEgoWord = {}
  egoWords.forEach(function(egoWord) {
    countByEgoWord[egoWord] = (text.match(new RegExp('\\b' + egoWord + '[^\w\'-]', 'gim')) || [] ).length
  })

  var wordCountEgo = Object.values(countByEgoWord).reduce((t,n) => t + n);
  var ego = (wordCountEgo / wordCountAll) * 100
  var egoWordBreakdown = {}

  Object.keys(countByEgoWord).forEach(function(egoWord) {
    egoWordBreakdown[egoWord] = {
      count: countByEgoWord[egoWord],
      rate: countByEgoWord[egoWord] / wordCountEgo,
    }
  })
  var result = {
    egoWords,
    wordCountAll,
    wordCountEgo,
    ego,
    egoWordBreakdown
  }
  console.log(result.egoWords)
  console.log(result)
  return result
}

function highlightText(element, egoWords, color) {

  var innerHTML = element.innerHTML;

  var regex = new RegExp('(' + egoArrayToRegex(egoWords) + ')','gim');

  body.innerHTML= innerHTML.replace(regex, '<span style="background-color:' + color +';">$1</span>');
}
