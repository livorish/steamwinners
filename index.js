const fetch = require('node-fetch');

let url = 'http://api.steampowered.com/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v0002/?gameid=221380';

class Achievement {
  constructor(name, percent) {
    this.name = name;
    this.percent = percent;
  }

  printValues() {
    if (this.percent == 0) {
      console.log(`No one has completed the achievement: ${this.name}.`);
    } else {
      console.log(`${this.name} achievement has been completed by ${this.percent}% of people.`);
    }
  }
}

async function fetchData(url) {
  let response = await fetch(url);
  let jsonResponse = await response.json();
  printData(jsonResponse);
}

function printData(jsonData) {
  var achievementsArray = [];
  let jsonObject = jsonData['achievementpercentages'];
  let allAchievements = jsonObject['achievements'];

  for (let achievement of allAchievements) {
    let name = achievement['name'];
    let percent = achievement['percent'];
    let newAchievement = new Achievement(name, percent);
    newAchievement.printValues();
    achievementsArray.push(newAchievement);
  }

  console.log(achievementsArray.length);
  return achievementsArray;
}

fetchData(url).catch(function() {
  console.log('Could not fetch data');
});