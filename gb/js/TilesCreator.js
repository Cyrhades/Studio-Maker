class TilesCreator
{
    generate(data, onlyHexa = true, name = `<TILE_NAME>`)  {
        if(this.controleDataTileOrigine(data) || true) {
            if(onlyHexa) {
                return this.convertToGbTile(data);
            }
            return `const UINT8 ${name} = {${this.convertToGbTile(data)}};`;
        }
    }

    hexaToOrigine(...hexa) {
        hexa = stdMaker.decimalToHex(hexa);
        let data = ``;
        if(this.controleTileHexa(hexa)) {
            // on boucle sur toute les données
            for(let i = 0; i < hexa.length; i = i+2) {
                let onePixel = [stdMaker.hexTobin(hexa[i]).split(''), stdMaker.hexTobin(hexa[i+1]).split('')];
                for(let b = 0; b < onePixel[0].length; b++) {
                    let value = `${onePixel[0][b]}${onePixel[1][b]}`;
                    switch(value) {
                        case `00`: data += `0`;  break;
                        case `01`: data += `1`;  break;
                        case `10`: data += `2`;  break;
                        case `11`: data += `3`;  break;
                    }
                }
            }
        }
        return data;
    }

    controleTileHexa(hexa) {
        if(hexa.length == 16) {        
            // on boucle sur toute les données
            for(let i = 0; i < hexa.length; i++) {
                // on vérifie que chaque données est un nombre hexa
                if(/^0x[0-9a-f]+$/i.test(hexa[i]) === false)  return false;
            }
            return true;
        }
        return false;
    }

    controleDataTileOrigine(data) {
        // Expression reguliere pour verifier que les chiffres sont compris entre 0 et 3 et qu'il y en a 64
        if(/^[0-3]{64}$/.test(data)) return true;
        return false;    
    }

    convertToGbTile(data) {
        let dataArray = [];
        let dataBinary = [[],[]];
        for(let i = 1; i <= data.length; i++) {
            switch(data[i-1]) {
                case `0`: dataBinary[0].push(0);  dataBinary[1].push(0); break;
                case `1`: dataBinary[0].push(0);  dataBinary[1].push(1);  break;
                case `2`: dataBinary[0].push(1);  dataBinary[1].push(0); break;
                case `3`: dataBinary[0].push(1);  dataBinary[1].push(1);  break;
            }
            // Tout les 8 bits
            if(i !=0 && i%8 == 0) {        
                // on convertie en Hexa    
                dataArray.push(
                    stdMaker.binToHex(dataBinary[0].join('')), 
                    stdMaker.binToHex(dataBinary[1].join(''))
                );
                dataBinary = [[],[]]; // on recommence 8 bits
            }
        }
        return dataArray;
    }
}