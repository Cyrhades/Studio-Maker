/*******************************************************************************
 * Classe Js pour palette de couleur pour Studio Maker
 *
 * @author : LECOMTE Cyril <cyrhades76@gmail.com>
 * @since: 06/12/2014
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
			/([A-Z]{1,2})([0-9]{1,3},[0-9]{1,3},[0-9]{1,3})/g,
			palette
		);
		//console.log(tColors);
		//this.colors[key] = value;
		//console.log(this.colors);
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
			var i = 0;
			// On boucle pour créer notre palette compatible Studio Maker
			for( l in this.letters ) {
				this.palette += this.letters[l]+colors[i];
				i++;
				// Si on a fini
				if (i >= nbColors) {
					break;
				}
			}
			// Si la premiere boucle n'a pas suffit
			if (i < nbColors) {
				// On boucle
				first: for( l in this.letters ) {
					second : for( j in this.letters ) {
						this.palette += this.letters[l]+
						this.letters[j]+colors[i];
						i++;
						// Si on a fini
						if (i >= nbColors) {
							break first;
						}
					}
				}
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
