// Code provided by Miraz Mac (https://www.mirazmac.com)
var holyWords = {
    burger: 'burmger',
    bad: 'bamd',
    batman: 'bamtman',
    cheese: 'cheems',
    cheems: 'cheems',
    cheeseburger: 'cheemsburger',
    doge : 'domge',
    female: 'f*male',
    history: 'himstory',
    nigger: 'n-word',
    nigga: 'n-word',
    retard: 'remtard',
    woman: 'w*man',
    women: 'w*men',
    walter: 'walmter',
    motherfucker: 'momtherfumcker',
};

var htmlTags = {
	a: true,
	abbr: true,
	address: true,
	area: false,
	article: true,
	aside: true,
	audio: false,
	b: true,
	base: false,
	bdi: true,
	bdo: true,
	blockquote: true,
	body: true,
	br: false,
	button: true,
	canvas: false,
	caption: true,
	cite: false,
	code: true,
	col: true,
	colgroup: false,
	data: true,
	datalist: false,
	dd: true,
	del: true,
	details: true,
	dfn: true,
	dialog: true,
	div: true,
	dl: true,
	dt: true,
	em: true,
	embed: false,
	fieldset: true,
	figcaption: true,
	figure: true,
	footer: true,
	form: true,
	h1: true,
    h2: true,
    h3: true,
    h4: true,
    h5: true,
    h6: true,
	head: false,
	header: true,
	hgroup: true,
	hr: false,
	html: false,
	i: true,
	iframe: false,
	img: false,
	input: false,
	ins: true,
	kbd: true,
	label: true,
	legend: true,
	li: true,
	link: false,
	main: true,
	map: false,
	mark: true,
	menu: true,
	meta: true,
	meter: false,
	nav: true,
	noscript: true,
	object: false,
	ol: true,
	optgroup: true,
	option: true,
	output: false,
	p: true,
	param: false,
	picture: false,
	pre: true,
	progress: false,
	q: true,
	rp: true,
	rt: true,
	ruby: true,
	s: true,
	samp: true,
	script: false,
	search: false,
	section: true,
	select: true,
	small: true,
	source: false,
	span: true,
	strong: true,
	style: false,
	sub: true,
	summary: true,
	sup: true,
	svg: false,
	table: true,
	tbody: true,
	td: true,
	template: true,
	textarea: false,
	tfoot: true,
	th: true,
	thead: true,
	time: false,
	title: true,
	tr: true,
	track: false,
	u: true,
	ul: true,
	var: true,
	video: false,
	wbr: false,
}

// Code provided by Miraz Mac (https://www.mirazmac.com)
function englishToCheems(text)
{
    // sorry kimg but no line breakms
    text = text.replace(/(\r\n|\n|\r)/gm, " ");

    // Explode them words
    var words = text.split(" ");
    var cheemedText = [];

    var symbols = [',', '.', ':', '!', '?', '&', '%', '/'];

    for (var i = words.length - 1; i >= 0; i--) {
        // Get rid of extra spaces
        var word = words[i].trim().toLowerCase();

        var needLastCharater = false;

        var lastChar = word.charAt(word.length - 1);

        if (symbols.includes(lastChar)) {
            word = word.slice(0, -1);
            needLastCharater = true;
        }

        // Handle basic plurals
        if (lastChar == 's') {
            var withoutS = word.slice(0, -1);

            if (holyWords[withoutS]) {
                word = holyWords[withoutS] + 's';
                cheemedText[i] = word;
                continue;
            }
        }

        if (holyWords[word]) {
            word = holyWords[word];
        } else {
            word = cheemsAlgorithm(word);
        }

        if (needLastCharater) {
            word = word + lastChar;
        }

        cheemedText[i] = word;
    }


    return cheemedText.join(' ');
}

// Code provided by Miraz Mac (https://www.mirazmac.com)
function cheemsAlgorithm(word)
{
    if (word.length < 4) {
        return word;
    }

    var vowels = ['a', 'e', 'i', 'o', 'u'];

    var vowelCount = word.match(/[aeiou]/gi);
    vowelCount = vowelCount === null ? 0 : vowelCount.length;

    var newWord = [];
    var addedM = false;
    var lastChar = word.charAt(word.length - 1);

    for (i = 0; i < word.length; i++) {
        var char = word.charAt(i);

        if (i > 0 && addedM == false) {
            if (vowelCount > 1 && i == 1 && vowels.includes(char) && !vowels.includes(lastChar)) {
                newWord[i] = char;
                continue;
            }

            var prev = word.charAt(i - 1);
            var next = word.charAt(i +1);

            if (vowels.includes(char) && next !=  'm' && prev != 'm' && !vowels.includes(next)) {
                char = char + 'm';

                addedM = true;
            }
        }

        if (newWord[i] == undefined) {
            newWord[i] = char;
        }
    }


    return newWord.join('');
}

function cheemText(node) {
    node.childNodes.forEach(e => { 
        if(e.nodeName == "#text") e.data = englishToCheems(e.data) 
        else {
            if(htmlTags[e.nodeName.toLowerCase()]) cheemText(e);
        } 
    });
}

cheemText(document.body);