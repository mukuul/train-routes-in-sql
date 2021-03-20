<script>
  var a = "loading...";
  var b = "loading...";
  var from = "";
  var to = "";
  var showTable = false;
  fetch("/api/stationlist")
    .then((res) => res.json())
    .then((jsonList) => {
      a = jsonList;
    });
  function handleSubmit(event) {
    fetch(`/api/trainroute?from=${from}&to=${to}`)
      .then((res) => res.json())
      .then((jsonList) => {
        b = jsonList;
        showTable = true;
      });
  }
</script>

<h2>Input source and destination</h2>
<form method="post" on:submit|preventDefault={handleSubmit}>
  <label for="choice">From Station:</label><br />
  <select id="station" bind:value={from}>
    <option />
    {#each a as { id, stationName, stationCode }}
      <option value={id}>{stationName}-{stationCode}</option>
    {/each}
  </select><br />
  <label for="choice2">To Station:</label><br />
  <select id="station1" bind:value={to}>
    <option />
    {#each a as { id, stationName, stationCode }}
      <option value={id}>{stationName}-{stationCode}</option>
    {/each}
  </select>
  <br /><br />
  <input type="submit" value="Submit" />
</form>
{#if showTable}
  <table style="width:100%">
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
    background: yellow;
  }
</style>
