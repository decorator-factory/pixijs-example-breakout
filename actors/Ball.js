import { isCircleInRectangle } from "../collision.js";

// constants
const RADIUS = 14;


export const Ball = ({x, y, app}) => {
    // instance variables
    let vx = 6;
    let vy = 6;

    // graphics
    const sprite =
        new Graphics()
        .lineStyle(2, 0x00ccff, 1)
        .drawCircle(0, 0, RADIUS);
    sprite.x = x;
    sprite.y = y;
    app.stage.addChild(sprite);

    // update handler
    const onStep = ({ofType}) => {
        sprite.x += vx;
        sprite.y += vy;

        if (sprite.x <= RADIUS)
            vx = Math.abs(vx) * (+1);
        if (sprite.x >= app.screen.width - RADIUS)
            vx = Math.abs(vx) * (-1);

        if (sprite.y <= RADIUS)
            vy = Math.abs(vy) * (+1);
        if (sprite.y >= app.screen.height - RADIUS)
            vy = Math.abs(vy) * (-1);

        // bounce against the player
        const [player] = ofType("Player");
        const collision = isCircleInRectangle(sprite.x, sprite.y, RADIUS, ...player.rect());
        if (collision !== null){
            const [cx, cy] = collision;
            if (cx !== 0)
                vx = Math.abs(vx) * cx;
            if (cy !== 0)
                vy = Math.abs(vy) * cy;
        }

        // bounce against a block
        for (const block of ofType("Block")){
            const collision = isCircleInRectangle(sprite.x, sprite.y, RADIUS, ...block.rect());
            if (collision !== null){
                const [cx, cy] = collision;
                if (cx !== 0)
                    vx = Math.abs(vx) * cx;
                if (cy !== 0)
                    vy = Math.abs(vy) * cy;

                block.hit();
            }
        }
    };

    // destruction handler
    const onDestroy = () => {
        app.stage.removeChild(sprite);
    };

    // construct
    return {type: "Ball", onStep, onDestroy}
};