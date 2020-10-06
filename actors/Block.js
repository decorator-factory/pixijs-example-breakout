export const Block = ({app, x, y, w, h}) => {
    // instance variables
    let scheduledForDestruction = false;

    // methods
    const hit = () => {
        scheduledForDestruction = true;
    };

    // graphics
    const sprite =
        new Graphics()
        .lineStyle(2, 0xff0000, 1)
        .drawRect(-w/2, -h/2, w, h);
    sprite.x = x;
    sprite.y = y;
    app.stage.addChild(sprite);

    // update handler
    const onStep = ({destroy}) => {
        if (scheduledForDestruction === true)
            destroy();
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