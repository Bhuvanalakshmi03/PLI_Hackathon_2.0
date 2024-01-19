console.clear();

const team = [
	{
		rank: 1,
		name: 'Lewis Hamilton',
		handle: 'lewishamilton',
		img: 'https://www.formula1.com/content/dam/fom-website/drivers/L/LEWHAM01_Lewis_Hamilton/lewham01.png.transform/2col-retina/image.png',
		investment: 50000,
		traded: 31
	}, {
		rank: 2,
		name: 'Kimi Raikkonen',
		handle: 'kimimatiasraikkonen',
		img: 'https://www.formula1.com/content/dam/fom-website/drivers/K/KIMRAI01_Kimi_R%C3%A4ikk%C3%B6nen/kimrai01.png.transform/2col-retina/image.png',
		investment: 75000,
		traded: 21
	}, {
		rank: 3,
		name: 'Sebastian Vettel',
		handle: 'vettelofficial',
		img: 'https://www.formula1.com/content/dam/fom-website/drivers/S/SEBVET01_Sebastian_Vettel/sebvet01.png.transform/2col-retina/image.png',
		investment: 100000,
		traded: 7
	}, {
		rank: 4,
		name: 'Max Verstappen',
		handle: 'maxverstappen1',
		img: 'https://www.formula1.com/content/dam/fom-website/drivers/M/MAXVER01_Max_Verstappen/maxver01.png.transform/2col-retina/image.png',
		investment: 80000,
		traded: 4
	}, {
		rank: 5,
		name: 'Lando Norris',
		handle: 'landonorris',
		img: 'https://www.formula1.com/content/dam/fom-website/drivers/L/LANNOR01_Lando_Norris/lannor01.png.transform/2col-retina/image.png',
		investment: 60000,
		traded: 16
	}, {
		rank: 6,
		name: 'Charles Leclerc',
		handle: 'charles_leclerc',
		img: 'https://www.formula1.com/content/dam/fom-website/drivers/C/CHALEC01_Charles_Leclerc/chalec01.png.transform/2col-retina/image.png',
		investment: 90000,
		traded: 6
	}, {
		rank: 7,
		name: 'George Russell',
		handle: 'georgerussell63',
		img: 'https://www.formula1.com/content/dam/fom-website/drivers/G/GEORUS01_George_Russell/georus01.png.transform/2col-retina/image.png',
		investment: 70000,
		traded: 21
	}, {
		rank: 8,
		name: 'Daniel Ricciardo',
		handle: 'danielricciardo',
		img: 'https://www.formula1.com/content/dam/fom-website/drivers/D/DANRIC01_Daniel_Ricciardo/danric01.png.transform/2col-retina/image.png',
		investment: 40000,
		traded: 46
	}, {
		rank: 9,
		name: 'Alexander Albon',
		handle: 'alex_albon',
		img: 'https://www.formula1.com/content/dam/fom-website/drivers/A/ALEALB01_Alexander_Albon/alealb01.png.transform/2col-retina/image.png',
		investment: 30000,
		traded: 2
	}, {
		rank: 10,
		name: 'Carlos Sainz Jr.',
		handle: 'carlossainz55',
		img: 'https://www.formula1.com/content/dam/fom-website/drivers/C/CARSAI01_Carlos_Sainz/carsai01.png.transform/2col-retina/image.png',
		investment: 20000,
		traded: 24
	}
];


// Create a function to find the member with the highest investment
const findHighestInvestment = (team) => {
  let highestInvestmentMember = team[0];
  for (let i = 1; i < team.length; i++) {
    if (team[i].investment > highestInvestmentMember.investment) {
      highestInvestmentMember = team[i];
    }
  }
  return highestInvestmentMember;
};

const randomEmoji = () => {
	const emojis = ['👏','👍','🙌','🤩','🔥','⭐️','🏆','💯'];
	let randomNumber = Math.floor(Math.random() * emojis.length);
	return emojis[randomNumber];
}

// Create a new list element
const list = document.createElement('ul');
list.classList.add('c-list');

// Append the list to the document body
document.body.appendChild(list);

// Loop through each team member and create a list item for them
team.forEach(member => {
	let newRow = document.createElement('li');
	newRow.classList.add('c-list__item');
	newRow.innerHTML = `
		<div class="c-list__grid">
			<div class="c-flag c-place u-bg--transparent">${member.rank}</div>
			<div class="c-media">
				<img class="c-avatar c-media__img" src="${member.img}" />
				<div class="c-media__content">
					<div class="c-media__title">${member.name}</div>
					<a class="c-media__link u-text--small" href="https://instagram.com/${member.handle}" target="_blank">@${member.handle}</a>
				</div>
			</div>
			<div class="u-text--right c-kudos">
				<div class="u-mt--8">
					<strong>${member.investment}</strong> REC Investment ${randomEmoji()}<br>
					<strong>${member.traded}</strong> Traded ${randomEmoji()}
				</div>
			</div>
		</div>
	`;
	if(member === findHighestInvestment(team)) {
		newRow.querySelector('.c-place').classList.add('u-text--dark');
		newRow.querySelector('.c-place').classList.add('u-bg--yellow');
		newRow.querySelector('.c-kudos').classList.add('u-text--yellow');
	}
	list.appendChild(newRow);
});

// Find the member with the highest investment in REC
let highestInvestmentMember = findHighestInvestment(team);

// Render highest investment card
const highestInvestmentCard = document.getElementById('highest-investment');
highestInvestmentCard.innerHTML =`<div class="u-text-small u-text--medium u-mb--16">Highest REC Investment</div>
<img class="c-avatar c-avatar--lg" src="${highestInvestmentMember.img}"/>
<h3 class="u-mt--16">${highestInvestmentMember.name}</h3>
<span class="u-text--teal u-text--small">${highestInvestmentMember.name}</span>`;
	
