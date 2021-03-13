<script>
  var a = "loading...";

  fetch("/api/trainroute?from=6&to=9")
    .then((res) => res.json())
    .then((jsonList) => {
      a = JSON.stringify(jsonList);
    });
</script>

<h2>Input source and destination</h2>
<form method="post" enctype="multipart/form-data">
  <label for="fname">From:</label><br />
  <input type="number" id="fname" name="fname" /><br />
  <label for="lname">To:</label><br />
  <input type="number" id="lname" name="lname" /><br /><br />
  <input type="submit" value="Submit" />
</form>
<div id="list">{a}</div>

<style>
  form {
    background: yellow;
  }
</style>
