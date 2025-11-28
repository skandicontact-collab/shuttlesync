Usage inside ANY ShuttleSync HTML page, At the top of your HTML (just inside <body>):
<div id="ss-header"></div>
<div style="height:64px"></div> <!-- pushes content below header -->

Load CSS + JS:
<link rel="stylesheet" href="../auth/header.css" />
<script src="../auth/header.js"></script>

Required session schema in localStorage, every login scenario must send back:
{
  "sessionToken": "abc123...",
  "skid": "AB1234",
  "fullName": "John Doe",
  "role": "Destination"
}
-----------------------------------------------------------------------------------------
Here is your updated HTML including those changes
🔥 Only the top section changed — the rest of your page stays identical.

(example html)
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>ACUS Desktop — Baggage Status</title>

⚠️<link rel="stylesheet" href="../auth/header.css"/>
<script src="../auth/sessionManager.js"></script>
<script src="../auth/header.js" defer></script>⚠️

<style>
/* — your styles unchanged — */

Then inside body:
<body>

<!-- GLOBAL SHUTTLESYNC HEADER -->
<div id="ss-header" 
     data-title="Baggage Status"
     data-sub="Desktop • BHS • AHL • Belt Monitor">
</div>

Everything else below stays exactly as-is.
------------------------------------------------------------

✔ /destination/home/				✔ /destination/airport/
		checkInOut.html							paxList.html
		internalMail.html						flightList.html
		groupTalk.html							hotelDistribution.html
		reporting.html							transferList.html
		settings.html								delayMessaging.html
		logout.html									misconnectAlerts.html
		customerChat.html						gateMonitor.html
																baggageStatus.html

✔ /destination/paxCI/				✔ /destination/transfers/
		welcomeMeetings.html				busAssignments.html
		hotelCheckInList.html				timetables.html
		qrScan.html									driverSync.html
		notesFlags.html							paxCounts.html

✔ /destination/tours/
productList.html
paymentScanner.html
bookings.html
commissionOverview.html
eTickets.html

✔ /destination/guestService/
hotlineChat.html
issueReports.html
lostFound.html
accessibility.html
emergencies.html

✔ /destination/hotelRelations/
hotelDirectory.html
roomingList.html
complaintsLog.html
meetingMinutes.html

✔ /destination/managerPanel/
(Visible only to supervisors/managers)
staffRotations.html
toursInventory.html
dutySchedule.html
salesReporting.html
broadcastMessages.html
