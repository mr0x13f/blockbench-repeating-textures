(function() {

let deferred = [];

Plugin.register('repeating_textures', {
    title: 'Repeating Textures',
    description: 'Fixes repeating textures',
    icon: 'qr_code',
    onload() {

        let OriginalTexture = Texture;
        class TweakedTexture extends OriginalTexture {
            constructor() {
                super();
                this.img.tex.magFilter = THREE.NearestFilter;
                this.img.tex.minFilter = THREE.NearestFilter;
                this.img.tex.wrapS = THREE.RepeatWrapping;
                this.img.tex.wrapT = THREE.RepeatWrapping;
            }
        }
        Texture = TweakedTexture;
        window.Texture = TweakedTexture;
        Blockbench.Texture = TweakedTexture;
        defer(() => {
            Texture = OriginalTexture;
            window.Texture = OriginalTexture;
            Blockbench.Texture = OriginalTexture;
        });

    },
    onunload() {

        for (let lambda of deferred)
            lambda();
        
    },
});

function defer(lambda) {
    deferred.push(lambda);
}

})();
