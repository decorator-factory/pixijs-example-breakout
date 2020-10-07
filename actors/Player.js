// constants
const WIDTH = 120;
const HEIGHT = 32;
const SPEED = 24;


export const Player = ({x, y, app, wasd}) => {
    // instance variables
    let targetX = x;
    let onRelease = null;
    let syncPosition = null;

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
        const newX = targetX + dx * SPEED;
        if (WIDTH/2 < newX && newX+WIDTH/2 < app.screen.width)
            targetX = newX;
        sprite.x = (sprite.x*2 + targetX)/3;

        if (wasd.down() && onRelease !== null){
            onRelease();
            onRelease = null;
            syncPosition = null;
        }
        if (syncPosition !== null)
            syncPosition(sprite.x, sprite.y - HEIGHT/2);
    };

    // destruction handler
    const onDestroy = () => {
        app.stage.removeChild(sprite);
    };

    // construct
    return {
        type: "Player",
        onStep,
        onDestroy,
        rect: () => [
            sprite.x - WIDTH/2, sprite.y - HEIGHT/2,
            sprite.x + WIDTH/2, sprite.y + HEIGHT/2
        ],
        grab: ({onRelease: h1, syncPosition: h2,}) => {
            [onRelease, syncPosition] = [h1, h2];
        },
    }
};