{
    init: function(elevators, floors) {
        var callButtonsPressed = [];

        elevators.forEach(elevator => {
            elevator.on("floor_button_pressed", function (floorNum) {
                elevator.goToFloor(floorNum);
            });
            elevator.on("passing_floor", function (floorNum, direction) {
                var elevatorHasSpace = true;
                if (elevator.maxPassengerCount() > 4) {
                    elevatorHasSpace = elevator.loadFactor() < 0.75;
                } else {
                    elevatorHasSpace = elevator.loadFactor() < 0.5;
                }
                var gettingOff = elevator.getPressedFloors().includes(floorNum);
                var gettingOn = callButtonsPressed.includes(floorNum) && elevatorHasSpace;

                if (gettingOff || (gettingOn && elevatorHasSpace)) {
                    console.log(`floor: ${floorNum}, floorsPressed: ${elevator.getPressedFloors()}, callButtonsPressed: ${callButtonsPressed}, gettingOff: ${gettingOff}, gettingOn: ${gettingOn}`)
                    elevator.goToFloor(floorNum, true);
                }
            });

            elevator.on("idle", function () {
                elevator.goToFloor(0);
            });

            elevator.on("stopped_at_floor", function (floorNum) {
                console.log(`floor: ${floorNum}, floorsPressed: ${elevator.getPressedFloors()}, callButtonsPressed: ${callButtonsPressed}`);
                const index = callButtonsPressed.indexOf(floorNum);
                if (index > -1) {
                    callButtonsPressed.splice(index, 1);
                }
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