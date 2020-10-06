# pixijs-example-breakout
Example breakout game made using PIXI.js

Try it out at: https://decorator-factory.github.io/pixijs-example-breakout/



# Game lifecycle

1. Instantiate the application
2. Load static resources using `game/load`
3. Call `game/setup` on the application to get the initial state
4. Run the game loop

## Game loop lifecycle

1. For each actor, `onStep` is called with the appropriate arguments.
2. Each actor scheduled for deletion is removed from `actors`.
3. Actors scheduled for creation are created.
4. Go to step 1.


# Actor interface

Each Actor must have three fields:

- `type : string` -- name of the actor type, must be the same as
  the constructor name;
- `onStep : (options) => void` -- the update handler
- `onDestroy : (options) => void` -- the destruction handler

## `onStep` options:
- `delta : number` -- lag between frames, in ms
- `app : PIXI.Application` -- the application instance singleton
- `state : State` -- the game state
- `destroy : (actor?) => void` -- function that schedules an
actor (or self if the actor is not specified) for removal
- `create : (() => Actor) => void` -- function that schedules
an actor for creation
- `ofType : (string) => Array<Actor>` -- get the array of all the
actors belonging to a certain type. Calls are cached during a single frame.

## `onDestroy` options:
- `app : PIXI.Application`
- `state : State`

## `State` members:
- `actors : Array<Actor>` -- array of all the actors. Don't add or remove items directly.
- `frame : BigInt` -- current frame number
- `_ofTypeCache` -- cache for the `ofType` function
