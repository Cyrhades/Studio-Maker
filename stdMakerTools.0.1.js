/*******************************************************************************
 * Classe Js pour palette de couleur pour Studio Maker
 *
 * @author  LECOMTE Cyril <cyrhades76@gmail.com>
 * @version 08/12/2014
 * @since 06/12/2014
 * @package studioMaker
 *******************************************************************************/
var stdMakerToolsBox = function() {
	this.preg_match_all = function(regex, haystack) {
		var globalMatch = haystack.match(regex);
		var matches = new Array();
		while (match = regex.exec(haystack)) {
			var matchArray = [];
			for (i in match) {
				// On ne récupére que les captures
				if (parseInt(i) != 0 && i!='index' && i!='input') {
					matchArray.push(match[i]);
				}
			}
			matches.push(matchArray);
		}
		return matches;
	};
	
	/**
	 * @param rgb color
	 * @return hexa color
	 */
	this.rgb2hex = function(rgb) {
		if (rgb=='transparent') return 'transparent';
		rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
		function hex(x) {
			return ("0" + parseInt(x).toString(16)).slice(-2);
		}
		return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
	};
};
