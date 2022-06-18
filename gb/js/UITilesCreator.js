class UITilesCreator
{
    constructor() {
        this.tilesCreator = new TilesCreator();
    }

    generateTile() {
        // Cette méthode retourne le code Hexa decimal du tile
        document.querySelector('#codeTile').value = this.tilesCreator.generate(
            document.querySelector('#contentTile').value, 
            false, 
            document.querySelector('#tilename').value || `<TILE_NAME>`
        );    
        // en apppelant la méthode viewInConsole, on obtient un visuel du tile dans la console
        this.viewInHtml('#gameboy-tiles', ...(document.querySelector('#contentTile').value.split('')));

        document.querySelectorAll('.pixel').forEach((el) => {

            el.addEventListener('mousedown', this.changePixelClass.bind(this));
            el.addEventListener('contextmenu',(e) => e.preventDefault() );       
        });
    }
    
    viewInHtml(selector, ...data) {
        if(this.tilesCreator.controleDataTileOrigine(data.join(''))) {
            document.querySelector(selector).innerHTML = '';
            let i = 0;
            // On boucle sur les lignes
            for(let r = 0; r < 8; r++) {
                let line = `<div class="row-tiles">`;
                for(let c = 0; c < 8; c++) {
                    line += `<div class="pixel pixel-${data[i]}"></div>`;
                    i++;
                }
                line += `</div>`;
                document.querySelector(selector).innerHTML += line;
            }
        }
    }

    changePixelClass(e) {
        e.preventDefault();
        let newColor;
        let color = parseInt(e.target.className.replace(/[^0-3]+/g, ''));
        // bouton de la souris clique gauche
        if(e.buttons == 1) {  newColor = color < 3 ? color+1 : color; }
        // bouton de la souris clique droit
        else if(e.buttons == 2)  { newColor = color > 0 ? color-1 : color; }
        if(newColor != color) {
            e.target.className = e.target.className.replace('pixel-'+color, 'pixel-'+newColor);
            this.pixelToData();
        }
    }

    pixelToData() {
        let data = ``;
        // on boucle sur toute les lignes puis sur toute les colonnes pour récupérer les valeurs des pixels
        document.querySelectorAll('.pixel').forEach((el) => { data += el.className.replace(/[^0-3]+/g, '');  });
        document.querySelector('#contentTile').value = data;
        this.generateTile();
    }

    zoomSize(zoom) {
        let size = parseInt(zoom.replace(/[^0-9]+/g,'')) || 10;
        document.querySelectorAll('.row-tiles').forEach(el => el.style = `width:${size*8}px; line-height:${size}px;height:${size}px;`);
        document.querySelectorAll('.pixel').forEach(el => el.style = `width:${size}px; height:${size}px;`);
    }
    
    mirror(data, mode = 'horizontal')  {
        if(mode == 'vertical') {
            data = data.split('').reverse().join('');
        }
        else if(mode == 'horizontal') {
            let newData = data;
            data = '';
            for(let l = 0; l < 8; l++) {
                data += newData.substr(l*8,8).split('').reverse().join('');
            }
        }
        return data;
    }

    inverseColor(data)  {
        return data.split('').map((color) => {
            switch(color) {
                case '0': return '3';
                case '1': return '2';
                case '2': return '1';
                case '3': return '0';
            }
        }).join('');            
    }

    /**
     * Permet de charger des tiles pré-existant
     */
    library() {
        document.querySelectorAll('#tiles_library .tile').forEach(el => {
            el.addEventListener('click', (e) => {
                document.querySelector('#contentTile').value = e.currentTarget.dataset.content;
                document.querySelector('#tilename').value = e.currentTarget.dataset.name;
                this.generateTile();
            });
        });
    }
}