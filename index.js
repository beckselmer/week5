class Player {
    constructor(name, position) {
        this.name = name;
        this.position = position;
    }
//Here is the describe function
    describe() {
        return `${this.name} plays ${this.position}.`
    }
}
//Here are the classes, the Player class, Team class and the menu class. To be honest 
//I'm not totally sure how the Switch works but they used it in the video and I basically followed along.

class Team {
    constructor(name) {
        this.name = name;
        this.players = [];
    }
//Here is the add player function

    addPlayer(player) {
        if (player instanceof Player) {
            this.players.push(player);
        } else {
          throw new Error(`You can only add an instance of Player, Argument is not a player: ${player}`);
        }
    }
//Above is the first time that I've used the error function before
//The describe function

    describe() {
        return `${this.name} has ${this.players.length} players.`;
    }
}

class Menu {
    constructor() {
        this.teams = [];
        this.selectedTeam = null;
    }

    start() {
        let selection = this.showMainMenuOptions();
        
        while (selection != 0) {
            switch (selection) {
                case '1':
                    this.createTeam();
                    break;
                case '2':
                    this.viewTeam();
                    break;
                case '3':``
                    this.deleteTeam();
                case '4':
                    this.displayTeams();
                    break;
                default:
                    selection = 0;        
            }
            selection = this.showMainMenuOptions();
        }

        alert('Goodbye!');
    }
//Using a function that returns menu options
    showMainMenuOptions() {
        return prompt(`
        0) exit
        1) create new team
        2) view team
        3) delete team
        4) display all teams
        `);
    }
//More of the same from above
    showTeamMenuOptions(teamInfo) {
        return prompt(`
        0) back
        1) create player
        2) delete player
        --------------------------
        ${teamInfo}
        `);
    }
//display teams function
    displayTeams() {
        let teamString = '';
        for (let i = 0; i < this.teams.length; i++) {
            teamString += i + ') ' + this.teams[i].name + '\n';
        }
        alert(teamString);
    }
//create teams function
    createTeam() {
        let name = prompt('Enter name for new team');
        this.teams.push(new Team(name));
    }
//and a view teams function
    viewTeam() {
        let index = prompt('Enter the team you wish to view:');
        if(index > -1 && index < this.teams.length) {
            this.selectedTeam = this.teams[index];
            let description  = 'Team Name:' + this.selectedTeam.name + '\n';
            
            for(let i = 0; i < this.selectedTeam.players.length; i++) {
                description += i + ') ' + this.selectedTeam.players[i].name + ' - ' + this.selectedTeam.players[i].position + '\n';

            }

            let selection = this.showTeamMenuOptions(description);
            switch (selection) {
                case '1':
                    this.createPlayer();
                    break;
                case '2':
                    this.deletePlayer();
            }
        }
    }
//down here we got the delete team function
    deleteTeam() {
        let index = prompt('Enter the index of the team you wish to delete:');
        if (index > -1 && index < this.teams.length) {
            this.teams.splice(index, 1);
        }
    }
//create player function
    createPlayer() {
        let name = prompt('Enter name for new player:');
        let position = prompt('Enter position for new player');
        this.selectedTeam.players.push(new Player(name, position));
    }
//delete player function
    deletePlayer() {
        let index = prompt('Enter the index of the player you wish to delete');
        if (index > -1 && index < this.selectedTeam.players.length) {
            this.selectedTeam.players.splice(index, 1);
        }
    }
}
//adding to the menu class
let menu = new Menu();
menu.start();