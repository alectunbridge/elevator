{
    init: function(elevators, floors) {
        var callButtonsPressed = [];

        elevators.forEach(elevator => {
            elevator.on("floor_button_pressed", function (floorNum) { elevator.goToFloor(floorNum); });
            elevator.on("passing_floor", function (floorNum, direction) {
                if (elevator.getPressedFloors().includes(floorNum)) {
                    elevator.goToFloor(floorNum, true);
                }
            });
            elevator.on("idle", function () { elevator.goToFloor(0); });
            elevator.on("stopped_at_floor", function (floorNum) {
                const index = callButtonsPressed.indexOf(floorNum);
                if (index > -1) {
                    callButtonsPressed.splice(index, 1);
                }
            });
        });

        function respondToButtonPressed(floor) {
            console.log(callButtonsPressed);
            var minDistance = floors.length;
            var nearestElevator = null;
            callButtonsPressed.push(floor.floorNum())
            elevators.forEach(elevator => {
                var distance = Math.abs(floor.floorNum() - elevator.currentFloor());
                if (distance <= minDistance) {
                    minDistance = distance;
                    nearestElevator = elevator;
                }
            })
            nearestElevator.goToFloor(floor.floorNum())
        }

        floors.forEach(floor => {
            floor.on("up_button_pressed", respondToButtonPressed);

            floor.on("down_button_pressed", respondToButtonPressed);
        });
    },
    update: function(dt, elevators, floors) {
        // We normally don't need to do anything here
    }
}