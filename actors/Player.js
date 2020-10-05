// constants
const WIDTH = 96;
const HEIGHT = 64;
const SPEED = 4;


export const Player = ({x, y, app, wasd}) => {
    // graphics
    const sprite =
        new Graphics()
        .lineStyle(2, 0xffffff, 1)
        .drawRect(
            - WIDTH/2, - HEIGHT/2,
            WIDTH, HEIGHT
        );
    sprite.x = x;
    sprite.y = y;
    app.stage.addChild(sprite);

    // update handler
    const onStep = ({state}) => {
        const dx = wasd.right() - wasd.left();
        const newX = sprite.x + dx * SPEED;
        if (WIDTH/2 < newX && newX+WIDTH/2 < app.screen.width)
            sprite.x = newX;
    };

    // destruction handler
    const onDestroy = () => {
        app.stage.removeChild(sprite);
    };

    // construct
    return {type: "Player", onStep, onDestroy}
};