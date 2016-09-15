var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

module.exports.loop = function () {
   var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
   var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    console.log('Harvesters: ' + harvesters.length +'   Upgraders: ' + upgraders.length+ '   Energy: ' + Game.spawns['Stabby Haus'].energy +'/'+ Game.spawns['Stabby Haus'].energyCapacity);
    
    if(harvesters.length < 2) {
        var newName = Game.spawns['Stabby Haus'].createCreep([WORK,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'harvester'});
        console.log('Spawning new harvester: ' + newName);
    }
    if((upgraders.length < 1)|| (Game.spawns['Stabby Haus'].energy ==Game.spawns['Stabby Haus'].energyCapacity)) {
        var newName = Game.spawns['Stabby Haus'].createCreep([WORK,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'upgrader'});
        console.log('Spawning new Updater: ' + newName);
    }
    
    var tower = Game.getObjectById('b076bef7184ec23de04af27d');
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
}