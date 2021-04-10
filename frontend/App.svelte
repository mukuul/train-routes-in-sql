<script>
  var a = "";
  var b = "loading...";
  var from = "";
  var to = "";
  var c = "";
  var d = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  var train = "";
  var day = "";
  var from1 = "";
  var to1 = "";
  var showTrainTable = false;
  var seats = "Available Seats = ";
  fetch("/api/stationlist")
    .then((res) => res.json())
    .then((jsonList) => {
      a = jsonList;
    });
  fetch("/api/trainlist")
    .then((res) => res.json())
    .then((jsonList) => {
      c = jsonList;
    });
  function handleSubmit(event) {
    fetch(`/api/trainroute?from=${from}&to=${to}`)
      .then((res) => res.json())
      .then((jsonList) => {
        b = jsonList;
        showTrainTable = true;
      });
  }
  function handleSubmit1(event) {
    fetch(`/api/seat?trainnumber=${train}&day=${day}&from=${from1}&to=${to1}`)
      .then((res) => res.json())
      .then((jsonList) => {
        seats = `Available Seats =  ${jsonList[0].available_seats}`;
      });
  }
</script>

<div class="wrapper">
  <div>
    <h2>Train between Stations</h2>
    <form method="post" on:submit|preventDefault={handleSubmit}>
      <label for="choice">From Station:</label><br />
      <div class="station">
        <select id="station" bind:value={from}>
          <option />
          {#each a as { id, stationName, stationCode }}
            <option value={id}>{stationName}-{stationCode}</option>
          {/each}
        </select><br />
      </div>
      <label for="choice2">To Station:</label><br />
      <select id="station1" bind:value={to}>
        <option />
        {#each a as { id, stationName, stationCode }}
          <option value={id}>{stationName}-{stationCode}</option>
        {/each}
      </select>
      <br />
      <input type="submit" value="Submit" />
    </form>
  </div>
  <div>
    <h2>Seat Availability</h2>
    <form method="post" on:submit|preventDefault={handleSubmit1}>
      <label for="choice3">Train Number:</label><br />
      <select id="train" bind:value={train}>
        <option />
        {#each c as { trainNumber, train }}
          <option value={trainNumber}>{trainNumber}-{train}</option>
        {/each}
      </select><br />
      <label for="choice4">Day:</label><br />
      <select id="day" bind:value={day}>
        <option />
        {#each d as days}
          <option value={days}>{days}</option>
        {/each}
      </select>
      <br />
      <label for="choice5">From Station:</label><br />
      <select id="train" bind:value={from1}>
        <option />
        {#each a as { id, stationName, stationCode }}
          <option value={id}>{stationName}-{stationCode}</option>
        {/each}
      </select><br />
      <label for="choice6">To Station:</label><br />
      <select id="train" bind:value={to1}>
        <option />
        {#each a as { id, stationName, stationCode }}
          <option value={id}>{stationName}-{stationCode}</option>
        {/each}
      </select><br />
      <input type="submit" value="Submit" />
      <div>{seats}</div>
    </form>
  </div>
</div>

{#if showTrainTable}
  <table>
    <tr>
      <th>Train Number</th>
      <th>Train Name</th>
      <th>Day</th>
    </tr>
    {#each b as { trainNumber, train, day }}
      <tr>
        <td>{trainNumber}</td>
        <td>{train}</td>
        <td>{day}</td>
      </tr>
    {/each}
  </table>
{/if}

<style>
  form {
    background: peachpuff;
    padding: 1em;
    padding-top: 0.66em;
    width: fit-content;
  }
  input {
    padding: 0.33 em;
  }
  table {
    border-collapse: collapse;
  }
  table,
  th,
  td {
    border: 1px solid black;
  }
  th,
  td {
    padding-left: 0.5em;
    padding-right: 0.5em;
    text-align: center;
  }
</style>
