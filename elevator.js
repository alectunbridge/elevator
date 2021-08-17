{
    init: function(elevators, floors) {
        elevators.forEach(elevator => {
            elevator.on("idle", function () { elevator.goToFloor(0); });

            elevator.on("floor_button_pressed", function (floorNum) { elevator.goToFloor(floorNum); });

            elevator.on("")

            elevator.on("passing_floor", function (floorNum, direction) {
                if (elevator.getPressedFloors().includes(floorNum)) {
                    elevator.goToFloor(floorNum, true);
                }
            });
        });

        floors.forEach(floor => {
            floor.on("up_button_pressed", function (){
                elevators[0].goToFloor(floor.floorNum());
            });

            floor.on("down_button_pressed", function (){
                elevators[1].goToFloor(floor.floorNum());
            });
        });
    },
    update: function(dt, elevators, floors) {
        // We normally don't need to do anything here
    }
}