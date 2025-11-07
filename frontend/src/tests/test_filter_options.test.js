function filter(genres, ratings, year, table) {
    if (table != null) {
      // Go through each row
      for (var i = 1; i < table.rows.length; i++) {
        if (genres.length == 0) {
          table.rows[i].style.display="table-row";
        } else {
          // If the movie genres does not include all of the selected genres, then hide the row
          // I went through each selected genre and see if it was in the table cell text or not
          var movieGenres = table.rows[i].cells[2].textContent.toLowerCase();
          for (var j = 0; j < genres.length; j++) {
            if (!movieGenres.includes(genres[j])) {
              table.rows[i].style.display="none";
              break;
            } else {
              table.rows[i].style.display="table-row";
            }
          }
        }

        // Similarly, I went through each selected rating and see if it was in the table cell text or not
        if (ratings.length != 0) {
            var movieRating = table.rows[i].cells[4].textContent.split("/")[0];
            for (var j = 0; j < ratings.length; j++) {
              if (movieRating.includes(ratings[j] + ".")) {
                table.rows[i].style.display="table-row";
                break;
              } else {
                table.rows[i].style.display="none";
              }
            }
        }

        // If the movie year doesn't match the selected year, hide the row
        var movieYear = table.rows[i].cells[1].textContent;
        if (year != "" && !movieYear.includes(year)) {
            table.rows[i].style.display="none";
        }
      }
    }
  };

// Test data
const htmlString = `<table id='movieTable'>
    <thead>
        <tr>
            <th>Name</th>
            <th>Date Released</th>
            <th>Genres</th>
            <th>Popularity</th>
            <th>Vote Average</th>
            <th>Vote Count</th>
            <th>Budget</th>
            <th>Overview</th>
        </tr>
    </thead>
    <tbody>
                <tr>
                    <td>Avatar</td>
                    <td>2009-12-10</td>
                    <td>Action, Adventure, Fantasy, Science Fiction</td>
                    <td></td>
                    <td>7.2/10</td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>Pirates of the Caribbean: At World's End</td>
                    <td>2007-05-19</td>
                    <td>Adventure, Fantasy, Action</td>
                    <td></td>
                    <td>6.9/10</td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>The Dark Knight Rises</td>
                    <td>2012-07-16</td>
                    <td>Action, Crime, Drama, Thriller</td>
                    <td></td>
                    <td>7.6/10</td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
    </tbody>
</table>`;

  test('Filter by genre - test single genre', () => {
    // Run the test (parse HTML string for table, then call filter function)
    // Test single genre (drama)
    const genres = ["drama"];
    const html = new DOMParser().parseFromString(htmlString, "text/html");
    var table = html.getElementById("movieTable");
    filter(genres, [], "", table);

    // See if table shows rows correctly
    expect(table.rows.item(1).style.display).toEqual("none"); // Avatar is hidden
    expect(table.rows.item(2).style.display).toEqual("none"); // Pirates of the Caribbean: At World's End is hidden
    expect(table.rows.item(3).style.display).toEqual("table-row"); // The Dark Knight Rises shows
  });

  test('Filter by genre - test multiple genres', () => {
    // Run the test (parse HTML string for table, then call filter function)
    // Test multiple genres (action, adventure)
    const genres = ["action", "adventure"];
    const html = new DOMParser().parseFromString(htmlString, "text/html");
    var table = html.getElementById("movieTable");
    filter(genres, [], "", table);

    // See if table shows rows correctly
    expect(table.rows.item(1).style.display).toEqual("table-row"); // Avatar is shown
    expect(table.rows.item(2).style.display).toEqual("table-row"); // Pirates of the Caribbean: At World's End is shown
    expect(table.rows.item(3).style.display).toEqual("none"); // The Dark Knight Rises is hidden
  });

  test('Filter by genre - test that no genres match', () => {
    // Run the test (parse HTML string for table, then call filter function)
    // Test that no genres match
    const genres = ["western"];
    const html = new DOMParser().parseFromString(htmlString, "text/html");
    var table = html.getElementById("movieTable");
    filter(genres, [], "", table);

    // See if table shows rows correctly
    expect(table.rows.item(1).style.display).toEqual("none"); // Avatar is hidden
    expect(table.rows.item(2).style.display).toEqual("none"); // Pirates of the Caribbean: At World's End is hidden
    expect(table.rows.item(3).style.display).toEqual("none"); // The Dark Knight Rises is hidden
  });

  test('Filter by year - test a specific year', () => {
    // Run the test
    // Match a specific year
    const year = "2007"
    const html = new DOMParser().parseFromString(htmlString, "text/html");
    var table = html.getElementById("movieTable");
    filter([], [], year, table);

    // Match expected results?
    expect(table.rows.item(1).style.display).toEqual("none"); // Avatar is hidden
    expect(table.rows.item(2).style.display).toEqual("table-row"); // Pirates of the Caribbean: At World's End is shown
    expect(table.rows.item(3).style.display).toEqual("none"); // The Dark Knight Rises is hidden
  });

  test('Filter by year - test if no years match', () => {
    // Run the test
    // Test if no years match
    const year = "2005"
    const html = new DOMParser().parseFromString(htmlString, "text/html");
    var table = html.getElementById("movieTable");
    filter([], [], year, table);

    // Match expected results?
    expect(table.rows.item(1).style.display).toEqual("none"); // Avatar is hidden
    expect(table.rows.item(2).style.display).toEqual("none"); // Pirates of the Caribbean: At World's End is hidden
    expect(table.rows.item(3).style.display).toEqual("none"); // The Dark Knight Rises is hidden
  });

  test('Filter by rating - test single rating', () => {
    // Again run the test
    // Test single rating
    const rating = ["7"];
    const html = new DOMParser().parseFromString(htmlString, "text/html");
    var table = html.getElementById("movieTable");
    filter([], rating, "", table);

    // Match expected results?
    expect(table.rows.item(1).style.display).toEqual("table-row"); // Avatar is shown
    expect(table.rows.item(2).style.display).toEqual("none"); // Pirates of the Caribbean: At World's End is hidden
    expect(table.rows.item(3).style.display).toEqual("table-row"); // The Dark Knight Rises is shown
  });

  test('Filter by rating - test multiple ratings', () => {
    // Again run the test
    // Test multiple ratings
    const rating = ["6", "7"];
    const html = new DOMParser().parseFromString(htmlString, "text/html");
    var table = html.getElementById("movieTable");
    filter([], rating, "", table);

    // Match expected results?
    expect(table.rows.item(1).style.display).toEqual("table-row"); // Avatar is shown
    expect(table.rows.item(2).style.display).toEqual("table-row"); // Pirates of the Caribbean: At World's End is shown
    expect(table.rows.item(3).style.display).toEqual("table-row"); // The Dark Knight Rises is shown
  });

  test('Filter by rating - test no ratings match', () => {
    // Again run the test
    // Test no ratings match
    const rating = ["5"];
    const html = new DOMParser().parseFromString(htmlString, "text/html");
    var table = html.getElementById("movieTable");
    filter([], rating, "", table);

    // Match expected results?
    expect(table.rows.item(1).style.display).toEqual("none"); // Avatar is hidden
    expect(table.rows.item(2).style.display).toEqual("none"); // Pirates of the Caribbean: At World's End is hidden
    expect(table.rows.item(3).style.display).toEqual("none"); // The Dark Knight Rises is hidden
  });