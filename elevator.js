{
    init: function(elevators, floors) {
        elevators.forEach(elevator => {
            elevator.on("idle", function () { elevator.goToFloor(0); });

            elevator.on("floor_button_pressed", function (floorNum) { elevator.goToFloor(floorNum); });

            elevator.on("passing_floor", function (floorNum, direction) {
                if (elevator.getPressedFloors().includes(floorNum)) {
                    elevator.goToFloor(floorNum, true);
                }
            });
        });
    },
    update: function(dt, elevators, floors) {
        // We normally don't need to do anything here
    }
}