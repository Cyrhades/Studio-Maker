/*******************************************************************************
 * Classe Js pour palette de couleur pour Studio Maker
 *
 * @author : LECOMTE Cyril <cyrhades76@gmail.com>
 * @since: 08/12/2014
 * @package : studioMaker
 *******************************************************************************/
var stdMakerPalette = function() {
	// letters
	this.letters = ['A','B','C','E','F','G','H','I','J','K','L','M','N',
			'O','P','Q','R','S','T','U','V','W','X','Y','Z'];
	// read palette
	this.readPalette = function(palette) {
		if (typeof palette !== 'string') {
			return false;
		}
		this.colors = new Array();
		oTools = new stdMakerToolsBox();
		// On crée un tableau 
		var tColors = oTools.preg_match_all(
			/([A-Z]{1,2})([0-9]{1,3},[0-9]{1,3},[0-9]{1,3}|_)/g,
			palette
		);
		for(k in tColors) {
			this.colors[tColors[k][0]] = tColors[k][1];
		}
		return this.colors;
	};
	
	// write palette
	this.wriePalette = function(colors) {
		if (typeof colors !== 'object') {
			return false;
		}	
		this.palette = '';
		var nbColors = colors.length;
		// On vérifie qu'on a recu des couleurs
		if (nbColors > 0) {
			// FONCTION GENERATRICE
			function *colorsName(letters) {
				nbLetters = letters.length;
				for (var i = 0; i < nbLetters; i++) {
					sCrurrentLetter = letters[i];
					yield sCrurrentLetter;
				}
				for (var i = 0; i < nbLetters; i++) {
					for (var j = 0; j < nbLetters; j++) {
						sCrurrentLetter = letters[i]+letters[j];
						yield sCrurrentLetter;
					}
				}
			}
			//--
			var iterator = colorsName(this.letters);
			for (n in colors) {
				this.palette += iterator.next().value+colors[n];
			}
		}
		return this.palette;
	};
	
	// control is RGB color
	this.isColor = function(r,g,b) {
		if ((r>=0 && r<= 255) && (g>=0 && g<= 255) && (b>=0 && b<= 255)) {
			return true;
		}
		return false;
	};
};
