import { render } from '@testing-library/react';
import Table from '../components/Table';

test('Is table row showing movie data correctly - Try 1', async () => {
  // Test data
  const test_data = [{'budget': '185000000',
    'genres': '[{"id": 16, "name": "Animation"}, {"id": 12, "name": "Adventure"}, \
    {"id": 35, "name": "Comedy"}, {"id": 10751, "name": "Family"}, {"id": 28, "name": "Action"}, \
    {"id": 14, "name": "Fantasy"}]',
    'homepage': 'http://disney.go.com/brave/#/home', 'id': '62177',
    'keywords': '[{"id": 388, "name": "scotland"}, {"id": 526, "name": "rebel"}, {"id": 3930, "name": "bravery"}, \
    {"id": 4152, "name": "kingdom"}, {"id": 4393, "name": "archer"}, {"id": 4896, "name": "wish"}, \
    {"id": 10468, "name": "bear"}, {"id": 14753, "name": "scot"}, {"id": 15161, "name": "rebellious daughter"}, \
    {"id": 41538, "name": "turns into animal"}, {"id": 53995, "name": "archery"}, {"id": 162715, "name": "ruins"}, \
    {"id": 179430, "name": "aftercreditsstinger"}, {"id": 181181, "name": "peace offering"}, \
    {"id": 187056, "name": "woman director"}, {"id": 189098, "name": "courage"}, {"id": 209714, "name": "3d"}]',
    'original_language': 'en', 'original_title': 'Brave',
    'overview': 'Brave is set in the mystical Scottish Highlands, where Mérida is the princess of a kingdom ruled by \
    King Fergus and Queen Elinor. An unruly daughter and an accomplished archer, Mérida one day defies a sacred custom of \
    the land and inadvertently brings turmoil to the kingdom. In an attempt to set things right, Mérida seeks out an \
    eccentric old Wise Woman and is granted an ill-fated wish. Also figuring into Mérida’s quest — \
    and serving as comic relief — are the kingdom’s three lords: the enormous Lord MacGuffin, the surly Lord Macintosh, \
    and the disagreeable Lord Dingwall.',
    'popularity': '125.114374',
    'production_companies': '[{"name": "Walt Disney Pictures", "id": 2}, {"name": "Pixar Animation Studios", "id": 3}]',
    'production_countries': '[{"iso_3166_1": "US", "name": "United States of America"}]',
    'release_date': '2012-06-21', 'revenue': '538983207', 'runtime': '93',
    'spoken_languages': '[{"iso_639_1": "en", "name": "English"}]',
    'status': 'Released',
    'tagline': 'Change your fate.',
    'title': 'Brave', 'vote_average': '6.7',
    'vote_count': '4641'}];
  render(<Table data={test_data} />);

  // See if table shows rows correctly
  var table = document.getElementById("movieTable");
  expect(table.rows.item(1).cells.item(0).textContent).toEqual("Brave"); // Name
  expect(table.rows.item(1).cells.item(1).textContent).toEqual("2012-06-21"); // Date Released
  expect(table.rows.item(1).cells.item(2).textContent).toEqual("Animation, Adventure, Comedy, Family, Action, Fantasy"); // Genres
  expect(table.rows.item(1).cells.item(3).textContent).toEqual("125.114374"); // Popularity
  expect(table.rows.item(1).cells.item(4).textContent).toEqual("6.7/10"); // Vote Average
  expect(table.rows.item(1).cells.item(5).textContent).toEqual("4641"); // Vote Count
  expect(table.rows.item(1).cells.item(6).textContent).toEqual("$185000000"); // Budget
  expect(table.rows.item(1).cells.item(7).textContent).toEqual(expect.stringContaining("Brave is set in the mystical Scottish Highlands,")); // Overview
});

test('Is table row showing movie data correctly - Try 2', async () => {
  // Test data
  const test_data = [{'budget': '0', 'genres': '[{"id": 28, "name": "Action"}, {"id": 12, "name": "Adventure"}, \
    {"id": 16, "name": "Animation"}, {"id": 35, "name": "Comedy"}, {"id": 10751, "name": "Family"}, \
    {"id": 14, "name": "Fantasy"}, {"id": 10749, "name": "Romance"}]',
      'homepage': '', 'id': '15173',
      'keywords': '[]',
      'original_language': 'en',
      'original_title': 'Jonah: A VeggieTales Movie',
      'overview': "Get ready as Bob the Tomato, Larry the Cucumber and the rest of the Veggies set \
      sail on a whale of an adventure in Big Idea's first full-length, 3-D animated feature film. This is\
       the story of Jonah and the Whale as you've never seen it before - a story where we learn that one \
       of the best gifts you can give - or get - is a second chance.",
      'popularity': '1.446172',
      'production_companies': '[{"name": "Big Idea Productions", "id": 3204}]',
      'production_countries': '[{"iso_3166_1": "US", "name": "United States of America"}]',
      'release_date': '2002-10-04',
      'revenue': '0',
      'runtime': '82',
      'spoken_languages': '[{"iso_639_1": "cs", "name": "\\u010cesk\\u00fd"}, {"iso_639_1": "en", "name": "English"}]',
      'status': 'Released',
      'tagline': 'Fresh Fish. Mixed Vegetables.',
      'title': 'Jonah: A VeggieTales Movie',
      'vote_average': '6.4',
      'vote_count': '22'}];
  render(<Table data={test_data} />);

  // See if table shows rows correctly
  var table = document.getElementById("movieTable");
  expect(table.rows.item(1).cells.item(0).textContent).toEqual("Jonah: A VeggieTales Movie"); // Name
  expect(table.rows.item(1).cells.item(1).textContent).toEqual("2002-10-04"); // Date Released
  expect(table.rows.item(1).cells.item(2).textContent).toEqual("Action, Adventure, Animation, Comedy, Family, Fantasy, Romance"); // Genres
  expect(table.rows.item(1).cells.item(3).textContent).toEqual("1.446172"); // Popularity
  expect(table.rows.item(1).cells.item(4).textContent).toEqual("6.4/10"); // Vote Average
  expect(table.rows.item(1).cells.item(5).textContent).toEqual("22"); // Vote Count
  expect(table.rows.item(1).cells.item(6).textContent).toEqual("$0"); // Budget
  expect(table.rows.item(1).cells.item(7).textContent).toEqual(expect.stringContaining("Get ready as Bob the Tomato, Larry the Cucumber")); // Overview
});

test('Is table row showing movie data correctly - Try 3', async () => {
  // Test data
  const test_data = [{'budget': '25000000',
    'genres': '[{"id": 28, "name": "Action"}, {"id": 12, "name": "Adventure"}, {"id": 16, "name": "Animation"},\
     {"id": 35, "name": "Comedy"}, {"id": 10751, "name": "Family"}, {"id": 14, "name": "Fantasy"}, \
     {"id": 878, "name": "Science Fiction"}]',
     'homepage': '', 'id': '12589',
     'keywords': '[{"id": 797, "name": "showdown"}, {"id": 2998, "name": "gi"}, {"id": 3289, "name": "villain"}, \
     {"id": 6257, "name": "genius"}, {"id": 9951, "name": "alien"}, {"id": 10084, "name": "rescue"},\
      {"id": 12101, "name": "miniaturization"}, {"id": 14544, "name": "robot"}, {"id": 14643, "name": "battle"}, \
      {"id": 18069, "name": "laser gun"}, {"id": 18096, "name": "spear"}, {"id": 33353, "name": "boy genius"}]',
    'original_language': 'en',
    'original_title': 'Jimmy Neutron: Boy Genius',
    'overview': "Jimmy Neutron is a boy genius and way ahead of his friends, but when it comes to being cool, \
    he's a little behind. All until one day when his parents, and parents all over Earth are kidnapped by aliens,\
     it's up to him to lead all the children of the world to rescue their parents.",
    'popularity': '12.739721',
    'production_companies': '[{"name": "Nickelodeon Movies", "id": 2348},\
     {"name": "Universal Cartoon Studios", "id": 4285}, {"name": "Paramount Animation", "id": 24955}]',
    'production_countries': '[{"iso_3166_1": "US", "name": "United States of America"}]',
    'release_date': '2001-12-21',
    'revenue': '80936232',
    'runtime': '83',
    'spoken_languages': '[{"iso_639_1": "en", "name": "English"}]',
    'status': 'Released', 'tagline': "He may be small, but he's got a big brain!",
    'title': 'Jimmy Neutron: Boy Genius',
    'vote_average': '5.6',
    'vote_count': '231'}];
  render(<Table data={test_data} />);

  // See if table shows rows correctly
  var table = document.getElementById("movieTable");
  expect(table.rows.item(1).cells.item(0).textContent).toEqual("Jimmy Neutron: Boy Genius"); // Name
  expect(table.rows.item(1).cells.item(1).textContent).toEqual("2001-12-21"); // Date Released
  expect(table.rows.item(1).cells.item(2).textContent).toEqual("Action, Adventure, Animation, Comedy, Family, Fantasy, Science Fiction"); // Genres
  expect(table.rows.item(1).cells.item(3).textContent).toEqual("12.739721"); // Popularity
  expect(table.rows.item(1).cells.item(4).textContent).toEqual("5.6/10"); // Vote Average
  expect(table.rows.item(1).cells.item(5).textContent).toEqual("231"); // Vote Count
  expect(table.rows.item(1).cells.item(6).textContent).toEqual("$25000000"); // Budget
  expect(table.rows.item(1).cells.item(7).textContent).toEqual(expect.stringContaining("Jimmy Neutron is a boy genius and way ahead of his friends, ")); // Overview
});