{
    
    init: function(elevators, floors) {

        elevators.forEach(elevator => {
            elevator.on("floor_button_pressed", function (floorNum) { elevator.goToFloor(floorNum); });
        });

        elevators[0].on("idle", function () { elevators[0].goToFloor(0); });
        elevators[1].on("idle", function () { elevators[1].goToFloor(3); });
        elevators[2].on("idle", function () { elevators[2].goToFloor(6); });
        
        floors.forEach(floor => {
            floor.on("up_button_pressed", function (){
                var minDistance = 6;
                var nearestElevator = null;
                elevators.forEach(elevator => {
                    var distance = Math.abs(floor.floorNum()-elevator.currentFloor());
                    if(distance <= minDistance){
                        minDistance = distance;
                        nearestElevator = elevator;
                    }
                })
                nearestElevator.goToFloor(floor.floorNum())
            });

            floor.on("down_button_pressed", function (){
                var minDistance = 6;
                var nearestElevator = null;
                elevators.forEach(elevator => {
                    var distance = Math.abs(floor.floorNum()-elevator.currentFloor());
                    if(distance <= minDistance){
                        minDistance = distance;
                        nearestElevator = elevator;
                    }
                })
                nearestElevator.goToFloor(floor.floorNum())
            });
        });
    },
        update: function(dt, elevators, floors) {
            // We normally don't need to do anything here
        }
}