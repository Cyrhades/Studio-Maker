const stdMaker = new stdMakerToolsBox();
document.addEventListener('DOMContentLoaded', () => {
    const UITiles = new UITilesCreator();
   
    // par défaut, on affiche un tile vide
    if(document.querySelector('#contentTile').value.length != 64) {
        document.querySelector('#contentTile').value = '0'.repeat(64);
    }
    UITiles.generateTile();
    UITiles.library();
    
    document.querySelector('#tilename').addEventListener('keyup', UITiles.generateTile.bind(UITiles));
    document.querySelectorAll('.generate_other').forEach((el) => {
        el.addEventListener('click', (e) => {
            let data = document.querySelector('#contentTile').value;
            switch(e.currentTarget.dataset.mode)
            {
                case 'mirror-h' : data = UITiles.mirror(data, 'horizontal'); break;
                case 'mirror-v' : data = UITiles.mirror(data, 'vertical'); break;
                case 'inverse-color' : data = UITiles.inverseColor(data); break;
            }
            document.querySelector('#contentTile').value = data;
            UITiles.generateTile();
        });
    });

    document.querySelectorAll('.zoom').forEach((el) => {
        el.addEventListener('click', (e) => {
            UITiles.zoomSize(e.currentTarget.dataset.zoom)
        });
    });
});