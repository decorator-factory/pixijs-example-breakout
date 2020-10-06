const COLOR = {
    3: 0x00f000,
    2: 0xfacc00,
    1: 0xff0000,
    0: 0x000000,
};


export const Block = ({app, x, y, w, h}) => {
    // instance variables
    let hp = 3;
    let redraw = false;
    let scheduledForDestruction = false;

    // methods
    const hit = () => {
        hp -= 1;
        redraw = true;
        if (hp <= 0)
            scheduledForDestruction = true;
    };

    // graphics
    const sprite =
        new Graphics()
        .lineStyle(2, COLOR[hp], 1)
        .drawRect(-w/2, -h/2, w, h);
    sprite.x = x;
    sprite.y = y;
    app.stage.addChild(sprite);

    // update handler
    const onStep = ({destroy}) => {
        if (scheduledForDestruction === true)
            destroy();
        if (redraw){
            sprite
                .clear()
                .lineStyle(2, COLOR[hp], 1)
                .drawRect(-w/2, -h/2, w, h);
            redraw = false;
        }
    };

    // destruction handler
    const onDestroy = () => {
        sprite.destroy();
        app.stage.removeChild(sprite);
    };

    return {
        type: "Block",
        rect: () => [sprite.x - w/2, sprite.y - h/2, sprite.x + w/2, sprite.y + h/2],
        onStep,
        onDestroy,
        hit,
    };
};