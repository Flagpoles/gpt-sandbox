import axios from 'axios';

const SERVER_BASE_URL = 'http://localhost:5000';

const nbaApi = axios.create({
  baseURL: `${SERVER_BASE_URL}/api`,
});

export const fetchGamesByDate = async (date) => {
  try {
    const response = await nbaApi.get('/leaguegamelog', {
      params: {
        Counter: 0,
        Direction: 'ASC',
        LeagueID: '00',
        PlayerOrTeam: 'T',
        Season: '2022-23',
        SeasonType: 'Regular Season',
        Sorter: 'PTS',
        DateFrom: date,
        DateTo: date,
      },
    });

    console.log('Request URL:', response.config.url);
    console.log('Fetched data:', response.data);

    const games = response.data.resultSets[0].rowSet;

    return games;
  } catch (error) {
    console.error('Error fetching games:', error);
    return [];
  }
};

export const fetchPlayers = async (searchTerm) => {
  try {
    const response = await nbaApi.get('/commonallplayers', {
      params: {
        LeagueID: '00',
        Season: '2022-23',
        IsOnlyCurrentSeason: 0,
      },
    });

    const players = response.data.resultSets[0].rowSet;
    const filteredPlayers = players.filter((player) =>
      player[1].toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filteredPlayers;
  } catch (error) {
    console.error('Error fetching players:', error);
    return [];
  }
};

export default nbaApi;
