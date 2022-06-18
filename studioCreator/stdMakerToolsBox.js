/*******************************************************************************
 * Classe Js pour palette de couleur pour Studio Maker
 *
 * @author  LECOMTE Cyril <cyrhades76@gmail.com>
 * @version 08/12/2014
 * @since 06/12/2014
 * @package studioMaker
 *******************************************************************************/
class stdMakerToolsBox {
	/**
	 * @param r value decimal  0 <> 255
	 * @param g value decimal  0 <> 255
	 * @param b value decimal  0 <> 255
	 * @return hexa color
	 */
	isRgbColor(r,g,b) {
		if ((r>=0 && r<= 255) && (g>=0 && g<= 255) && (b>=0 && b<= 255)) {
			return true;
		}
		return false;
	}

	/**
	 * @param hex value hexadecimal
	 * @param length (default : 8)
	 * @return hexa color
	 */
	hexTobin(hex, length = 8) {
		return ((parseInt(hex, 16)).toString(2).padStart(length, '0'));
	}
	
	/**
	 * @param data valeur bin
	 * @return hexa color
	 */
	binToHex(bin) {
		let hex = parseInt(bin,2).toString(16);
		return hex.length == 1 ? `0x0${hex}` : `0x${hex}`;
	}
	
	/**
	 * @param data color
	 * @return hexa color
	 */
	decimalToHex(data) {
		if(typeof data == 'string') {		
			// explode string
		}

		if(data.length > 0) {        
			// on boucle sur toute les données
			for(let i = 0; i < data.length; i++) {
				// Javascript convertit les nombres hexa en nombres decimaux
				// On vérifie que le nombre est compris entre 0 et 255
				if(/^[0-9]+$/i.test(data[i]) && data[i]>=0 && data[i]<=255) {
					data[i] = (data[i].toString(16).length == 1
						? `0x0${data[i].toString(16)}` 
						: `0x${data[i].toString(16)}`);
				}
			}
		}
		return data;    
	}

	/**
	 * @param rgb color
	 * @return hexa color
	 */
	rgb2hex(rgb) {
		if (rgb=='transparent') return 'transparent';
		rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
		function hex(x) {
			return ("0" + parseInt(x).toString(16)).slice(-2);
		}
		return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
	}
}