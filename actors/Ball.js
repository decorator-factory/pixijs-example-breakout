// constants
const RADIUS = 8;


export const Ball = ({x, y, app}) => {
    // instance variables
    let vx = 4;
    let vy = 4;

    // graphics
    const sprite =
        new Graphics()
        .lineStyle(2, 0x00ccff, 1)
        .drawCircle(0, 0, RADIUS);
    sprite.x = x;
    sprite.y = y;
    app.stage.addChild(sprite);

    // update handler
    const onStep = ({state}) => {
        sprite.x += vx;
        sprite.y += vy;

        if (sprite.x <= RADIUS || sprite.x >= app.screen.width - RADIUS)
            vx = -vx;
        if (sprite.y <= RADIUS || sprite.y >= app.screen.height - RADIUS)
            vy = -vy;
    };

    // destruction handler
    const onDestroy = () => {
        app.stage.removeChild(sprite);
    };

    // construct
    return {type: "Ball", onStep, onDestroy}
};