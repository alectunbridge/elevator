{
    init: function(elevators, floors) {
        var callButtonsPressed = [];

        elevators.forEach(elevator => {
            elevator.on("floor_button_pressed", function (floorNum) {
                elevator.goToFloor(floorNum);
            });
            elevator.on("passing_floor", function (floorNum, direction) {
                var gettingOff = elevator.getPressedFloors().includes(floorNum);
                var gettingOn = callButtonsPressed.includes(floorNum) && (elevator.loadFactor() < 0.5);
                if ( gettingOff || gettingOn ) {
                    elevator.goToFloor(floorNum, true);
                    console.log(`floor: ${floorNum}, gettingOff: ${gettingOff}, gettingOn: ${gettingOn}`)
                }
            });
            elevator.on("idle", function () {
                elevator.goToFloor(0);
            });
            elevator.on("stopped_at_floor", function (floorNum) {
                const index = callButtonsPressed.indexOf(floorNum);
                if (index > -1) {
                    callButtonsPressed.splice(index, 1);
                }
                console.log(`floor: ${floorNum}, callButtonsPressed: ${callButtonsPressed}`)
            });
        });

        function callButtonPressed(floor) {
            if (!callButtonsPressed.includes(floor.floorNum())) {
                callButtonsPressed.push(floor.floorNum());
            }
        }

        floors.forEach(floor => {
            floor.on("up_button_pressed", callButtonPressed);
            floor.on("down_button_pressed", callButtonPressed);
        });
    },
        update: function(dt, elevators, floors) {
            // We normally don't need to do anything here
        }
}