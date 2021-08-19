{
    init: function(elevators, floors) {
        var elevatorToSend = 0;

        elevators.forEach(elevator => {
            elevator.on("floor_button_pressed", function (floorNum) {
                elevator.goToFloor(floorNum);
            });
        });

        function respondToButtonPressed(floor) {
            do {
                elevatorToSend = ++elevatorToSend % 3;
            } while (elevators[elevatorToSend].loadFactor() == 1);
            elevators[elevatorToSend].goToFloor(floor.floorNum());
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