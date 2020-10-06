import { Player } from "./actors/Player.js";
import { Ball } from "./actors/Ball.js";
import { Block } from "./actors/Block.js";
import { KeyboardWasdController } from "./inputControllers/WasdController.js"


export const load = loader => {
    //@ Load static assets such as images and bitmap fonts

};


export const setup = ({app}) => {
    //@ Create the initial state of the game
    app.renderer.backgroundColor = 0x061639;

    const player = Player({
        app,
        x: app.screen.width / 2,
        y: app.screen.height - 64,
        wasd: KeyboardWasdController,
    });

    const ball = Ball({
        app,
        x: app.screen.width / 2,
        y: app.screen.height / 2,
    });

    const blocks = [];
    for (let i=0; i<15; i++)
        for (let j=0; j<6; j++)
            blocks.push(
                Block({
                    app,
                    x: 64 + i * 64,
                    y: 64 + j * 48,
                    w: 56,
                    h: 32
                })
            );

    return {
        actors: [player, ball, ...blocks],
        frame: 0n,
        _ofTypeCache: new Map(),
    };
}



export const loop = ({app, delta, state}) => {
    //@ Mutate the state one step at a time

    const toDestroy = new Set();
    const toAdd = [];

    for (const actor of state.actors){
        actor.onStep({
            app,
            delta,
            state,
            destroy: a => toDestroy.add(a ? a : actor),
            create: makeActor => toAdd.push(makeActor),
            ofType: type => {
                // since actors aren't added or destroyed during the update,
                // we can cache each query!
                if (state._ofTypeCache.has(type)){
                    return state._ofTypeCache.get(type);
                }else{
                    const foundActors =
                        state.actors.filter(actor => actor.type === type);
                    state._ofTypeCache.set(type, foundActors);
                    return foundActors;
                }
            },
        });
    }

    if (toDestroy.size !== 0){
        state.actors = state.actors.filter(actor => !toDestroy.has(actor));
        toDestroy.forEach(actor => {
            actor.onDestroy({app, state});
            state._ofTypeCache.delete(actor.type);
        });
    }

    for (const makeActor of toAdd){
        const actor = makeActor();
        state._ofTypeCache.delete(actor.type);
        state.actors.push(actor);
    }

    state.frame += 1n;
};
