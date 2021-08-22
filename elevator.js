{
    init: function(elevators, floors) {
        var callButtonsPressedUp = [];
        var callButtonsPressedDown = [];

        elevators.forEach(elevator => {
            elevator.on("floor_button_pressed", function (floorNum) {
                elevator.goToFloor(floorNum);
                console.log(`floorButton: ${floorNum}, direction: ${elevator.destinationDirection()}`);
            });
            elevator.on("passing_floor", function (floorNum, direction) {
                if (elevator.destinationDirection() === "up") {
                    elevator.goingUpIndicator(true);
                    elevator.goingDownIndicator(false);
                } else {
                    elevator.goingUpIndicator(false);
                    elevator.goingDownIndicator(true);
                }

                var elevatorHasSpace = true;
                if (elevator.maxPassengerCount() > 5) {
                    elevatorHasSpace = elevator.loadFactor() < 0.75;
                } else {
                    elevatorHasSpace = elevator.loadFactor() < 0.5;
                }
                var gettingOff = elevator.getPressedFloors().includes(floorNum);

                var callButtonArrayToCheck;
                if (elevator.destinationDirection() === "up") {
                    callButtonArrayToCheck = callButtonsPressedUp;
                } else {
                    callButtonArrayToCheck = callButtonsPressedDown;
                }
                var gettingOn = callButtonArrayToCheck.includes(floorNum) && elevatorHasSpace;

                if (gettingOff || gettingOn) {
                    console.log(`floor: ${floorNum}, floorsPressed: ${elevator.getPressedFloors()}, callButtonsPressed: ${callButtonArrayToCheck}, gettingOff: ${gettingOff}, gettingOn: ${gettingOn}`)
                    elevator.goToFloor(floorNum, true);
                }
            });

            elevator.on("idle", function () {
                elevator.goToFloor(0);
                elevator.goingUpIndicator(false);
                elevator.goingDownIndicator(true);
            });

            elevator.on("stopped_at_floor", function (floorNum) {
                elevator.goingUpIndicator(true);
                elevator.goingDownIndicator(true);
                console.log(`floor: ${floorNum}, floorsPressed: ${elevator.getPressedFloors()}, callButtonsPressed: ${callButtonsPressedUp} ${callButtonsPressedDown}`);
                var index = callButtonsPressedUp.indexOf(floorNum);
                if (index > -1) {
                    callButtonsPressedUp.splice(index, 1);
                } else {
                    index = callButtonsPressedDown.indexOf(floorNum);
                    if (index > -1) {
                        callButtonsPressedDown.splice(index, 1);
                    }
                }
            });
        });

        function callButtonPressedUp(floor) {
            if (!callButtonsPressedUp.includes(floor.floorNum())) {
                callButtonsPressedUp.push(floor.floorNum());
            }
        }

        function callButtonPressedDown(floor) {
            if (!callButtonsPressedDown.includes(floor.floorNum())) {
                callButtonsPressedDown.push(floor.floorNum());
            }
        }

        floors.forEach(floor => {
            floor.on("up_button_pressed", callButtonPressedUp);
            floor.on("down_button_pressed", callButtonPressedDown);
        });
    },
    update: function(dt, elevators, floors) {
        // We normally don't need to do anything here
    }
}